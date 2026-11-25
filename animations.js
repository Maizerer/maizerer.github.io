// Анимации на Motion (vanilla-версия Framer Motion): https://motion.dev
(function () {
  const root = document.documentElement;
  const M = window.Motion;

  // Если библиотека не загрузилась или включён reduced motion — показываем всё как есть
  if (!M || !root.classList.contains('js')) {
    root.classList.remove('js');
    return;
  }

  const { animate, inView, scroll, stagger } = M;
  const ease = [0.22, 1, 0.36, 1];
  const spring = { type: 'spring', stiffness: 300, damping: 22 };

  // 1. Заголовок: буквы выезжают снизу
  document.querySelectorAll('#hero-title .split').forEach((line) => {
    const text = line.textContent.trim();
    line.innerHTML = [...text]
      .map((ch) => `<span class="char-wrap"><span class="char">${ch}</span></span>`)
      .join('');
    line.style.opacity = 1;
  });
  animate('#hero-title .char', { y: ['110%', '0%'] }, { duration: 0.8, ease, delay: stagger(0.04) });

  // 2. Подзаголовок и кнопка после заголовка
  animate('[data-hero]', { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, ease, delay: stagger(0.12, { startDelay: 0.7 }) });

  // 3. Прогресс скролла и лёгкий параллакс заголовка
  scroll(animate('#progress', { scaleX: [0, 1] }, { ease: 'linear' }));
  scroll(animate('#hero-title', { y: [0, -70] }, { ease: 'linear' }), {
    target: document.getElementById('hero'),
    offset: ['start start', 'end start'],
  });

  // 4. Появление блоков при скролле
  document.querySelectorAll('[data-reveal]:not([data-hero])').forEach((el) => {
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease });
    }, { amount: 0.4 });
  });

  // Чипы технологий появляются по очереди
  const chips = document.querySelectorAll('#stack li');
  chips.forEach((c) => (c.style.opacity = 0));
  inView('#stack', () => {
    animate(chips, { opacity: [0, 1], scale: [0.85, 1] }, { duration: 0.4, ease, delay: stagger(0.05) });
  }, { amount: 0.5 });

  // 5. Карточки проектов: каскад при скролле и после смены фильтра
  window.animateCards = function (only) {
    // only — список только что добавленных карточек (кнопка «Показать ещё»)
    const cards = only ? [...only] : [...document.querySelectorAll('#grid .js-card')];
    if (!cards.length) return;

    try {
      cards.forEach((card) => {
        card.style.opacity = 0;
        const img = card.querySelector('.cover-inner');
        const phones = card.querySelectorAll('.phone');

        // Наведение через обычные события: в Motion 11 нет функции hover
        card.addEventListener('pointerenter', (e) => {
          if (e.pointerType === 'touch') return;
          animate(card, { y: -8 }, spring);
          if (img) animate(img, { scale: 1.08 }, { duration: 0.6, ease });
          if (phones.length) animate(phones, { y: -8 }, { ...spring, delay: stagger(0.05) });
        });
        card.addEventListener('pointerleave', () => {
          animate(card, { y: 0 }, spring);
          if (img) animate(img, { scale: 1 }, { duration: 0.6, ease });
          if (phones.length) animate(phones, { y: 0 }, spring);
        });
      });

      const reveal = () => {
        animate(cards, { opacity: [0, 1], y: [40, 0] }, { duration: 0.7, ease, delay: stagger(0.1) });
      };
      if (only) reveal();
      else inView('#grid', () => { reveal(); }, { amount: 0.1 });
    } catch (err) {
      console.error('Ошибка анимации карточек:', err);
      cards.forEach((card) => (card.style.opacity = 1));
    }
  };
  window.animateCards();
})();
