"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, PieChart, Wallet, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Ledger", href: "/transactions", icon: ArrowLeftRight },
  { label: "Analytics", href: "/analytics", icon: PieChart },
  { label: "Budgets", href: "/budgets", icon: Wallet },
  { label: "Insights", href: "/insights", icon: Sparkles },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface-1 border-t border-border-subtle px-3 py-2 flex items-center justify-around">
      {MOBILE_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors",
              isActive ? "text-accent-emerald" : "text-text-dim hover:text-text-muted"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
