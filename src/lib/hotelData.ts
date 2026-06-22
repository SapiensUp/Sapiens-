export const hotelInfo = {
  name: "Andorra Park Hotel",
  category: "5 Stars Luxury",
  rooms: 40,
  location: "Andorra la Vella",
  currency: "EUR",
};

export const kpiData = {
  occupancy: { value: 78.4, change: +3.2, target: 82 },
  adr: { value: 385, change: +12.5, target: 395 },
  revpar: { value: 301.9, change: +8.7, target: 324 },
  trevpar: { value: 487.3, change: +6.2, target: 510 },
  goppar: { value: 198.4, change: +4.8, target: 210 },
  alos: { value: 3.2, change: +0.3, target: 3.5 },
  nps: { value: 74, change: +6, target: 78 },
  gss: { value: 4.6, change: +0.2, target: 4.8 },
  cancellation: { value: 8.3, change: -1.2, target: 7 },
  fbRevenue: { value: 48200, change: +9.4, target: 52000 },
  spaRevenue: { value: 18750, change: +14.2, target: 20000 },
  totalRevenue: { value: 387600, change: +7.8, target: 415000 },
};

export const revenueMonthly = [
  { month: "Ene", revenue: 310000, target: 320000, rooms: 185000, fb: 72000, spa: 28000, other: 25000 },
  { month: "Feb", revenue: 295000, target: 305000, rooms: 175000, fb: 68000, spa: 25000, other: 27000 },
  { month: "Mar", revenue: 340000, target: 345000, rooms: 200000, fb: 82000, spa: 31000, other: 27000 },
  { month: "Abr", revenue: 368000, target: 360000, rooms: 218000, fb: 89000, spa: 34000, other: 27000 },
  { month: "May", revenue: 382000, target: 375000, rooms: 225000, fb: 93000, spa: 36000, other: 28000 },
  { month: "Jun", revenue: 421000, target: 410000, rooms: 248000, fb: 102000, spa: 42000, other: 29000 },
  { month: "Jul", revenue: 458000, target: 440000, rooms: 270000, fb: 115000, spa: 48000, other: 25000 },
  { month: "Ago", revenue: 469000, target: 450000, rooms: 278000, fb: 118000, spa: 49000, other: 24000 },
  { month: "Sep", revenue: 398000, target: 395000, rooms: 235000, fb: 98000, spa: 41000, other: 24000 },
  { month: "Oct", revenue: 374000, target: 370000, rooms: 220000, fb: 91000, spa: 38000, other: 25000 },
  { month: "Nov", revenue: 328000, target: 330000, rooms: 195000, fb: 78000, spa: 32000, other: 23000 },
  { month: "Dic", revenue: 387600, target: 415000, rooms: 228000, fb: 98000, spa: 38000, other: 23600 },
];

export const occupancyData = [
  { month: "Ene", occupancy: 65.2, adr: 340, revpar: 221.7 },
  { month: "Feb", occupancy: 62.8, adr: 325, revpar: 204.1 },
  { month: "Mar", occupancy: 71.4, adr: 355, revpar: 253.5 },
  { month: "Abr", occupancy: 76.8, adr: 368, revpar: 282.6 },
  { month: "May", occupancy: 79.2, adr: 374, revpar: 296.2 },
  { month: "Jun", occupancy: 84.6, adr: 392, revpar: 331.6 },
  { month: "Jul", occupancy: 91.3, adr: 415, revpar: 378.9 },
  { month: "Ago", occupancy: 92.8, adr: 418, revpar: 387.9 },
  { month: "Sep", occupancy: 82.4, adr: 385, revpar: 317.2 },
  { month: "Oct", occupancy: 77.6, adr: 372, revpar: 288.7 },
  { month: "Nov", occupancy: 68.9, adr: 348, revpar: 239.8 },
  { month: "Dic", occupancy: 78.4, adr: 385, revpar: 301.9 },
];

