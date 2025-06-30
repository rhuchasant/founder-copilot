"use client";
import { useState } from "react";

export default function GenerateDeckPage() {
  const [formData, setFormData] = useState({
    startup_name: "",
    problem: "",
    solution: "",
    market: "",
    traction: "",
    team: "",
    ask: "",
    deck_type: "Investor Pitch",
    output_format: "Slides"
  });

  const [deck, setDeck] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://go3twfspu7.execute-api.us-east-1.amazonaws.com/generate-deck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setDeck(result.deck || "No pitch generated.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🧠 Generate Pitch Deck</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="startup_name" onChange={handleChange} placeholder="Startup Name" style={styles.input} />
          <textarea name="problem" onChange={handleChange} placeholder="Problem" style={styles.textarea} />
          <textarea name="solution" onChange={handleChange} placeholder="Solution" style={styles.textarea} />
          <input name="market" onChange={handleChange} placeholder="Market Size" style={styles.input} />
          <input name="traction" onChange={handleChange} placeholder="Traction (Clients, Revenue, etc.)" style={styles.input} />
          <input name="team" onChange={handleChange} placeholder="Team Background" style={styles.input} />
          <input name="ask" onChange={handleChange} placeholder="Funding Ask" style={styles.input} />

          <label style={styles.label}>Deck Type:</label>
          <select name="deck_type" onChange={handleChange} style={styles.select}>
            <option>Investor Pitch</option>
            <option>Elevator Pitch</option>
            <option>Stakeholder Meeting</option>
            <option>Founding Team Intro</option>
          </select>

          <label style={styles.label}>Output Format:</label>
          <select name="output_format" onChange={handleChange} style={styles.select}>
            <option>Slides</option>
            <option>Bullet Points</option>
            <option>Paragraph</option>
          </select>

          <button type="submit" style={styles.button}>Generate Deck</button>
        </form>

        {deck && (
          <div style={styles.resultBox}>
            <strong style={{ fontSize: "1.1rem" }}>📋 Generated Output:</strong>
            <pre style={styles.valuationText}>{deck}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
    fontFamily: "Garamond, serif"
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
  textarea: {
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "1rem",
    minHeight: "80px"
  },
  select: {
    padding: "0.7rem",
    borderRadius: "10px",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "1rem",
    border: "1px solid #334155"
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "0.5rem"
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
    fontFamily: "Garamond, serif"
  },
};
