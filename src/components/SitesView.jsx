import React from "react";
import { SITES } from "../data/sites";
import AerialMap from "./AerialMap";

export default function SitesView() {
  return (
    <main className="sites-grid">
      {SITES.map((site) => (
        <div className="site-photo-card" key={site.id}>
          <div className="site-photo-map">
            <AerialMap lat={site.lat} lng={site.lng} zoom={site.mapZoom} />
          </div>
          <div className="site-photo-footer">
            <span className="site-photo-name">{site.name}</span>
            <span className="site-photo-meta">{site.address} &nbsp;·&nbsp; {site.enrolledKw.toLocaleString()} kW enrolled</span>
          </div>
        </div>
      ))}
    </main>
  );
}
