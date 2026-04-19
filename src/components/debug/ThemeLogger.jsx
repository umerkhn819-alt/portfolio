import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export function ThemeLogger() {
  const { theme } = useTheme();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Intercept console.log to display it on screen
    const originalLog = console.log;
    console.log = function (...args) {
      originalLog.apply(console, args);
      setLogs((prev) => {
        const newLogs = [...prev, args.map(arg => String(arg)).join(' ')];
        return newLogs.slice(-15); // Keep last 15 logs
      });
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "50vh",
          backgroundColor: "rgba(0,0,0,0.95)",
          color: "#00ff00",
          fontFamily: "monospace",
          fontSize: "11px",
          padding: "10px",
          overflowY: "auto",
          borderTop: "2px solid #00ff00",
          zIndex: 10000,
          pointerEvents: "auto",
        }}
      >
        <div style={{ marginBottom: "5px", fontWeight: "bold", color: "#ffff00" }}>
          CONSOLE OUTPUT - Current Theme: {theme}
        </div>
        <div style={{ marginBottom: "10px", color: "#ff00ff" }}>
          HTML has 'dark' class: {document.documentElement.classList.contains("dark") ? "YES ✓" : "NO ✗"}
        </div>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}
