"use client";

import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { MOCK_CASHFLOW, MOCK_CATEGORIES } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ArrowDownRight, Layers, BarChart2 } from "lucide-react";

const TIME_RANGES = ["30 Days", "90 Days", "YTD", "Full Year"];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("90 Days");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopHeader />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header & Range Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-emerald" />
                <span className="text-xs uppercase font-medium tracking-wider text-text-dim">
                  Intelligence Metrics
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                Comparative Analytics
              </h1>
            </div>

            {/* Time Filter Pill Buttons */}
            <div className="flex items-center bg-surface-1 border border-border-subtle p-1 rounded-xl">
              {TIME_RANGES.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedRange === range
                      ? "bg-surface-2 text-text-primary shadow-sm"
                      : "text-text-dim hover:text-text-muted"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Efficiency Key Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-text-dim">
                Gross Inflow Margin
              </span>
              <div className="text-2xl font-bold text-text-primary font-mono">62.3%</div>
              <p className="text-[11px] text-accent-emerald flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +4.1% higher than target
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-text-dim">
                Operational Burn Rate
              </span>
              <div className="text-2xl font-bold text-text-primary font-mono">$7,210.40/mo</div>
              <p className="text-[11px] text-accent-emerald flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" /> -3.2% spending contraction
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-text-dim">
                Burn Multiple
              </span>
              <div className="text-2xl font-bold text-text-primary font-mono">0.58x</div>
              <p className="text-[11px] text-text-dim">
                Excellent liquidity retention
              </p>
            </div>
          </div>

          {/* Comparative Volume Bar Chart */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-text-primary flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-accent-emerald" />
                  Monthly Flow Comparison
                </h3>
                <p className="text-xs text-text-dim">
                  Historical balance of revenue intake vs total outbound payments
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-text-muted">
                  <span className="h-2 w-2 rounded-full bg-accent-emerald" />
                  Gross Inflow
                </span>
                <span className="flex items-center gap-1.5 text-text-muted">
                  <span className="h-2 w-2 rounded-full bg-slate-500" />
                  Gross Outflow
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CASHFLOW} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F232B" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111317", borderColor: "#1F232B", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(value: any) => [formatCurrency(Number(value)), ""]}
                  />
                  <Bar dataKey="inflow" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outflow" fill="#64748B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Velocity Matrix */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <h3 className="text-sm font-semibold tracking-tight text-text-primary flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent-emerald" />
              Category Variance & Outflow Breakdown
            </h3>
            <div className="divide-y divide-border-subtle/50">
              {MOCK_CATEGORIES.map((cat) => (
                <div key={cat.category} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs font-medium text-text-primary">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div className="hidden sm:block text-xs text-text-dim">
                      {cat.percentage}% of aggregate
                    </div>
                    <div className="text-xs font-semibold text-text-primary font-mono">
                      {formatCurrency(cat.amount)}
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