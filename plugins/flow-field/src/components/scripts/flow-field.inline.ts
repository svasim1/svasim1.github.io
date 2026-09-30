// Particles drift along a smooth wave-shaped flow field and swirl around the cursor.

// trail holds the last TRAIL positions as [x0, y0, x1, y1, ...], newest last
type Particle = { x: number; y: number; age: number; life: number; trail: number[] };

const CURSOR_RADIUS = 160;
const SPEED = 0.9;
const MAX_DPR = 1.5;
const TRAIL = 60;
// trail segments are drawn oldest to newest in these opacity steps
const ALPHA_STEPS = [0.04, 0.1, 0.18, 0.28];

const state = window as unknown as { __flowFieldStarted?: boolean };

function start() {
  if (state.__flowFieldStarted) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  state.__flowFieldStarted = true;

  const canvas = document.createElement("canvas");
  canvas.className = "flow-field-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let color = "#c87a5a";
  let particles: Particle[] = [];
  const pointer = { x: -9999, y: -9999, active: false };

  const attach = () => {
    if (!canvas.isConnected) document.body.prepend(canvas);
    document.documentElement.classList.add("flow-field-active");
  };

  const readColor = () => {
    const value = getComputedStyle(document.documentElement).getPropertyValue("--secondary").trim();
    if (value) color = value;
  };

  const spawn = (p?: Particle): Particle => {
    const particle = p ?? { x: 0, y: 0, age: 0, life: 0, trail: [] };
    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.age = 0;
    particle.life = 200 + Math.random() * 300;
    particle.trail = [particle.x, particle.y];
    return particle;
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // fewer particles on small screens
    const density = width < 800 ? 16000 : 10000;
    const count = Math.min(220, Math.round((width * height) / density));
    particles = Array.from({ length: count }, () => spawn());
  };

  // smooth, wave-like direction field that slowly changes over time
  const angleAt = (x: number, y: number, t: number) =>
    Math.sin(x * 0.0022 + t * 0.00006) * 1.3 +
    Math.cos(y * 0.0031 - t * 0.00005) * 1.1 +
    Math.sin((x + y) * 0.0012) * 0.7;

  let frame = 0;
  const step = (t: number) => {
    frame = requestAnimationFrame(step);

    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      const a = angleAt(p.x, p.y, t);
      let vx = Math.cos(a) * SPEED;
      let vy = Math.sin(a) * SPEED;

      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_RADIUS && dist > 0.1) {
          const force = (1 - dist / CURSOR_RADIUS) ** 2;
          // swirl around the cursor and push slightly outwards
          vx += (-dy / dist) * force * 2.4 + (dx / dist) * force * 1.2;
          vy += (dx / dist) * force * 2.4 + (dy / dist) * force * 1.2;
        }
      }

      p.x += vx;
      p.y += vy;
      p.age++;
      p.trail.push(p.x, p.y);
      if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2);

      if (p.age > p.life || p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
        spawn(p);
      }
    }

    // batch all segments of the same opacity into one path
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.1;
    ctx.lineCap = "round";
    const steps = ALPHA_STEPS.length;
    for (let step = 0; step < steps; step++) {
      ctx.globalAlpha = ALPHA_STEPS[step]!;
      ctx.beginPath();
      for (const p of particles) {
        const points = p.trail.length / 2;
        if (points < 2) continue;
        const from = Math.floor(((points - 1) * step) / steps);
        const to = Math.floor(((points - 1) * (step + 1)) / steps);
        ctx.moveTo(p.trail[from * 2]!, p.trail[from * 2 + 1]!);
        for (let i = from + 1; i <= to; i++) {
          ctx.lineTo(p.trail[i * 2]!, p.trail[i * 2 + 1]!);
        }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  const run = () => {
    if (!frame) frame = requestAnimationFrame(step);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  });
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", () => (pointer.active = false));
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : run()));
  document.addEventListener("themechange", readColor);
  // page navigation morphs <body>, which removes the canvas
  document.addEventListener("nav", attach);

  readColor();
  resize();
  attach();
  run();
}

start();
