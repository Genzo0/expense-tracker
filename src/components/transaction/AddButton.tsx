"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

interface AddButtonProps {
  type: "EXPENSE" | "INCOME";
}

export default function AddButton({ type }: AddButtonProps) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="default"
        className="bg-blue-500 hover:bg-blue-600"
        onClick={() => setShowDialog(true)}
      >
        Tambah
        <Plus className="size-4" />
      </Button>
      <AddTransactionDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        type={type}
      />
    </>
  );
}
