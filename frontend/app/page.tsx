"use client";
import { useState } from "react";

export default function Home() {
  const [revenue, setRevenue] = useState("");
  const [market, setMarket] = useState("");
  const [growth, setGrowth] = useState("");
  const [valuation, setValuation] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSummary("");

    const response = await fetch("https://go3twfspu7.execute-api.us-east-1.amazonaws.com/orchestrate-valuation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        revenue: parseFloat(revenue),
        market,
        growth,
      }),
    });

    const data = await response.json();
    setValuation(data.valuation || "No response received.");
  };

  const handleSummarize = async () => {
    const response = await fetch("https://go3twfspu7.execute-api.us-east-1.amazonaws.com/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valuation_response: valuation }),
    });

    const data = await response.json();
    setSummary(data.summary || "No summary generated.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📊 Startup Valuation Copilot</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Monthly Revenue (USD)"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            type="number"
          />
          <input
            style={styles.input}
            placeholder="Market Type (e.g. AI SaaS)"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Growth Rate (e.g. 20% MoM)"
            value={growth}
            onChange={(e) => setGrowth(e.target.value)}
          />
          <button type="submit" style={styles.button}>Estimate Valuation</button>
        </form>

        {valuation && (
          <div style={styles.resultBox}>
            <strong style={{ fontSize: "1.1rem" }}>💡 Estimated Valuation:</strong>
            <pre style={styles.valuationText}>{valuation}</pre>

            <button onClick={handleSummarize} style={styles.summarizeButton}>
              📝 Summarize
            </button>

            {summary && (
  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #334155" }}>
    <strong>🔍 Summary:</strong>
    <ul style={styles.summaryList}>
      {summary
        .split("\n")
        .filter((line) => line.trim().startsWith("•") || line.trim().startsWith("-"))
        .map((point, idx) => (
          <li key={idx}>{point.replace(/^[-•]\s*/, "")}</li>
        ))}
    </ul>
  </div>
)}

          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#0f172a",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 1rem",
    boxSizing: "border-box" as const,
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    fontWeight: "bold" as const,
    textAlign: "center" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.8rem",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "bold" as const,
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  summarizeButton: {
    marginTop: "1rem",
    backgroundColor: "#22c55e",
    color: "white",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.95rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold" as const,
  },
  summaryList: {
  marginTop: "0.75rem",
  paddingLeft: "1.25rem",
  listStyleType: "disc" as const,
  lineHeight: "1.6",
  color: "#e2e8f0", // soft white
},

  resultBox: {
    backgroundColor: "#0f172a",
    padding: "1.25rem",
    borderRadius: "10px",
    marginTop: "2rem",
    border: "1px solid #334155",
    lineHeight: 1.6,
  },
  valuationText: {
    whiteSpace: "pre-wrap" as const,
    marginTop: "1rem",
    fontSize: "1rem",
  },
};