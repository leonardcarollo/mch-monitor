// CPower client payment statement — ERCOT ERS
// Source: "ENFRA SOLUTIONS ERCOT ERS - Apr-May 2025.pdf" (actual statement values, not simulated)

export const ERS_STATEMENT = {
  title: "Client Payment Statement — Demand Response",
  program: "ERS 30",
  programFull: "Emergency Response Service (30-min)",
  iso: "ERCOT",
  season: "April–May 2025",
  vendorId: "BNH001",
  payee: "ENFRA Solutions, LLC",
  administrator: "CPower",
  siteDescription: "HOSP BLDG1",
  clientSharePct: 0.8,
  totalPayment: 209.48,
  periods: [
    { tp: 1, price: 2.68, availability: 1.0, eventPerf: 1.0, mw: 0.23, gross: 106.02, clientNet: 84.82 },
    { tp: 2, price: 0.17, availability: 1.0, eventPerf: 1.0, mw: 0.2, gross: 5.85, clientNet: 4.68 },
    { tp: 3, price: 0.17, availability: 1.0, eventPerf: 1.0, mw: 0.19, gross: 4.21, clientNet: 3.37 },
    { tp: 4, price: 1.67, availability: 1.0, eventPerf: 1.0, mw: 0.2, gross: 42.22, clientNet: 33.78 },
    { tp: 5, price: 2.7, availability: 1.0, eventPerf: 1.0, mw: 0.21, gross: 72.1, clientNet: 57.68 },
    { tp: 6, price: 0.2, availability: 1.0, eventPerf: 1.0, mw: 0.23, gross: 3.27, clientNet: 2.62 },
    { tp: 7, price: 0.25, availability: 1.0, eventPerf: 1.0, mw: 0.21, gross: 5.59, clientNet: 4.47 },
    { tp: 8, price: 0.18, availability: 1.0, eventPerf: 1.0, mw: 0.23, gross: 22.6, clientNet: 18.08 },
  ],
};

export const STATEMENTS = [ERS_STATEMENT];
