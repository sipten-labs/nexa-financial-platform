import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { MetricCard } from "@/components/primitives/MetricCard";
import { CashflowChart } from "@/components/dataviz/CashflowChart";
import { CategoryDonut } from "@/components/dataviz/CategoryDonut";
import { RecentTransactions } from "@/components/modules/RecentTransactions";
import { InsightCard } from "@/components/modules/InsightCard";
import {
  MOCK_METRICS,
  MOCK_CASHFLOW,
  MOCK_CATEGORIES,
  MOCK_TRANSACTIONS,
  MOCK_INSIGHTS,
} from "@/data/mockData";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Arena */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopHeader />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Section Breadcrumb & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse" />
                <span className="text-xs uppercase font-medium tracking-wider text-text-dim">
                  Live Intelligence Feed
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                Executive Overview
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-dim bg-surface-1 border border-border-subtle px-3 py-1.5 rounded-lg">
                Billing Cycle: Oct 2026
              </span>
            </div>
          </div>

          {/* Metric Rail: 4-Column Responsive Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Total Net Liquidity"
              amount={MOCK_METRICS.netLiquidity}
              secondaryMetric="Cash & Equivalents"
            />
            <MetricCard
              label="Monthly Inflow"
              amount={MOCK_METRICS.monthlyInflow}
              deltaPercentage={MOCK_METRICS.inflowChangePercentage}
              deltaLabel="MoM"
            />
            <MetricCard
              label="Monthly Outflow"
              amount={MOCK_METRICS.monthlyOutflow}
              deltaPercentage={MOCK_METRICS.outflowChangePercentage}
              deltaLabel="MoM"
              inverseDelta={true}
            />
            <MetricCard
              label="Net Savings Velocity"
              amount={MOCK_METRICS.netSavings}
              deltaPercentage={MOCK_METRICS.savingsRatePercentage}
              deltaLabel="savings rate"
              secondaryMetric={`${MOCK_METRICS.runwayMonths} mo runway`}
            />
          </section>

          {/* Data Visualization Grid: 8-col Area Chart / 4-col Donut Breakdown */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <CashflowChart data={MOCK_CASHFLOW} />
            </div>
            <div className="lg:col-span-4">
              <CategoryDonut categories={MOCK_CATEGORIES} />
            </div>
          </section>

          {/* Lower Grid: 7-col Recent Transactions / 5-col Automated Signals */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <RecentTransactions transactions={MOCK_TRANSACTIONS} />
            </div>
            <div className="lg:col-span-5">
              <InsightCard insights={MOCK_INSIGHTS} />
            </div>
          </section>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
