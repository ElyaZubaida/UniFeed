// Pin positions keyed by listing location string — mapped to the SVG viewBox (260 × 165)
const LOCATION_PINS: Record<string, { x: number; y: number }> = {
  'Kolej Delima Canteen':        { x: 224, y: 102 },
  'Main Cafe, Blok A':           { x: 92,  y: 102 },
  'Faculty of Business Cafe':    { x: 63,  y: 143 },
  'Student Plaza, Level 1':      { x: 194, y: 56  },
  'Dewan Seri Budiman, Level 2': { x: 63,  y: 55  },
  'Faculty of Languages, Foyer': { x: 163, y: 22  },
  'Kolej Perindu Dewan Makan':   { x: 34,  y: 105 },
  'Library Block, Ground Floor': { x: 224, y: 22  },
};

// Snappable building centroids for the interactive picker
export const CAMPUS_BUILDINGS = [
  { name: 'Admin Block',            x: 34,  y: 22  },
  { name: 'Pusat Islam',            x: 90,  y: 22  },
  { name: 'Dewan Besar',            x: 63,  y: 55  },
  { name: 'Faculty of Languages',   x: 163, y: 22  },
  { name: 'Library Block',          x: 224, y: 22  },
  { name: 'Student Centre',         x: 194, y: 56  },
  { name: 'Kolej Perindu',          x: 34,  y: 105 },
  { name: 'Main Canteen',           x: 92,  y: 102 },
  { name: 'Faculty of Business',    x: 63,  y: 143 },
  { name: 'Kolej Delima',           x: 163, y: 105 },
  { name: 'Kolej Delima Canteen',   x: 224, y: 102 },
  { name: 'Sports Complex',         x: 194, y: 143 },
];

// ─── Map pin marker ───────────────────────────────────────────────
function PinMarker({ x, y, color = '#2ABFBF' }: { x: number; y: number; color?: string }) {
  return (
    <g>
      {/* Shadow */}
      <ellipse cx={x} cy={y + 1.5} rx={5} ry={2.5} fill="rgba(0,0,0,0.18)" />
      {/* Pin body */}
      <path
        d={`M ${x} ${y + 2}
            C ${x - 7} ${y - 3}, ${x - 7} ${y - 13}, ${x} ${y - 13}
            C ${x + 7} ${y - 13}, ${x + 7} ${y - 3}, ${x} ${y + 2} Z`}
        fill={color}
      />
      {/* Inner dot */}
      <circle cx={x} cy={y - 8} r={2.8} fill="white" />
    </g>
  );
}

// ─── Building label (tiny, optional) ─────────────────────────────
function BuildingLabel({ x, y, w, h, text }: { x: number; y: number; w: number; h: number; text: string }) {
  return (
    <text
      x={x + w / 2}
      y={y + h / 2 + 2.5}
      textAnchor="middle"
      fontSize={5.2}
      fill="#4A8080"
      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
    >
      {text}
    </text>
  );
}

// ─── Shared SVG map background (buildings + roads) ────────────────
export function MapBackground() {
  return (
    <>
      {/* Map ground */}
      <rect x={0} y={0} width={260} height={165} fill="#E4F2F2" />

      {/* ── Roads ── */}
      {/* Main horizontal road */}
      <rect x={0}   y={72}  width={260} height={13} fill="#FFFFFF" opacity={0.85} />
      {/* Main vertical road */}
      <rect x={122} y={0}   width={13}  height={165} fill="#FFFFFF" opacity={0.85} />
      {/* Secondary horizontal path */}
      <rect x={0}   y={36}  width={260} height={7}  fill="#F0F8F8" />
      {/* Road edge lines */}
      <line x1={0} y1={72}  x2={260} y2={72}  stroke="#C8DEDE" strokeWidth={0.5} />
      <line x1={0} y1={85}  x2={260} y2={85}  stroke="#C8DEDE" strokeWidth={0.5} />
      <line x1={122} y1={0} x2={122} y2={165} stroke="#C8DEDE" strokeWidth={0.5} />
      <line x1={135} y1={0} x2={135} y2={165} stroke="#C8DEDE" strokeWidth={0.5} />

      {/* ── Green spaces ── */}
      <rect x={8}   y={43}  width={40} height={27} rx={2} fill="#C8E6C9" opacity={0.7} />
      <rect x={148} y={128} width={30} height={22} rx={2} fill="#C8E6C9" opacity={0.7} />

      {/* ── Buildings — top-left quadrant ── */}
      <rect x={8}  y={8}  width={52} height={27} rx={2} fill="#B8DADA" />
      <BuildingLabel x={8}  y={8}  w={52} h={27} text="Admin Block" />
      <rect x={66} y={8}  width={49} height={27} rx={2} fill="#B8DADA" />
      <BuildingLabel x={66} y={8}  w={49} h={27} text="Pusat Islam" />
      <rect x={55} y={43} width={61} height={27} rx={2} fill="#C8E4E4" />
      <BuildingLabel x={55} y={43} w={61} h={27} text="Dewan Besar" />

      {/* ── Buildings — top-right quadrant ── */}
      <rect x={137} y={8}  width={55} height={27} rx={2} fill="#B8DADA" />
      <BuildingLabel x={137} y={8}  w={55} h={27} text="Fac. Languages" />
      <rect x={198} y={8}  width={53} height={27} rx={2} fill="#B8DADA" />
      <BuildingLabel x={198} y={8}  w={53} h={27} text="Library" />
      <rect x={137} y={43} width={114} height={27} rx={2} fill="#C8E4E4" />
      <BuildingLabel x={137} y={43} w={114} h={27} text="Student Centre" />

      {/* ── Buildings — bottom-left quadrant ── */}
      <rect x={8}   y={88}  width={53} height={36} rx={2} fill="#B8DADA" />
      <BuildingLabel x={8}   y={88}  w={53} h={36} text="Kolej Perindu" />
      <rect x={67}  y={88}  width={49} height={28} rx={2} fill="#C8E4E4" />
      <BuildingLabel x={67}  y={88}  w={49} h={28} text="Main Canteen" />
      <rect x={8}   y={130} width={108} height={27} rx={2} fill="#B8DADA" />
      <BuildingLabel x={8}   y={130} w={108} h={27} text="Faculty of Business" />

      {/* ── Buildings — bottom-right quadrant ── */}
      <rect x={137} y={88}  width={55} height={36} rx={2} fill="#B8DADA" />
      <BuildingLabel x={137} y={88}  w={55} h={36} text="Kolej Delima" />
      <rect x={198} y={88}  width={53} height={28} rx={2} fill="#C8E4E4" />
      <BuildingLabel x={198} y={88}  w={53} h={28} text="KD Canteen" />
      <rect x={137} y={130} width={114} height={27} rx={2} fill="#B8DADA" />
      <BuildingLabel x={137} y={130} w={114} h={27} text="Sports Complex" />

      {/* Campus boundary */}
      <rect x={0} y={0} width={260} height={165} fill="none" stroke="#A8D0D0" strokeWidth={1} />
    </>
  );
}

