"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "../SessionProvider";
import kyInstance from "@/lib/ky";
import { TransactionData } from "@/lib/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DetailDialog from "@/components/transaction/DetailDialog";
import { getExpenses } from "./actions";

const columns: GridColDef[] = [
  { field: "description", headerName: "Deskripsi", width: 200 },
  {
    field: "amount",
    headerName: "Jumlah",
    width: 150,
    type: "number",
    valueGetter: (value, row) => parseInt(row.amount),
    valueFormatter: (value, row) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.amount),
  },
  {
    field: "category.name",
    headerName: "Kategori",
    width: 110,
    type: "number",
    valueGetter: (value, row) => row.category.name || "Tidak ada kategori",
  },
  {
    field: "date",
    headerName: "Tanggal",
    width: 150,
    type: "date",
    valueGetter: (value, row) => new Date(row.date),
    valueFormatter: (value, row) =>
      new Date(row.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  },
];

export default function ExpenseTable() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TransactionData | null>(null);

  const { data, isError, isLoading, error, status } = useQuery({
    queryKey: ["expense"],
    queryFn: () => getExpenses(),
  });

  const handleRowClick = (params: any) => {
    setSelectedRow(params.row as TransactionData);
  };

  useEffect(() => {
    if (selectedRow) {
      setShowDetails(true);
    }
  }, [selectedRow]);

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    console.log(error);
    return (
      <p className="text-center text-destructive">
        An error occured while fetching data.
      </p>
    );
  }

  if (status === "success" && !data.length) {
    return (
      <p className="text-center text-muted-foreground">
        Belum ada Pengeluaran, silahkan tambahkan Pengeluaran baru.
      </p>
    );
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        className="rounded-lg border border-gray-200 bg-card !text-muted-foreground shadow"
        onRowClick={handleRowClick}
      />
      {selectedRow && (
        <DetailDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          transaction={selectedRow}
          type={selectedRow.category.type}
        />
      )}
    </>
  );
}
