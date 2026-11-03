/* ═══════════════════════════════════════════════════════════
   CENTRAL STATE & REACTIVE DATA STORE
   ═══════════════════════════════════════════════════════════ */

const AIRLINE_OPTIONS = [
  { name: 'Malaysia Airlines', logo: 'airlines/malaysia-airlines.svg' },
  { name: 'Singapore Airlines', logo: 'airlines/singapore-airlines-exact.png' },
  { name: 'Air India', logo: 'airlines/air-india.svg' },
  { name: 'AirAsia X', logo: 'airlines/airasia-x.png' },
  { name: 'IndiGo', logo: 'airlines/indigo.svg' },
  { name: 'Qatar Airways', logo: 'airlines/qatar-airways.svg' },
  { name: 'Virgin Atlantic', logo: 'airlines/virgin-atlantic.svg' },
  { name: 'Lufthansa', logo: 'airlines/lufthansa.svg' },
  { name: 'Emirates', logo: 'airlines/emirates.svg' },
  { name: 'Etihad Airways', logo: 'airlines/etihad-airways.svg' },
  { name: 'Scoot', logo: 'airlines/scoot.png' },
  { name: 'Air Arabia', logo: 'airlines/air-arabia.png' },
  { name: 'Air India Express', logo: 'airlines/air-india-express.png' },
  { name: 'Turkish Airlines', logo: 'airlines/turkish-airlines.png' },
  { name: 'KLM', logo: 'airlines/klm.png' },
  { name: 'Jazeera Airways', logo: 'airlines/jazeera-airways.png' },
  { name: 'Vistara', logo: 'airlines/vistara.svg' }
];

