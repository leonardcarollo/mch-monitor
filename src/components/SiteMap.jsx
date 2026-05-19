import React from "react";
import AerialMap from "./AerialMap";

export default function SiteMap({ site }) {
  return (
    <div className="site-map">
      <AerialMap lat={site.lat} lng={site.lng} zoom={site.mapZoom || 18} />
    </div>
  );
}
