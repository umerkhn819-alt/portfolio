import { createContext, useContext, useState, useCallback, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * CinematicContext — provides global scroll-cinema state to all children.
 * Tracks current scene, total scenes, scroll progress, and device type.
 */
const CinematicCtx = createContext({
  currentScene: 0,
  totalScenes: 0,
  scrollProgress: 0,
  isMobile: false,
  sceneLabels: [],
  setCurrentScene: () => {},
  setScrollProgress: () => {},
  registerScene: () => {},
});

export function useCinematic() {
  return useContext(CinematicCtx);
}

export function CinematicProvider({ children }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [sceneLabels, setSceneLabels] = useState([]);

  // Detect mobile on mount and resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Force ScrollTrigger refresh when layout switches between mobile/desktop
  useEffect(() => {
    // Delay refresh slightly to allow all CinematicScenes to tear down pins and re-render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Register a scene label (called by each CinematicScene on mount)
  const registerScene = useCallback((index, label) => {
    setSceneLabels((prev) => {
      const next = [...prev];
      next[index] = label;
      return next;
    });
  }, []);

  return (
    <CinematicCtx.Provider
      value={{
        currentScene,
        totalScenes: sceneLabels.length,
        scrollProgress,
        isMobile,
        sceneLabels,
        setCurrentScene,
        setScrollProgress,
        registerScene,
      }}
    >
      {children}
    </CinematicCtx.Provider>
  );
}
