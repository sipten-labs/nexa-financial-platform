"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { MOCK_BUDGETS } from "@/data/mockData";
import { formatCurrency, cn } from "@/lib/utils";
import { Wallet, AlertCircle, Plus, CheckCircle } from "lucide-react";

export default function BudgetsPage() {
  const totalAllocated = MOCK_BUDGETS.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = MOCK_BUDGETS.reduce((acc, curr) => acc + curr.spent, 0);
  const aggregatePercentage = (totalSpent / totalAllocated) * 100;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopHeader />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-emerald" />
                <span className="text-xs uppercase font-medium tracking-wider text-text-dim">
                  Envelope Allocation
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                Budget Governance
              </h1>
            </div>

            <button className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 border border-border-subtle text-xs font-semibold px-4 py-2 rounded-xl text-text-primary transition-colors">
              <Plus className="h-3.5 w-3.5 text-accent-emerald" />
              Create Envelope
            </button>
          </div>

          {/* Master Budget Health Card */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-text-dim">
                  Total Monthly Consumption
                </span>
                <div className="text-3xl font-bold font-mono text-text-primary">
                  {formatCurrency(totalSpent)}{" "}
                  <span className="text-sm font-normal text-text-dim">
                    / {formatCurrency(totalAllocated)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                  <CheckCircle className="h-3.5 w-3.5" />
                  On Target (88.7% Capacity)
                </span>
              </div>
            </div>

            {/* Master Progress Line */}
            <div className="h-2.5 w-full bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-accent-emerald to-accent-amber rounded-full transition-all duration-500"
                style={{ width: `${Math.min(aggregatePercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Category Envelopes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_BUDGETS.map((budget) => {
              const percentage = (budget.spent / budget.allocated) * 100;
              const isWarning = percentage >= budget.alertThreshold * 100;
              const isOver = percentage >= 95;
              const remaining = budget.allocated - budget.spent;

              return (
                <div
                  key={budget.id}
                  className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4 hover:border-border-focus transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-text-muted">
                        <Wallet className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-text-primary">
                          {budget.category}
                        </h4>
                        <span className="text-[11px] text-text-dim font-mono">
                          {formatCurrency(remaining)} remaining
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border",
                        isOver
                          ? "bg-accent-rose/10 text-accent-rose border-accent-rose/20"
                          : isWarning
                          ? "bg-accent-amber/10 text-accent-amber border-accent-amber/20"
                          : "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20"
                      )}
                    >
                      {percentage.toFixed(0)}% Used
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          isOver
                            ? "bg-accent-rose"
                            : isWarning
                            ? "bg-accent-amber"
                            : "bg-accent-emerald"
                        )}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-text-dim">
                      <span>Spent: {formatCurrency(budget.spent)}</span>
                      <span>Cap: {formatCurrency(budget.allocated)}</span>
                    </div>
                  </div>

                  {isWarning && (
                    <div className="pt-2 border-t border-border-subtle/40 flex items-center gap-1.5 text-[11px] text-accent-amber">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>Approaching monthly allocation ceiling.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}