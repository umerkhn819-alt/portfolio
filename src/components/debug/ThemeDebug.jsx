import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const { theme } = useTheme();
  const [isDarkClassPresent, setIsDarkClassPresent] = useState(false);
  const [htmlClasses, setHtmlClasses] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    setIsDarkClassPresent(root.classList.contains("dark"));
    setHtmlClasses(root.className);

    const observer = new MutationObserver(() => {
      setIsDarkClassPresent(root.classList.contains("dark"));
      setHtmlClasses(root.className);
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const computedBg = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--color-surface");

  return (
    <div className="fixed bottom-4 right-4 z-[999] max-w-xs">
      <div className="bg-black text-white p-4 rounded-lg text-xs font-mono space-y-1 shadow-lg">
        <div>Theme State: <span className="font-bold">{theme}</span></div>
        <div>Dark Class: <span className="font-bold text-cyan-300">{isDarkClassPresent ? "✓ YES" : "✗ NO"}</span></div>
        <div>HTML Classes: <span className="font-bold text-purple-300 break-words">{htmlClasses || "none"}</span></div>
        <div>CSS Var: <span className="font-bold text-green-300">{computedBg}</span></div>
        <div className="pt-2 border-t border-gray-600">
          <button
            onClick={() => {
              console.clear();
              console.log("🔍 Diagnostic Log:");
              console.log("Theme state:", theme);
              console.log("Dark class present:", isDarkClassPresent);
              console.log("HTML element:", document.documentElement);
              console.log("HTML className:", document.documentElement.className);
              console.log("Body computed bg:", window.getComputedStyle(document.body).backgroundColor);
              console.log("Main div computed bg:", window.getComputedStyle(document.querySelector('[role="main"]') || document.querySelector('main') || document.body.firstElementChild).backgroundColor);
            }}
            className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded w-full"
          >
            Log Details
          </button>
        </div>
      </div>
    </div>
  );
}
