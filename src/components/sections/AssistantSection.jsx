// Entrance animations completely removed to fix visibility issues
import { assistantSection } from "../../data/assistant";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ChatAssistant } from "../features/chat/ChatAssistant";

export function AssistantSection() {

  return (
    <section id="assistant" className="relative overflow-hidden bg-transparent py-16 sm:py-20 md:py-24 transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/6 dark:bg-accent/6 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div>
          <SectionHeading
            eyebrow={assistantSection.eyebrow}
            title={assistantSection.title}
            subtitle={assistantSection.subtitle}
          />
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <ChatAssistant />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
