import React from "react";
import { CUSTOMER } from "../data/sites";

const ICONS = {
  engine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V5m12 2V5M6 17v2m12-2v2M2 12h2m16 0h2"/>
    </svg>
  ),
  battery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2m-4-5v8M6 12h4"/>
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="1"/>
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
};

export default function EquipmentPanel({ site }) {
  const equipment = site.equipment || [];
  const total = equipment.reduce((sum, e) => sum + e.kw, 0);

  return (
    <div className="panel">
      <div className="panel-header">
        <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        </svg>
        <span className="panel-title">Equipment &amp; expected output</span>
      </div>

      <div className="equipment-list">
        {equipment.map((eq) => (
          <div className="eq-item" key={eq.name}>
            <div className="eq-icon">{ICONS[eq.icon]}</div>
            <div className="eq-body">
              <div className="eq-name">{eq.name}</div>
              <div className="eq-detail">{eq.detail}</div>
            </div>
            <span className="eq-kw">{eq.kw.toLocaleString()} kW</span>
          </div>
        ))}
      </div>

      <div className="eq-total">
        <span className="eq-total-label">Total committed capacity</span>
        <span className="eq-total-value">~{total.toLocaleString()} kW</span>
      </div>

      <div className="program-tags">
        {site.programs.map((p) => (
          <span className="program-tag" key={p}>{p}</span>
        ))}
        <span className="program-tag program-tag--iso">ERCOT</span>
      </div>
    </div>
  );
}
