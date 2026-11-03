/* ═══════════════════════════════════════════════════════════
   TEMPLATE 3: 4-Quadrant Fixed Departures Grid
   ═══════════════════════════════════════════════════════════ */

function renderTemplate3() {
  const t = AppState.t3;
  const container = document.getElementById('poster-content-area');
  if (!container) return;

  const quadsHtml = t.quadrants.map(q => {
    const datesRows = q.dates.map(d => `
      <div class="t3-quad-date-row">
        <span>${d.date}</span>
        <span class="t3-quad-fare">${d.price}</span>
      </div>
    `).join('');

    return `
      <div class="t3-quad-cell">
        <div class="t3-quad-logo">
          <img src="${t.airlineLogo}" alt="Airline Logo">
        </div>
        <div class="t3-quad-title">${q.sector}</div>
        <div class="t3-quad-pill">${q.flight}</div>
        <div class="t3-quad-dates">${datesRows}</div>
        <div class="t3-quad-baggage">${q.baggage}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Header Banner -->
    <div class="t3-header-banner">${t.headerBanner}</div>

    <!-- 2x2 Quadrant Grid -->
    <div class="t3-quad-grid">
      ${quadsHtml}
    </div>
  `;
}

function buildControls3() {
  const t = AppState.t3;
  const container = document.getElementById('template-specific-controls');
  if (!container) return;

  const airlineOptionsHtml = AIRLINE_OPTIONS.map(a => 
    `<option value="${a.logo}" ${a.logo === t.airlineLogo ? 'selected' : ''}>${a.name}</option>`
  ).join('');

  container.innerHTML = `
    <!-- Header Banner -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>📢</span> Header & Airline</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Header Banner Text</label>
          <input type="text" class="text-input" value="${t.headerBanner}" oninput="AppState.t3.headerBanner = this.value; renderTemplate3();">
        </div>
        <div>
          <label class="control-label">Airline Logo</label>
          <select class="select-input" onchange="AppState.t3.airlineLogo = this.value; renderTemplate3();">
            ${airlineOptionsHtml}
          </select>
        </div>
      </div>
    </div>

    <!-- Quadrants 1 & 2 -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>1️⃣</span> Quadrant 1 (Top Left)</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Flight Details Pill</label>
          <input type="text" class="text-input" value="${t.quadrants[0].flight}" oninput="AppState.t3.quadrants[0].flight = this.value; renderTemplate3();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.quadrants[0].baggage}" oninput="AppState.t3.quadrants[0].baggage = this.value; renderTemplate3();">
        </div>
      </div>
    </div>

    <div class="control-section">
      <div class="section-header">
        <h3><span>2️⃣</span> Quadrant 2 (Top Right)</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Flight Details Pill</label>
          <input type="text" class="text-input" value="${t.quadrants[1].flight}" oninput="AppState.t3.quadrants[1].flight = this.value; renderTemplate3();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.quadrants[1].baggage}" oninput="AppState.t3.quadrants[1].baggage = this.value; renderTemplate3();">
        </div>
      </div>
    </div>

    <!-- Quadrants 3 & 4 -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>3️⃣</span> Quadrant 3 (Bottom Left)</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Flight Details Pill</label>
          <input type="text" class="text-input" value="${t.quadrants[2].flight}" oninput="AppState.t3.quadrants[2].flight = this.value; renderTemplate3();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.quadrants[2].baggage}" oninput="AppState.t3.quadrants[2].baggage = this.value; renderTemplate3();">
        </div>
      </div>
    </div>

    <div class="control-section">
      <div class="section-header">
        <h3><span>4️⃣</span> Quadrant 4 (Bottom Right)</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Flight Details Pill</label>
          <input type="text" class="text-input" value="${t.quadrants[3].flight}" oninput="AppState.t3.quadrants[3].flight = this.value; renderTemplate3();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.quadrants[3].baggage}" oninput="AppState.t3.quadrants[3].baggage = this.value; renderTemplate3();">
        </div>
      </div>
    </div>
  `;
}

