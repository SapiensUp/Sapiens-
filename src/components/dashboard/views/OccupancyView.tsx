"use client";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { occupancyData, weeklyOccupancy, forecastData } from "@/lib/hotelData";
import KpiCard from "../KpiCard";
import { BedDouble, Calendar, Clock, TrendingDown } from "lucide-react";

const TS = { background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12, color: "#f0f4f8" };

const ROOM_TYPES = [
  { type: "Suite Presidencial", rooms: 2, rate: 850, occupancy: 72 },
  { type: "Suite Ejecutiva", rooms: 4, rate: 620, occupancy: 81 },
  { type: "Deluxe Doble", rooms: 18, rate: 380, occupancy: 84 },
  { type: "Superior Doble", rooms: 12, rate: 310, occupancy: 76 },
  { type: "Classic Doble", rooms: 4, rate: 260, occupancy: 68 },
];

export default function OccupancyView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Ocupación" value="78.4%" change={3.2} target="82%" icon={<BedDouble size={15} />} />
        <KpiCard title="Estancia Media" value="3.2 noches" change={10.3} target="3.5 noches" icon={<Clock size={15} />} accentColor="#3b82f6" />
        <KpiCard title="Cancelaciones" value="8.3%" change={-1.2} target="<7%" subtitle="Mejora vs mes anterior" icon={<TrendingDown size={15} />} accentColor="#10b981" />
        <KpiCard title="Hab. Disponibles" value="40" subtitle="Todas operativas" icon={<Calendar size={15} />} accentColor="#8b5cf6" />
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ color: "#f0f4f8" }}>Ocupación & ADR Mensual 2025</h3>
            <p className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>Análisis de precio-demanda durante el año</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.2)" }}>YoY +3.2pp</div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: "#5a7a9a", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} domain={[200, 450]} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[50, 100]} />
            <Tooltip contentStyle={TS} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#8fa8c4" }} />
            <Bar yAxisId="right" dataKey="occupancy" name="Ocupación %" fill="rgba(201,168,76,0.25)" radius={[4,4,0,0]} />
            <Line yAxisId="left" type="monotone" dataKey="adr" name="ADR €" stroke="#c9a84c" strokeWidth={2.5} dot={{ r: 3, fill: "#c9a84c" }} />
            <Line yAxisId="left" type="monotone" dataKey="revpar" name="RevPAR €" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 2" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Patrón Semanal de Ocupación</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Semana actual – distribución por día</p>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={weeklyOccupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#5a7a9a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[50, 100]} />
              <Tooltip contentStyle={TS} formatter={(v, name) => [name === "occupancy" ? `${v}%` : `€${Number(v).toLocaleString("es-ES")}`, name === "occupancy" ? "Ocupación" : "Ingresos"]} />
              <Bar dataKey="occupancy" name="Ocupación" fill="rgba(201,168,76,0.3)" radius={[6,6,0,0]} />
              <Line type="monotone" dataKey="occupancy" stroke="#c9a84c" strokeWidth={2} dot={{ r: 4, fill: "#c9a84c" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-between text-xs" style={{ color: "#5a7a9a" }}>
            <span>Pico: <strong style={{ color: "#c9a84c" }}>Sábado 95%</strong></span>
            <span>Valle: <strong style={{ color: "#8fa8c4" }}>Lunes 71%</strong></span>
            <span>Media: <strong style={{ color: "#3b82f6" }}>80.6%</strong></span>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1" style={{ color: "#f0f4f8" }}>Ocupación por Tipo de Habitación</h3>
          <p className="text-xs mb-4" style={{ color: "#5a7a9a" }}>Rendimiento y tarifa por categoría</p>
          <div className="flex flex-col gap-3">
            {ROOM_TYPES.map((room) => (
              <div key={room.type}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span style={{ color: "#8fa8c4" }}>{room.type}</span>
                  <div className="flex items-center gap-3">
                    <span style={{ color: "#c9a84c", fontWeight: 600 }}>€{room.rate}/noche</span>
                    <span style={{ color: room.occupancy >= 80 ? "#10b981" : room.occupancy >= 70 ? "#c9a84c" : "#ef4444", fontWeight: 700, minWidth: 36, textAlign: "right" }}>{room.occupancy}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${room.occupancy}%`, background: room.occupancy >= 80 ? "#10b981" : room.occupancy >= 70 ? "#c9a84c" : "#ef4444" }} />
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#5a7a9a" }}>{room.rooms} habitaciones</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4" style={{ color: "#f0f4f8" }}>Previsión de Ocupación</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {forecastData.map((f) => (
            <div key={f.period} className="p-4 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-medium mb-2" style={{ color: "#8fa8c4" }}>{f.period}</div>
              <div className="text-2xl font-bold" style={{ color: f.occupancy >= 75 ? "#10b981" : "#c9a84c" }}>{f.occupancy}%</div>
              <div className="text-xs mt-1" style={{ color: "#5a7a9a" }}>RevPAR: €{f.revpar}</div>
              <div className="text-xs mt-1" style={{ color: "#3b82f6" }}>Confianza: {f.confidence}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
