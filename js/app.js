/* ═══════════════════════════════════════════════════════════
   MAIN APPLICATION CONTROLLER
   ═══════════════════════════════════════════════════════════ */

function switchTemplate(num) {
  AppState.activeTemplate = num;

  // Update nav pills
  for (let i = 1; i <= 5; i++) {
    const btn = document.getElementById(`pill-t${i}`);
    if (btn) {
      if (i === num) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }

  // Update badge
  const badge = document.getElementById('active-template-badge');
  if (badge) {
    const names = {
      1: 'T1: Dual Route Capsules',
      2: 'T2: Destination Script & Grid',
      3: 'T3: 4-Quadrant Fixed Depts',
      4: 'T4: Dual Return Sectors',
      5: 'T5: Multi-City Matrix'
    };
    badge.textContent = names[num] || `Template ${num}`;
  }

  // Render template & controls
  switch (num) {
    case 1:
      renderTemplate1();
      buildControls1();
      break;
    case 2:
      renderTemplate2();
      buildControls2();
      break;
    case 3:
      renderTemplate3();
      buildControls3();
      break;
    case 4:
      renderTemplate4();
      buildControls4();
      break;
    case 5:
      renderTemplate5();
      buildControls5();
      break;
  }

  fitPosterToScreen();
}

function fitPosterToScreen() {
  const container = document.getElementById('preview-container');
  const wrapper = document.getElementById('poster-scale-wrapper');
  if (!container || !wrapper) return;

  const pad = 40;
  const availW = container.clientWidth - pad;
  const availH = container.clientHeight - pad;

  const scaleW = availW / 1080;
  const scaleH = availH / 1440;
  const scale = Math.min(scaleW, scaleH, 0.85); // Cap at 85% to look sharp

  wrapper.style.transform = `scale(${scale})`;
}

function resetDefaults() {
  if (confirm('Reset template to original preset data?')) {
    location.reload();
  }
}

// Lifecycle Initialization
document.addEventListener('DOMContentLoaded', () => {
  initFontControls();
  initCardControls();
  applyCardStyles();
  switchTemplate(1);

  window.addEventListener('resize', fitPosterToScreen);
  setTimeout(fitPosterToScreen, 100);
});
