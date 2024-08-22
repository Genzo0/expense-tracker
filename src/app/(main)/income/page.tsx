import { useQuery } from "@tanstack/react-query";
import { validateRequest } from "@/auth";
import { Loader2 } from "lucide-react";
import IncomeTable from "./IncomeTable";
import AddButton from "@/components/transaction/AddButton";

export default async function Page() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pemasukkan</h1>
        <AddButton type={"INCOME"} />
      </div>
      <IncomeTable />
    </div>
  );
}
