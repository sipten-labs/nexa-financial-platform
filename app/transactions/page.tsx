"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  X, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  RefreshCw 
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { MOCK_TRANSACTIONS } from "@/data/mockData";
import { Transaction, TransactionStatus, TransactionType } from "@/types/finance";
import { formatCurrency, cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Cloud & Infrastructure",
  "Operations & Tools",
  "Food & Dining",
  "Workspace & Housing",
  "Client Retainers",
  "Investments",
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);

  // Filter logic
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((tx) => {
      const matchesSearch = 
        tx.merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.merchant.subtext.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || tx.category === selectedCategory;

      const matchesStatus = 
        selectedStatus === "All" || tx.status === selectedStatus;

      const matchesType = 
        selectedType === "All" || tx.type === selectedType;

      return matchesSearch && matchesCategory && matchesStatus && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedType]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Arena */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopHeader />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-emerald" />
                <span className="text-xs uppercase font-medium tracking-wider text-text-dim">
                  Audit Ledger
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                Transactions
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-dim bg-surface-1 border border-border-subtle px-3 py-1.5 rounded-lg font-mono">
                {filteredTransactions.length} records found
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Field */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-dim" />
                <input
                  type="text"
                  placeholder="Filter by merchant, vendor, or purpose..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-xs text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-focus transition-colors"
                />
              </div>

              {/* Status & Type Selectors */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-surface-2 border border-border-subtle text-text-primary text-xs rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="income">Inflow (+)</option>
                  <option value="expense">Outflow (-)</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-surface-2 border border-border-subtle text-text-primary text-xs rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="cleared">Cleared</option>
                  <option value="pending">Pending</option>
                  <option value="reconciled">Reconciled</option>
                </select>
              </div>
            </div>

            {/* Category Pills Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 text-xs no-scrollbar">
              <span className="text-[11px] text-text-dim flex items-center gap-1 pr-2 shrink-0">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors border",
                    selectedCategory === cat
                      ? "bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30 font-medium"
                      : "bg-surface-2 text-text-muted border-border-subtle hover:text-text-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block rounded-2xl border border-border-subtle bg-surface-1 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-subtle bg-surface-2/40 text-text-dim uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Merchant / Description</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {filteredTransactions.map((tx) => {
                  const isIncome = tx.type === "income";

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => setActiveTransaction(tx)}
                      className="hover:bg-surface-2/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-text-dim font-mono">{tx.date}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-text-primary group-hover:text-accent-emerald transition-colors">
                          {tx.merchant.name}
                        </div>
                        <div className="text-[11px] text-text-dim">{tx.merchant.subtext}</div>
                      </td>
                      <td className="py-3.5 px-4 text-text-muted">{tx.category}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium border inline-block",
                            tx.status === "cleared" && "bg-surface-2 text-text-muted border-border-subtle",
                            tx.status === "pending" && "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
                            tx.status === "reconciled" && "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20"
                          )}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={cn(
                            "font-semibold font-mono text-xs",
                            isIncome ? "text-accent-emerald" : "text-text-primary"
                          )}
                        >
                          {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View (Visible on mobile) */}
          <div className="md:hidden space-y-3">
            {filteredTransactions.map((tx) => {
              const isIncome = tx.type === "income";

              return (
                <div
                  key={tx.id}
                  onClick={() => setActiveTransaction(tx)}
                  className="p-4 rounded-xl bg-surface-1 border border-border-subtle active:scale-[0.99] transition-transform space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-dim font-mono">{tx.date}</span>
                    <span
                      className={cn(
                        "text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium border",
                        tx.status === "cleared" && "bg-surface-2 text-text-muted border-border-subtle",
                        tx.status === "pending" && "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
                        tx.status === "reconciled" && "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20"
                      )}
                    >
                      {tx.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-text-primary">{tx.merchant.name}</h4>
                      <p className="text-[11px] text-text-dim">{tx.category}</p>
                    </div>
                    <div
                      className={cn(
                        "font-semibold font-mono text-sm",
                        isIncome ? "text-accent-emerald" : "text-text-primary"
                      )}
                    >
                      {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Screen S-03: Context Drawer for Selected Transaction */}
      {activeTransaction && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-surface-1 border-l border-border-subtle h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                  Transaction Inspector
                </div>
                <button
                  onClick={() => setActiveTransaction(null)}
                  className="p-1.5 rounded-lg text-text-dim hover:text-text-primary hover:bg-surface-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Amount Display */}
              <div className="text-center py-4 space-y-1 bg-surface-2/40 rounded-2xl border border-border-subtle">
                <span className="text-xs text-text-dim">Settlement Value</span>
                <div
                  className={cn(
                    "text-3xl font-bold font-mono tracking-tight",
                    activeTransaction.type === "income" ? "text-accent-emerald" : "text-text-primary"
                  )}
                >
                  {activeTransaction.type === "income" ? "+" : "-"}
                  {formatCurrency(activeTransaction.amount)}
                </div>
                <span className="text-[11px] text-text-dim uppercase tracking-wider">
                  USD • Standard Ledger
                </span>
              </div>

              {/* Detail Specifications */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-dim">Entity / Merchant</span>
                  <span className="font-medium text-text-primary">{activeTransaction.merchant.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-dim">Classification</span>
                  <span className="font-medium text-text-primary">{activeTransaction.category}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-dim flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> Booking Date
                  </span>
                  <span className="font-mono text-text-primary">{activeTransaction.date}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-dim flex items-center gap-1.5">
                    <CreditCard className="h-3 w-3" /> Payment Method
                  </span>
                  <span className="text-text-primary">{activeTransaction.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-dim">Ledger ID</span>
                  <span className="font-mono text-text-dim">{activeTransaction.id}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-text-dim">Reconciliation Status</span>
                  <span
                    className={cn(
                      "text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border",
                      activeTransaction.status === "cleared" && "bg-surface-2 text-text-muted border-border-subtle",
                      activeTransaction.status === "pending" && "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
                      activeTransaction.status === "reconciled" && "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20"
                    )}
                  >
                    {activeTransaction.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t border-border-subtle">
              <button
                onClick={() => setActiveTransaction(null)}
                className="w-full py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-xs font-semibold text-text-primary transition-colors border border-border-subtle"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}