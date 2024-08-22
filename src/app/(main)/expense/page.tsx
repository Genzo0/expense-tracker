import AddButton from "@/components/transaction/AddButton";
import ExpenseTable from "./ExpenseTable";

export default async function Page() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pengeluaran</h1>
        <AddButton type={"EXPENSE"} />
      </div>
      <ExpenseTable />
    </div>
  );
}
