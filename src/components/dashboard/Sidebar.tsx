"use client";
import { ViewType } from "./Dashboard";
import {
  LayoutDashboard, TrendingUp, BedDouble, Users, Settings,
  FileSpreadsheet, MessageSquareText, ChevronLeft, ChevronRight, Star,
} from "lucide-react";

const NAV_ITEMS: { id: ViewType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "overview", label: "Visión General", icon: LayoutDashboard },
  { id: "revenue", label: "Ingresos & RevPAR", icon: TrendingUp },
  { id: "occupancy", label: "Ocupación", icon: BedDouble },
  { id: "guests", label: "Huéspedes & CRM", icon: Users },
  { id: "operations", label: "Operaciones", icon: Settings },
  { id: "excel", label: "Analizador Excel", icon: FileSpreadsheet },
  { id: "chat", label: "Asistente IA", icon: MessageSquareText },
];

interface SidebarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeView, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-full transition-all duration-300 relative"
      style={{
        width: collapsed ? 70 : 240,
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)",
        borderRight: "1px solid rgba(201,168,76,0.15)",
        flexShrink: 0,
      }}
    >
      <div className="flex items-center gap-3 p-4 py-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ width: 42, height: 42, background: "linear-gradient(135deg, #c9a84c, #a88a35)" }}
        >
          <Star size={22} className="text-white" fill="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: "#c9a84c", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>ANDORRA PARK HOTEL</div>
            <div style={{ color: "#5a7a9a", fontSize: 10 }}>CEO Executive Dashboard</div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`sidebar-item flex items-center gap-3 px-3 py-2.5 w-full text-left ${activeView === id ? "active" : ""}`}
            style={{ color: activeView === id ? "#e0c068" : "#8fa8c4" }}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && (
              <span style={{ fontSize: 13.5, fontWeight: activeView === id ? 600 : 400 }}>{label}</span>
            )}
            {!collapsed && id === "chat" && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", fontSize: 10 }}>
                IA
              </span>
            )}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="text-xs" style={{ color: "#5a7a9a" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="live-dot w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
              <span>Datos en tiempo real</span>
            </div>
            <div>Diciembre 2025</div>
          </div>
        </div>
      )}

      <button
        onClick={onToggle}
        className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
        style={{ width: 24, height: 24, background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c" }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
