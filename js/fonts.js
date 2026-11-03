/* ═══════════════════════════════════════════════════════════
   FONTS LIBRARY & TYPOGRAPHY MANAGER
   ═══════════════════════════════════════════════════════════ */

const AVAILABLE_FONTS = [
  { id: 'Inter', name: 'Inter (Supreme Readability)', family: "'Inter', sans-serif", defaultWeight: '600' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Modern Travel)', family: "'Plus Jakarta Sans', sans-serif", defaultWeight: '600' },
  { id: 'Montserrat', name: 'Montserrat (Geometric & Punchy)', family: "'Montserrat', sans-serif", defaultWeight: '700' },
  { id: 'Poppins', name: 'Poppins (Clean Geometric)', family: "'Poppins', sans-serif", defaultWeight: '600' },
  { id: 'Outfit', name: 'Outfit (Contemporary Crisp)', family: "'Outfit', sans-serif", defaultWeight: '600' },
  { id: 'DM Sans', name: 'DM Sans (High-Legibility Numbers)', family: "'DM Sans', sans-serif", defaultWeight: '700' },
  { id: 'Work Sans', name: 'Work Sans (Balanced Display)', family: "'Work Sans', sans-serif", defaultWeight: '600' },
  { id: 'Roboto', name: 'Roboto (Google Standard)', family: "'Roboto', sans-serif", defaultWeight: '700' },
  { id: 'Open Sans', name: 'Open Sans (Neutral & Clear)', family: "'Open Sans', sans-serif", defaultWeight: '600' },
  { id: 'Lexend', name: 'Lexend (Reading Fluency Optimized)', family: "'Lexend', sans-serif", defaultWeight: '600' },
  { id: 'Barlow', name: 'Barlow (Standard Balanced)', family: "'Barlow', sans-serif", defaultWeight: '700' },
  { id: 'Figtree', name: 'Figtree (Friendly Modern)', family: "'Figtree', sans-serif", defaultWeight: '600' }
];

const AVAILABLE_WEIGHTS = [
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi-Bold (600) — Recommended' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra-Bold (800)' }
];

function initFontControls() {
  const fontSelect = document.getElementById('font-family-select');
  const weightSelect = document.getElementById('font-weight-select');

  if (fontSelect) {
    fontSelect.innerHTML = AVAILABLE_FONTS.map(f => 
      `<option value="${f.id}" ${f.id === AppState.typography.fontFamily ? 'selected' : ''}>${f.name}</option>`
    ).join('');

    fontSelect.addEventListener('change', (e) => {
      AppState.typography.fontFamily = e.target.value;
      applyTypography();
    });
  }

  if (weightSelect) {
    weightSelect.innerHTML = AVAILABLE_WEIGHTS.map(w => 
      `<option value="${w.value}" ${w.value === AppState.typography.fontWeight ? 'selected' : ''}>${w.label}</option>`
    ).join('');

    weightSelect.addEventListener('change', (e) => {
      AppState.typography.fontWeight = e.target.value;
      applyTypography();
    });
  }

  applyTypography();
}

function applyTypography() {
  const selectedFont = AVAILABLE_FONTS.find(f => f.id === AppState.typography.fontFamily) || AVAILABLE_FONTS[0];
  const weight = AppState.typography.fontWeight || '600';
  const scale = AppState.typography.fontSizeScale || 1;

  document.documentElement.style.setProperty('--poster-font', selectedFont.family);
  document.documentElement.style.setProperty('--poster-weight', weight);
  document.documentElement.style.setProperty('--font-scale', scale);
}

