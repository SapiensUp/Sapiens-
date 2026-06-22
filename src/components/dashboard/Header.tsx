"use client";
import { ViewType } from "./Dashboard";
import { Bell, MessageSquareText, TrendingUp } from "lucide-react";

const VIEW_TITLES: Record<ViewType, { title: string; subtitle: string }> = {
  overview: { title: "Visión General", subtitle: "Panel ejecutivo completo" },
  revenue: { title: "Ingresos & Revenue Management", subtitle: "ADR, RevPAR, TRevPAR y mix de canales" },
  occupancy: { title: "Ocupación & Disponibilidad", subtitle: "Análisis de ocupación y previsiones" },
  guests: { title: "Huéspedes & CRM", subtitle: "Satisfacción, fidelización y perfil de cliente" },
  operations: { title: "Operaciones & Back Office", subtitle: "RRHH, mantenimiento y eficiencia operativa" },
  excel: { title: "Analizador de Excel", subtitle: "Importa y analiza tus hojas de cálculo" },
  chat: { title: "Asistente IA", subtitle: "Tu consultor de hotel de lujo disponible 24/7" },
};

interface HeaderProps { activeView: ViewType; onOpenChat: () => void; }

export default function Header({ activeView, onOpenChat }: HeaderProps) {
  const { title, subtitle } = VIEW_TITLES[activeView];
  const dateStr = new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header className="flex items-center justify-between px-6 py-4 flex-shrink-0"
      style={{ background: "rgba(10,22,40,0.95)", borderBottom: "1px solid rgba(201,168,76,0.15)", backdropFilter: "blur(10px)" }}>
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#f0f4f8" }}>{title}</h1>
        <p className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}>
            <TrendingUp size={12} />
            RevPAR €301.9 <span className="opacity-70">+8.7%</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c" }}>
            Ocup. 78.4%
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c" }}>
            ADR €385
          </div>
        </div>
        <div className="hidden md:block text-xs" style={{ color: "#8fa8c4" }}>{dateStr}</div>
        <button className="relative flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c" }}>
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white"
            style={{ width: 16, height: 16, background: "#ef4444", fontSize: 9, fontWeight: 700 }}>3</span>
        </button>
        {activeView !== "chat" && (
          <button onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))", border: "1px solid rgba(201,168,76,0.4)", color: "#e0c068" }}>
            <MessageSquareText size={15} />
            <span className="hidden sm:inline">Asistente IA</span>
          </button>
        )}
        <div className="flex items-center justify-center rounded-full text-xs font-bold"
          style={{ width: 38, height: 38, background: "linear-gradient(135deg, #c9a84c, #a88a35)", color: "#0a1628", flexShrink: 0 }}>
          CEO
        </div>
      </div>
    </header>
  );
}
