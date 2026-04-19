import { useEffect, useMemo, useRef, useState } from "react";
import { getAssistantReply } from "../../../ai/chatService";
import { assistantUi } from "../../../data/assistant";

function createMessage(role, content) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
  };
}

export function ChatAssistant() {
  const [messages, setMessages] = useState(() => [
    createMessage(
      "assistant",
      "Hi, I am your portfolio assistant. Ask me about skills, projects, or contact."
    ),
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const viewportRef = useRef(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading]
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const nextUser = createMessage("user", question);
    const history = [...messages, nextUser];

    setMessages(history);
    setInput("");
    setLoading(true);

    const answer = await getAssistantReply(question, history);
    setMessages((prev) => [...prev, createMessage("assistant", answer)]);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-gray-300 dark:border-border-subtle bg-gray-50 dark:bg-surface-overlay/60 p-4 sm:p-6 transition-colors duration-300">
      <div
        ref={viewportRef}
        className="mb-4 h-80 overflow-y-auto rounded-xl border border-gray-300 dark:border-border-subtle bg-white dark:bg-surface-raised/80 p-3 sm:p-4 transition-colors duration-300"
      >
        <div className="space-y-3">
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))}
          {loading ? (
            <div className="inline-flex rounded-2xl rounded-bl-sm bg-gray-200 dark:bg-surface px-3 py-2 text-sm text-gray-600 dark:text-zinc-400">
              {assistantUi.thinkingLabel}
            </div>
          ) : null}
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={assistantUi.placeholder}
          className="flex-1 rounded-xl border border-gray-300 dark:border-border bg-white dark:bg-surface px-4 py-2.5 text-sm text-gray-900 dark:text-zinc-100 outline-none transition focus:border-indigo-400 dark:focus:border-accent/60 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {assistantUi.sendLabel}
        </button>
      </form>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-accent/90 text-white"
            : "rounded-bl-sm bg-surface text-zinc-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
