import React from "react";
import SiteMap from "./SiteMap";

export default function SitePanel({ site }) {
  const rows = [
    ["Address", `${site.address}, ${site.city}, ${site.state} ${site.zip}`],
    ["Utility", "Oncor"],
    ["ISO / market", "ERCOT"],
    ["Meter ID", site.meterId],
    ["DR program", "CPower — " + site.programs.join(", ")],
    ["Peak demand", site.peakDemandKw.toLocaleString() + " kW"],
    ["Enrolled capacity", site.enrolledKw.toLocaleString() + " kW"],
    ["Coordinates", `${site.lat.toFixed(5)}, ${site.lng.toFixed(5)}`],
  ];

  return (
    <div className="panel">
      <div className="panel-header">
        <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <span className="panel-title">Site</span>
      </div>
      <SiteMap site={site} />
      <div className="info-table">
        {rows.map(([label, value]) => (
          <div className="info-row" key={label}>
            <span className="info-label">{label}</span>
            <span className="info-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
