"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Sliders, 
  User, 
  BellRing, 
  Lock 
} from "lucide-react";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("USD");
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [anomalyDetection, setAnomalyDetection] = useState(true);
  const [isResetSaved, setIsResetSaved] = useState(false);

  const handleResetSandbox = () => {
    setIsResetSaved(true);
    setTimeout(() => setIsResetSaved(false), 2500);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopHeader />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-emerald" />
              <span className="text-xs uppercase font-medium tracking-wider text-text-dim">
                Configuration
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
              Platform Preferences
            </h1>
          </div>

          {/* Section 1: Executive Profile & Currency */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border-subtle/50">
              <User className="h-4 w-4 text-accent-emerald" />
              <h2 className="text-sm font-semibold text-text-primary">
                Workspace Identity & Base Ledger
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-text-dim font-medium">Principal Operator</label>
                <input
                  type="text"
                  defaultValue="Sipten Raja"
                  className="w-full bg-surface-2 border border-border-subtle rounded-xl px-3.5 py-2 text-text-primary focus:outline-none focus:border-border-focus"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-text-dim font-medium">Operational Role</label>
                <input
                  type="text"
                  defaultValue="Executive Product & UI/UX Designer"
                  className="w-full bg-surface-2 border border-border-subtle rounded-xl px-3.5 py-2 text-text-primary focus:outline-none focus:border-border-focus"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-text-dim font-medium">Reporting Currency Format</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-surface-2 border border-border-subtle rounded-xl px-3.5 py-2 text-text-primary focus:outline-none"
                >
                  <option value="USD">USD ($) — United States Dollar</option>
                  <option value="EUR">EUR (€) — Euro Area</option>
                  <option value="GBP">GBP (£) — British Pound</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Algorithmic Synthesizer Controls */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border-subtle/50">
              <Sliders className="h-4 w-4 text-accent-emerald" />
              <h2 className="text-sm font-semibold text-text-primary">
                Intelligence Governance
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-text-primary">Budget Envelope Ceiling Alerts</div>
                  <div className="text-text-dim text-[11px]">
                    Notify immediately when any spending category breaches 80% capacity
                  </div>
                </div>
                <button
                  onClick={() => setBudgetAlerts(!budgetAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    budgetAlerts ? "bg-accent-emerald" : "bg-surface-2 border border-border-subtle"
                  }`}
                >
                  <div
                    className={`bg-black h-4 w-4 rounded-full shadow-md transform transition-transform ${
                      budgetAlerts ? "translate-x-5 bg-black" : "translate-x-0 bg-text-dim"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-subtle/40">
                <div>
                  <div className="font-medium text-text-primary">Automated Burn Anomaly Detection</div>
                  <div className="text-text-dim text-[11px]">
                    Flag one-off irregular outflows deviating 20% or more from 90-day moving average
                  </div>
                </div>
                <button
                  onClick={() => setAnomalyDetection(!anomalyDetection)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    anomalyDetection ? "bg-accent-emerald" : "bg-surface-2 border border-border-subtle"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full shadow-md transform transition-transform ${
                      anomalyDetection ? "translate-x-5 bg-black" : "translate-x-0 bg-text-dim"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Sandbox Demo Integrity */}
          <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border-subtle/50">
              <ShieldCheck className="h-4 w-4 text-accent-emerald" />
              <h2 className="text-sm font-semibold text-text-primary">
                Portfolio Demonstration Sandbox
              </h2>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              This instance is populated with self-contained, synthetic financial mock data designed to showcase high-level product design, responsive tables, and financial data visualization. No live bank credentials or proprietary telemetry are connected.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={handleResetSandbox}
                className="inline-flex items-center justify-center gap-2 bg-surface-2 hover:bg-surface-3 border border-border-subtle text-xs font-semibold px-4 py-2.5 rounded-xl text-text-primary transition-colors"
              >
                {isResetSaved ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-accent-emerald" />
                    <span>State Re-seeded Successfully</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 text-text-dim" />
                    <span>Re-seed Demo Fixtures</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-text-dim text-center sm:text-right">
                Instance Hash: <code className="font-mono text-text-primary">nx-demo-2026-q4</code>
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}