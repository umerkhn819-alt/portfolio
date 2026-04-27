import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { assistantSection } from "../../data/assistant";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ChatAssistant } from "../features/chat/ChatAssistant";

gsap.registerPlugin(ScrollTrigger);

/**
 * AssistantSection — AI Chat with cinematic scroll-driven entry.
 * Desktop: slide-up + scale entry with staggered elements.
 * Mobile: simple static render (no GSAP for visibility safety).
 */
export function AssistantSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // ── Heading: clip-path reveal ──
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Chat container: scale up + fade ──
      if (chatRef.current) {
        gsap.fromTo(
          chatRef.current,
          { y: 80, opacity: 0, scale: 0.92, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Background pulse synced to scroll ──
      gsap.to(".assistant-bg-pulse", {
        scale: 1.3,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="assistant-inner"
      className="relative overflow-hidden bg-transparent py-16 sm:py-20 md:py-24 transition-colors duration-300"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="assistant-bg-pulse absolute -top-40 -right-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl opacity-40" />
        <div className="assistant-bg-pulse absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow={assistantSection.eyebrow}
            title={assistantSection.title}
            subtitle={assistantSection.subtitle}
          />
        </div>
        <div ref={chatRef} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10">
            <ChatAssistant />
          </div>
        </div>
      </Container>
    </section>
  );
}
