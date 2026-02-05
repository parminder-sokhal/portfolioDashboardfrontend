export type Holding = {
  stock: string;
  purchasePrice: number;
  qty: number;
  exchange: string;
  sector: string;
  cmp?: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioPercent: string;
  peRatio?: number | null;
  latestEarnings?: string | null;
};

export type SectorSummary = {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
};

export type PortfolioResponse = {
  holdings: Holding[];
  sectors: SectorSummary[];
  totals: {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
  };
  lastUpdated: string;
};
