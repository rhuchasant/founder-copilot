"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🚀 Startup Copilot</div>
      <div style={styles.links}>
        <Link
          href="/"
          style={{
            ...styles.link,
            borderBottom: pathname === "/" ? "2px solid white" : "none"
          }}
        >
          Valuation
        </Link>

        <Link
          href="/pitch"
          style={{
            ...styles.link,
            borderBottom: pathname === "/pitch" ? "2px solid white" : "none"
          }}
        >
          Pitch Deck
        </Link>

        <Link
          href="/history"
          style={{
            ...styles.link,
            borderBottom: pathname === "/history" ? "2px solid white" : "none"
          }}
        >
          History
        </Link>

        <Link
          href="/forecastor"
          style={{
            ...styles.link,
            borderBottom: pathname === "/forecastor" ? "2px solid white" : "none"
          }}
        >
          Forecastor
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#0f172a",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #334155"
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold" as const,
    color: "white",
    fontFamily: "Garamond"
  },
  links: {
    display: "flex",
    gap: "2rem"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontFamily: "Garamond",
    paddingBottom: "0.25rem"
  }
};
