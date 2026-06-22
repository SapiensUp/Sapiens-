"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { operationsData } from "@/lib/hotelData";
import KpiCard from "../KpiCard";
import { Users, Zap, Wrench, TrendingDown, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TS = { background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12, color: "#f0f4f8" };
const DEPT_COLORS = ["#c9a84c", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#6b7280"];

const MAINTENANCE = [
  { id: "M-2025-089", area: "Suite 301 – Climatización", priority: "Alta", status: "En progreso", assigned: "M. García" },
  { id: "M-2025-090", area: "Piscina – Bomba #2", priority: "Media", status: "Pendiente", assigned: "J. López" },
  { id: "M-2025-091", area: "Ascensor B – Revisión anual", priority: "Baja", status: "Programado", assigned: "Servicio ext." },
];

const ENERGY_DATA = [
  { month: "Jun", cost: 31200 }, { month: "Jul", cost: 34800 }, { month: "Ago", cost: 35200 },
  { month: "Sep", cost: 30100 }, { month: "Oct", cost: 29400 }, { month: "Nov", cost: 28900 }, { month: "Dic", cost: 28400 },
];

export default function OperationsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Plantilla Total" value="128" subtitle="Empleados activos" icon={<Users size={15} />} accentColor="#3b82f6" />
        <KpiCard title="Coste Energía" value="€28,400" change={-3.2} subtitle="Ahorro vs nov." icon={<Zap size={15} />} accentColor="#f59e0b" />
        <KpiCard title="Incidencias Abiertas" value="3" subtitle="2 en progreso" icon={<Wrench size={15} />} accentColor="#ef4444" />
        <KpiCard title="Coste Laboral" value="28.4%" change={-0.8} target="<30%" subtitle="% sobre ingresos" icon={<TrendingDown size={15} />} accentColor="#10b981" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Plantilla por Departamento</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Distribución de los 128 empleados</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={operationsData.staff.byDept} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fill: "#8fa8c4", fontSize: 10 }} axisLine={false} tickLine={false} width={105} />
              <Tooltip contentStyle={TS} formatter={(v) => [v, "Empleados"]} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {operationsData.staff.byDept.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            {[{ label: "Ratio Hab/Empleado", value: "0.31", color: "#c9a84c" }, { label: "Revenue/EMP", value: "€3,028", color: "#10b981" }, { label: "Horas extras", value: "142h", color: "#f59e0b" }, { label: "Formación OK", value: "87%", color: "#3b82f6" }].map((m) => (
              <div key={m.label} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div style={{ color: "#5a7a9a" }}>{m.label}</div>
                <div className="font-bold mt-0.5" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Coste Energético</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Tendencia últimos 7 meses</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENERGY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#5a7a9a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={TS} formatter={(v) => [`€${Number(v).toLocaleString("es-ES")}`, "Coste"]} />
              <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                {ENERGY_DATA.map((_, i) => <Cell key={i} fill={i === ENERGY_DATA.length - 1 ? "#10b981" : "rgba(201,168,76,0.4)"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 rounded-xl flex items-center gap-3 text-xs" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <TrendingDown size={16} style={{ color: "#10b981", flexShrink: 0 }} />
            <span style={{ color: "#8fa8c4" }}>Reducción de <strong style={{ color: "#10b981" }}>€6,800</strong> vs agosto. Climatización inteligente instalada en octubre.</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ color: "#f0f4f8" }}>Incidencias de Mantenimiento</h3>
            <p className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>Solicitudes abiertas y en curso</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>3 Abiertas</span>
            <span className="px-2 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>2 En curso</span>
            <span className="px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>18 Cerradas</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {MAINTENANCE.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                {t.status === "En progreso" ? <Clock size={16} style={{ color: "#f59e0b", flexShrink: 0 }} /> :
                 t.status === "Pendiente" ? <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0 }} /> :
                 <CheckCircle size={16} style={{ color: "#3b82f6", flexShrink: 0 }} />}
                <div>
                  <div style={{ color: "#f0f4f8" }}>{t.area}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>{t.id} · {t.assigned}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-xs"
                  style={{ background: t.priority === "Alta" ? "rgba(239,68,68,0.15)" : t.priority === "Media" ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.15)",
                           color: t.priority === "Alta" ? "#ef4444" : t.priority === "Media" ? "#f59e0b" : "#3b82f6" }}>{t.priority}</span>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.05)", color: "#8fa8c4" }}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[{ label: "T. Medio Resolución", value: "4.2h", color: "#c9a84c" }, { label: "Satisfacción Mant.", value: "4.4/5", color: "#10b981" }, { label: "Preventivo/Correctivo", value: "68%/32%", color: "#3b82f6" }, { label: "Coste Mantenimiento", value: "€8,240", color: "#8b5cf6" }].map((m) => (
            <div key={m.label} className="p-3 rounded-xl text-xs text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color: "#5a7a9a" }}>{m.label}</div>
              <div className="font-bold text-sm mt-1" style={{ color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
