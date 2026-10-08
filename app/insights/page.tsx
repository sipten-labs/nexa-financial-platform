"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { MOCK_INSIGHTS } from "@/data/mockData";
import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  Repeat, 
  ShieldCheck, 
  Calendar 
} from "lucide-react";
import { cn } from "@/lib/utils";

const RECURRING_SUBSCRIPTIONS = [
  { name: "Amazon Web Services", category: "Infrastructure", cost: "$842.15/mo", renewal: "Nov 01, 2026", status: "Active" },
  { name: "Linear Orbit Inc.", category: "Productivity", cost: "$240.00/mo", renewal: "Oct 28, 2026", status: "Active" },
  { name: "GitHub Enterprise", category: "Developer Tools", cost: "$84.00/mo", renewal: "Oct 15, 2026", status: "Active" },
  { name: "Vercel Edge", category: "Hosting", cost: "$150.00/mo", renewal: "Nov 05, 2026", status: "Active" },
];

export default function InsightsPage() {
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
                <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse" />
                <span className="text-xs uppercase font-medium tracking-wider text-text-dim">
                  Algorithmic Signal Stream
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                Intelligence & Signals
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-dim bg-surface-1 border border-border-subtle px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-emerald" />
                Rule-Based Synthesis Active
              </span>
            </div>
          </div>

          {/* Primary Signals Grid */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-tight text-text-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-emerald" />
              Prioritized Observations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_INSIGHTS.map((item) => {
                const isPositive = item.type === "positive";
                const isWarning = item.type === "warning";

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-border-focus transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border",
                            isPositive && "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20",
                            isWarning && "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
                            !isPositive && !isWarning && "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          )}
                        >
                          {isPositive && <TrendingUp className="h-3 w-3" />}
                          {isWarning && <AlertTriangle className="h-3 w-3" />}
                          {!isPositive && !isWarning && <Sparkles className="h-3 w-3" />}
                          {item.type}
                        </span>

                        {item.metricImpact && (
                          <span className="text-[11px] font-mono text-text-dim">
                            {item.metricImpact}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-semibold text-text-primary leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[11px] text-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border-subtle/40 flex justify-end">
                      <button className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-emerald hover:text-emerald-400 transition-colors">
                        {item.actionLabel || "Investigate"}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fixed Burn & Subscription Auditor */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-text-primary flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-accent-emerald" />
                  Subscription & Recurring Commitments Auditor
                </h3>
                <p className="text-xs text-text-dim">
                  Detected regular overhead transactions and recurring software liabilities
                </p>
              </div>

              <span className="text-xs font-mono text-text-dim">
                Aggregate: $1,316.15/month
              </span>
            </div>

            <div className="divide-y divide-border-subtle/50 pt-2">
              {RECURRING_SUBSCRIPTIONS.map((sub) => (
                <div
                  key={sub.name}
                  className="py-3.5 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-text-primary">{sub.name}</div>
                    <div className="text-[11px] text-text-dim">{sub.category}</div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-text-dim font-mono">
                      <Calendar className="h-3 w-3" />
                      Next: {sub.renewal}
                    </div>
                    <div className="text-xs font-semibold font-mono text-text-primary">
                      {sub.cost}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}