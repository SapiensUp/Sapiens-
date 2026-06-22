"use client";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, BedDouble, Users, Star, Euro, Activity, ArrowUpRight, Trophy, AlertCircle } from "lucide-react";
import KpiCard from "../KpiCard";
import { revenueMonthly, channelMix, competitorData } from "@/lib/hotelData";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-xs" style={{ minWidth: 140 }}>
      <p className="font-semibold mb-2" style={{ color: "#c9a84c" }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-3">
          <span style={{ color: "#8fa8c4" }}>{p.name}</span>
          <span className="font-semibold" style={{ color: p.color }}>
            {p.value > 1000 ? `€${p.value.toLocaleString("es-ES")}` : `${p.value}%`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function OverviewView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
        style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <AlertCircle size={16} style={{ color: "#c9a84c", flexShrink: 0 }} />
        <span style={{ color: "#8fa8c4" }}>
          <span style={{ color: "#e0c068", fontWeight: 600 }}>Diciembre 2025</span> · RevPAR €301.9 (+8.7% YoY) ·
          Ocupación 78.4% · NPS 74 · Próxima revisión estratégica: 15 Enero 2026
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard title="Ocupación" value="78.4%" change={3.2} target="82%" icon={<BedDouble size={15} />} />
        <KpiCard title="ADR" value="€385" change={12.5} target="€395" icon={<Euro size={15} />} accentColor="#3b82f6" />
        <KpiCard title="RevPAR" value="€301.9" change={8.7} target="€324" icon={<TrendingUp size={15} />} accentColor="#10b981" />
        <KpiCard title="TRevPAR" value="€487.3" change={6.2} target="€510" icon={<Activity size={15} />} accentColor="#8b5cf6" />
        <KpiCard title="NPS" value="74" change={6} target="78" icon={<Star size={15} />} accentColor="#f59e0b" />
        <KpiCard title="Satisfacción" value="4.6/5" change={4.3} target="4.8" icon={<Users size={15} />} accentColor="#ec4899" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Ingresos 2025</h3>
              <p className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>Evolución mensual vs objetivo</p>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "#10b981" }}>
              <ArrowUpRight size={14} /><span>+7.8% YTD</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueMonthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#5a7a9a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Ingresos" stroke="#c9a84c" strokeWidth={2.5} fill="url(#revGrad)" dot={false} />
              <Area type="monotone" dataKey="target" name="Objetivo" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="5 3" fill="none" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Mix de Canales</h3>
            <p className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>Distribución de reservas</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={channelMix} cx="50%" cy="50%" innerRadius={45} outerRadius={72} dataKey="value" paddingAngle={3}>
                {channelMix.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {channelMix.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: "#8fa8c4" }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span className="truncate">{c.name.split("(")[0].trim()}</span>
                <span className="ml-auto font-semibold" style={{ color: c.color }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} style={{ color: "#c9a84c" }} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Benchmarking Competitivo</h3>
              <p className="text-xs" style={{ color: "#5a7a9a" }}>Andorra – RevPAR comparativo</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={competitorData} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} domain={[0, 350]} />
              <YAxis type="category" dataKey="hotel" tick={{ fill: "#8fa8c4", fontSize: 10 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip formatter={(v) => [`€${v}`, "RevPAR"]} contentStyle={{ background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="revpar" radius={[0, 6, 6, 0]}>
                {competitorData.map((_, i) => <Cell key={i} fill={i === 0 ? "#c9a84c" : "#1a3a5c"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Composición de Ingresos</h3>
            <p className="text-xs" style={{ color: "#5a7a9a" }}>Total mes: €387,600</p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Habitaciones", value: 228000, pct: 58.8, color: "#c9a84c" },
              { label: "Restaurante & Bar", value: 98000, pct: 25.3, color: "#3b82f6" },
              { label: "Spa & Wellness", value: 38000, pct: 9.8, color: "#10b981" },
              { label: "Eventos & Otros", value: 23600, pct: 6.1, color: "#8b5cf6" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span style={{ color: "#8fa8c4" }}>{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#f0f4f8", fontWeight: 600 }}>€{item.value.toLocaleString("es-ES")}</span>
                    <span style={{ color: item.color, fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <div className="flex items-center justify-between">
              <span style={{ color: "#8fa8c4" }}>GOPPAR mensual</span>
              <span className="font-bold text-sm" style={{ color: "#c9a84c" }}>€198.4</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span style={{ color: "#8fa8c4" }}>GOP Margin</span>
              <span className="font-semibold" style={{ color: "#10b981" }}>40.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
