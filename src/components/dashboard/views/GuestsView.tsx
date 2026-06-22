"use client";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { guestSatisfaction, guestOrigins } from "@/lib/hotelData";
import KpiCard from "../KpiCard";
import { Star, Users, Heart, Globe, Award } from "lucide-react";

const TS = { background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12, color: "#f0f4f8" };

const SEGMENTS = [
  { name: "Parejas", pct: 42, color: "#c9a84c" },
  { name: "Familias", pct: 28, color: "#3b82f6" },
  { name: "Negocios", pct: 18, color: "#10b981" },
  { name: "Grupos", pct: 8, color: "#8b5cf6" },
  { name: "Solos", pct: 4, color: "#6b7280" },
];

const REVIEWS = [
  { platform: "Booking.com", score: 9.2, count: 842, color: "#003580" },
  { platform: "TripAdvisor", score: 4.7, count: 1203, color: "#34a853" },
  { platform: "Google", score: 4.8, count: 567, color: "#4285f4" },
  { platform: "Expedia", score: 4.6, count: 234, color: "#c9a84c" },
];

export default function GuestsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="NPS" value="74" change={6} target="78" icon={<Award size={15} />} accentColor="#f59e0b" subtitle="Net Promoter Score" />
        <KpiCard title="Satisfacción Media" value="4.6 / 5" change={4.3} target="4.8" icon={<Star size={15} />} subtitle="Todas las plataformas" />
        <KpiCard title="Clientes Fidelizados" value="38.4%" change={5.2} icon={<Heart size={15} />} accentColor="#ec4899" subtitle="Repiten estancia" />
        <KpiCard title="Huéspedes / Mes" value="5,349" change={7.8} icon={<Users size={15} />} accentColor="#3b82f6" subtitle="Diciembre 2025" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Radar de Satisfacción</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Puntuación por categoría (escala 1-5)</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={guestSatisfaction}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#8fa8c4", fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="#c9a84c" fill="#c9a84c" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Objetivo" dataKey={() => 4.8} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} strokeWidth={1} strokeDasharray="4 2" />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-1 text-xs" style={{ color: "#5a7a9a" }}>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5" style={{ background: "#c9a84c" }} /><span>Actual</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5" style={{ background: "#3b82f6" }} /><span>Objetivo</span></div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Reseñas por Plataforma</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Puntuación y volumen de opiniones</p>
          <div className="flex flex-col gap-4">
            {REVIEWS.map((r) => (
              <div key={r.platform}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span style={{ color: "#f0f4f8", fontWeight: 500 }}>{r.platform}</span>
                  <div className="flex items-center gap-2">
                    <Star size={13} fill="#c9a84c" style={{ color: "#c9a84c" }} />
                    <span style={{ color: "#c9a84c", fontWeight: 700 }}>{r.score}</span>
                    <span className="text-xs" style={{ color: "#5a7a9a" }}>({r.count.toLocaleString("es-ES")})</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${r.platform === "Booking.com" ? (r.score / 10) * 100 : (r.score / 5) * 100}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <div className="text-xs font-medium mb-2" style={{ color: "#8fa8c4" }}>Distribución NPS</div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><div className="font-bold text-lg" style={{ color: "#10b981" }}>62%</div><div style={{ color: "#5a7a9a" }}>Promotores</div></div>
              <div><div className="font-bold text-lg" style={{ color: "#c9a84c" }}>24%</div><div style={{ color: "#5a7a9a" }}>Neutros</div></div>
              <div><div className="font-bold text-lg" style={{ color: "#ef4444" }}>14%</div><div style={{ color: "#5a7a9a" }}>Detractores</div></div>
            </div>
            <div className="mt-2 h-2.5 rounded-full overflow-hidden flex">
              <div style={{ width: "62%", background: "#10b981" }} />
              <div style={{ width: "24%", background: "#c9a84c" }} />
              <div style={{ width: "14%", background: "#ef4444" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} style={{ color: "#c9a84c" }} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Procedencia de Huéspedes</h3>
              <p className="text-xs" style={{ color: "#5a7a9a" }}>Top mercados emisores</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={guestOrigins} layout="vertical" margin={{ top: 0, right: 50, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="country" tick={{ fill: "#8fa8c4", fontSize: 11 }} axisLine={false} tickLine={false} width={85} />
              <Tooltip contentStyle={TS} formatter={(v) => [`${v}%`, "Porcentaje"]} />
              <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                {guestOrigins.map((_, i) => <Cell key={i} fill={i === 0 ? "#c9a84c" : `rgba(201,168,76,${0.7 - i * 0.08})`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Segmentos de Clientes</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Perfil de los huéspedes del hotel</p>
          <div className="flex flex-col gap-3">
            {SEGMENTS.map((seg) => (
              <div key={seg.name}>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span style={{ color: "#8fa8c4" }}>{seg.name}</span>
                  <span style={{ color: seg.color, fontWeight: 700 }}>{seg.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${seg.pct}%`, background: seg.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="text-xs font-semibold mb-3" style={{ color: "#8fa8c4" }}>Métricas de Fidelización</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "Clientes recurrentes", value: "38.4%", color: "#10b981" },
                { label: "Antigüedad media", value: "2.8 años", color: "#c9a84c" },
                { label: "Reservas directas rep.", value: "64%", color: "#3b82f6" },
                { label: "Gasto adicional/estancia", value: "+€142", color: "#8b5cf6" },
              ].map((m) => (
                <div key={m.label}>
                  <div style={{ color: "#5a7a9a" }}>{m.label}</div>
                  <div className="font-bold text-sm mt-0.5" style={{ color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
