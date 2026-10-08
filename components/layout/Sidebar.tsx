"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Wallet, 
  Target, 
  Sparkles, 
  Settings, 
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Analytics", href: "/analytics", icon: PieChart },
  { label: "Budgets", href: "/budgets", icon: Wallet },
  { label: "Goals", href: "/goals", icon: Target },
  { label: "Insights", href: "/insights", icon: Sparkles },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-1 border-r border-border-subtle h-screen sticky top-0 px-4 py-6 justify-between select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald font-bold tracking-wider text-base">
            N
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-text-primary flex items-center gap-1.5">
              NEXA
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-text-dim border border-border-subtle uppercase tracking-wider">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-text-dim">Financial Intelligence</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-surface-2 text-text-primary border border-border-subtle/80 shadow-sm"
                    : "text-text-muted hover:text-text-primary hover:bg-surface-2/50"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-accent-emerald" : "text-text-dim")} />
                <span>{item.label}</span>
                {item.label === "Insights" && (
                  <span className="ml-auto text-[10px] bg-accent-emerald/15 text-accent-emerald px-1.5 py-0.2 rounded font-semibold">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Portfolio Demo Notice Card */}
      <div className="p-3 rounded-xl bg-surface-2/60 border border-border-subtle space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-accent-emerald">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Fictional Sandbox</span>
        </div>
        <p className="text-[10px] text-text-dim leading-relaxed">
          Self-initiated fintech UI/UX case study. Demo dataset active.
        </p>
      </div>
    </aside>
  );
}
