const pad = (n: number) => n.toString().padStart(2, "0");

export const toLocalDateString = (d: Date = new Date()): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const getTodayDateStr = (): string => toLocalDateString();

export const addDays = (d: Date, days: number): string => {
  const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  return toLocalDateString(next);
};