import React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  amount: number;
  deltaPercentage?: number;
  deltaLabel?: string;
  secondaryMetric?: string;
  isNeutralDelta?: boolean;
  inverseDelta?: boolean; // For expenses: decrease is good (green), increase is alert (rose)
}

export function MetricCard({
  label,
  amount,
  deltaPercentage,
  deltaLabel = "vs last month",
  secondaryMetric,
  inverseDelta = false,
}: MetricCardProps) {
  const isPositive = (deltaPercentage ?? 0) >= 0;
  // If inverseDelta is true, negative delta is good (e.g. expenses down)
  const isHealthy = inverseDelta ? !isPositive : isPositive;

  return (
    <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-border-focus transition-all duration-200 flex flex-col justify-between space-y-4 group">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-text-dim">
          {label}
        </span>
        <button
          aria-label="View metric details"
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md text-text-dim hover:text-text-primary hover:bg-surface-2"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Primary Value */}
      <div className="space-y-1">
        <div className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary font-sans">
          {formatCurrency(amount)}
        </div>
      </div>

      {/* Footer Details: Delta Badge & Secondary Pill */}
      <div className="flex items-center justify-between pt-1 border-t border-border-subtle/40 text-xs">
        {deltaPercentage !== undefined ? (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium tracking-tight",
                isHealthy
                  ? "bg-accent-emerald/10 text-accent-emerald"
                  : "bg-accent-rose/10 text-accent-rose"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? `+${deltaPercentage}%` : `${deltaPercentage}%`}
            </span>
            <span className="text-[11px] text-text-dim hidden sm:inline">
              {deltaLabel}
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-text-dim">Aggregated Balance</span>
        )}

        {secondaryMetric && (
          <span className="text-[11px] font-medium text-text-muted bg-surface-2 px-2 py-0.5 rounded-full border border-border-subtle">
            {secondaryMetric}
          </span>
        )}
      </div>
    </div>
  );
}
