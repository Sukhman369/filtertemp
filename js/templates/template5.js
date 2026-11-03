/* ═══════════════════════════════════════════════════════════
   TEMPLATE 5: Multi-City Departure Matrix & Inventory Table
   ═══════════════════════════════════════════════════════════ */

function renderTemplate5() {
  const t = AppState.t5;
  const container = document.getElementById('poster-content-area');
  if (!container) return;

  const rowsHtml = t.rows.map(r => `
    <tr class="data-row">
      <td>${r.from}</td>
      <td>${r.to}</td>
      <td>${r.airline}</td>
      <td>${r.dates}</td>
      <td>${r.fare}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <!-- Header Banner -->
    <div class="t5-header-banner">${t.headerBanner}</div>

    <!-- Airline Logo Box -->
    <div class="airline-logo-box">
      <img src="${t.airlineLogo}" alt="Airline Logo">
    </div>

    <!-- Table Card -->
    <div class="dynamic-card t5-table-card">
      <table class="t5-table">
        <thead>
          <tr>
            <th>FROM</th>
            <th>TO</th>
            <th>AIRLINE</th>
            <th>TRAVEL DATES</th>
            <th>ALL-IN FARE</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <!-- Baggage Pill -->
    <div class="standard-baggage-pill" style="margin-top: 14px;">${t.baggage}</div>
  `;
}

function buildControls5() {
  const t = AppState.t5;
  const container = document.getElementById('template-specific-controls');
  if (!container) return;

  const airlineOptionsHtml = AIRLINE_OPTIONS.map(a => 
    `<option value="${a.logo}" ${a.logo === t.airlineLogo ? 'selected' : ''}>${a.name}</option>`
  ).join('');

  container.innerHTML = `
    <!-- Header Banner -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>📊</span> Matrix Header & Airline</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Header Banner Text</label>
          <input type="text" class="text-input" value="${t.headerBanner}" oninput="AppState.t5.headerBanner = this.value; renderTemplate5();">
        </div>
        <div>
          <label class="control-label">Featured Airline Logo</label>
          <select class="select-input" onchange="AppState.t5.airlineLogo = this.value; renderTemplate5();">
            ${airlineOptionsHtml}
          </select>
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.baggage}" oninput="AppState.t5.baggage = this.value; renderTemplate5();">
        </div>
      </div>
    </div>

    <!-- Table Rows -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>📋</span> Matrix Rows</h3>
        <button class="btn-mini btn-mini-primary" onclick="addT5Row()">+ Add Row</button>
      </div>
      <div class="section-body" id="t5-rows-editor">
        ${renderT5RowsEditor()}
      </div>
    </div>
  `;
}

function renderT5RowsEditor() {
  return AppState.t5.rows.map((r, idx) => `
    <div class="p-2 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5 text-[11px]">
      <div class="flex items-center justify-between font-bold text-slate-400">
        <span>Row ${idx + 1}</span>
        <button class="btn-mini btn-mini-danger" onclick="deleteT5Row(${idx})">✕</button>
      </div>
      <div class="grid grid-cols-2 gap-1.5">
        <input type="text" class="text-input text-xs" value="${r.from}" placeholder="From" oninput="AppState.t5.rows[${idx}].from = this.value; renderTemplate5();">
        <input type="text" class="text-input text-xs" value="${r.to}" placeholder="To" oninput="AppState.t5.rows[${idx}].to = this.value; renderTemplate5();">
      </div>
      <div class="grid grid-cols-2 gap-1.5">
        <input type="text" class="text-input text-xs" value="${r.airline}" placeholder="Airline" oninput="AppState.t5.rows[${idx}].airline = this.value; renderTemplate5();">
        <input type="text" class="text-input text-xs" value="${r.fare}" placeholder="Fare" oninput="AppState.t5.rows[${idx}].fare = this.value; renderTemplate5();">
      </div>
      <input type="text" class="text-input text-xs" value="${r.dates}" placeholder="Travel Dates" oninput="AppState.t5.rows[${idx}].dates = this.value; renderTemplate5();">
    </div>
  `).join('');
}

function addT5Row() {
  AppState.t5.rows.push({
    from: 'City',
    to: 'Destination',
    airline: 'Airline',
    dates: '01 Nov – 15 Nov',
    fare: '₹45,000/-'
  });
  buildControls5();
  renderTemplate5();
}

function deleteT5Row(idx) {
  if (AppState.t5.rows.length > 1) {
    AppState.t5.rows.splice(idx, 1);
    buildControls5();
    renderTemplate5();
  }
}
