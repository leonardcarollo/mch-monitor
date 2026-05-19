import React from "react";

const TILE_SIZE = 256;
const ARCGIS = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile";

function latLngToTilePos(lat, lng, zoom) {
  const n = Math.pow(2, zoom);
  const xFloat = n * (lng + 180) / 360;
  const latRad = lat * Math.PI / 180;
  const yFloat = n * (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2;
  return {
    tileX: Math.floor(xFloat),
    tileY: Math.floor(yFloat),
    pixelX: (xFloat - Math.floor(xFloat)) * TILE_SIZE,
    pixelY: (yFloat - Math.floor(yFloat)) * TILE_SIZE,
  };
}

export default function AerialMap({ lat, lng, zoom = 18 }) {
  const { tileX, tileY, pixelX, pixelY } = latLngToTilePos(lat, lng, zoom);

  // 3x3 grid of tiles; center tile is at grid position (1,1)
  const pointInGridX = TILE_SIZE + pixelX;
  const pointInGridY = TILE_SIZE + pixelY;

  const tiles = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({
        key: `${dx},${dy}`,
        url: `${ARCGIS}/${zoom}/${tileY + dy}/${tileX + dx}`,
        left: (dx + 1) * TILE_SIZE,
        top: (dy + 1) * TILE_SIZE,
      });
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#1a1a1a" }}>
      {/* tile grid, translated so the building coordinate lands at the center */}
      <div style={{
        position: "absolute",
        width: TILE_SIZE * 3,
        height: TILE_SIZE * 3,
        left: `calc(50% - ${pointInGridX}px)`,
        top: `calc(50% - ${pointInGridY}px)`,
      }}>
        {tiles.map(t => (
          <img
            key={t.key}
            src={t.url}
            alt=""
            draggable={false}
            style={{ position: "absolute", left: t.left, top: t.top, width: TILE_SIZE, height: TILE_SIZE, display: "block" }}
          />
        ))}
        {/* pin */}
        <div style={{
          position: "absolute",
          left: pointInGridX - 7,
          top: pointInGridY - 7,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#00B050",
          border: "2.5px solid #ffffff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.6)",
          zIndex: 1,
        }} />
      </div>
      {/* attribution */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)",
        fontSize: 9, padding: "2px 5px", fontFamily: "monospace",
      }}>
        Esri, Maxar, Earthstar Geographics
      </div>
    </div>
  );
}
