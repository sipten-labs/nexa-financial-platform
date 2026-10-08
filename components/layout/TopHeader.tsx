"use client";

import { Search, Bell, Sparkles } from "lucide-react";

export function TopHeader() {
  return (
    <header className="h-16 border-b border-border-subtle bg-surface-1/70 backdrop-blur-md sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between">
      {/* Quick Search */}
      <div className="relative w-64 md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-dim" />
        <input
          type="text"
          placeholder="Quick search transactions, metrics..."
          className="w-full bg-surface-2 border border-border-subtle rounded-lg pl-9 pr-8 py-1.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-focus transition-colors"
          readOnly
        />
        <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-text-dim bg-surface-1 px-1.5 py-0.5 rounded border border-border-subtle font-mono">
          ?K
        </kbd>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Insights"
          className="relative h-8 w-8 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-emerald" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-accent-emerald rounded-full" />
        </button>

        <button
          aria-label="Notifications"
          className="h-8 w-8 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        >
          <Bell className="h-3.5 w-3.5" />
        </button>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-border-subtle">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-accent-emerald to-blue-500 flex items-center justify-center text-[11px] font-semibold text-black">
            SR
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-medium text-text-primary leading-tight">Sipten Raja</div>
            <div className="text-[10px] text-text-dim">Executive Workspace</div>
          </div>
        </div>
      </div>
    </header>
  );
}
