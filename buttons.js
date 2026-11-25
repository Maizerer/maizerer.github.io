// Собирает кнопку нужного варианта. Выбор: data-variant у кнопки.
// Варианты: roll, fill, knob, draw, term, press, wave, ripple, marquee, flip, link, pulse, stack, glow,
// glowghost, lineglow, textglow, marker, reach, tag, morph, aurora, dots, orbit, flood, halo, lit, chip,
// gchip, gaurora, gorbit, gdots, ghalo, gunder, gpress (тёмные primary-кнопки на основе glow).
// Для проверки на сайте: index.html?btn=fill. Подпись второй грани у flip: data-alt (по умолчанию «Поехали»).
(function () {
  const ARROW = '<svg class="b-arrow" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v10M3.5 8.5 8 13l4.5-4.5"/></svg>';
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const VARIANTS = {
    roll: (l) => `<span class="b-roll" aria-hidden="true"><span class="b-roll-in"><span>${l}</span><span>${l}</span></span></span><span class="b-chip">${ARROW}</span>`,
    fill: (l) => `<span>${l}</span>${ARROW}`,
    knob: (l) => `<span class="b-knob">${ARROW}</span><span>${l}</span>`,
    draw: (l) => `<span>${l}</span>${ARROW}`,
    term: (l) => `<span class="b-term"><span class="b-term-a">${l}</span><span class="b-term-b" aria-hidden="true"><i>$</i> npm run projects</span></span>`,
    press: (l) => `<span>${l}</span>${ARROW}`,
    ripple: (l) => `<span>${l}</span>${ARROW}`,
    marquee: (l) => {
      const item = `<span class="b-mq-item">${l}${ARROW}</span>`;
      const group = `<span class="b-mq-group">${item.repeat(3)}</span>`;
      return `<span class="b-mq-static">${l}${ARROW}</span><span class="b-mq-run" aria-hidden="true"><span class="b-mq-track">${group}${group}</span></span>`;
    },
    flip: (l, raw, alt) => `<span class="b-flip" aria-hidden="true"><span class="b-flip-in"><span class="b-face b-face-a">${l}</span><span class="b-face b-face-b">${esc(alt)}${ARROW}</span></span></span>`,
    link: (l) => `<span>${l}</span>`,
    pulse: (l) => `<span>${l}</span>${ARROW}`,
    stack: (l) => `<span>${l}</span>${ARROW}`,
    glow: (l) => `<span>${l}</span>${ARROW}`,
    glowghost: (l) => `<span>${l}</span>`,
    lineglow: (l) => `<span>${l}</span>${ARROW}`,
    textglow: (l) => `<span class="b-tg">${l}</span>${ARROW}`,
    marker: (l) => `<span>${l}</span>${ARROW}`,
    reach: (l) => `<span>${l}</span><span class="b-reach" aria-hidden="true"><i></i><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.5 9.5 8 5 12.5"/></svg></span>`,
    tag: (l) => `<span class="b-tag-l" aria-hidden="true">&lt;</span><span>${l}</span><span class="b-tag-r" aria-hidden="true">/&gt;</span>`,
    morph: (l) => `<span>${l}</span>${ARROW}`,
    aurora: (l) => `<span>${l}</span>${ARROW}`,
    dots: (l) => `<span>${l}</span>${ARROW}`,
    orbit: (l) => `<span>${l}</span>${ARROW}`,
    flood: (l) => `<span>${l}</span>${ARROW}`,
    halo: (l) => `<span>${l}</span>${ARROW}`,
    lit: (l) => `<span class="b-tg">${l}</span>${ARROW}`,
    chip: (l) => `<span>${l}</span><span class="b-chip2">${ARROW}</span>`,
    gchip: (l) => `<span>${l}</span><span class="b-chip3">${ARROW}</span>`,
    gaurora: (l) => `<span>${l}</span>${ARROW}`,
    gorbit: (l) => `<span>${l}</span>${ARROW}`,
    gdots: (l) => `<span>${l}</span>${ARROW}`,
    ghalo: (l) => `<span>${l}</span>${ARROW}`,
    gunder: (l) => `<span>${l}</span>${ARROW}`,
    gpress: (l) => `<span>${l}</span>${ARROW}`,
    wave: (l, raw) => `<span class="b-wave" aria-hidden="true">${[...raw].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('')}</span>${ARROW}`,
  };

  function mount(el, variant) {
    if (!VARIANTS[variant]) variant = 'roll';
    const raw = el.dataset.label || el.textContent.trim();
    [...el.classList].filter((c) => c.startsWith('btn--')).forEach((c) => el.classList.remove(c));
    el.classList.add('btn', 'btn--' + variant);
    el.setAttribute('aria-label', raw);
    el.innerHTML = VARIANTS[variant](esc(raw), raw, el.dataset.alt || 'Поехали');
    if (variant === 'ripple') track(el, false);   // заливка растёт из точки, куда зашёл курсор
    if (['glow', 'glowghost', 'lineglow', 'textglow', 'morph', 'aurora', 'dots', 'orbit', 'flood', 'halo', 'lit', 'chip', 'gchip', 'gaurora', 'gorbit', 'gdots', 'ghalo', 'gunder', 'gpress'].includes(variant)) track(el, true);   // свет следует за курсором
  }

  // Координаты курсора внутри кнопки в переменные --x и --y
  function track(el, follow) {
    const set = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', (e.clientX - r.left) + 'px');
      el.style.setProperty('--y', (e.clientY - r.top) + 'px');
    };
    el.addEventListener('pointerenter', set);
    el.addEventListener('pointerleave', set);
    if (follow) el.addEventListener('pointermove', set);
  }

  function mountBtns(){
    document.querySelectorAll('.js-btn').forEach((el) => {
      mount(el, el.dataset.variant);
    });
  }
  mountBtns();

  window.addEventListener('ui:added-btn', (e) => {
    mountBtns()
  });
})();
