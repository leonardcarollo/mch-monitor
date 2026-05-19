import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { generatePerfData, generateSettlement, CUSTOMER } from "../data/sites";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const BASELINE_KW = 13200;
const TARGET_KW = 5540;

const fmt$ = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function PerformancePanel({ site }) {
  const perf = useMemo(() => generatePerfData(BASELINE_KW, TARGET_KW), [site.id]);
  const settlement = useMemo(() => generateSettlement(site), [site.id]);
  const liveActual = perf.actual[perf.actual.length - 1];
  const curtailed = Math.abs(liveActual - BASELINE_KW);
  const aboveTarget = liveActual <= TARGET_KW;

  const chartData = {
    labels: perf.labels,
    datasets: [
      { label: "Actual", data: perf.actual, borderColor: "#557F7F", backgroundColor: "rgba(85,127,127,0.08)", fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2 },
      { label: "Baseline", data: perf.baseline, borderColor: "#8a8a82", borderDash: [5, 4], fill: false, tension: 0, pointRadius: 0, borderWidth: 1.5 },
      { label: "Target", data: perf.target, borderColor: "#00B050", borderDash: [3, 3], fill: false, tension: 0, pointRadius: 0, borderWidth: 1.5 },
    ],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    scales: {
      x: { ticks: { font: { size: 10 }, color: "#888780", maxRotation: 0, autoSkip: true, maxTicksLimit: 6 }, grid: { display: false } },
      y: { ticks: { font: { size: 10 }, color: "#888780", callback: (v) => Math.round(v / 1000) + "k kW" }, grid: { color: "rgba(136,135,128,0.1)" }, min: 4000, max: 15000 },
    },
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        <span className="panel-title">Performance — real-time &amp; settlement</span>
      </div>

      <div className="metric-row">
        <div className="metric-card">
          <div className="metric-label">Live meter read</div>
          <div className="metric-value sim">{liveActual.toLocaleString()} <span className="metric-unit">kW</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Baseline (expected)</div>
          <div className="metric-value">{BASELINE_KW.toLocaleString()} <span className="metric-unit">kW</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Delta (curtailed)</div>
          <div className="metric-value sim">
            −{curtailed.toLocaleString()} <span className="metric-unit">kW</span>
          </div>
        </div>
      </div>

      <div className="chart-wrap">
        <Line data={chartData} options={chartOptions} aria-label="Real-time demand vs baseline and target" />
      </div>

      <div className="chart-legend">
        <span className="legend-item"><span className="legend-swatch legend-swatch--actual" />Actual</span>
        <span className="legend-item"><span className="legend-swatch legend-swatch--baseline" />Baseline</span>
        <span className="legend-item"><span className="legend-swatch legend-swatch--target" />Target</span>
      </div>

      {/* Settlement history table */}
      <div className="settlement-header">Settlement history — {site.name}</div>
      <div className="settlement-wrap">
        <table className="settlement-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Account #</th>
              <th>Programs</th>
              <th className="num">Enrolled kW</th>
              <th className="num">Perf %</th>
              <th className="num">$/kW-day</th>
              <th className="num">Days</th>
              <th className="num">Gross Rev.</th>
              <th className="num">Client Shr.</th>
              <th className="num">Gross Earn.</th>
              <th className="num">Shortfall</th>
              <th className="num">Net Pmt.</th>
            </tr>
          </thead>
          <tbody>
            {settlement.map((row) => (
              <tr key={row.period} className={row.shortfall > 0 ? "row-shortfall" : ""}>
                <td className="sim">{row.period}</td>
                <td className="mono acct-cell sim" title={site.accountId}>···{site.accountId.slice(-6)}</td>
                <td className="sim">{site.programs.join("/")}</td>
                <td className="num mono sim">{site.enrolledKw.toLocaleString()}</td>
                <td className={`num mono sim ${row.perfPct < 0.90 ? "text-warning" : "text-success"}`}>
                  {(row.perfPct * 100).toFixed(0)}%
                </td>
                <td className="num mono sim">${row.price.toFixed(2)}</td>
                <td className="num mono sim">{row.days}</td>
                <td className="num mono sim">{fmt$(row.grossRevenue)}</td>
                <td className="num mono sim">{fmt$(row.clientShare)}</td>
                <td className="num mono sim">{fmt$(row.grossEarnings)}</td>
                <td className={`num mono sim ${row.shortfall > 0 ? "text-warning" : ""}`}>
                  {row.shortfall > 0 ? `(${fmt$(row.shortfall)})` : "—"}
                </td>
                <td className="num mono bold sim">{fmt$(row.netPayment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="perf-footer">
        <div className="perf-stat">
          <div className="perf-stat-label">Program status</div>
          <div className="perf-stat-value">{CUSTOMER.status} — {CUSTOMER.closedDate}</div>
        </div>
        <div className="perf-stat">
          <div className="perf-stat-label">Enrolled capacity</div>
          <div className="perf-stat-value">~13,000 kW</div>
        </div>
        <div className="perf-stat">
          <div className="perf-stat-label">Operational target</div>
          <div className="perf-stat-value perf-stat-value--success">{CUSTOMER.operationalTarget}</div>
        </div>
      </div>
    </div>
  );
}
