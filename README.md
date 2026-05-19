# MCH Site Monitor

Internal ENFRA tool for monitoring Medical Center Health System demand response program activity.

## Setup

```bash
npm install
npm start
```

## Google Maps satellite imagery

Open `src/components/SiteMap.jsx` and replace `YOUR_API_KEY_HERE` with a Google Maps Embed API key.

Get one at: https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com

Without a key the map falls back to OpenStreetMap.

## Structure

```
src/
  data/
    sites.js          # All 6 MCH Odessa site records + CPower program data
  components/
    SitePanel.jsx     # Top-left — satellite map + site info
    EquipmentPanel.jsx # Top-right — DR equipment + expected output
    ProgramPanel.jsx  # Bottom-left — event response guide
    PerformancePanel.jsx # Bottom-right — real-time meter + delta chart
  App.jsx             # Shell — topbar with site selector, 2x2 grid
  App.css             # Design system (IBM Plex Sans, industrial/utilitarian)
```

## Next steps

- Wire `PerformancePanel` to live Oncor AMI meter reads via CPower API
- Add EaaS App MCP call to pull site data dynamically (customer ID: `fddfe7d7...` once MCH is entered)
- Replace simulated `generatePerfData` with real 15-min interval data
- Add `eventActive` state driven by a CPower webhook or polling endpoint
- Store Google Maps API key in `.env` as `REACT_APP_GOOGLE_MAPS_KEY`
