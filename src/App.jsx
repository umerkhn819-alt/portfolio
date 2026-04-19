import { lazy, Suspense } from "react";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageLoader } from "./components/ui/PageLoader";
import { ThemeTestBox } from "./components/debug/ThemeTestBox";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home }))
);

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
        <Footer />
        <ThemeTestBox />
      </div>
    </ThemeProvider>
  );
}
