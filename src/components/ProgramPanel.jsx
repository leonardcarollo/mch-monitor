import React from "react";

const STEPS = [
  {
    n: 1,
    title: "Receive event notification",
    desc: "CPower / ERock sends alert via portal and SMS. Confirm receipt within 30 min. Note event window and kW target per meter.",
  },
  {
    n: 2,
    title: "Pre-condition facilities",
    desc: "1–2 hrs before: lower BMS setpoints to pre-cool. Verify generator fuel levels and BESS state of charge.",
  },
  {
    n: 3,
    title: "Execute curtailment sequence",
    desc: "At event start: dispatch generators and BESS, initiate BMS curtailment sequence, dim non-clinical lighting.",
  },
  {
    n: 4,
    title: "Monitor per-meter performance",
    desc: "Track all 6 meters via Oncor AMI reads every 15 min. Flag any site below target to CPower hotline immediately.",
  },
  {
    n: 5,
    title: "Return to normal & document",
    desc: "Ramp down sequence at event end. Allow 20 min recovery. Submit post-event summary to ENFRA with meter reads and issues log.",
  },
];

export default function ProgramPanel({ eventActive = false }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6m-6 4h4"/>
        </svg>
        <span className="panel-title">Program — event response guide</span>
      </div>

      <div className={`event-banner ${eventActive ? "event-banner--active" : "event-banner--standby"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        {eventActive
          ? "Event in progress — curtailment sequence active. Monitor all meters."
          : "Standby — no active event. ERCOT 4CP warnings typically issued June–Sept via ERock."}
      </div>

      <div className="steps">
        {STEPS.map((step) => (
          <div className="step" key={step.n}>
            <div className={`step-num ${eventActive && step.n === 3 ? "step-num--active" : ""}`}>
              {step.n}
            </div>
            <div className="step-body">
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
