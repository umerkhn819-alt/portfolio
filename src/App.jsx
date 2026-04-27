import { lazy, Suspense, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageLoader } from "./components/ui/PageLoader";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Preloader } from "./components/ui/Preloader";
import { BackgroundScene } from "./components/3d/BackgroundScene";
import { CinematicCursor } from "./components/cinematic/CinematicCursor";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home }))
);

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsPreloading(false)} />
      <BackgroundScene />
      {/* Custom cursor — auto-disables on mobile */}
      <CinematicCursor />

      {!isPreloading && (
        <SmoothScroll>
          <div className="min-h-dvh w-full overflow-x-hidden flex flex-col transition-colors duration-300">
            <Navbar />
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
