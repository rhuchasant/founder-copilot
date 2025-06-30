"use client";

import { useState } from "react";

export default function Forecastor() {
  const [file, setFile] = useState<File | null>(null);
  const [graphUrl, setGraphUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setGraphUrl("");
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError("");
    setGraphUrl("");

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64File = (reader.result as string).split(",")[1];

        const response = await fetch("https://go3twfspu7.execute-api.us-east-1.amazonaws.com/forecastor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64File,
            filename: file.name,
          }),
        });

        const res = await response.json();
        const body = typeof res.body === "string" ? JSON.parse(res.body) : res;

        if (body.graph_url) {
          setGraphUrl(body.graph_url);
        } else {
          setError("Something went wrong. Try another file?");
        }
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Startup Forecast Generator</h1>
      <p style={styles.description}>
        Upload your startup's financial sheet (.csv or .xlsx) to get a visual forecast of your revenue,
        burn rate, profit, and cash runway. Perfect for investor decks and internal planning.
      </p>

      <div style={styles.uploadSection}>
        <label htmlFor="fileInput" style={styles.fileButton}>
          📁 Choose Forecast File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileChange}
          style={styles.hiddenInput}
        />
        <button onClick={handleUpload} disabled={loading || !file} style={styles.button}>
          {loading ? "Generating..." : "Generate Forecast Chart"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {graphUrl && (
        <div style={styles.result}>
          <h2 style={styles.subheading}>📈 Forecast Result</h2>
          <img src={graphUrl} alt="Forecast Chart" style={styles.image} />
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Garamond, serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "1.1rem",
    color: "white",
    marginBottom: "2rem",
    lineHeight: "1.6",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  fileButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "0.6rem 1.4rem",
    fontSize: "1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  hiddenInput: {
    display: "none",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.6rem 1.4rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
  result: {
    marginTop: "2.5rem",
  },
  subheading: {
    fontSize: "1.6rem",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    maxWidth: "1200px",
    maxHeight: "700px",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.15)",
  },
};
