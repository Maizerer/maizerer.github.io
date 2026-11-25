// Песочница: настоящие HTML-элементы падают и сталкиваются (физика Matter.js).
// Их можно хватать и бросать, на часть можно нажимать. Наведённая мышь слегка отталкивает.
(function () {
  const box = document.getElementById('sandbox');
  const col = document.getElementById('sandbox-col');
  const resetBtn = document.getElementById('sandbox-reset');
  if (!box) return;
  const M = window.Matter;
  if (!M) { col.hidden = true; return; }   // библиотека не загрузилась — просто прячем блок

  const { Engine, World, Bodies, Body, Constraint } = M;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ключевые стили задаём здесь: так песочница работает даже со старым style.css
  box.style.position = 'relative';
  box.style.overflow = 'hidden';
  if (box.clientHeight < 120) box.style.height = '22rem';

  // ====== ЭЛЕМЕНТЫ (можно менять тексты и добавлять свои) ======
  const SPECS = [
    { cls: 'sb-tag', html: 'React' },
    { cls: 'sb-tag', html: 'Next.js' },
    { cls: 'sb-tag', html: 'Vue' },
    { cls: 'sb-tag', html: 'TypeScript' },
    { cls: 'sb-tag', html: 'React Native' },
    { cls: 'sb-badge', html: '5+ лет опыта' },
    { cls: 'sb-btn', html: 'Написать мне', tap: 'link' },
    { cls: 'sb-toggle', html: '', tap: 'toggle', r: 16 },
    { cls: 'sb-check', html: '', tap: 'toggle', r: 10 },
    { cls: 'sb-slider', html: '<i></i><b></b>', tap: 'slider', r: 14 },
    { cls: 'sb-card', html: '<b></b><u></u><u></u>', r: 14 },
    { cls: 'sb-code', html: '&lt;/&gt;', r: 14 },
  ];
  // =============================================================

  const engine = Engine.create({ positionIterations: 8, velocityIterations: 6 });
  engine.gravity.y = 1;
  const world = engine.world;
  const rand = (a, b) => a + Math.random() * (b - a);

  let W = box.clientWidth, H = box.clientHeight;
  let walls = [];
  const bodies = [];
  const T = 200; // толщина стен, чтобы ничего не пролетало насквозь

  function buildWalls() {
    World.remove(world, walls);
    const o = { isStatic: true, friction: 0.6 };
    walls = [
      Bodies.rectangle(W / 2, H + T / 2, W + T * 2, T, o),        // пол
      Bodies.rectangle(-T / 2, (H - 8500) / 2, T, H + 8500, o),   // левая: от пола до высоты 8500 над рамкой
      Bodies.rectangle(W + T / 2, (H - 8500) / 2, T, H + 8500, o), // правая
      Bodies.rectangle(W / 2, -9000, W + T * 2, T, o),            // потолок далеко вверху
    ];
    World.add(world, walls);
  }

  SPECS.forEach((spec) => {
    const el = document.createElement('div');
    el.className = 'sb-item ' + spec.cls;
    el.style.cssText = 'position:absolute;left:0;top:0;will-change:transform';
    el.innerHTML = spec.html;
    box.appendChild(el);
    const w = el.offsetWidth, h = el.offsetHeight;
    const r = Math.max(1, Math.min(spec.r ?? Math.min(w, h) / 2, w / 2 - 1, h / 2 - 1));
    const body = Bodies.rectangle(W / 2, -100, w, h, {
      chamfer: { radius: r }, restitution: 0.35, friction: 0.5, frictionAir: 0.012, density: 0.002,
    });
    body.el = el; body.w = w; body.h = h; body.spec = spec;
    bodies.push(body);
  });

  function spawn() {
    bodies.forEach((b, i) => {
      const half = b.w / 2 + 8;
      Body.setPosition(b, { x: W > half * 2 ? rand(half, W - half) : W / 2, y: -50 - i * 60 });
      Body.setAngle(b, rand(-0.7, 0.7));
      Body.setVelocity(b, { x: rand(-2, 2), y: 0 });
      Body.setAngularVelocity(b, rand(-0.05, 0.05));
    });
  }

  function render() {
    for (const b of bodies) {
      b.el.style.transform = `translate3d(${(b.position.x - b.w / 2).toFixed(1)}px,${(b.position.y - b.h / 2).toFixed(1)}px,0) rotate(${b.angle.toFixed(3)}rad)`;
    }
  }

  buildWalls();
  World.add(world, bodies);
  spawn();
  render();

  // Режим «без движения»: один раз просчитываем и показываем уже разложенные элементы
  if (reduce) {
    for (let i = 0; i < 600; i++) Engine.update(engine, 1000 / 60);
    render();
    if (resetBtn) resetBtn.hidden = true;
    return;
  }

  // ---------- цикл ----------
  let rafId = 0, last = 0, acc = 0, visible = false, started = false;
  function tick(now) {
    rafId = 0;
    if (!visible) return;
    acc += Math.min(now - last, 100);
    last = now;
    let steps = 0;
    while (acc >= 1000 / 60 && steps < 4) { Engine.update(engine, 1000 / 60); acc -= 1000 / 60; steps++; }
    render();
    rafId = requestAnimationFrame(tick);
  }
  function start() { if (!rafId && visible) { last = performance.now(); rafId = requestAnimationFrame(tick); } }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !started) { started = true; spawn(); }
      start();
    }, { threshold: 0.15 }).observe(box);
  } else { visible = true; started = true; start(); }

  // ---------- размеры ----------
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => {
      const nw = box.clientWidth, nh = box.clientHeight;
      if (!nw || !nh || (nw === W && nh === H)) return;
      W = nw; H = nh;
      buildWalls();
      for (const b of bodies) {  // вернуть в рамку то, что оказалось снаружи
        const x = Math.min(Math.max(b.position.x, b.w / 2), W - b.w / 2);
        const y = Math.min(b.position.y, H - b.h / 2);
        Body.setPosition(b, { x, y });
      }
    }).observe(box);
  }

  // ---------- перетаскивание и нажатия ----------
  const local = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  let drag = null;

  function tap(body) {
    const t = body.spec.tap;
    if (t === 'toggle') body.el.classList.toggle('on');
    if (t === 'slider') body.el.style.setProperty('--v', Math.round(rand(10, 90)));
    if (t === 'link') { const c = document.getElementById('contacts'); if (c) c.scrollIntoView({ behavior: 'smooth' }); return; }
    Body.setVelocity(body, { x: rand(-2, 2), y: -7 });      // небольшой «подпрыгивающий» отклик
    Body.setAngularVelocity(body, rand(-0.08, 0.08));
  }

  bodies.forEach((body) => {
    const el = body.el;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || drag) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      const p = local(e);
      const constraint = Constraint.create({
        pointA: p, bodyB: body,
        pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
        stiffness: 0.2, damping: 0.1, length: 0,
      });
      World.add(world, constraint);
      drag = { id: e.pointerId, body, constraint, x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false };
      el.classList.add('dragging');
    });
    el.addEventListener('pointermove', (e) => {
      if (!drag || drag.id !== e.pointerId || drag.body !== body) return;
      drag.constraint.pointA = local(e);
      if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 6) drag.moved = true;
    });
    const end = (e) => {
      if (!drag || drag.id !== e.pointerId || drag.body !== body) return;
      World.remove(world, drag.constraint);
      el.classList.remove('dragging');
      const wasTap = !drag.moved && performance.now() - drag.t0 < 400 && e.type === 'pointerup';
      drag = null;
      if (wasTap) tap(body);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  });

  // Мышь без нажатия слегка отталкивает ближайшие элементы
  box.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || drag) return;
    const p = local(e);
    for (const b of bodies) {
      const dx = b.position.x - p.x, dy = b.position.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 90 && d > 0.1) {
        const f = b.mass * 0.0014 * (1 - d / 90);
        Body.applyForce(b, b.position, { x: (dx / d) * f, y: (dy / d) * f });
      }
    }
  }, { passive: true });

  if (resetBtn) resetBtn.addEventListener('click', () => { spawn(); start(); });
})();
