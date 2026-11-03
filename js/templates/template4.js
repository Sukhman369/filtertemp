/* ═══════════════════════════════════════════════════════════
   TEMPLATE 4: Dual-Sector Split Layout (AirAsia / Return)
   ═══════════════════════════════════════════════════════════ */

function renderTemplate4() {
  const t = AppState.t4;
  const container = document.getElementById('poster-content-area');
  if (!container) return;

  const onwardChips = t.onwardSector.dates.map(d => `<div class="t4-date-chip">${d}</div>`).join('');
  const returnChips = t.returnSector.dates.map(d => `<div class="t4-date-chip">${d}</div>`).join('');

  container.innerHTML = `
    <!-- Header Banner -->
    <div class="t4-header-banner">${t.headerBanner}</div>

    <!-- Airline Logo -->
    <div class="airline-logo-box">
      <img src="${t.airlineLogo}" alt="Airline Logo">
    </div>

    <!-- Sectors Container -->
    <div class="t4-sectors-container">
      <!-- Onward Sector -->
      <div class="t4-sector-card">
        <div class="t4-sector-header">
          <span class="t4-sector-tag">${t.onwardSector.title}</span>
          <span class="t4-sector-flight">${t.onwardSector.flight}</span>
        </div>
        <div class="t4-sector-dates-grid">${onwardChips}</div>
      </div>

      <!-- Return Sector -->
      <div class="t4-sector-card">
        <div class="t4-sector-header">
          <span class="t4-sector-tag">${t.returnSector.title}</span>
          <span class="t4-sector-flight">${t.returnSector.flight}</span>
        </div>
        <div class="t4-sector-dates-grid">${returnChips}</div>
      </div>
    </div>

    <!-- Hero Price Box -->
    <div class="t4-hero-price">
      <div class="label">${t.priceLabel}</div>
      <div class="amount">${t.priceValue}</div>
    </div>

    <!-- Baggage Pill -->
    <div class="standard-baggage-pill" style="margin-top: 12px;">${t.baggage}</div>
  `;
}

function buildControls4() {
  const t = AppState.t4;
  const container = document.getElementById('template-specific-controls');
  if (!container) return;

  const airlineOptionsHtml = AIRLINE_OPTIONS.map(a => 
    `<option value="${a.logo}" ${a.logo === t.airlineLogo ? 'selected' : ''}>${a.name}</option>`
  ).join('');

  container.innerHTML = `
    <!-- Header & Airline -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>✈️</span> Route & Airline</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Header Banner Text</label>
          <input type="text" class="text-input" value="${t.headerBanner}" oninput="AppState.t4.headerBanner = this.value; renderTemplate4();">
        </div>
        <div>
          <label class="control-label">Airline Logo</label>
          <select class="select-input" onchange="AppState.t4.airlineLogo = this.value; renderTemplate4();">
            ${airlineOptionsHtml}
          </select>
        </div>
      </div>
    </div>

    <!-- Onward Sector -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>🛫</span> Onward Sector</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Flight Details Strip</label>
          <input type="text" class="text-input" value="${t.onwardSector.flight}" oninput="AppState.t4.onwardSector.flight = this.value; renderTemplate4();">
        </div>
        <div>
          <label class="control-label">Dates (Comma-Separated)</label>
          <input type="text" class="text-input" value="${t.onwardSector.dates.join(', ')}" oninput="AppState.t4.onwardSector.dates = this.value.split(',').map(s=>s.trim()).filter(Boolean); renderTemplate4();">
        </div>
      </div>
    </div>

    <!-- Return Sector -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>🛬</span> Return Sector</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Flight Details Strip</label>
          <input type="text" class="text-input" value="${t.returnSector.flight}" oninput="AppState.t4.returnSector.flight = this.value; renderTemplate4();">
        </div>
        <div>
          <label class="control-label">Dates (Comma-Separated)</label>
          <input type="text" class="text-input" value="${t.returnSector.dates.join(', ')}" oninput="AppState.t4.returnSector.dates = this.value.split(',').map(s=>s.trim()).filter(Boolean); renderTemplate4();">
        </div>
      </div>
    </div>

    <!-- Price & Baggage -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>💰</span> Price & Baggage</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Price Label</label>
          <input type="text" class="text-input" value="${t.priceLabel}" oninput="AppState.t4.priceLabel = this.value; renderTemplate4();">
        </div>
        <div>
          <label class="control-label">Price Amount</label>
          <input type="text" class="text-input" value="${t.priceValue}" oninput="AppState.t4.priceValue = this.value; renderTemplate4();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.baggage}" oninput="AppState.t4.baggage = this.value; renderTemplate4();">
        </div>
      </div>
    </div>
  `;
}
