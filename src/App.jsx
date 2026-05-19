import React, { useState } from "react";
import { SITES, CUSTOMER } from "./data/sites";
import SitePanel from "./components/SitePanel";
import EquipmentPanel from "./components/EquipmentPanel";
import ProgramPanel from "./components/ProgramPanel";
import PerformancePanel from "./components/PerformancePanel";
import SitesView from "./components/SitesView";
import "./App.css";

export default function App() {
  const [selectedSiteIdx, setSelectedSiteIdx] = useState(0);
  const [eventActive] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const site = SITES[selectedSiteIdx];

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          <div className="topbar-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div>
            <div className="topbar-title">{CUSTOMER.name}</div>
            <div className="topbar-sub">
              CPower DR program &nbsp;·&nbsp; {CUSTOMER.iso} / {CUSTOMER.utility} &nbsp;·&nbsp; {CUSTOMER.city}
            </div>
          </div>
        </div>

        <div className="topbar-center">
          <button
            className={`tab-btn ${activeTab === "dashboard" ? "tab-btn--active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === "sites" ? "tab-btn--active" : ""}`}
            onClick={() => setActiveTab("sites")}
          >
            Site Photos
          </button>
        </div>

        <div className="topbar-right">
          {activeTab === "dashboard" && (
            <select
              className="site-select"
              value={selectedSiteIdx}
              onChange={(e) => setSelectedSiteIdx(Number(e.target.value))}
            >
              {SITES.map((s, i) => (
                <option key={s.id} value={i}>
                  {s.name} — {s.address}
                </option>
              ))}
            </select>
          )}

          <div className={`status-pill ${eventActive ? "status-pill--active" : "status-pill--standby"}`}>
            <svg width="9" height="9" viewBox="0 0 10 10">
              <circle cx="5" cy="5" r="5" fill="currentColor" />
            </svg>
            {eventActive ? "Event active" : "No active event"}
          </div>
        </div>
      </header>

      {activeTab === "dashboard" ? (
        <main className="grid">
          <SitePanel site={site} />
          <ProgramPanel eventActive={eventActive} />
          <EquipmentPanel site={site} />
          <PerformancePanel site={site} />
        </main>
      ) : (
        <SitesView />
      )}
    </div>
  );
}
