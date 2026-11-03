/* ═══════════════════════════════════════════════════════════
   TEMPLATE 1: Classic Dual Route & Date Pills
   ═══════════════════════════════════════════════════════════ */

function renderTemplate1() {
  const t = AppState.t1;
  const container = document.getElementById('poster-content-area');
  if (!container) return;

  // Build segments bar 1
  const seg1Html = t.r1Segs.map((seg, idx) => {
    const parts = seg.split('|');
    const code = (parts[0] || '').trim();
    const time = (parts[1] || '').trim();
    return `
      <div class="t1-segment-cell">
        <div class="t1-segment-code">${code}</div>
        <div class="t1-segment-time">${time}</div>
      </div>
      ${idx < t.r1Segs.length - 1 ? '<div class="t1-segment-vdiv"></div>' : ''}
    `;
  }).join('');

  // Build rows 1
  const rows1Html = t.r1Rows.map(([date, price]) => `
    <div class="t1-dp-row">
      <span class="t1-dp-date">${date}</span>
      <span class="t1-dp-price">${price}</span>
    </div>
  `).join('');

  // Build segments bar 2
  const seg2Html = t.r2Segs.map((seg, idx) => {
    const parts = seg.split('|');
    const code = (parts[0] || '').trim();
    const time = (parts[1] || '').trim();
    return `
      <div class="t1-segment-cell">
        <div class="t1-segment-code">${code}</div>
        <div class="t1-segment-time">${time}</div>
      </div>
      ${idx < t.r2Segs.length - 1 ? '<div class="t1-segment-vdiv"></div>' : ''}
    `;
  }).join('');

  // Build rows 2
  const rows2Html = t.r2Rows.map(([date, price]) => `
    <div class="t1-dp-row">
      <span class="t1-dp-date">${date}</span>
      <span class="t1-dp-price">${price}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Tagline -->
    <div class="t1-tagline">${t.tagline}</div>

    <!-- Route 1 Capsule -->
    <div class="t1-route-capsule">${t.r1Name}</div>

    <!-- Airline Logo -->
    <div class="airline-logo-box">
      <img src="${t.airlineLogo}" alt="Airline Logo">
    </div>

    <!-- Segments Bar 1 -->
    <div class="t1-segments-bar">${seg1Html}</div>

    <!-- Date Price Card 1 -->
    <div class="dynamic-card t1-dp-card">${rows1Html}</div>

    <!-- Route 2 Capsule -->
    <div class="t1-route-capsule" style="margin-top: 10px;">${t.r2Name}</div>

    <!-- Segments Bar 2 -->
    <div class="t1-segments-bar">${seg2Html}</div>

    <!-- Date Price Card 2 -->
    <div class="dynamic-card t1-dp-card">${rows2Html}</div>

    <!-- Baggage Capsule -->
    <div class="standard-baggage-pill">${t.baggage}</div>
  `;
}

function buildControls1() {
  const t = AppState.t1;
  const container = document.getElementById('template-specific-controls');
  if (!container) return;

  const airlineOptionsHtml = AIRLINE_OPTIONS.map(a => 
    `<option value="${a.logo}" ${a.logo === t.airlineLogo ? 'selected' : ''}>${a.name}</option>`
  ).join('');

  container.innerHTML = `
    <!-- Tagline & Route 1 -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>🏷️</span> Header & Route 1</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Tagline Text</label>
          <input type="text" class="text-input" value="${t.tagline}" oninput="AppState.t1.tagline = this.value; renderTemplate1();">
        </div>
        <div>
          <label class="control-label">Airline Logo</label>
          <select class="select-input" onchange="AppState.t1.airlineLogo = this.value; renderTemplate1();">
            ${airlineOptionsHtml}
          </select>
        </div>
        <div>
          <label class="control-label">Route 1 Name</label>
          <input type="text" class="text-input" value="${t.r1Name}" oninput="AppState.t1.r1Name = this.value; renderTemplate1();">
        </div>
      </div>
    </div>

    <!-- Route 1 Dates & Prices -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>📅</span> Route 1 Dates & Prices</h3>
        <button class="btn-mini btn-mini-primary" onclick="addT1Row(1)">+ Add Row</button>
      </div>
      <div class="section-body" id="t1-r1-rows-container">
        ${renderT1RowsEditor(1)}
      </div>
    </div>

    <!-- Route 2 -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>🛫</span> Route 2 & Baggage</h3>
      </div>
      <div class="section-body">
        <div>
          <label class="control-label">Route 2 Name</label>
          <input type="text" class="text-input" value="${t.r2Name}" oninput="AppState.t1.r2Name = this.value; renderTemplate1();">
        </div>
        <div>
          <label class="control-label">Baggage Text</label>
          <input type="text" class="text-input" value="${t.baggage}" oninput="AppState.t1.baggage = this.value; renderTemplate1();">
        </div>
      </div>
    </div>

    <!-- Route 2 Dates & Prices -->
    <div class="control-section">
      <div class="section-header">
        <h3><span>📅</span> Route 2 Dates & Prices</h3>
        <button class="btn-mini btn-mini-primary" onclick="addT1Row(2)">+ Add Row</button>
      </div>
      <div class="section-body" id="t1-r2-rows-container">
        ${renderT1RowsEditor(2)}
      </div>
    </div>
  `;
}

function renderT1RowsEditor(routeNum) {
  const rows = routeNum === 1 ? AppState.t1.r1Rows : AppState.t1.r2Rows;
  return rows.map(([d, p], idx) => `
    <div class="flex items-center gap-2">
      <input type="text" class="text-input" value="${d}" placeholder="Dates" oninput="updateT1Row(${routeNum}, ${idx}, 0, this.value)">
      <input type="text" class="text-input w-28" value="${p}" placeholder="Fare" oninput="updateT1Row(${routeNum}, ${idx}, 1, this.value)">
      <button class="btn-mini btn-mini-danger px-2" onclick="deleteT1Row(${routeNum}, ${idx})">✕</button>
    </div>
  `).join('');
}

function updateT1Row(routeNum, idx, field, val) {
  if (routeNum === 1) AppState.t1.r1Rows[idx][field] = val;
  else AppState.t1.r2Rows[idx][field] = val;
  renderTemplate1();
}

function addT1Row(routeNum) {
  if (routeNum === 1) AppState.t1.r1Rows.push(['NEW DATES', '₹49,999']);
  else AppState.t1.r2Rows.push(['NEW DATES', '₹48,999']);
  buildControls1();
  renderTemplate1();
}

function deleteT1Row(routeNum, idx) {
  if (routeNum === 1 && AppState.t1.r1Rows.length > 1) AppState.t1.r1Rows.splice(idx, 1);
  else if (routeNum === 2 && AppState.t1.r2Rows.length > 1) AppState.t1.r2Rows.splice(idx, 1);
  buildControls1();
  renderTemplate1();
}