export const channelMix = [
  { name: "Directo Web", value: 32, color: "#c9a84c" },
  { name: "OTA (Booking/Expedia)", value: 28, color: "#3b82f6" },
  { name: "Corporativo", value: 22, color: "#10b981" },
  { name: "Tour Operador", value: 12, color: "#8b5cf6" },
  { name: "GDS", value: 4, color: "#f59e0b" },
  { name: "Walk-in", value: 2, color: "#6b7280" },
];

export const guestSatisfaction = [
  { category: "Habitaciones", score: 4.7, reviews: 342 },
  { category: "Servicio", score: 4.8, reviews: 358 },
  { category: "Restaurante", score: 4.5, reviews: 298 },
  { category: "Spa & Wellness", score: 4.6, reviews: 187 },
  { category: "Ubicación", score: 4.9, reviews: 342 },
  { category: "Limpieza", score: 4.8, reviews: 342 },
  { category: "Relación Calidad-Precio", score: 4.3, reviews: 342 },
];

export const guestOrigins = [
  { country: "España", percentage: 34, guests: 1820 },
  { country: "Francia", percentage: 18, guests: 963 },
  { country: "Reino Unido", percentage: 12, guests: 642 },
  { country: "Alemania", percentage: 9, guests: 481 },
  { country: "Portugal", percentage: 7, guests: 374 },
  { country: "Países Bajos", percentage: 6, guests: 321 },
  { country: "Otros", percentage: 14, guests: 748 },
];

export const weeklyOccupancy = [
  { day: "Lun", occupancy: 71, revenue: 10850 },
  { day: "Mar", occupancy: 73, revenue: 11120 },
  { day: "Mié", occupancy: 76, revenue: 11580 },
  { day: "Jue", occupancy: 79, revenue: 12010 },
  { day: "Vie", occupancy: 88, revenue: 13360 },
  { day: "Sáb", occupancy: 95, revenue: 14420 },
  { day: "Dom", occupancy: 82, revenue: 12460 },
];

export const operationsData = {
  staff: {
    total: 128,
    byDept: [
      { dept: "Recepción", count: 18 },
      { dept: "Housekeeping", count: 32 },
      { dept: "Restaurante & Bar", count: 28 },
      { dept: "Cocina", count: 22 },
      { dept: "Spa & Wellness", count: 12 },
      { dept: "Mantenimiento", count: 8 },
      { dept: "Administración", count: 8 },
    ],
  },
  energyCost: { value: 28400, change: -3.2 },
  maintenanceRequests: { open: 3, inProgress: 2, closed: 18 },
  laborCostPct: { value: 28.4, change: -0.8 },
  roomRevenuePct: { value: 58.8 },
  fbRevenuePct: { value: 25.3 },
  spaRevenuePct: { value: 9.7 },
  otherRevenuePct: { value: 6.2 },
};

export const fbData = [
  { service: "Restaurante Gourmet", covers: 1240, revenue: 31200, avgCheck: 25.2 },
  { service: "Bar Lounge", covers: 2180, revenue: 10900, avgCheck: 5.0 },
  { service: "Room Service", covers: 385, revenue: 4850, avgCheck: 12.6 },
  { service: "Banquetes & Eventos", covers: 180, revenue: 5400, avgCheck: 30.0 },
];

export const forecastData = [
  { period: "Dic 2025", occupancy: 78, revpar: 302, confidence: 95 },
  { period: "Ene 2026", occupancy: 62, revpar: 218, confidence: 88 },
  { period: "Feb 2026", occupancy: 65, revpar: 228, confidence: 85 },
  { period: "Mar 2026", occupancy: 73, revpar: 262, confidence: 80 },
  { period: "Abr 2026", occupancy: 78, revpar: 291, confidence: 75 },
];

export const competitorData = [
  { hotel: "Andorra Park Hotel", revpar: 302, adr: 385, occupancy: 78.4 },
  { hotel: "Plaza Andorra", revpar: 278, adr: 362, occupancy: 76.8 },
  { hotel: "Diplomatic Hotel", revpar: 245, adr: 330, occupancy: 74.2 },
  { hotel: "Hotel Rutllan", revpar: 198, adr: 285, occupancy: 69.5 },
];
