"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { MOCK_GOALS } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { Target, Calendar, Plus, CheckCircle2, TrendingUp } from "lucide-react";

export default function GoalsPage() {
  const totalTarget = MOCK_GOALS.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const totalCurrent = MOCK_GOALS.reduce((acc, curr) => acc + curr.currentAmount, 0);
  const aggregateProgress = (totalCurrent / totalTarget) * 100;

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
                  Capital Reserves
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                Strategic Milestones
              </h1>
            </div>

            <button className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 border border-border-subtle text-xs font-semibold px-4 py-2 rounded-xl text-text-primary transition-colors">
              <Plus className="h-3.5 w-3.5 text-accent-emerald" />
              New Target Goal
            </button>
          </div>

          {/* Aggregate Goals Summary */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-text-dim">
                  Total Reserve Mobilization
                </span>
                <div className="text-3xl font-bold font-mono text-text-primary">
                  {formatCurrency(totalCurrent)}{" "}
                  <span className="text-sm font-normal text-text-dim">
                    / {formatCurrency(totalTarget)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {aggregateProgress.toFixed(1)}% Funded Overall
                </span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="h-2.5 w-full bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-emerald rounded-full transition-all duration-500"
                style={{ width: `${aggregateProgress}%` }}
              />
            </div>
          </div>

          {/* Goal Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_GOALS.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const remaining = goal.targetAmount - goal.currentAmount;

              return (
                <div
                  key={goal.id}
                  className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-5 hover:border-border-focus transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-accent-emerald">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary group-hover:text-accent-emerald transition-colors">
                          {goal.title}
                        </h4>
                        <span className="text-xs text-text-dim">
                          Classification: {goal.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-medium text-accent-emerald bg-accent-emerald/10 px-2 py-0.5 rounded-md border border-accent-emerald/20">
                      {progress.toFixed(0)}%
                    </span>
                  </div>

                  {/* Progress Meter */}
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-emerald rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-text-dim">
                      <span>Funded: {formatCurrency(goal.currentAmount)}</span>
                      <span>Target: {formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>

                  {/* Pacing Metadata */}
                  <div className="pt-3 border-t border-border-subtle/50 flex items-center justify-between text-xs">
                    <span className="text-text-muted flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-text-dim" />
                      Target: {goal.targetDate}
                    </span>
                    <span className="text-text-dim font-mono">
                      Gap: {formatCurrency(remaining)}
                    </span>
                  </div>
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