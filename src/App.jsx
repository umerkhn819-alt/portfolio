import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Footer } from "./components/layout/Footer";
import { AnimatePresence } from "framer-motion";

const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const WorksPage = lazy(() => import("./pages/WorksPage").then((m) => ({ default: m.WorksPage })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const DraftMeshPage = lazy(() => import("./pages/projects/DraftMeshPage").then((m) => ({ default: m.DraftMeshPage })));
const EatslyPage = lazy(() => import("./pages/projects/EatslyPage").then((m) => ({ default: m.EatslyPage })));
const FraudDetectionPage = lazy(() => import("./pages/projects/FraudDetectionPage").then((m) => ({ default: m.FraudDetectionPage })));
const CVPage = lazy(() => import("./pages/CVPage").then((m) => ({ default: m.CVPage })));
import { Chatbot } from "./components/ui/Chatbot";

export default function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full flex flex-col bg-background-dark text-text-primary selection:bg-accent selection:text-black">
        <Navbar />
        <Suspense fallback={<div className="min-h-screen bg-background-dark" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/works" element={<WorksPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/draftmesh" element={<DraftMeshPage />} />
              <Route path="/projects/eatsly" element={<EatslyPage />} />
              <Route path="/projects/fraud-detection" element={<FraudDetectionPage />} />
              <Route path="/cv" element={<CVPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Chatbot />
      </div>
    </SmoothScroll>
  );
}
