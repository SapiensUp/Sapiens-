"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: number;
  target?: string;
  targetMet?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  large?: boolean;
}

export default function KpiCard({ title, value, change, target, targetMet, subtitle, icon, accentColor = "#c9a84c", large }: KpiCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const changeColor = isPositive ? "#10b981" : isNegative ? "#ef4444" : "#8fa8c4";

  return (
    <div className="glass-card p-5 flex flex-col gap-3" style={{ minHeight: large ? 140 : 120 }}>
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "#8fa8c4", letterSpacing: "0.06em" }}>{title}</div>
        {icon && (
          <div className="flex items-center justify-center rounded-lg"
            style={{ width: 32, height: 32, background: `${accentColor}18`, color: accentColor }}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className={`font-bold ${large ? "text-3xl" : "text-2xl"}`} style={{ color: "#f0f4f8", lineHeight: 1 }}>{value}</div>
          {subtitle && <div className="text-xs mt-1" style={{ color: "#5a7a9a" }}>{subtitle}</div>}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {isPositive ? <TrendingUp size={13} style={{ color: changeColor }} /> :
             isNegative ? <TrendingDown size={13} style={{ color: changeColor }} /> :
             <Minus size={13} style={{ color: changeColor }} />}
            <span className="text-sm font-semibold" style={{ color: changeColor }}>
              {isPositive ? "+" : ""}{change}%
            </span>
          </div>
        )}
      </div>
      {target && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, targetMet ? 100 : 85)}%`, background: targetMet ? "linear-gradient(90deg, #10b981, #34d399)" : `linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }} />
          </div>
          <span className="text-xs flex-shrink-0" style={{ color: "#5a7a9a" }}>Obj: {target}</span>
        </div>
      )}
    </div>
  );
}
