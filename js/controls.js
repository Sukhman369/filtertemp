/* ═══════════════════════════════════════════════════════════
   CARD & CONTAINER APPEARANCE CONTROLS
   ═══════════════════════════════════════════════════════════ */

function initCardControls() {
  const container = document.getElementById('card-appearance-controls');
  if (!container) return;

  const c = AppState.cardStyle;

  container.innerHTML = `
    <!-- Width Slider -->
    <div>
      <div class="control-label">
        <span>Container Width</span>
        <span class="value-badge" id="val-card-width">${c.width}px</span>
      </div>
      <div class="flex items-center gap-2">
        <input type="range" class="slider-input" min="500" max="1040" step="5" value="${c.width}"
          oninput="updateCardStyle('width', parseInt(this.value)); document.getElementById('val-card-width').textContent = this.value + 'px';">
      </div>
    </div>

    <!-- Height / Min-Height -->
    <div>
      <div class="control-label">
        <span>Min Height (px)</span>
        <span class="value-badge" id="val-card-height">${c.minHeight === 'auto' ? 'Auto' : c.minHeight + 'px'}</span>
      </div>
      <div class="flex items-center gap-2">
        <input type="range" class="slider-input" min="50" max="650" step="10" value="${c.minHeight === 'auto' ? 100 : c.minHeight}"
          oninput="updateCardStyle('minHeight', parseInt(this.value)); document.getElementById('val-card-height').textContent = this.value + 'px';">
        <button class="btn-mini btn-mini-primary" onclick="updateCardStyle('minHeight', 'auto'); document.getElementById('val-card-height').textContent = 'Auto';">Auto</button>
      </div>
    </div>

    <!-- Padding Controls -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <div class="control-label">
          <span>Pad Y (Top/Btm)</span>
          <span class="value-badge" id="val-pad-y">${c.paddingY}px</span>
        </div>
        <input type="range" class="slider-input" min="0" max="40" step="2" value="${c.paddingY}"
          oninput="updateCardStyle('paddingY', parseInt(this.value)); document.getElementById('val-pad-y').textContent = this.value + 'px';">
      </div>
      <div>
        <div class="control-label">
          <span>Pad X (Left/Rgt)</span>
          <span class="value-badge" id="val-pad-x">${c.paddingX}px</span>
        </div>
        <input type="range" class="slider-input" min="0" max="50" step="2" value="${c.paddingX}"
          oninput="updateCardStyle('paddingX', parseInt(this.value)); document.getElementById('val-pad-x').textContent = this.value + 'px';">
      </div>
    </div>

    <!-- Background Color & Opacity -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <div class="control-label">Background Color</div>
        <div class="color-picker-group">
          <input type="color" class="color-box" value="${c.bg}"
            oninput="updateCardStyle('bg', this.value); document.getElementById('card-bg-hex').value = this.value;">
          <input type="text" id="card-bg-hex" class="text-input font-mono uppercase text-xs" value="${c.bg}"
            onchange="updateCardStyle('bg', this.value);">
        </div>
      </div>
      <div>
        <div class="control-label">
          <span>Opacity</span>
          <span class="value-badge" id="val-bg-op">${Math.round(c.bgOpacity * 100)}%</span>
        </div>
        <input type="range" class="slider-input mt-2" min="0.1" max="1" step="0.05" value="${c.bgOpacity}"
          oninput="updateCardStyle('bgOpacity', parseFloat(this.value)); document.getElementById('val-bg-op').textContent = Math.round(this.value * 100) + '%';">
      </div>
    </div>

    <!-- Border Thickness, Color & Radius -->
    <div class="grid grid-cols-3 gap-2">
      <div>
        <div class="control-label">
          <span>Border</span>
          <span class="value-badge" id="val-border-w">${c.borderWidth}px</span>
        </div>
        <input type="range" class="slider-input" min="0" max="8" step="1" value="${c.borderWidth}"
          oninput="updateCardStyle('borderWidth', parseInt(this.value)); document.getElementById('val-border-w').textContent = this.value + 'px';">
      </div>
      <div>
        <div class="control-label">
          <span>Radius</span>
          <span class="value-badge" id="val-border-r">${c.borderRadius}px</span>
        </div>
        <input type="range" class="slider-input" min="0" max="40" step="2" value="${c.borderRadius}"
          oninput="updateCardStyle('borderRadius', parseInt(this.value)); document.getElementById('val-border-r').textContent = this.value + 'px';">
      </div>
      <div>
        <div class="control-label">Color</div>
        <input type="color" class="color-box w-full" value="${c.borderColor}"
          oninput="updateCardStyle('borderColor', this.value);">
      </div>
    </div>

    <!-- Shadow Preset -->
    <div>
      <div class="control-label">Card Drop Shadow</div>
      <div class="grid grid-cols-4 gap-1.5 mt-1">
        ${['none', 'subtle', 'medium', 'bold'].map(s => `
          <button class="py-1 px-2 text-xs font-semibold rounded ${c.shadow === s ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}"
            onclick="updateCardStyle('shadow', '${s}'); initCardControls();">
            ${s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function updateCardStyle(prop, val) {
  AppState.cardStyle[prop] = val;
  applyCardStyles();
}

