import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign } from "lucide-react";
import React from "react";

export default function IncomeAndExpenseSkeleton() {
  return (
    <div className="flex-1 flex-wrap rounded-2xl bg-card shadow-md">
      {/* HEADERS */}
      <div>
        <div className="mb-2 flex justify-between px-5 pt-4">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex items-center justify-around gap-4 px-5">
        <div className="rounded-full border-[1px] bg-accent p-3">
          <Skeleton className="size-5" />
        </div>
        <div className="flex-1">
          <>
            <div className="my-4 flex items-center justify-between text-sm">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="my-4 flex items-center justify-between text-sm">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
