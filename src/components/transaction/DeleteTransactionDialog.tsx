import { TransactionData } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDeleteTransactionMutation } from "./mutations";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteTransactionDialogProps {
  transaction: TransactionData;
  open: boolean;
  onClose: () => void;
  type: "EXPENSE" | "INCOME";
}

export default function DeleteTransactionDialog({
  transaction,
  open,
  onClose,
  type,
}: DeleteTransactionDialogProps) {
  const mutation = useDeleteTransactionMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  const queryClient = useQueryClient();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus transaksi ?</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() =>
              mutation.mutate(transaction.id, {
                onSuccess: () => {
                  onClose();
                  queryClient.invalidateQueries({
                    queryKey: [type.toLowerCase()],
                  });
                },
              })
            }
            loading={mutation.isPending}
          >
            Hapus
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Kembali
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
