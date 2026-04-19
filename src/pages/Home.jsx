import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { AssistantSection } from "../components/sections/AssistantSection";
import { TerminalSection } from "../components/sections/TerminalSection";
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
    <main ref={mainRef}>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <AssistantSection />
      <TerminalSection />
      <Contact />
    </main>
  );
}
