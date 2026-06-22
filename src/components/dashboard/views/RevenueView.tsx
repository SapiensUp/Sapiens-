"use client";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { revenueMonthly, fbData } from "@/lib/hotelData";
import KpiCard from "../KpiCard";
import { Euro, TrendingUp, Percent, BarChart2 } from "lucide-react";

const TS = { background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12, color: "#f0f4f8" };

export default function RevenueView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Ingresos Totales" value="€387,600" change={7.8} target="€415,000" icon={<Euro size={15} />} />
        <KpiCard title="Ingresos Habitaciones" value="€228,000" change={8.2} subtitle="58.8% del total" icon={<TrendingUp size={15} />} accentColor="#3b82f6" />
        <KpiCard title="Ingresos F&B" value="€48,200" change={9.4} subtitle="Del restaurante y bar" icon={<BarChart2 size={15} />} accentColor="#10b981" />
        <KpiCard title="Ingresos Spa" value="€18,750" change={14.2} subtitle="Máximo histórico" icon={<Percent size={15} />} accentColor="#8b5cf6" />
      </div>

      <div className="glass-card p-5">
        <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Desglose de Ingresos por Departamento</h3>
        <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Evolución mensual 2025 por fuente de ingreso</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueMonthly} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              {[{ id: "rooms", color: "#c9a84c" }, { id: "fb", color: "#3b82f6" }, { id: "spa", color: "#10b981" }, { id: "other", color: "#8b5cf6" }].map(({ id, color }) => (
                <linearGradient key={id} id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: "#5a7a9a", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={TS} formatter={(v) => [`€${Number(v).toLocaleString("es-ES")}`, ""]} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#8fa8c4" }} />
            <Area type="monotone" dataKey="rooms" name="Habitaciones" stroke="#c9a84c" fill="url(#grad-rooms)" strokeWidth={2} />
            <Area type="monotone" dataKey="fb" name="F&B" stroke="#3b82f6" fill="url(#grad-fb)" strokeWidth={2} />
            <Area type="monotone" dataKey="spa" name="Spa" stroke="#10b981" fill="url(#grad-spa)" strokeWidth={2} />
            <Area type="monotone" dataKey="other" name="Otros" stroke="#8b5cf6" fill="url(#grad-other)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>ADR vs RevPAR</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Evolución de tarifas y rendimiento por habitación</p>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={revenueMonthly.map((m, i) => ({ ...m, adr: [340,325,355,368,374,392,415,418,385,372,348,385][i], revpar: [221.7,204.1,253.5,282.6,296.2,331.6,378.9,387.9,317.2,288.7,239.8,301.9][i] }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#5a7a9a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip contentStyle={TS} formatter={(v) => [`€${v}`, ""]} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#8fa8c4" }} />
              <Bar dataKey="revpar" name="RevPAR" fill="rgba(201,168,76,0.3)" radius={[4,4,0,0]} />
              <Line type="monotone" dataKey="adr" name="ADR" stroke="#c9a84c" strokeWidth={2.5} dot={{ r: 3, fill: "#c9a84c" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Rendimiento F&B</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Ingresos y ticket medio por servicio</p>
          <div className="flex flex-col gap-3 mb-4">
            {fbData.map((item) => (
              <div key={item.service} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: "#f0f4f8" }}>{item.service}</span>
                  <span className="text-sm font-bold" style={{ color: "#c9a84c" }}>€{item.revenue.toLocaleString("es-ES")}</span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: "#5a7a9a" }}>
                  <span>{item.covers.toLocaleString("es-ES")} cubiertos</span>
                  <span>Ticket medio: <strong style={{ color: "#8fa8c4" }}>€{item.avgCheck}</strong></span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl text-xs" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <div className="grid grid-cols-2 gap-2">
              {[{ l: "Total F&B", v: "€48,200", c: "#c9a84c" }, { l: "Total Cubiertos", v: "3,985", c: "#f0f4f8" }, { l: "Rev/Hab Disponible", v: "€40.2", c: "#10b981" }, { l: "Variación YoY", v: "+9.4%", c: "#10b981" }].map((m) => (
                <div key={m.l}>
                  <div style={{ color: "#5a7a9a" }}>{m.l}</div>
                  <div className="font-bold text-sm" style={{ color: m.c }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
