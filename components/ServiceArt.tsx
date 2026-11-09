import type { Service } from "@/lib/site";

// Custom line illustrations for each service (drawn for dark panels).
// Used instead of stock photos where no real photo of the move type exists yet.

const G = "#d4ab20";
const W = "rgba(255,255,255,.9)";
const D = "rgba(255,255,255,.35)";

// Tractor cab facing right, front bumper at x
function Cab({ x = 300, y = 150 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x - 92} ${y - 86})`}>
      <path d="M0 70V18h44l14-18h22c8 0 12 4 12 10v60z" fill="#111213" stroke={W} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 8h24v24H40z" fill="rgba(212,171,32,.18)" stroke={G} strokeWidth="2" strokeLinejoin="round" />
      <rect x="78" y="40" width="10" height="20" rx="2" fill="none" stroke={D} strokeWidth="2" />
      <circle cx="20" cy="74" r="12" fill="#111213" stroke={W} strokeWidth="2.5" /><circle cx="20" cy="74" r="4" fill={G} />
      <circle cx="70" cy="74" r="12" fill="#111213" stroke={W} strokeWidth="2.5" /><circle cx="70" cy="74" r="4" fill={G} />
    </g>
  );
}

// Mobile office unit (trailer with windows + door + hitch)
function Office({ x, y, w = 190, h = 74, banner }: { x: number; y: number; w?: number; h?: number; banner?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#1b1c1e" stroke={W} strokeWidth="2.5" />
      <rect x={x + 14} y={y + 16} width="34" height="22" rx="2" fill="rgba(212,171,32,.22)" stroke={G} strokeWidth="2" />
      <rect x={x + w - 56} y={y + 16} width="34" height="22" rx="2" fill="rgba(212,171,32,.22)" stroke={G} strokeWidth="2" />
      <rect x={x + w / 2 - 12} y={y + 14} width="24" height={h - 14} rx="2" fill="none" stroke={D} strokeWidth="2" />
      <path d={`M${x} ${y + h - 12}h${w}`} stroke={G} strokeWidth="3" />
      <circle cx={x + 40} cy={y + h + 10} r="10" fill="#111213" stroke={W} strokeWidth="2.5" />
      <circle cx={x + 64} cy={y + h + 10} r="10" fill="#111213" stroke={W} strokeWidth="2.5" />
      {banner && (
        <g>
          <rect x={x + w / 2 - 52} y={y - 26} width="104" height="18" rx="2" fill={G} />
          <text x={x + w / 2} y={y - 13} textAnchor="middle" fontSize="10" fontWeight="800" fill="#010101" fontFamily="Arial, sans-serif" letterSpacing="1">{banner}</text>
        </g>
      )}
    </g>
  );
}

const Ground = () => <path d="M20 236h360" stroke={D} strokeWidth="2" strokeDasharray="10 8" className="animate-dash" />;

export default function ServiceArt({ art, className = "" }: { art: Service["art"]; className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-hidden="true">
      {art === "office" && (
        <g>
          <Office x={40} y={134} />
          <path d="M230 200h20" stroke={W} strokeWidth="3" />
          <Cab x={352} y={236} />
          <Ground />
          <g transform="translate(140 40)"><circle r="16" fill="none" stroke={G} strokeWidth="2.5" /><path d="M-6 0l4 4 8-8" stroke={G} strokeWidth="2.5" fill="none" /></g>
          <path d="M140 60v60" stroke={G} strokeWidth="2" strokeDasharray="4 5" />
        </g>
      )}
      {art === "modular" && (
        <g>
          <Office x={24} y={124} w={220} h={84} banner="OVERSIZE LOAD" />
          <path d="M244 200h16" stroke={W} strokeWidth="3" />
          <Cab x={352} y={236} />
          <Ground />
        </g>
      )}
      {art === "relocate" && (
        <g>
          <path d="M70 70 C 160 20, 240 140, 330 70" fill="none" stroke={G} strokeWidth="3" strokeDasharray="8 8" className="animate-dash" />
          <g transform="translate(70 70)"><circle r="10" fill={G} /><text y="-20" textAnchor="middle" fill={W} fontSize="12" fontFamily="Arial" fontWeight="700">SITE A</text></g>
          <g transform="translate(330 70)"><circle r="10" fill="none" stroke={G} strokeWidth="3" /><text y="-20" textAnchor="middle" fill={W} fontSize="12" fontFamily="Arial" fontWeight="700">SITE B</text></g>
          <Office x={60} y={144} w={170} h={66} />
          <path d="M230 200h20" stroke={W} strokeWidth="3" />
          <Cab x={352} y={236} />
          <Ground />
        </g>
      )}
      {art === "factory" && (
        <g>
          <path d="M30 210V120l40 26v-26l40 26V90h26l12 120z" fill="#1b1c1e" stroke={W} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M150 170h60" stroke={G} strokeWidth="3" strokeDasharray="8 8" className="animate-dash" />
          <path d="m202 162 10 8-10 8" fill="none" stroke={G} strokeWidth="3" />
          <g transform="translate(240 120)"><path d="M0 90V30L60 0l60 30v60z" fill="#1b1c1e" stroke={W} strokeWidth="2.5" strokeLinejoin="round" /><rect x="44" y="50" width="32" height="40" fill="rgba(212,171,32,.22)" stroke={G} strokeWidth="2" /></g>
          <Ground />
        </g>
      )}
      {art === "overflow" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.25} transform={`translate(${i * 22} ${-i * 34})`}>
              <Office x={36} y={140} w={180} h={64} />
            </g>
          ))}
          <path d="M216 194h20" stroke={W} strokeWidth="3" />
          <Cab x={340} y={226} />
          <text x="300" y="70" textAnchor="middle" fill={G} fontSize="34" fontWeight="800" fontFamily="Arial">+</text>
          <Ground />
        </g>
      )}
      {art === "return" && (
        <g>
          <path d="M320 70a90 50 0 1 0 0 70" fill="none" stroke={G} strokeWidth="3" strokeDasharray="8 8" className="animate-dash" transform="translate(-60 -20)" />
          <path d="m262 112 10 10-14 4" fill="none" stroke={G} strokeWidth="3" />
          <text x="200" y="88" textAnchor="middle" fill={W} fontSize="13" fontFamily="Arial" fontWeight="700" letterSpacing="2">BACK TO YARD</text>
          <Office x={40} y={150} w={170} h={64} />
          <path d="M210 204h30" stroke={W} strokeWidth="3" />
          <Cab x={350} y={236} />
          <Ground />
        </g>
      )}
      {art === "yard" && (
        <g>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}${c}`} x={40 + c * 110} y={40 + r * 62} width="90" height="40" rx="3" fill={r === 1 && c === 1 ? "rgba(212,171,32,.25)" : "#1b1c1e"} stroke={r === 1 && c === 1 ? G : D} strokeWidth="2" />
            )),
          )}
          <path d="M175 122 C 240 122, 260 60, 290 60" fill="none" stroke={G} strokeWidth="3" strokeDasharray="8 8" className="animate-dash" />
          <path d="M20 232h360" stroke={D} strokeWidth="2" />
        </g>
      )}
      {art === "clock" && (
        <g>
          <g transform="translate(300 76)">
            <circle r="42" fill="#1b1c1e" stroke={G} strokeWidth="3" />
            <path d="M0-26V0l18 10" stroke={W} strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle r="56" fill="none" stroke={G} strokeWidth="1.5" strokeDasharray="3 7" />
          </g>
          <Office x={40} y={150} w={170} h={64} />
          <path d="M210 204h30" stroke={W} strokeWidth="3" />
          <Cab x={350} y={236} />
          <path d="M20 120h60M10 136h50" stroke={G} strokeWidth="3" strokeLinecap="round" />
          <Ground />
        </g>
      )}
    </svg>
  );
}
