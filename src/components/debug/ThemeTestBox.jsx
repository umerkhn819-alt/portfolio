import { useTheme } from "../../hooks/useTheme";

export function ThemeTestBox() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: "1rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontFamily: "monospace",
        zIndex: 50,
        backgroundColor: theme === "dark" ? "#09090b" : "#f9fafb",
        color: theme === "dark" ? "#ffffff" : "#111827",
        border: `2px solid ${theme === "dark" ? "#8A8A86" : "#525252"}`,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        Theme: {theme.toUpperCase()}
      </div>
      <div style={{ fontSize: "0.75rem" }}>
        {theme === "dark" ? "Dark Mode ✓" : "Light Mode ✓"}
      </div>
    </div>
  );
}
