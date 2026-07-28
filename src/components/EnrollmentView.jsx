import React, { useMemo, useState } from "react";
import { SITES } from "../data/sites";
import { ALL_PROGRAMS, defaultEnrollment } from "../data/enrollment";

const fmtKw = (n) => n.toLocaleString("en-US");

export default function EnrollmentView({ enrollment, onSave }) {
  const [draft, setDraft] = useState(() => enrollment.map((r) => ({ ...r, programs: [...r.programs] })));
  const [savedAt, setSavedAt] = useState(null);

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(enrollment),
    [draft, enrollment]
  );

  const totalEnrolled = draft.reduce((sum, r) => sum + (r.enrolledKw || 0), 0);
  const totalPeak = draft.reduce((sum, r) => sum + (r.peakDemandKw || 0), 0);

  const setField = (id, field, value) =>
    setDraft((rows) => rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const toggleProgram = (id, program) =>
    setDraft((rows) =>
      rows.map((r) => {
        if (r.id !== id) return r;
        const has = r.programs.includes(program);
        return {
          ...r,
          // keep checkbox order stable regardless of click order
          programs: has
            ? r.programs.filter((p) => p !== program)
            : ALL_PROGRAMS.filter((p) => r.programs.includes(p) || p === program),
        };
      })
    );

  const handleSave = () => {
    onSave(draft.map((r) => ({ ...r, programs: [...r.programs] })));
    setSavedAt(new Date());
  };

  const handleDiscard = () =>
    setDraft(enrollment.map((r) => ({ ...r, programs: [...r.programs] })));

  const handleDefaults = () => setDraft(defaultEnrollment());

  return (
    <main className="enroll-view">
      <div className="panel">
        <div className="panel-header">
          <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          <span className="panel-title">Enrollment data inputs</span>
          <div className="enroll-actions">
            {dirty && <span className="enroll-dirty">Unsaved changes</span>}
            {!dirty && savedAt && (
              <span className="enroll-saved">
                Saved {savedAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button className="enroll-btn" onClick={handleDefaults}>Restore defaults</button>
            <button className="enroll-btn" onClick={handleDiscard} disabled={!dirty}>Discard</button>
            <button className="enroll-btn enroll-btn--primary" onClick={handleSave} disabled={!dirty}>
              Save changes
            </button>
          </div>
        </div>

        <div className="enroll-note">
          Edits apply across the dashboard (site info, enrolled capacity) and persist in this
          browser. Restore defaults to return to the CPower project-list values.
        </div>

        <div className="settlement-wrap">
          <table className="settlement-table enroll-table">
            <thead>
              <tr>
                <th>Site</th>
                <th>Meter ID</th>
                <th>Account #</th>
                <th className="num">Enrolled kW</th>
                <th className="num">Peak Demand kW</th>
                {ALL_PROGRAMS.map((p) => (
                  <th key={p} className="ctr">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {draft.map((row) => {
                const site = SITES.find((s) => s.id === row.id);
                return (
                  <tr key={row.id}>
                    <td>
                      <div className="enroll-site-name">{site.name}</div>
                      <div className="enroll-site-addr">{site.address}, {site.city}</div>
                    </td>
                    <td>
                      <input
                        className="enroll-input"
                        type="text"
                        value={row.meterId}
                        onChange={(e) => setField(row.id, "meterId", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="enroll-input enroll-input--wide"
                        type="text"
                        value={row.accountId}
                        onChange={(e) => setField(row.id, "accountId", e.target.value)}
                      />
                    </td>
                    <td className="num">
                      <input
                        className="enroll-input enroll-input--num"
                        type="number"
                        min="0"
                        value={row.enrolledKw}
                        onChange={(e) => setField(row.id, "enrolledKw", Number(e.target.value) || 0)}
                      />
                    </td>
                    <td className="num">
                      <input
                        className="enroll-input enroll-input--num"
                        type="number"
                        min="0"
                        value={row.peakDemandKw}
                        onChange={(e) => setField(row.id, "peakDemandKw", Number(e.target.value) || 0)}
                      />
                    </td>
                    {ALL_PROGRAMS.map((p) => (
                      <td key={p} className="ctr">
                        <input
                          type="checkbox"
                          className="enroll-check"
                          checked={row.programs.includes(p)}
                          onChange={() => toggleProgram(row.id, p)}
                          aria-label={`${site.name} — ${p}`}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="stmt-total-row">
                <td colSpan={3}>Portfolio total — {draft.length} sites</td>
                <td className="num mono bold">{fmtKw(totalEnrolled)}</td>
                <td className="num mono">{fmtKw(totalPeak)}</td>
                {ALL_PROGRAMS.map((p) => (
                  <td key={p} className="ctr mono">
                    {draft.filter((r) => r.programs.includes(p)).length}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