// ─── Static map (for Listing Detail) ─────────────────────────────
interface StaticCampusMapProps {
  location: string;
}

export function StaticCampusMap({ location }: StaticCampusMapProps) {
  const pin = LOCATION_PINS[location] ?? { x: 130, y: 82 };

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <svg
        viewBox="0 0 260 165"
        width="100%"
        style={{ display: 'block' }}
        aria-label={`Campus map showing ${location}`}
      >
        <MapBackground />
        {/* Highlight ring at pin */}
        <circle cx={pin.x} cy={pin.y - 8} r={11} fill="rgba(42,191,191,0.18)" />
        <PinMarker x={pin.x} y={pin.y} />
      </svg>

      {/* Footer strip */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: 'var(--secondary)', borderTop: '1px solid var(--border)' }}
      >
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>📍</span>
        <span className="text-xs" style={{ color: 'var(--accent)', fontWeight: 500 }}>{location}</span>
      </div>
    </div>
  );
}

// ─── Interactive map picker (for Add Listing) ─────────────────────
interface MapPickerProps {
  selectedBuilding: string | null;
  onSelect: (buildingName: string) => void;
}

export function MapPicker({ selectedBuilding, onSelect }: MapPickerProps) {
  const pin = selectedBuilding
    ? CAMPUS_BUILDINGS.find((b) => b.name === selectedBuilding)
    : null;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    // Convert click to viewBox coordinates
    const scaleX = 260 / rect.width;
    const scaleY = 165 / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Snap to nearest building
    let nearest = CAMPUS_BUILDINGS[0];
    let nearestDist = Infinity;
    for (const b of CAMPUS_BUILDINGS) {
      const d = Math.hypot(b.x - clickX, b.y - clickY);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = b;
      }
    }
    onSelect(nearest.name);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {!selectedBuilding && (
        <div
          className="flex items-center justify-center gap-1.5 py-1.5"
          style={{ backgroundColor: 'var(--secondary)', borderBottom: '1px solid var(--border)' }}
        >
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Tap the map to mark your collection point
          </span>
        </div>
      )}
      <svg
        viewBox="0 0 260 165"
        width="100%"
        style={{ display: 'block', cursor: 'crosshair' }}
        onClick={handleClick}
        aria-label="Campus map — tap to select pickup location"
      >
        <MapBackground />

        {/* Building hit-targets (highlight on hover) */}
        {CAMPUS_BUILDINGS.map((b) => (
          <circle
            key={b.name}
            cx={b.x}
            cy={b.y}
            r={18}
            fill={selectedBuilding === b.name ? 'rgba(42,191,191,0.22)' : 'transparent'}
          />
        ))}

        {/* Selected pin */}
        {pin && (
          <>
            <circle cx={pin.x} cy={pin.y - 8} r={12} fill="rgba(42,191,191,0.2)" />
            <PinMarker x={pin.x} y={pin.y} />
          </>
        )}
      </svg>

      {/* Selection readout */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: 'var(--secondary)', borderTop: '1px solid var(--border)' }}
      >
        {selectedBuilding ? (
          <>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>📍</span>
            <span className="text-xs flex-1" style={{ color: 'var(--accent)', fontWeight: 500 }}>
              {selectedBuilding}
            </span>
            <button
              type="button"
              onClick={() => onSelect('')}
              className="text-xs"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Change
            </button>
          </>
        ) : (
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            No location selected
          </span>
        )}
      </div>
    </div>
  );
}
