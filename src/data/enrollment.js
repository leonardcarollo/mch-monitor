// Enrollment inputs — per-site DR program enrollment parameters.
// Defaults come from sites.js; user edits persist to localStorage and
// override the defaults everywhere the app reads site data.

import { SITES } from "./sites";

const STORAGE_KEY = "mch-enrollment-v1";

export const ALL_PROGRAMS = ["4CP", "ERS", "LMP", "EDR"];

export function defaultEnrollment() {
  return SITES.map((s) => ({
    id: s.id,
    enrolledKw: s.enrolledKw,
    peakDemandKw: s.peakDemandKw,
    meterId: s.meterId,
    accountId: s.accountId,
    programs: [...s.programs],
  }));
}

export function loadEnrollment() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // Merge over defaults so new sites/fields added later still appear
      return defaultEnrollment().map((d) => {
        const s = saved.find((x) => x.id === d.id);
        return s ? { ...d, ...s } : d;
      });
    }
  } catch (e) {
    // corrupted storage — fall through to defaults
  }
  return defaultEnrollment();
}

export function saveEnrollment(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export function clearEnrollment() {
  localStorage.removeItem(STORAGE_KEY);
}

// Apply enrollment overrides onto the full site records
export function mergeSites(rows) {
  return SITES.map((s) => {
    const r = rows.find((x) => x.id === s.id);
    return r ? { ...s, ...r } : s;
  });
}
