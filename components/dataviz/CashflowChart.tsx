"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CashflowPoint } from "@/types/finance";
import { formatCurrency } from "@/lib/utils";

interface CashflowChartProps {
  data: CashflowPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    stroke: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface-1/95 p-3 shadow-2xl backdrop-blur-md">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim">
          {label} 2026
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-accent-emerald" />
              Inflow
            </span>
            <span className="font-medium text-text-primary font-mono">
              {formatCurrency(payload[0]?.value || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Outflow
            </span>
            <span className="font-medium text-text-primary font-mono">
              {formatCurrency(payload[1]?.value || 0)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function CashflowChart({ data }: CashflowChartProps) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-text-primary">
            Cashflow Trajectory
          </h3>
          <p className="text-xs text-text-dim">
            Monthly gross inflow compared against operational outflow
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-text-muted">
            <span className="h-2 w-2 rounded-full bg-accent-emerald" />
            Inflow
          </div>
          <div className="flex items-center gap-1.5 text-text-muted">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            Outflow
          </div>
        </div>
      </div>

      {/* Responsive Chart Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F232B" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="inflow"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#inflowGrad)"
            />
            <Area
              type="monotone"
              dataKey="outflow"
              stroke="#94A3B8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#outflowGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
