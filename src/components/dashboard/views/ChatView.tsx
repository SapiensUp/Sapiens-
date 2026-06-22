"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Send, Bot, User, Star, TrendingUp, BedDouble, Users, BarChart2, Lightbulb, RefreshCw } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

const QUICK_QUESTIONS = [
  { icon: <TrendingUp size={14} />, text: "¿Cómo está el RevPAR este mes?" },
  { icon: <BedDouble size={14} />, text: "Analiza la ocupación actual" },
  { icon: <Users size={14} />, text: "¿Qué indica el NPS de 74?" },
  { icon: <BarChart2 size={14} />, text: "Comparativa con la competencia" },
  { icon: <Lightbulb size={14} />, text: "Recomendaciones para diciembre" },
  { icon: <Star size={14} />, text: "¿Qué es TRevPAR y GOPPAR?" },
];

function TypingDots() {
  return <div className="flex items-center gap-1.5 py-1">{[0,1,2].map((i) => <div key={i} className="typing-dot" style={{ animationDelay: `${i*0.2}s` }} />)}</div>;
}

function formatMessage(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h3 key={i} className="text-base font-bold mt-3 mb-1" style={{ color: "#e0c068" }}>{line.slice(3)}</h3>;
    if (line.startsWith("### ")) return <h4 key={i} className="text-sm font-semibold mt-2 mb-1" style={{ color: "#c9a84c" }}>{line.slice(4)}</h4>;
    if (line.startsWith("- ") || line.startsWith("• ")) return (
      <div key={i} className="flex items-start gap-2 my-0.5">
        <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c9a84c" }} />
        <span>{line.slice(2)}</span>
      </div>
    );
    if (line.trim() === "") return <div key={i} className="h-2" />;
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return <p key={i} className="leading-relaxed">{parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: "#e0c068" }}>{part}</strong> : part)}</p>;
  });
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `¡Buenos días! Soy su **Asistente IA del Andorra Park Hotel** 🏨\n\nEstoy aquí para ayudarle a entender y analizar todas las métricas de su hotel de 5 estrellas. Puedo responder sobre:\n\n- **RevPAR, ADR, TRevPAR, GOPPAR** y todos los KPIs hoteleros\n- **Análisis de ocupación** y estrategias de revenue management\n- **Satisfacción de clientes** e interpretación del NPS\n- **Benchmarking** con la competencia en Andorra\n- **Recomendaciones estratégicas** personalizadas\n\n¿En qué puedo ayudarle hoy, CEO?`,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || `HTTP ${res.status}`); }
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ **Error de conexión**\n\n${message}\n\nPara activar el asistente IA, añada su clave en \`.env.local\`:\n\n\`ANTHROPIC_API_KEY=sk-ant-...\`` }]);
    } finally { setLoading(false); inputRef.current?.focus(); }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      <div className="flex items-center justify-between px-5 py-4 rounded-t-2xl flex-shrink-0"
        style={{ background: "rgba(20,34,56,0.9)", border: "1px solid rgba(201,168,76,0.2)", borderBottom: "none" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))", border: "1px solid rgba(201,168,76,0.3)" }}>
            <Bot size={20} style={{ color: "#c9a84c" }} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Asistente IA – Andorra Park Hotel</div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#5a7a9a" }}>
              <div className="live-dot w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              <span>Experto en gestión hotelera · Claude AI</span>
            </div>
          </div>
        </div>
        <button onClick={() => setMessages([{ role: "assistant", content: "Conversación reiniciada. ¿En qué puedo ayudarle, CEO?" }])}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8fa8c4" }}>
          <RefreshCw size={12} /> Nueva conversación
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4"
        style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(201,168,76,0.15)", borderTop: "none", borderBottom: "none" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 34, height: 34, background: msg.role === "user" ? "linear-gradient(135deg, #c9a84c, #a88a35)" : "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(59,130,246,0.1))",
                border: `1px solid ${msg.role === "user" ? "rgba(201,168,76,0.4)" : "rgba(59,130,246,0.3)"}`, alignSelf: "flex-start", marginTop: 2 }}>
              {msg.role === "user" ? <User size={16} style={{ color: "#0a1628" }} /> : <Bot size={16} style={{ color: "#3b82f6" }} />}
            </div>
            <div className="max-w-[85%] px-4 py-3 text-sm leading-relaxed"
              style={{ background: msg.role === "user" ? "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))" : "rgba(20,34,56,0.9)",
                border: `1px solid ${msg.role === "user" ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.08)"}`, color: "#e8eef4",
                borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px" }}>
              {formatMessage(msg.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message flex gap-3">
            <div className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 34, height: 34, background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(59,130,246,0.1))", border: "1px solid rgba(59,130,246,0.3)" }}>
              <Bot size={16} style={{ color: "#3b82f6" }} />
            </div>
            <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(20,34,56,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px 18px 18px 18px" }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 flex gap-2 overflow-x-auto flex-shrink-0"
        style={{ background: "rgba(10,22,40,0.8)", borderLeft: "1px solid rgba(201,168,76,0.15)", borderRight: "1px solid rgba(201,168,76,0.15)" }}>
        {QUICK_QUESTIONS.map((q) => (
          <button key={q.text} onClick={() => sendMessage(q.text)} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", flexShrink: 0 }}>
            {q.icon}{q.text}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-3 p-4 rounded-b-2xl flex-shrink-0"
        style={{ background: "rgba(20,34,56,0.95)", border: "1px solid rgba(201,168,76,0.2)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
          placeholder="Pregunta sobre RevPAR, ocupación, benchmarking, estrategia... (Enter para enviar)"
          rows={1} className="flex-1 resize-none text-sm outline-none bg-transparent leading-relaxed"
          style={{ color: "#f0f4f8", maxHeight: 100, minHeight: 24 }} disabled={loading} />
        <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
          className="flex items-center justify-center rounded-xl transition-all hover:scale-105 disabled:opacity-40 flex-shrink-0"
          style={{ width: 40, height: 40, background: input.trim() && !loading ? "linear-gradient(135deg, #c9a84c, #a88a35)" : "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.3)", color: input.trim() && !loading ? "#0a1628" : "#c9a84c" }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
