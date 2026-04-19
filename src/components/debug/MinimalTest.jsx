import { useTheme } from "../../hooks/useTheme";

export function MinimalTest() {
  const { theme } = useTheme();

  return (
    <div
      id="minimal-theme-test"
      className="fixed inset-0 bg-red-50 dark:bg-red-950 flex items-center justify-center text-2xl text-center p-8"
    >
      <div className="text-red-900 dark:text-red-100">
        <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Theme: {theme.toUpperCase()}
        </div>
        <div style={{ fontSize: "1rem" }}>
          Light Red = Light Mode ✓
        </div>
        <div style={{ fontSize: "1rem" }}>
          Dark Red = Dark Mode ✓
        </div>
      </div>
    </div>
  );
}

