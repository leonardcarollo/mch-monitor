// Medical Center Health System — Odessa, TX
// Source: CPower Q1 Project List + Google Places geocoding

export const CUSTOMER = {
  name: "Medical Center Health System",
  shortName: "MCH",
  city: "Odessa, TX",
  iso: "ERCOT",
  utility: "Oncor",
  drPartner: "CPower / ERock",
  programs: ["4CP", "ERS", "LMP", "EDR"],
  status: "Closed",
  closedDate: "Q4 2025",
  operationalTarget: "Q4 2027",
};

export const SITES = [
  {
    id: "mch-main-1",
    name: "Main Hospital",
    address: "518 W 4th St",
    city: "Odessa",
    state: "TX",
    zip: "79761",
    meterId: "155155731LG",
    accountId: "10443720001646392",
    zone: "West",
    enrolledKw: 2400,
    peakDemandKw: 2400,
    lat: 31.845036,
    lng: -102.373681,
    mapZoom: 18,
    programs: ["4CP", "ERS", "LMP"],
    equipment: [
      { name: "New backup generation", detail: "New gensets — 4CP, ERS, LMP eligible", kw: 4000, icon: "engine" },
      { name: "BESS dispatch", detail: "Battery storage — discharge during event window", kw: 3082, icon: "battery" },
    ],
  },
  {
    id: "mch-main-2",
    name: "Main Hospital (annex)",
    address: "317 N Washington Ave",
    city: "Odessa",
    state: "TX",
    zip: "79761",
    meterId: "165178116LG",
    accountId: "10443720006421",
    zone: "West",
    enrolledKw: 968,
    peakDemandKw: 968,
    lat: 31.846214,
    lng: -102.373804,
    mapZoom: 18,
    programs: ["4CP", "ERS", "LMP"],
    equipment: [
      { name: "Facilities DM (BMS)", detail: "Building mgmt system — HVAC setpoint curtailment", kw: 333, icon: "dashboard" },
    ],
  },
  {
    id: "mch-wheatley",
    name: "Wheatley Stewart Pavilion",
    address: "500 W 5th St",
    city: "Odessa",
    state: "TX",
    zip: "79761",
    meterId: "182613848LG",
    accountId: "10443720007117",
    zone: "West",
    enrolledKw: 585,
    peakDemandKw: 585,
    lat: 31.8462,
    lng: -102.373963,
    mapZoom: 18,
    programs: ["4CP", "ERS"],
    equipment: [
      { name: "Facilities DM (BMS)", detail: "Building mgmt system — HVAC setpoint curtailment", kw: 333, icon: "dashboard" },
    ],
  },
  {
    id: "mch-wellness",
    name: "Center for Health & Wellness",
    address: "8050 E Hwy 191",
    city: "Odessa",
    state: "TX",
    zip: "79765",
    meterId: "182613759LG",
    accountId: "10443720009640",
    zone: "West",
    enrolledKw: 480,
    peakDemandKw: 480,
    lat: 31.921723,
    lng: -102.288505,
    mapZoom: 17,
    programs: ["4CP", "ERS"],
    equipment: [
      { name: "Facilities DM (BMS)", detail: "Building mgmt system — HVAC setpoint curtailment", kw: 333, icon: "dashboard" },
    ],
  },
  {
    id: "mch-women",
    name: "Medical Center for Women & Infants",
    address: "400 W 4th St",
    city: "Odessa",
    state: "TX",
    zip: "79761",
    meterId: "182611452LG",
    accountId: "10443720007690",
    zone: "West",
    enrolledKw: 242,
    peakDemandKw: 242,
    lat: 31.845876,
    lng: -102.372535,
    mapZoom: 18,
    programs: ["4CP"],
    equipment: [
      { name: "Facilities DM (BMS)", detail: "Building mgmt system — HVAC setpoint curtailment", kw: 242, icon: "dashboard" },
    ],
  },
  {
    id: "mch-cone",
    name: "Cone Professional Building",
    address: "318 N Allegheny Ave",
    city: "Odessa",
    state: "TX",
    zip: "79761",
    meterId: "111722491LG",
    accountId: "10443720001646392",
    zone: "West",
    enrolledKw: 915,
    peakDemandKw: 915,
    lat: 31.844376,
    lng: -102.37344,
    mapZoom: 18,
    programs: ["ERS", "4CP"],
    equipment: [
      { name: "HPCH program", detail: "High-performance curtailment — ERS & 4CP", kw: 246, icon: "zap" },
    ],
  },
];

// Aggregate equipment across all sites (for portfolio view)
export const PORTFOLIO_EQUIPMENT = [
  { name: "New backup generation", detail: "New gensets dispatched — 4CP, ERS, LMP eligible", kw: 4000, icon: "engine" },
  { name: "BESS dispatch", detail: "Battery energy storage — discharge during event window", kw: 3082, icon: "battery" },
  { name: "Facilities DM (BMS)", detail: "Building mgmt system — HVAC setpoint curtailment", kw: 333, icon: "dashboard" },
  { name: "HPCH program (Cone bldg)", detail: "High-performance curtailment — ERS & 4CP", kw: 246, icon: "zap" },
];

export const TOTAL_ENROLLED_KW = SITES.reduce((sum, s) => sum + s.enrolledKw, 0);

// Simulated monthly settlement history (3 most recent periods)
const SETTLEMENT_MONTHS = [
  { period: "Apr 2025", days: 30, perfPct: 0.97, price: 3.50 },
  { period: "Mar 2025", days: 31, perfPct: 0.91, price: 3.50 },
  { period: "Feb 2025", days: 28, perfPct: 0.88, price: 3.25 },
];
const CLIENT_SHARE_PCT = 0.15;
const SHORTFALL_THRESHOLD = 0.90;

export const generateSettlement = (site) =>
  SETTLEMENT_MONTHS.map(({ period, days, perfPct, price }) => {
    const grossRevenue = site.enrolledKw * price * days * perfPct;
    const clientShare = grossRevenue * CLIENT_SHARE_PCT;
    const grossEarnings = grossRevenue - clientShare;
    const shortfall =
      perfPct < SHORTFALL_THRESHOLD
        ? (SHORTFALL_THRESHOLD - perfPct) * site.enrolledKw * price * days
        : 0;
    const netPayment = grossEarnings - shortfall;
    return {
      period,
      days,
      perfPct,
      price,
      grossRevenue,
      clientShare,
      grossEarnings,
      shortfall,
      netPayment,
    };
  });

// Simulated 15-min interval performance data
export const generatePerfData = (baselineKw, targetKw) => {
  const labels = [];
  const baseline = [];
  const target = [];
  const actual = [];
  const now = new Date();
  now.setMinutes(Math.floor(now.getMinutes() / 15) * 15, 0, 0);

  for (let i = -8; i <= 0; i++) {
    const t = new Date(now.getTime() + i * 15 * 60000);
    labels.push(t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    baseline.push(baselineKw);
    target.push(targetKw);
    // Simulate a ramp-down starting 6 intervals ago
    const progress = Math.max(0, (i + 8) / 6);
    const curtailed = (baselineKw - targetKw) * Math.min(1, progress * 1.1);
    actual.push(Math.round(baselineKw - curtailed + (Math.random() - 0.5) * baselineKw * 0.01));
  }
  return { labels, baseline, target, actual };
};
