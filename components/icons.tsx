// Lightweight inline icon set (stroke icons, inherit currentColor)
type P = { className?: string };
// Size defaults to 1rem; a passed h-/w- class overrides it
const sz = (c?: string) => (c && /\bh-/.test(c) ? c : `h-4 w-4 ${c ?? ""}`);
const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconArrow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconPhone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const IconMail = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
export const IconPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const IconClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
);
export const IconCheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base} strokeWidth={2.6}><path d="M20 6 9 17l-5-5" /></svg>
);
export const IconShield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconRoute = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg>
);
export const IconTruck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.7a1 1 0 0 0-.2-.6l-3.5-4.3A1 1 0 0 0 17.5 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
);
export const IconFile = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
);
export const IconChat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
export const IconStar = ({ className, filled = true }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={sz(className)} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
);
export const IconPlus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconMenu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const IconClose = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const IconLinkedIn = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" /></svg>
);
export const IconBuilding = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><rect x="3" y="7" width="18" height="12" rx="1" /><path d="M7 11h3M14 11h3M7 15h3M14 15h3M3 19h18" /></svg>
);
export const IconFactory = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M2 20V9l6 4V9l6 4V5h4l2 15z" /><path d="M2 20h20" /></svg>
);
export const IconHardHat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={sz(className)} {...base}><path d="M2 18h20M4 18v-3a8 8 0 0 1 16 0v3M10 7V5h4v2M10 7.3V12M14 7.3V12" /></svg>
);
