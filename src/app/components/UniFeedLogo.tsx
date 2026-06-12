interface UniFeedLogoProps {
  size?: number;
  showWordmark?: boolean;
  onDark?: boolean;
}

export function UniFeedLogo({ size = 100, showWordmark = true, onDark = false }: UniFeedLogoProps) {
  const wordmarkH = showWordmark ? size * 0.30 : 0;
  const totalH = size + wordmarkH;
  const cx = size / 2;

  // Proportional geometry
  const rx = size * 0.22;           // tile corner radius

  // Tab handle (sits on top of lid)
  const tabW = size * 0.20;
  const tabH = size * 0.09;
  const tabX = cx - tabW / 2;
  const tabY = size * 0.34;
  const tabR = tabH * 0.5;

  // Lid (slightly wider than body)
  const lidW = size * 0.54;
  const lidH = size * 0.14;
  const lidX = cx - lidW / 2;
  const lidY = tabY + tabH - size * 0.02; // overlaps tab base slightly

  // Body
  const bodyW = size * 0.42;
  const bodyH = size * 0.27;
  const bodyX = cx - bodyW / 2;
  const bodyY = lidY + lidH;

  // Sprout stem runs from top of tab upward
  const stemBottomY = tabY + size * 0.01;
  const stemTopY    = size * 0.14;

  // Leaf junction points along the stem
  const lf1Y = stemBottomY - (stemBottomY - stemTopY) * 0.38;
  const lf2Y = stemBottomY - (stemBottomY - stemTopY) * 0.68;

  // Colours
  const tileFill   = onDark ? 'rgba(255,255,255,0.15)' : '#2ABFBF';
  const lidFill    = onDark ? 'rgba(255,255,255,0.88)' : '#EEF9F8';
  const bodyFill   = onDark ? '#FFFFFF' : '#FFFFFF';
  const tabFill    = lidFill;
  const divider    = 'rgba(42,191,191,0.18)';
  const leaf1      = '#27AE60';
  const leaf2      = '#2DC972';
  const stemColor  = '#27AE60';
  const wordColor  = onDark ? '#FFFFFF' : '#2C3E50';

  const sw = size * 0.026; // stem stroke width

  return (
    <svg
      width={size}
      height={totalH}
      viewBox={`0 0 ${size} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="UniFeed logo"
    >
      {/* Tile */}
      <rect x={0} y={0} width={size} height={size} rx={rx} fill={tileFill} />

      {/* ── Sprout (behind lid so stem disappears into tab) ── */}
      <line
        x1={cx} y1={stemBottomY}
        x2={cx} y2={stemTopY}
        stroke={stemColor}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d={`
          M ${cx} ${lf1Y}
          C ${cx - size * 0.065} ${lf1Y - size * 0.055},
            ${cx - size * 0.135} ${lf1Y - size * 0.065},
            ${cx - size * 0.155} ${lf1Y - size * 0.135}
          C ${cx - size * 0.09}  ${lf1Y - size * 0.135},
            ${cx - size * 0.025} ${lf1Y - size * 0.065},
            ${cx} ${lf1Y} Z
        `}
        fill={leaf1}
      />
      {/* Right leaf */}
      <path
        d={`
          M ${cx} ${lf2Y}
          C ${cx + size * 0.065} ${lf2Y - size * 0.055},
            ${cx + size * 0.135} ${lf2Y - size * 0.065},
            ${cx + size * 0.155} ${lf2Y - size * 0.135}
          C ${cx + size * 0.09}  ${lf2Y - size * 0.135},
            ${cx + size * 0.025} ${lf2Y - size * 0.065},
            ${cx} ${lf2Y} Z
        `}
        fill={leaf2}
        opacity={0.9}
      />

      {/* ── Tab handle ── */}
      <rect x={tabX} y={tabY} width={tabW} height={tabH} rx={tabR} fill={tabFill} />

      {/* ── Lid ── */}
      <rect x={lidX} y={lidY} width={lidW} height={lidH} rx={size * 0.04} fill={lidFill} />

      {/* Lid–body divider */}
      <rect
        x={lidX} y={bodyY - size * 0.012}
        width={lidW} height={size * 0.012}
        fill={divider}
      />

      {/* ── Box body ── */}
      <rect x={bodyX} y={bodyY} width={bodyW} height={bodyH} rx={size * 0.03} fill={bodyFill} />

      {/* Subtle centre fold line on body */}
      <line
        x1={cx} y1={bodyY + bodyH * 0.2}
        x2={cx} y2={bodyY + bodyH * 0.8}
        stroke="rgba(42,191,191,0.14)"
        strokeWidth={size * 0.012}
      />

      {/* ── Wordmark ── */}
      {showWordmark && (
        <text
          x={cx}
          y={size + wordmarkH * 0.70}
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize={size * 0.152}
          fontWeight={700}
          fill={wordColor}
          letterSpacing={size * 0.003}
        >
          UniFeed
        </text>
      )}
    </svg>
  );
}
