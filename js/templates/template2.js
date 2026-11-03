/* ═══════════════════════════════════════════════════════════
   TEMPLATE 2: Destination Script & Hero Price Banner
   ═══════════════════════════════════════════════════════════ */

function renderTemplate2() {
  const t = AppState.t2;
  const container = document.getElementById('poster-content-area');
  if (!container) return;

  const col1Html = t.col1Dates.map(d => `<div class="t2-date-item">${d}</div>`).join('');
  const col2Html = t.col2Dates.map(d => `<div class="t2-date-item">${d}</div>`).join('');

  container.innerHTML = `
    <!-- 1. Destination Script Header -->
    <div class="t2-script">${t.scriptTitle}</div>

    <!-- 2. Airline Logo -->
    <div class="airline-logo-box">
      <img src="${t.airlineLogo}" alt="Airline Logo">
    </div>

    <!-- 3. Big Route Title -->
    <div class="t2-route-title">${t.routeTitle}</div>

    <!-- 4. Flight Timings Bar -->
    <div class="t2-timings-box">
      <div>${t.timing1}</div>
      <div>${t.timing2}</div>
    </div>

    <!-- 5. 2-Column Date Grid Card -->
    <div class="dynamic-card t2-dates-card">
      <div class="flex flex-col">${col1Html}</div>
      <div class="flex flex-col">${col2Html}</div>
    </div>

    <!-- 6. Hero Price Banner -->
    <div class="t2-price-banner">${t.price}</div>

    <!-- 7. Baggage Pill -->
    <div class="standard-baggage-pill" style="margin-top: 14px;">${t.baggage}</div>
  `;
}

function buildControls2() {
  const t = AppState.t2;
  const container = document.getElementById('template-specific-controls');
  if (!container) return;

  const airlineOptionsHtml = AIRLINE_OPTIONS.map(a => 
    `<option value="${a.logo}" ${a.logo === t.airlineLogo ? 'selected' : ''}>${a.name}</option>`
  ).join('');

  container.innerHTML = `
    <!-- Script Header & Airline -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>✨</span> Header & Destination</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Destination Cursive Text</label>
          <input type="text" class="text-input" value="${t.scriptTitle}" oninput="AppState.t2.scriptTitle = this.value; renderTemplate2();">
        </div>
        <div>
          <label class="control-label">Airline Logo</label>
          <select class="select-input" onchange="AppState.t2.airlineLogo = this.value; renderTemplate2();">
            ${airlineOptionsHtml}
          </select>
        </div>
        <div>
          <label class="control-label">Route Title</label>
          <input type="text" class="text-input" value="${t.routeTitle}" oninput="AppState.t2.routeTitle = this.value; renderTemplate2();">
        </div>
      </div>
    </div>

    <!-- Flight Timings -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>🕒</span> Flight Timings</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Outbound Timing Strip</label>
          <input type="text" class="text-input" value="${t.timing1}" oninput="AppState.t2.timing1 = this.value; renderTemplate2();">
        </div>
        <div>
          <label class="control-label">Inbound Timing Strip</label>
          <input type="text" class="text-input" value="${t.timing2}" oninput="AppState.t2.timing2 = this.value; renderTemplate2();">
        </div>
      </div>
    </div>

    <!-- Price & Baggage -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>💰</span> Fare & Baggage</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Hero Price Banner</label>
          <input type="text" class="text-input" value="${t.price}" oninput="AppState.t2.price = this.value; renderTemplate2();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.baggage}" oninput="AppState.t2.baggage = this.value; renderTemplate2();">
        </div>
      </div>
    </div>

    <!-- Dates List (Col 1 & Col 2) -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>📅</span> Left Column Dates</h3>
        <button class="btn-mini btn-mini-primary" onclick="addT2Date(1)">+ Add</button>
      </div>
      <div class="section-body" id="t2-col1-rows">
        ${renderT2DateList(1)}
      </div>
    </div>

    <div class="control-section">
      <div class="section-header">
        <h3><span>📅</span> Right Column Dates</h3>
        <button class="btn-mini btn-mini-primary" onclick="addT2Date(2)">+ Add</button>
      </div>
      <div class="section-body" id="t2-col2-rows">
        ${renderT2DateList(2)}
      </div>
    </div>
  `;
}

function renderT2DateList(col) {
  const dates = col === 1 ? AppState.t2.col1Dates : AppState.t2.col2Dates;
  return dates.map((d, idx) => `
    <div class="flex items-center gap-2">
      <input type="text" class="text-input" value="${d}" oninput="updateT2Date(${col}, ${idx}, this.value)">
      <button class="btn-mini btn-mini-danger" onclick="deleteT2Date(${col}, ${idx})">✕</button>
    </div>
  `).join('');
}

function updateT2Date(col, idx, val) {
  if (col === 1) AppState.t2.col1Dates[idx] = val;
  else AppState.t2.col2Dates[idx] = val;
  renderTemplate2();
}

function addT2Date(col) {
  if (col === 1) AppState.t2.col1Dates.push('01 APR 27 - 08 APR 27');
  else AppState.t2.col2Dates.push('05 APR 27 - 12 APR 27');
  buildControls2();
  renderTemplate2();
}

function deleteT2Date(col, idx) {
  if (col === 1 && AppState.t2.col1Dates.length > 1) AppState.t2.col1Dates.splice(idx, 1);
  else if (col === 2 && AppState.t2.col2Dates.length > 1) AppState.t2.col2Dates.splice(idx, 1);
  buildControls2();
  renderTemplate2();
}
