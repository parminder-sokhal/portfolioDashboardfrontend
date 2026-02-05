"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/src/services/portfolioApi";
import { PortfolioResponse } from "@/src/types/portfolio";

export default function Home() {
  const [data, setData] = useState<PortfolioResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    try {
      const res = await fetchPortfolio();
      setData(res);
      setLastUpdated(new Date(res.lastUpdated));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-6">Loading portfolio...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
        <p className="text-sm text-gray-500">
          Last updated: {lastUpdated?.toLocaleTimeString() ?? "—"}
        </p>
        <span className="inline-block mt-2 text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded">
          Auto-refresh every 15s
        </span>
      </div>

      {/* Sector Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {data?.sectors.map((s, i) => (
          <div key={i} className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{s.sector}</h3>

            <p className="text-sm">
              Investment:{" "}
              <span className="font-medium">
                ₹{s.totalInvestment.toLocaleString()}
              </span>
            </p>

            <p className="text-sm">
              Present Value:{" "}
              <span className="font-medium">
                ₹{s.totalPresentValue.toLocaleString()}
              </span>
            </p>

            <p
              className={`text-sm font-semibold ${
                s.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Gain/Loss: ₹{s.totalGainLoss.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Portfolio Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className=" sticky top-0">
            <tr>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-right">Buy Price</th>
              <th className="p-3 text-right">Qty</th>
              <th className="p-3 text-right">Investment</th>
              <th className="p-3 text-right">Portfolio %</th>
              <th className="p-3 text-center">NSE/BSE</th>
              <th className="p-3 text-right">CMP</th>
              <th className="p-3 text-right">Present Value</th>
              <th className="p-3 text-right">Gain / Loss</th>
              <th className="p-3 text-right">P/E</th>
              <th className="p-3 text-right">Earnings</th>
            </tr>
          </thead>

          <tbody>
            {data?.holdings.map((h, i) => (
              <tr key={i} className="border-t hover:bg-black/5">
                <td className="p-3 font-medium">{h.stock}</td>
                <td className="p-3 text-right">₹{h.purchasePrice}</td>
                <td className="p-3 text-right">{h.qty}</td>
                <td className="p-3 text-right">
                  ₹{h.investment.toLocaleString()}
                </td>
                <td className="p-3 text-right">{h.portfolioPercent}%</td>
                <td className="p-3 text-center">{h.exchange}</td>
                <td className="p-3 text-right">
                  {h.cmp ? `₹${h.cmp.toFixed(2)}` : "—"}
                </td>
                <td className="p-3 text-right">
                  ₹{h.presentValue.toLocaleString()}
                </td>
                <td
                  className={`p-3 text-right font-semibold ${
                    h.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{h.gainLoss.toLocaleString()}
                </td>
                <td className="p-3 text-right">{h.peRatio ?? "—"}</td>
                <td className="p-3 text-right">{h.latestEarnings ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
