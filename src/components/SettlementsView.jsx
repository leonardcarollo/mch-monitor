import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { ERS_STATEMENT } from "../data/settlements";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const fmt$ = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
const fmtPct = (n) => `${Math.round(n * 100)}%`;

export default function SettlementsView() {
  const s = ERS_STATEMENT;
  const totalGross = s.periods.reduce((sum, p) => sum + p.gross, 0);
  const avgMw = s.periods.reduce((sum, p) => sum + p.mw, 0) / s.periods.length;
  const avgAvail = s.periods.reduce((sum, p) => sum + p.availability, 0) / s.periods.length;
  const avgPerf = s.periods.reduce((sum, p) => sum + p.eventPerf, 0) / s.periods.length;

  const chartData = {
    labels: s.periods.map((p) => `TP ${p.tp}`),
    datasets: [
      {
        label: "Client net payment",
        data: s.periods.map((p) => p.clientNet),
        backgroundColor: "#557F7F",
        hoverBackgroundColor: "#3f6363",
        borderRadius: { topLeft: 4, topRight: 4 },
        barPercentage: 0.55,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const p = s.periods[ctx.dataIndex];
            return [
              `Client net: ${fmt$(p.clientNet)}`,
              `Gross: ${fmt$(p.gross)}`,
              `Price: $${p.price.toFixed(2)}`,
              `Capacity: ${p.mw.toFixed(2)} MW`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, color: "#888780" },
        grid: { display: false },
      },
      y: {
        ticks: { font: { size: 10 }, color: "#888780", callback: (v) => "$" + v },
        grid: { color: "rgba(136,135,128,0.1)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="stmt-view">
      {/* KPI tiles */}
      <div className="stmt-kpi-row">
        <div className="metric-card">
          <div className="metric-label">Total payment this period</div>
          <div className="metric-value">{fmt$(s.totalPayment)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Gross settlement</div>
          <div className="metric-value">{fmt$(totalGross)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Availability factor</div>
          <div className="metric-value metric-value--success">{fmtPct(avgAvail)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Event performance</div>
          <div className="metric-value metric-value--success">{fmtPct(avgPerf)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg committed capacity</div>
          <div className="metric-value">{avgMw.toFixed(2)} <span className="metric-unit">MW</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Client share</div>
          <div className="metric-value">{fmtPct(s.clientSharePct)}</div>
        </div>
      </div>

      <div className="stmt-grid">
        {/* Statement details */}
        <div className="panel">
          <div className="panel-header">
            <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span className="panel-title">Statement</span>
          </div>
          <div className="info-table">
            <div className="info-row"><span className="info-label">Program</span><span className="info-value">{s.program} — {s.programFull}</span></div>
            <div className="info-row"><span className="info-label">Utility / ISO</span><span className="info-value">{s.iso}</span></div>
            <div className="info-row"><span className="info-label">Season</span><span className="info-value">{s.season}</span></div>
            <div className="info-row"><span className="info-label">Site description</span><span className="info-value">{s.siteDescription}</span></div>
            <div className="info-row"><span className="info-label">Vendor ID</span><span className="info-value">{s.vendorId}</span></div>
            <div className="info-row"><span className="info-label">Administrator</span><span className="info-value">{s.administrator}</span></div>
            <div className="info-row"><span className="info-label">Payee</span><span className="info-value">{s.payee}</span></div>
            <div className="info-row"><span className="info-label">Client share</span><span className="info-value">{fmtPct(s.clientSharePct)}</span></div>
            <div className="info-row"><span className="info-label">Time periods</span><span className="info-value">{s.periods.length}</span></div>
          </div>
          <div className="stmt-source">Source: CPower client payment statement, {s.season}</div>
        </div>

        {/* Chart + table */}
        <div className="panel">
          <div className="panel-header">
            <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="12" y1="20" x2="12" y2="10"/>
              <line x1="18" y1="20" x2="18" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
            <span className="panel-title">ERS settlement — {s.season}</span>
          </div>

          <div className="chart-wrap stmt-chart">
            <Bar data={chartData} options={chartOptions} aria-label="Client net payment by ERS time period" />
          </div>
          <div className="stmt-chart-caption">Client net payment by ERS time period</div>

          <div className="settlement-wrap">
            <table className="settlement-table">
              <thead>
                <tr>
                  <th>Time Period</th>
                  <th>Site</th>
                  <th className="num">Price</th>
                  <th className="num">Avail. Factor</th>
                  <th className="num">Event Perf %</th>
                  <th className="num">MW</th>
                  <th className="num">Gross</th>
                  <th className="num">Client Share</th>
                  <th className="num">Client Net</th>
                </tr>
              </thead>
              <tbody>
                {s.periods.map((p) => (
                  <tr key={p.tp}>
                    <td>Time Period {p.tp}</td>
                    <td>{s.siteDescription}</td>
                    <td className="num mono">${p.price.toFixed(2)}</td>
                    <td className="num mono text-success">{fmtPct(p.availability)}</td>
                    <td className="num mono text-success">{fmtPct(p.eventPerf)}</td>
                    <td className="num mono">{p.mw.toFixed(2)}</td>
                    <td className="num mono">{fmt$(p.gross)}</td>
                    <td className="num mono">{fmtPct(s.clientSharePct)}</td>
                    <td className="num mono bold">{fmt$(p.clientNet)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="stmt-total-row">
                  <td colSpan={6}>Total payment this period</td>
                  <td className="num mono">{fmt$(totalGross)}</td>
                  <td />
                  <td className="num mono bold">{fmt$(s.totalPayment)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
