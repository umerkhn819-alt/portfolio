import { lazy, Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageLoader } from "./components/ui/PageLoader";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Preloader } from "./components/ui/Preloader";
import { BackgroundScene } from "./components/3d/BackgroundScene";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home }))
);

export default function App() {
  return (
    <>
      <Preloader />
      <BackgroundScene />
      <SmoothScroll>
        <div className="min-h-dvh flex flex-col transition-colors duration-300">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
