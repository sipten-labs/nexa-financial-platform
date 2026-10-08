"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SpendingCategory } from "@/types/finance";
import { formatCurrency } from "@/lib/utils";

interface CategoryDonutProps {
  categories: SpendingCategory[];
}

interface CustomDonutTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: SpendingCategory;
  }>;
}

function CustomDonutTooltip({ active, payload }: CustomDonutTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-border-subtle bg-surface-1/95 p-2.5 shadow-2xl backdrop-blur-md text-xs">
        <p className="font-medium text-text-primary">{item.category}</p>
        <p className="text-text-muted font-mono mt-0.5">
          {formatCurrency(item.amount)} ({item.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export function CategoryDonut({ categories }: CategoryDonutProps) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold tracking-tight text-text-primary">
          Category Allocation
        </h3>
        <p className="text-xs text-text-dim">Discretionary & operational distribution</p>
      </div>

      {/* Donut Visual */}
      <div className="h-44 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomDonutTooltip />} />
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={68}
              paddingAngle={4}
              dataKey="amount"
              stroke="#111317"
              strokeWidth={2}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-wider text-text-dim">Total Spent</span>
          <span className="text-sm font-semibold text-text-primary font-mono">$7,210</span>
        </div>
      </div>

      {/* Legend list */}
      <div className="space-y-2 pt-2 border-t border-border-subtle/50 text-xs">
        {categories.slice(0, 4).map((cat) => (
          <div key={cat.category} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-text-muted truncate max-w-[150px]">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="truncate">{cat.category}</span>
            </span>
            <span className="text-text-primary font-mono text-[11px]">
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
