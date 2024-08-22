import { Suspense } from "react";
import CategorySummaryCard from "./CategorySummaryCard";
import IncomeAndExpenseCard from "./IncomeAndExpenseCard";
import IncomeAndExpenseRecapCard from "./IncomeAndExpenseRecapCard";
import TotalExpenseAndIncome from "./TotalExpenseAndIncome";
import IncomeAndExpenseSkeleton from "./IncomeAndExpenseSkeleton";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-10 pb-4 md:grid-cols-2 md:grid-rows-[repeat(8,20vh)] xl:grid-cols-3 xl:grid-rows-[repeat(8,6.5vh)] xl:overflow-auto">
      <IncomeAndExpenseCard />
      <IncomeAndExpenseRecapCard />
      <CategorySummaryCard />
      <TotalExpenseAndIncome />
    </div>
  );
}
