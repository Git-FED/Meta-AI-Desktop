const PLAY_URL = 'https://appetize.io/app/b_vmsfd6j2qw2ffdla37n7taxgdq';
const canvas = document.getElementById('current-field');
const ctx = canvas.getContext('2d');
let width = 0;
let height = 0;
let dpr = 1;
let time = 0;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawCurrentField() {
  time += 0.004;
  ctx.clearRect(0, 0, width, height);
  const wash = ctx.createRadialGradient(width * 0.48, height * 0.48, 0, width * 0.48, height * 0.48, Math.max(width, height) * 0.8);
  wash.addColorStop(0, 'rgba(29, 32, 56, .30)');
  wash.addColorStop(0.52, 'rgba(7, 8, 13, 0)');
  wash.addColorStop(1, 'rgba(3, 4, 7, .40)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  // Slow, irregular contour bands: an abstract magnetic-current field, not orbitals.
  for (let band = 0; band < 17; band++) {
    const yBase = height * (0.16 + band * 0.055);
    ctx.beginPath();
    for (let x = -40; x <= width + 40; x += 18) {
      const waveA = Math.sin(x * 0.004 + time * (0.7 + band * 0.012) + band * 0.8) * (12 + band * 1.6);
      const waveB = Math.sin(x * 0.010 - time * 1.3 + band * 1.7) * 7;
      const kink = Math.sin(x * 0.0018 + band) * 18;
      const y = yBase + waveA + waveB + kink + Math.sin(time + band) * 8;
      if (x === -40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${70 + band * 4}, ${75 + band * 2}, ${130 + band * 5}, ${0.026 + (band % 3) * 0.012})`;
    ctx.lineWidth = band % 5 === 0 ? 1.7 : 0.8;
    ctx.stroke();
  }

  // Drifting signal shards give the field a living, technological texture.
  for (let i = 0; i < 26; i++) {
    const x = ((i * 241 + time * (18 + i % 4 * 9)) % (width + 180)) - 90;
    const y = height * (0.1 + ((i * 0.071) % 0.82)) + Math.sin(time * 2 + i) * 20;
    const len = 18 + (i % 5) * 13;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y - 1 - (i % 3) * 2);
    ctx.strokeStyle = `rgba(120, ${160 + i % 4 * 15}, 255, ${0.07 + (i % 4) * 0.025})`;
    ctx.lineWidth = i % 7 === 0 ? 2 : 1;
    ctx.stroke();
  }

  requestAnimationFrame(drawCurrentField);
}

resize();
window.addEventListener('resize', resize);
drawCurrentField();

document.getElementById('launch').addEventListener('click', async () => {
  const button = document.getElementById('launch');
  button.classList.add('loading');
  button.querySelector('span').textContent = 'Opening session…';
  await window.metaDesktop.launchApp();
  setTimeout(() => {
    button.classList.remove('loading');
    button.querySelector('span').textContent = 'Launch Meta AI';
  }, 800);
});

document.getElementById('copy-url').addEventListener('click', async () => {
  await navigator.clipboard.writeText(PLAY_URL);
  const toast = document.getElementById('toast');
  toast.textContent = 'Play URL copied to clipboard.';
  setTimeout(() => { toast.textContent = ''; }, 2400);
});

document.querySelectorAll('[data-doc]').forEach((button) => {
  button.addEventListener('click', () => window.metaDesktop.openDoc(button.dataset.doc));
});
