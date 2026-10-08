export type TransactionStatus = "cleared" | "pending" | "reconciled";
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  merchant: {
    name: string;
    category: string;
    subtext: string;
  };
  category: 
    | "Cloud & Infrastructure"
    | "Food & Dining"
    | "Workspace & Housing"
    | "Operations & Tools"
    | "Client Retainers"
    | "Investments";
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod: string;
}

export interface MetricSummary {
  netLiquidity: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  netSavings: number;
  savingsRatePercentage: number;
  runwayMonths: number;
  inflowChangePercentage: number;
  outflowChangePercentage: number;
}

export interface CashflowPoint {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BudgetEnvelope {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  alertThreshold: number; // e.g. 0.8 for 80%
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

export interface FinancialInsight {
  id: string;
  type: "positive" | "warning" | "advisory";
  title: string;
  description: string;
  metricImpact?: string;
  actionLabel?: string;
}
