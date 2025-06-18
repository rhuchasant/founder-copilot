"use client";

import { useState } from "react";

export default function Home() {
  const [revenue, setRevenue] = useState("");
  const [market, setMarket] = useState("AI SaaS");
  const [growth, setGrowth] = useState("20% MoM");
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    setResponse("Loading...");

    try {
      const res = await fetch("https://go3twfspu7.execute-api.us-east-1.amazonaws.com/valuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          revenue: Number(revenue),
          market,
          growth,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data); // helpful for debugging

      if (data?.valuation) {
        setResponse(data.valuation);
      } else {
        setResponse("No valuation received.");
      }
    } catch (err) {
      console.error(err);
      setResponse("Error fetching valuation.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">💼 Startup Valuation Copilot</h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Monthly Revenue ($)"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          />

          <input
            type="text"
            placeholder="Market (e.g., AI SaaS)"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          />

          <input
            type="text"
            placeholder="Growth (e.g., 20% MoM)"
            value={growth}
            onChange={(e) => setGrowth(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Estimate Valuation
          </button>
        </div>

        {response && (
          <div className="mt-6 bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold">💡 Estimated Valuation:</h2>
            <p className="mt-2 whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}
