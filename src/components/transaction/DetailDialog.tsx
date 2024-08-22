"use client";

import { TransactionData } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import LoadingButton from "../LoadingButton";
import {
  updateTransactionSchema,
  UpdateTransactionValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { getCategories } from "./actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";
import { useUpdateTransactionMutation } from "./mutations";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

interface DetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionData;
  type: "EXPENSE" | "INCOME";
}

export default function DetailDialog({
  open,
  onOpenChange,
  transaction,
  type,
}: DetailDialogProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const form = useForm<UpdateTransactionValues>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      id: transaction.id,
      description: transaction.description || "",
      amount: parseInt(transaction.amount.toString()) || undefined,
      category: transaction.category.id,
      date: transaction.date || new Date(),
    },
  });

  useEffect(() => {
    if (transaction) {
      form.reset({
        id: transaction.id,
        description: transaction.description || "",
        amount: parseInt(transaction.amount.toString()) || undefined,
        category: transaction.category.id,
        date: transaction.date || new Date(),
      });
    }
  }, [transaction, form]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", type],
    queryFn: () => getCategories(type),
  });

  const updateMutation = useUpdateTransactionMutation();
  const queryClient = useQueryClient();

  const onSubmit = (values: UpdateTransactionValues) => {
    updateMutation.mutate(
      {
        ...values,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
          queryClient.invalidateQueries({
            queryKey: [type.toLowerCase()],
          });
        },
      },
    );
  };

  function handleOpenChange(open: boolean) {
    if (!open || !updateMutation.isPending) {
      onOpenChange(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaksi</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input placeholder="Deskripsi..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MoneyInput
                form={form}
                name="amount"
                label="Biaya"
                placeholder="Biaya..."
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Hapus
                </Button>
                <LoadingButton type="submit" loading={updateMutation.isPending}>
                  Simpan
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DeleteTransactionDialog
        transaction={transaction}
        onClose={() => {
          setShowDeleteDialog(false);
          handleOpenChange(false);
        }}
        open={showDeleteDialog}
        type={type}
      />
    </>
  );
}

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
};

const moneyFormatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 0,
});

function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? moneyFormatter.format(props.form.getValues()[props.name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits));
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits);
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                inputMode="numeric"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
                formNoValidate
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
