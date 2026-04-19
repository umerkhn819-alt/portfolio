import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export function ThemeTest() {
  const { theme } = useTheme();
  const [htmlClasses, setHtmlClasses] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    setHtmlClasses(root.className);

    // Log computed styles
    const mainDiv = document.querySelector("[class*='min-h-dvh']");
    if (mainDiv) {
      const computed = window.getComputedStyle(mainDiv);
      console.log("🎯 Main div computed background:", computed.backgroundColor);
      console.log("🎯 Main div computed color:", computed.color);
    }
  }, [theme]);

  return (
    <>
      {/* Test with inline styles */}
      <div
        style={{
          position: "fixed",
          bottom: 90,
          right: 4,
          backgroundColor: theme === "dark" ? "#09090b" : "#f9fafb",
          color: theme === "dark" ? "#ffffff" : "#111827",
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
          fontFamily: "monospace",
          border: `1px solid ${theme === "dark" ? "#3f3f46" : "#e5e7eb"}`,
          zIndex: 998,
          maxWidth: "300px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
          ✅ Theme Test (Inline Styles)
        </div>
        <div>Current Theme: {theme}</div>
        <div>HTML Classes: {htmlClasses || "none"}</div>
        <div
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem",
            backgroundColor: theme === "dark" ? "#18181a" : "#f3f4f6",
            borderRadius: "0.25rem",
          }}
        >
          <div style={{ fontSize: "0.7rem" }}>
            If this box changes color when you click the theme button, the
            theme system is working!
          </div>
        </div>
      </div>

      {/* Test with CSS classes */}
      <div
        className="test-theme"
        style={{
          position: "fixed",
          bottom: 180,
          right: 4,
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
          fontFamily: "monospace",
          zIndex: 998,
          maxWidth: "300px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          🧪 CSS Selector Test
        </div>
        <div>
          If this box changes color when you click the theme button, the .dark
          selector CSS rule is working!
        </div>
      </div>
    </>
  );
}

