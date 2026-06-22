"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewView from "./views/OverviewView";
import RevenueView from "./views/RevenueView";
import OccupancyView from "./views/OccupancyView";
import GuestsView from "./views/GuestsView";
import OperationsView from "./views/OperationsView";
import ExcelView from "./views/ExcelView";
import ChatView from "./views/ChatView";

export type ViewType = "overview" | "revenue" | "occupancy" | "guests" | "operations" | "excel" | "chat";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewType>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const views: Record<ViewType, React.ReactNode> = {
    overview: <OverviewView />,
    revenue: <RevenueView />,
    occupancy: <OccupancyView />,
    guests: <GuestsView />,
    operations: <OperationsView />,
    excel: <ExcelView />,
    chat: <ChatView />,
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header activeView={activeView} onOpenChat={() => setActiveView("chat")} />
        <main className="flex-1 overflow-y-auto p-6">
          {views[activeView]}
        </main>
      </div>
    </div>
  );
}
