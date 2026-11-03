/* ═══════════════════════════════════════════════════════════
   EXPORT ENGINE — High-Res 1080x1440 PNG Download
   ═══════════════════════════════════════════════════════════ */

async function downloadPoster() {
  const btn = document.getElementById('download-btn');
  const canvasEl = document.getElementById('poster-canvas');
  if (!canvasEl) return;

  const originalText = btn.innerHTML;
  btn.innerHTML = `<span>⏳</span> Generating Crisp PNG...`;
  btn.disabled = true;

  try {
    // Ensure all images are loaded
    const imgs = canvasEl.querySelectorAll('img');
    await Promise.all(Array.from(imgs).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(res => { img.onload = res; img.onerror = res; });
    }));

    // Reset scaling wrapper transform temporarily for true 1:1 render
    const wrapper = document.getElementById('poster-scale-wrapper');
    const prevTransform = wrapper.style.transform;
    wrapper.style.transform = 'scale(1)';

    const renderedCanvas = await html2canvas(canvasEl, {
      scale: 1, // Canvas is already native 1080x1440
      width: 1080,
      height: 1440,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      imageTimeout: 5000
    });

    // Restore preview transform
    wrapper.style.transform = prevTransform;

    // Trigger browser download
    const link = document.createElement('a');
    const templateName = `Template_${AppState.activeTemplate}`;
    link.download = `FilterFlights_${templateName}_${Date.now()}.png`;
    link.href = renderedCanvas.toDataURL('image/png');
    link.click();

    showToast('✓ Poster downloaded successfully!');
  } catch (err) {
    console.error('Download error:', err);
    alert('Could not export poster: ' + err.message);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
