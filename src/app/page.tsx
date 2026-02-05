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

    const interval = setInterval(() => {
      loadData();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">
        Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "—"}
      </p>

      <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
        Auto-refresh every 15s
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data?.sectors.map((s, i) => (
          <div key={i} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-semibold text-lg mb-2">{s.sector}</h3>

            <p>
              Investment:{" "}
              <span className="font-medium">
                ₹{s.totalInvestment.toLocaleString()}
              </span>
            </p>

            <p>
              Present Value:{" "}
              <span className="font-medium">
                ₹{s.totalPresentValue.toLocaleString()}
              </span>
            </p>

            <p
              className={`font-semibold ${
                s.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Gain/Loss: ₹{s.totalGainLoss.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">CMP</th>
            <th className="p-2 border">Investment</th>
            <th className="p-2 border">Present Value</th>
            <th className="p-2 border">Gain / Loss</th>
            <th className="p-2 border">Portfolio %</th>
          </tr>
        </thead>

        <tbody>
          {data?.holdings.map((h, i) => (
            <tr key={i} className="border-t text-center">
              <td className="p-2 border font-medium">{h.stock}</td>
              <td className="p-2 border">{h.qty}</td>

              <td className="p-2 border">
                {h.cmp ? `₹${h.cmp.toFixed(2)}` : "—"}
              </td>

              <td className="p-2 border">₹{h.investment.toLocaleString()}</td>

              <td className="p-2 border">₹{h.presentValue.toLocaleString()}</td>

              <td
                className={`p-2 border font-semibold ${
                  h.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{h.gainLoss.toLocaleString()}
              </td>

              <td className="p-2 border">{h.portfolioPercent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
