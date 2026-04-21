import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
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
    <main ref={mainRef}>
      <Hero />
      <Innovations />
      <Skills />
      <WorksIndex />
      <AssistantSection />

      <Contact />
    </main>
  );
}
