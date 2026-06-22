"use client";
import { useState, useCallback, useRef } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FileSpreadsheet, Upload, X, Download, Table, BarChart2, TrendingUp, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";

interface SheetData { name: string; headers: string[]; rows: (string | number)[][]; }

const TS = { background: "#142238", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, fontSize: 12, color: "#f0f4f8" };
const CHART_COLORS = ["#c9a84c", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];

const SAMPLE_TEMPLATES = [
  { name: "Informe de Ocupación Mensual", cols: ["Fecha", "Ocupación %", "Hab. Vendidas", "ADR", "RevPAR"] },
  { name: "Revenue por Departamento", cols: ["Departamento", "Ingresos", "Coste", "GOP", "Margen %"] },
  { name: "Análisis de Clientes", cols: ["Segmento", "Reservas", "Estancia Media", "ADR Medio", "Revenue Total"] },
];

function isNumericColumn(rows: (string | number)[][], idx: number) {
  return rows.slice(0, 5).every((r) => !isNaN(Number(r[idx])) && r[idx] !== "");
}

export default function ExcelView() {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) { alert("Formato no compatible"); return; }
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const parsedSheets: SheetData[] = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, defval: "" });
        const [headers, ...rows] = data as (string | number)[][];
        return { name: sheetName, headers: (headers || []).map(String), rows: rows.filter((r) => r.some((c) => c !== "")) };
      });
      setSheets(parsedSheets); setActiveSheet(0); setFileName(file.name); setViewMode("table");
    } catch { alert("Error al procesar el archivo."); } finally { setLoading(false); }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0]; if (file) processFile(file);
  }, [processFile]);

  const currentSheet = sheets[activeSheet];
  const numericCols = currentSheet ? currentSheet.headers.filter((_, i) => isNumericColumn(currentSheet.rows, i)) : [];
  const chartData = currentSheet ? currentSheet.rows.slice(0, 12).map((row) => {
    const obj: Record<string, string | number> = {};
    currentSheet.headers.forEach((h, i) => { obj[h] = row[i] ?? ""; });
    return obj;
  }) : [];
  const labelKey = currentSheet?.headers[0] ?? "name";

  if (sheets.length === 0) return (
    <div className="flex flex-col gap-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2"><FileSpreadsheet size={22} style={{ color: "#c9a84c" }} /><h2 className="text-lg font-semibold" style={{ color: "#f0f4f8" }}>Analizador de Hojas de Cálculo</h2></div>
        <p className="text-sm" style={{ color: "#8fa8c4" }}>Importa tus archivos Excel del ERP, PMS o back office y visualiza automáticamente los datos en gráficos interactivos.</p>
      </div>
      <div className={`upload-zone ${dragging ? "dragging" : ""} p-16 text-center cursor-pointer`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
        onDrop={onDrop} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }} />
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-2xl" style={{ width: 80, height: 80, background: "rgba(201,168,76,0.1)", border: "2px solid rgba(201,168,76,0.3)" }}>
            {loading ? <div className="flex gap-1">{[0,1,2].map((i) => <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />)}</div> : <Upload size={32} style={{ color: "#c9a84c" }} />}
          </div>
          <div>
            <p className="text-lg font-semibold mb-1" style={{ color: "#f0f4f8" }}>Arrastra tu Excel aquí o haz clic para seleccionar</p>
            <p className="text-sm" style={{ color: "#5a7a9a" }}>Compatible con .xlsx, .xls y .csv · Máx. 50MB</p>
          </div>
        </div>
      </div>
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4"><Download size={16} style={{ color: "#c9a84c" }} /><h3 className="font-semibold text-sm" style={{ color: "#f0f4f8" }}>Plantillas de Análisis Hotel</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_TEMPLATES.map((t) => (
            <div key={t.name} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-sm font-medium mb-2" style={{ color: "#f0f4f8" }}>{t.name}</div>
              <div className="flex flex-wrap gap-1">{t.cols.map((col) => <span key={col} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}>{col}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 rounded-xl text-sm" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <AlertCircle size={16} style={{ color: "#3b82f6", flexShrink: 0, marginTop: 1 }} />
        <span style={{ color: "#8fa8c4" }}>Los datos se procesan <strong style={{ color: "#f0f4f8" }}>100% en tu navegador</strong>, nunca se envían a ningún servidor externo.</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center gap-3">
          <FileSpreadsheet size={20} style={{ color: "#c9a84c" }} />
          <div>
            <div className="font-medium text-sm" style={{ color: "#f0f4f8" }}>{fileName}</div>
            <div className="text-xs" style={{ color: "#5a7a9a" }}>{sheets.length} hoja(s) · {currentSheet?.rows.length} filas · {currentSheet?.headers.length} columnas</div>
          </div>
        </div>
        <button onClick={() => { setSheets([]); setFileName(""); }} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}>
          <X size={13} /> Cerrar
        </button>
      </div>
      {sheets.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sheets.map((s, i) => (
            <button key={s.name} onClick={() => setActiveSheet(i)} className="px-4 py-2 rounded-lg text-sm whitespace-nowrap"
              style={{ background: i === activeSheet ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${i === activeSheet ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)"}`, color: i === activeSheet ? "#c9a84c" : "#8fa8c4" }}>{s.name}</button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        {(["table", "chart"] as const).map((mode) => (
          <button key={mode} onClick={() => setViewMode(mode)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{ background: viewMode === mode ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${viewMode === mode ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)"}`, color: viewMode === mode ? "#c9a84c" : "#8fa8c4" }}>
            {mode === "table" ? <><Table size={14} /> Tabla</> : <><BarChart2 size={14} /> Gráficos</>}
          </button>
        ))}
        <div className="ml-auto text-xs" style={{ color: "#5a7a9a" }}>Mostrando {Math.min(currentSheet?.rows.length ?? 0, 100)} filas</div>
      </div>
      {viewMode === "table" ? (
        <div className="glass-card overflow-hidden"><div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{ background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
              {currentSheet?.headers.map((h, i) => <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: "#c9a84c" }}>{h || `Col ${i+1}`}</th>)}
            </tr></thead>
            <tbody>{currentSheet?.rows.slice(0, 100).map((row, ri) => (
              <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} className="hover:bg-white/[0.02]">
                {currentSheet.headers.map((_, ci) => (
                  <td key={ci} className="px-4 py-2.5 whitespace-nowrap text-xs"
                    style={{ color: isNumericColumn(currentSheet.rows, ci) ? "#e0c068" : "#8fa8c4" }}>{String(row[ci] ?? "")}</td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div></div>
      ) : (
        <div className="flex flex-col gap-4">
          {numericCols.length > 0 ? (<>
            <div className="glass-card p-5">
              <h3 className="font-semibold mb-4" style={{ color: "#f0f4f8" }}>Gráfico de Barras</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey={labelKey} tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
                  <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TS} /><Legend wrapperStyle={{ fontSize: 12, color: "#8fa8c4" }} />
                  {numericCols.slice(0, 4).map((col, i) => <Bar key={col} dataKey={col} fill={CHART_COLORS[i]} radius={[4,4,0,0]} />)}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-semibold mb-4" style={{ color: "#f0f4f8" }}>Gráfico de Líneas (Tendencia)</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey={labelKey} tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
                  <YAxis tick={{ fill: "#5a7a9a", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TS} /><Legend wrapperStyle={{ fontSize: 12, color: "#8fa8c4" }} />
                  {numericCols.slice(0, 4).map((col, i) => <Line key={col} type="monotone" dataKey={col} stroke={CHART_COLORS[i]} strokeWidth={2} dot={{ r: 3, fill: CHART_COLORS[i] }} />)}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>) : (
            <div className="glass-card p-10 text-center">
              <TrendingUp size={32} style={{ color: "#5a7a9a", margin: "0 auto 12px" }} />
              <p style={{ color: "#8fa8c4" }}>No se detectaron columnas numéricas para generar gráficos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
