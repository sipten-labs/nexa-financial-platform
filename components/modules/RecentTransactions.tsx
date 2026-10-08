import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownLeft, ArrowRight } from "lucide-react";
import { Transaction } from "@/types/finance";
import { formatCurrency, cn } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-text-primary">
            Recent Ledger Activity
          </h3>
          <p className="text-xs text-text-dim">
            Latest settled and pending transactions
          </p>
        </div>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-xs font-medium text-accent-emerald hover:text-emerald-400 transition-colors"
        >
          View Full Ledger
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Transactions Container */}
      <div className="divide-y divide-border-subtle/50">
        {transactions.map((tx) => {
          const isIncome = tx.type === "income";

          return (
            <div
              key={tx.id}
              className="py-3.5 flex items-center justify-between gap-4 group hover:bg-surface-2/30 px-2 rounded-xl transition-colors"
            >
              {/* Left Details */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border",
                    isIncome
                      ? "bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald"
                      : "bg-surface-2 border-border-subtle text-text-muted"
                  )}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-text-primary truncate">
                    {tx.merchant.name}
                  </div>
                  <div className="text-[11px] text-text-dim truncate">
                    {tx.category} • {tx.date}
                  </div>
                </div>
              </div>

              {/* Right Details: Status + Amount */}
              <div className="flex items-center gap-3 shrink-0 text-right">
                <span
                  className={cn(
                    "hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium border",
                    tx.status === "cleared" && "bg-surface-2 text-text-muted border-border-subtle",
                    tx.status === "pending" && "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
                    tx.status === "reconciled" && "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20"
                  )}
                >
                  {tx.status}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold font-mono",
                    isIncome ? "text-accent-emerald" : "text-text-primary"
                  )}
                >
                  {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}