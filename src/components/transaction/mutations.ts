import { useToast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionValues } from "@/lib/validations";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "./actions";
import { usePathname } from "next/navigation";

export function useCreateTransactionMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast({
        title: "Transaksi berhasil ditambahkan",
      });
    },
  });

  return mutation;
}

export function useUpdateTransactionMutation() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      toast({
        title: "Transaksi berhasil diubah",
      });
    },
  });

  return mutation;
}

export function useDeleteTransactionMutation() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast({
        title: "Transaksi berhasil dihapus",
      });
    },
  });

  return mutation;
}
