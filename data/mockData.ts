import {
  MetricSummary,
  CashflowPoint,
  SpendingCategory,
  Transaction,
  BudgetEnvelope,
  FinancialGoal,
  FinancialInsight,
} from "@/types/finance";

export const MOCK_METRICS: MetricSummary = {
  netLiquidity: 48920.50,
  monthlyInflow: 12450.00,
  monthlyOutflow: 7210.40,
  netSavings: 5239.60,
  savingsRatePercentage: 42.1,
  runwayMonths: 6.8,
  inflowChangePercentage: 8.4,
  outflowChangePercentage: -3.2,
};

export const MOCK_CASHFLOW: CashflowPoint[] = [
  { month: "May", inflow: 10200, outflow: 6800, net: 3400 },
  { month: "Jun", inflow: 11400, outflow: 7100, net: 4300 },
  { month: "Jul", inflow: 10800, outflow: 7900, net: 2900 },
  { month: "Aug", inflow: 13100, outflow: 7400, net: 5700 },
  { month: "Sep", inflow: 11800, outflow: 7550, net: 4250 },
  { month: "Oct", inflow: 12450, outflow: 7210, net: 5240 },
];

export const MOCK_CATEGORIES: SpendingCategory[] = [
  { category: "Cloud & Infrastructure", amount: 2450, percentage: 34, color: "#10B981" },
  { category: "Workspace & Housing", amount: 1800, percentage: 25, color: "#3B82F6" },
  { category: "Operations & Tools", amount: 1420, percentage: 20, color: "#8B5CF6" },
  { category: "Food & Dining", amount: 940, percentage: 13, color: "#F59E0B" },
  { category: "Investments", amount: 600, percentage: 8, color: "#EC4899" },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-101",
    date: "2026-10-05",
    merchant: {
      name: "Stripe Payouts",
      category: "Client Retainers",
      subtext: "Acme Corp Monthly Retainer",
    },
    category: "Client Retainers",
    amount: 6500.00,
    type: "income",
    status: "cleared",
    paymentMethod: "Direct ACH",
  },
  {
    id: "tx-102",
    date: "2026-10-04",
    merchant: {
      name: "Amazon Web Services",
      category: "Cloud & Infrastructure",
      subtext: "Production Compute & DB",
    },
    category: "Cloud & Infrastructure",
    amount: 842.15,
    type: "expense",
    status: "cleared",
    paymentMethod: "Corporate Visa 4092",
  },
  {
    id: "tx-103",
    date: "2026-10-03",
    merchant: {
      name: "Linear Orbit Inc.",
      category: "Operations & Tools",
      subtext: "Enterprise Workspace Seats",
    },
    category: "Operations & Tools",
    amount: 240.00,
    type: "expense",
    status: "reconciled",
    paymentMethod: "Corporate Visa 4092",
  },
  {
    id: "tx-104",
    date: "2026-10-02",
    merchant: {
      name: "Github Copilot & Org",
      category: "Operations & Tools",
      subtext: "Developer Suite Billing",
    },
    category: "Operations & Tools",
    amount: 84.00,
    type: "expense",
    status: "cleared",
    paymentMethod: "Virtual Card 8812",
  },
  {
    id: "tx-105",
    date: "2026-10-01",
    merchant: {
      name: "Vercel Inc.",
      category: "Cloud & Infrastructure",
      subtext: "Enterprise Edge Bandwidth",
    },
    category: "Cloud & Infrastructure",
    amount: 150.00,
    type: "expense",
    status: "pending",
    paymentMethod: "Corporate Visa 4092",
  },
];

export const MOCK_BUDGETS: BudgetEnvelope[] = [
  { id: "b-1", category: "Cloud & Infrastructure", allocated: 3000, spent: 2450, alertThreshold: 0.8 },
  { id: "b-2", category: "Operations & Tools", allocated: 1500, spent: 1420, alertThreshold: 0.85 },
  { id: "b-3", category: "Food & Dining", allocated: 1000, spent: 940, alertThreshold: 0.8 },
  { id: "b-4", category: "Workspace & Housing", allocated: 2000, spent: 1800, alertThreshold: 0.9 },
];

export const MOCK_GOALS: FinancialGoal[] = [
  {
    id: "g-1",
    title: "Operating Reserve (6 Months)",
    targetAmount: 50000,
    currentAmount: 38500,
    targetDate: "Dec 2026",
    category: "Security",
  },
  {
    id: "g-2",
    title: "Design Studio Hardware Upgrade",
    targetAmount: 6500,
    currentAmount: 4800,
    targetDate: "Nov 2026",
    category: "Equipment",
  },
];

export const MOCK_INSIGHTS: FinancialInsight[] = [
  {
    id: "ins-1",
    type: "positive",
    title: "Net Savings Velocity Surpassed 40%",
    description: "Your monthly savings rate reached 42.1%, beating the 35% benchmark set for Q4.",
    metricImpact: "+$1,240 vs avg",
    actionLabel: "View Allocation",
  },
  {
    id: "ins-2",
    type: "warning",
    title: "Operations Envelope Approaching Ceiling",
    description: "94.6% of your Operations budget has been consumed with 25 days remaining.",
    metricImpact: "$80 remaining",
    actionLabel: "Review Subscriptions",
  },
  {
    id: "ins-3",
    type: "advisory",
    title: "Runway Extended to 6.8 Months",
    description: "Stable inflow and reduced non-essential outflow expanded total liquidity runway.",
    metricImpact: "+0.6 months",
    actionLabel: "Run Forecast",
  },
];
