import React from "react";
import { Sparkles, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { FinancialInsight } from "@/types/finance";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  insights: FinancialInsight[];
}

export function InsightCard({ insights }: InsightCardProps) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-emerald" />
          <h3 className="text-sm font-semibold tracking-tight text-text-primary">
            Automated Intelligence
          </h3>
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded-full">
          3 Signals
        </span>
      </div>

      {/* Signals List */}
      <div className="space-y-3">
        {insights.map((item) => {
          const isPositive = item.type === "positive";
          const isWarning = item.type === "warning";

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/80 hover:border-border-focus transition-all duration-150 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isPositive && <TrendingUp className="h-3.5 w-3.5 text-accent-emerald shrink-0" />}
                  {isWarning && <AlertTriangle className="h-3.5 w-3.5 text-accent-amber shrink-0" />}
                  {!isPositive && !isWarning && <Sparkles className="h-3.5 w-3.5 text-blue-400 shrink-0" />}
                  <h4 className="text-xs font-medium text-text-primary leading-snug">
                    {item.title}
                  </h4>
                </div>
                {item.metricImpact && (
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0",
                      isPositive
                        ? "bg-accent-emerald/10 text-accent-emerald"
                        : isWarning
                        ? "bg-accent-amber/10 text-accent-amber"
                        : "bg-surface-3 text-text-muted"
                    )}
                  >
                    {item.metricImpact}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                {item.description}
              </p>
              {item.actionLabel && (
                <div className="pt-1 flex justify-end">
                  <button className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-emerald hover:text-emerald-400 transition-colors">
                    {item.actionLabel}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