const AppState = {
  activeTemplate: 1,

  typography: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSizeScale: 1
  },

  cardStyle: {
    width: 820,
    minHeight: 'auto',
    paddingY: 12,
    paddingX: 24,
    bg: '#ffffff',
    bgOpacity: 1,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    shadow: 'medium'
  },

  // Template 1: Classic Dual Route & Date Pills
  t1: {
    tagline: 'BEST RATES FOR EVERY JOURNEY',
    airlineLogo: 'airlines/malaysia-airlines.svg',
    r1Name: 'DELHI – BALI – DELHI',
    r1Segs: [
      'MH 191 DEL-KUL | 23:00 – 06:55',
      'MH 715 KUL-DPS | 09:00 – 12:05',
      'MH 714 DPS-KUL | 13:05 – 16:00',
      'MH 190 KUL-DEL | 18:50 – 21:50'
    ],
    r1Rows: [
      ['16 JAN – 23 JAN', '₹49,999'],
      ['17 JAN – 24 JAN', '₹49,999'],
      ['23 JAN – 30 JAN', '₹49,999'],
      ['24 JAN – 31 JAN', '₹49,999']
    ],
    r2Name: 'AMRITSAR – BALI – AMRITSAR',
    r2Segs: [
      'MH 119 ATQ-KUL | 23:15 – 06:10',
      'MH 715 KUL-DPS | 09:00 – 12:05',
      'MH 714 DPS-KUL | 12:55 – 16:00',
      'MH 118 KUL-ATQ | 17:15 – 20:40'
    ],
    r2Rows: [
      ['18 JAN – 25 JAN', '₹48,999'],
      ['25 JAN – 01 FEB', '₹48,999'],
      ['01 FEB – 08 FEB', '₹48,999'],
      ['08 FEB – 15 FEB', '₹48,999']
    ],
    baggage: 'BAGGAGE: 30KG + 7KG'
  },

  // Template 2: Destination Script & Hero Price Banner (Bali style)
  t2: {
    scriptTitle: 'Bali',
    airlineLogo: 'airlines/singapore-airlines-exact.png',
    routeTitle: 'DELHI-BALI-DELHI',
    timing1: 'SQ403 DEL 21:45 → SIN 05:55    SQ934 SIN 06:45 → DPS 09:30',
    timing2: 'SQ947 DPS 21:30 → SIN 00:20    SQ402 SIN 02:25 → DEL 05:40',
    col1Dates: [
      '19 JAN 27 - 26 JAN 27',
      '22 JAN 27 - 29 JAN 27',
      '30 JAN 27 - 06 FEB 27',
      '04 FEB 27 - 11 FEB 27',
      '05 FEB 27 - 12 FEB 27',
      '09 FEB 27 - 16 FEB 27',
      '12 FEB 27 - 19 FEB 27',
      '13 FEB 27 - 20 FEB 27',
      '19 FEB 27 - 26 FEB 27'
    ],
    col2Dates: [
      '25 FEB 27 - 04 MAR 27',
      '26 FEB 27 - 05 MAR 27',
      '04 MAR 27 - 11 MAR 27',
      '05 MAR 27 - 12 MAR 27',
      '09 MAR 27 - 16 MAR 27',
      '12 MAR 27 - 19 MAR 27',
      '25 MAR 27 - 01 APR 27',
      '26 MAR 27 - 02 APR 27'
    ],
    price: '₹52,999/-',
    baggage: 'BAGGAGE: 25KG + 7KG'
  },

  // Template 3: 4-Quadrant Fixed Departures Grid
  t3: {
    headerBanner: 'DELHI - DUBAI FIXED DEPARTURES',
    airlineLogo: 'airlines/air-india.svg',
    quadrants: [
      {
        sector: 'DELHI - DUBAI',
        flight: '(AI 917) DEL 09:50 - DXB 12:45',
        dates: [
          { date: '07, 08 NOV', price: '₹15,500/-' },
          { date: '10, 11, 12, 13 NOV', price: '₹27,000/-' },
          { date: '15, 16, 17, 18 NOV', price: '₹27,000/-' },
          { date: '20, 21, 22, 23 NOV', price: '₹27,000/-' }
        ],
        baggage: 'BAGGAGE: 30KG + 7KG'
      },
      {
        sector: 'DELHI - DUBAI',
        flight: '(AI 995) DEL 19:20 - DXB 22:05',
        dates: [
          { date: '06 NOV', price: '₹15,500/-' },
          { date: '10, 11, 12, 13 NOV', price: '₹27,000/-' },
          { date: '15, 16, 17, 18 NOV', price: '₹27,000/-' },
          { date: '20, 21, 22, 23 NOV', price: '₹27,000/-' }
        ],
        baggage: 'BAGGAGE: 30KG + 7KG'
      },
      {
        sector: 'DELHI - DUBAI',
        flight: '(AI 915) DEL 16:10 - DXB 19:00',
        dates: [
          { date: '06, 07, 08 NOV', price: '₹15,500/-' },
          { date: '10, 11, 12, 13 NOV', price: '₹27,000/-' },
          { date: '15, 16, 17, 18 NOV', price: '₹27,000/-' },
          { date: '20, 21, 22, 23 NOV', price: '₹27,000/-' }
        ],
        baggage: 'BAGGAGE: 30KG + 7KG'
      },
      {
        sector: 'DELHI - DUBAI',
        flight: '(AI 929) DEL 07:30 - DXB 10:15',
        dates: [
          { date: '06, 07, 08 NOV', price: '₹15,500/-' },
          { date: '10, 11, 12, 13 NOV', price: '₹27,000/-' },
          { date: '15, 16, 17, 18 NOV', price: '₹27,000/-' },
          { date: '20, 21, 22, 23 NOV', price: '₹27,000/-' }
        ],
        baggage: 'BAGGAGE: 30KG + 7KG'
      }
    ]
  },

  // Template 4: Dual-Sector Split Layout
  t4: {
    headerBanner: 'AMRITSAR – KUALA LUMPUR',
    airlineLogo: 'airlines/airasia-x.png',
    onwardSector: {
      title: 'ONWARD SECTOR',
      flight: 'D7 189 ATQ 00:05 → KUL 08:35',
      dates: ['10 NOV', '14 NOV', '17 NOV', '21 NOV', '24 NOV', '28 NOV', '01 DEC', '05 DEC', '08 DEC', '12 DEC']
    },
    returnSector: {
      title: 'RETURN SECTOR',
      flight: 'D7 188 KUL 20:10 → ATQ 23:20',
      dates: ['15 NOV', '18 NOV', '22 NOV', '25 NOV', '29 NOV', '02 DEC', '06 DEC', '09 DEC', '13 DEC', '16 DEC']
    },
    priceLabel: 'STARTING RETURN FARE',
    priceValue: '₹19,999/-',
    baggage: 'BAGGAGE: 20KG CHECK-IN + 7KG CABIN'
  },

  // Template 5: Multi-City Departure Matrix & Inventory Table
  t5: {
    headerBanner: 'AUSTRALIA DEPARTURES 2024-2025',
    airlineLogo: 'airlines/scoot.png',
    rows: [
      { from: 'Amritsar', to: 'Melbourne', airline: 'Scoot', dates: '15 Nov – 10 Dec', fare: '₹38,999/-' },
      { from: 'Delhi', to: 'Melbourne', airline: 'Air India', dates: '10 Nov – 05 Dec', fare: '₹55,000/-' },
      { from: 'Amritsar', to: 'Sydney', airline: 'Scoot', dates: '20 Nov – 15 Dec', fare: '₹41,500/-' },
      { from: 'Delhi', to: 'Sydney', airline: 'Singapore Airlines', dates: '18 Nov – 12 Dec', fare: '₹58,999/-' },
      { from: 'Mumbai', to: 'Melbourne', airline: 'Qantas / Air India', dates: '25 Nov – 20 Dec', fare: '₹56,500/-' },
      { from: 'Amritsar', to: 'Perth', airline: 'Scoot', dates: '12 Nov – 08 Dec', fare: '₹37,999/-' }
    ],
    baggage: 'MEALS + 30KG CHECK-IN + 7KG CABIN INCLUDED'
  }
};

function applyCardStyles() {
  const c = AppState.cardStyle;
  const root = document.documentElement;

  root.style.setProperty('--card-width', `${c.width}px`);
  root.style.setProperty('--card-min-height', c.minHeight === 'auto' ? 'auto' : `${c.minHeight}px`);
  root.style.setProperty('--card-padding-y', `${c.paddingY}px`);
  root.style.setProperty('--card-padding-x', `${c.paddingX}px`);

  // Convert hex bg + opacity to rgba
  const hex = c.bg.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 255;
  const g = parseInt(hex.substring(2, 4), 16) || 255;
  const b = parseInt(hex.substring(4, 6), 16) || 255;
  const bgRgba = `rgba(${r}, ${g}, ${b}, ${c.bgOpacity})`;
  root.style.setProperty('--card-bg', bgRgba);

  root.style.setProperty('--card-border-width', `${c.borderWidth}px`);
  root.style.setProperty('--card-border-color', c.borderColor);
  root.style.setProperty('--card-border-radius', `${c.borderRadius}px`);

  // Shadows
  const shadows = {
    none: 'none',
    subtle: '0 4px 12px rgba(0, 20, 60, 0.06)',
    medium: '0 8px 24px rgba(0, 20, 60, 0.12)',
    bold: '0 16px 36px rgba(0, 20, 60, 0.22)'
  };
  root.style.setProperty('--card-shadow', shadows[c.shadow] || shadows.medium);
}
