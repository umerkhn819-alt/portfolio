import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { CinematicProvider } from "../components/cinematic/CinematicContext";
import { CinematicScene } from "../components/cinematic/CinematicScene";
import { SceneNavDots } from "../components/cinematic/SceneNavDots";
import { ScrollProgressBar } from "../components/cinematic/ScrollProgressBar";
import { Hero } from "../components/sections/Hero";
import { Innovations } from "../components/sections/Innovations";
import { Skills } from "../components/sections/Skills";
import { WorksIndex } from "../components/sections/WorksIndex";
import { AssistantSection } from "../components/sections/AssistantSection";
import { Contact } from "../components/sections/Contact";

export function Home() {
  const mainRef = useGsapContext((el) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  return (
    <CinematicProvider>
      {/* Global cinematic UI overlays */}
      <ScrollProgressBar />
      <SceneNavDots />

      <main ref={mainRef}>
        {/* ── Scene 1: Hero ── */}
        <CinematicScene
          id="hero"
          label="Home"
          sceneIndex={0}
          transition="none"
          pinDuration="+=110%"
        >
          <Hero />
        </CinematicScene>

        {/* ── Scene 2: Innovations & Experience ── */}
        <CinematicScene
          id="innovations"
          label="Innovations"
          sceneIndex={1}
          transition="slide-up"
          pinDuration="+=80%"
        >
          <Innovations />
        </CinematicScene>

        {/* ── Scene 3: Skills — horizontal scroll (self-managed pin) ── */}
        <CinematicScene
          id="skills"
          label="Skills"
          sceneIndex={2}
          noPin
          transition="fade"
        >
          <Skills />
        </CinematicScene>

        {/* ── Scene 4: Projects — 3D carousel (self-managed pin) ── */}
        <CinematicScene
          id="projects"
          label="Projects"
          sceneIndex={3}
          noPin
          transition="fade"
        >
          <WorksIndex />
        </CinematicScene>

        {/* ── Scene 5: AI Assistant ── */}
        <CinematicScene
          id="assistant"
          label="AI"
          sceneIndex={4}
          transition="slide-up"
          pinDuration="+=60%"
        >
          <AssistantSection />
        </CinematicScene>

        {/* ── Scene 6: Contact ── */}
        <CinematicScene
          id="contact"
          label="Contact"
          sceneIndex={5}
          transition="zoom-in"
          pinDuration="+=60%"
        >
          <Contact />
        </CinematicScene>
      </main>
    </CinematicProvider>
  );
}
