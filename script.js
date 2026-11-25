// ====== ВАШИ ДАННЫЕ ======
// Секции блока «Проекты». Порядок секций = порядок на странице.
const sections = [
  {
    key: 'company', n: '01', title: 'Сделано в компаниях',
    desc: 'Продукты, которые я делал в штате. Здесь я отвечал за фронтенд: от архитектуры и выбора стека до релиза в production.',
    note: 'Два проекта Wildberries — внутренние и под NDA. Публичных ссылок на них нет, поэтому показываю архитектуру, стек и свой вклад.'
  },
  {
    key: 'order', n: '02', title: 'Сделано на заказ',
    desc: 'Лендинги и интерфейсы для клиентов. Брал готовый макет и доводил его до рабочей вёрстки.'
  },
  {
    key: 'own', n: '03', title: 'Собственные проекты',
    desc: 'Продукты, которые я придумал и делаю сам: от идеи до интерфейса и серверной части. Показывают, как я работаю без ТЗ и заказчика.'
  }
];

// Поля проекта:
//   section — ключ секции; title; tagline — одна строка для карточки
//   role, period — строка «роль · период» (period необязателен)
//   scale — метка масштаба (необязательно); status — «В production» и т. п. (необязательно)
//   nda: true — метка NDA и пояснение в окне
//   points — что сделал (в окне); stack — стек (в окне)
//   demo / code — ссылки; images — фото (первое идёт на карточку, все — в галерею окна)
//   type: 'mobile' — скриншоты приложения в рамках телефонов
const projects = [
  {
    section: 'company',
    title: 'cmeet.ai — экосистема онлайн-встреч',
    tagline: 'Веб-версия и мобильные приложения для онлайн-встреч.',
    role: 'Весь frontend продукта', period: '2022–2025',
    scale: '2 000+ активных пользователей', status: 'В production',
    points: [
      'Отвечал за весь frontend: веб-версия на Vue/Nuxt',
      'Разработал v2 на React Native для iOS, Android и Web',
      'После запуска продукт привлёк B2B-клиентов из крупных технологических компаний'
    ],
    stack: ['Vue', 'Nuxt', 'React Native'],
    demo: 'https://cmeet.ai', code: '',
    images: ['images/cmeet.jpg']
  },
  {
    section: 'company',
    title: 'WB Exp — платформа A/B-тестирования',
    tagline: 'Внутренняя платформа Wildberries для запуска и анализа A/B-тестов.',
    role: 'Frontend-архитектура и MVP', period: '2023–2025',
    status: 'В production', nda: true,
    points: [
      'С нуля спроектировал frontend-архитектуру и выбрал стек',
      'Настроил CI/CD и разработал MVP',
      'Вместе с командой вывел платформу в production',
      'Написал fingerprint-идентификацию на Canvas API и WebGL: группы A/B не сбиваются при очистке cookies'
    ],
    stack: ['React', 'TypeScript', 'TanStack Query', 'Effector', 'FSD'],
    demo: '', code: '',
    images: ['images/exp-1.png']
  },
  {
    section: 'company',
    title: 'WB Tariff — тарифы и аналитика складов',
    tagline: 'Инструмент для руководителей складов и топ-менеджмента.',
    role: 'Единственный frontend-разработчик', period: '2023–2025',
    status: 'В production', nda: true,
    points: [
      'В другой команде был единственным frontend-разработчиком',
      'С нуля спроектировал архитектуру и выбрал стек',
      'Сам проработал UX/UI-решения',
      'Довёл продукт до production'
    ],
    stack: ['React', 'TypeScript', 'TanStack Query', 'Effector', 'FSD'],
    demo: '', code: '',
    images: ['images/tariff-1.png']
  },
  {
    section: 'company',
    title: 'P.Love — сайт сети ресторанов',
    tagline: 'Сайт с меню и заказом доставки и самовывоза.',
    role: 'Единственный frontend-разработчик в команде из трёх человек', period: '2020–2022',
    status: 'В production',
    points: [
      'Спроектировал дизайн и разработал сайт на Vue/Nuxt',
      'Каталог меню, оформление заказов на доставку и самовывоз',
      'После моего ухода сайт переработали, по ссылке актуальная версия'
    ],
    stack: ['Vue', 'Nuxt'],
    demo: 'https://iloveplove.ru/', code: '',
    images: ['images/plove-1.jpg', 'images/plove-2.jpg', 'images/plove-3.jpg', 'images/plove-4.jpg']
  },
  {
    section: 'order',
    title: 'ARvis — промосайт AR-сервиса',
    tagline: 'Сайт, который показывает возможности сервиса дополненной реальности.',
    role: 'Frontend по готовому макету',
    points: ['Вёрстка и frontend промосайта', 'Цель сайта — презентовать продукт и привлекать пользователей'],
    stack: ['HTML', 'JavaScript'],
    demo: 'arvis/index.html', code: '',
    images: ['images/arvis-1.jpg', 'images/arvis-2.jpg', 'images/arvis-3.jpg']
  },
  {
    section: 'order',
    title: 'Личный кабинет AR-платформы',
    tagline: 'Многостраничный кабинет для управления возможностями сервиса.',
    role: 'Frontend по готовому макету',
    points: ['Frontend многостраничного кабинета с комплексным функционалом'],
    stack: ['HTML', 'JavaScript'],
    demo: 'arvis-lk/index.html', code: '',
    images: ['images/lk-arvis-1.jpg', 'images/lk-arvis-2.jpg', 'images/lk-arvis-3.jpg', 'images/lk-arvis-4.jpg', 'images/lk-arvis-5.jpg', 'images/lk-arvis-6.jpg', 'images/lk-arvis-7.jpg']
  },
  {
    section: 'order',
    title: 'Иной курс — лендинг',
    tagline: 'Лендинг сервиса, который помогает экспертам запускать онлайн-курсы.',
    role: 'Frontend по готовому макету',
    points: ['Frontend-разработка лендинга'],
    stack: ['HTML', 'JavaScript'],
    demo: 'other-text/index.html', code: '',
    images: ['images/kurs-1.jpg', 'images/kurs-2.jpg', 'images/kurs-3.jpg', 'images/kurs-4.jpg']
  },
  {
    section: 'order',
    title: 'Основатели — лендинг образовательного клуба',
    tagline: 'Клуб для предпринимателей: обучение, мастер-майнды, подписка.',
    role: 'Frontend по готовому макету',
    points: ['Frontend промо-лендинга с программами обучения и подпиской'],
    stack: ['HTML', 'JavaScript'],
    demo: 'founders/index.html', code: '',
    images: ['images/varga-1.jpg', 'images/varga-2.jpg', 'images/varga-3.jpg', 'images/varga-4.jpg', 'images/varga-5.jpg', 'images/varga-6.jpg', 'images/varga-7.jpg']
  },
  {
    section: 'own',
    title: 'JamBeat — музыкальные заказы в заведениях',
    tagline: 'Гости заказывают песню у артиста или ставят любимый трек.',
    role: 'Frontend и backend',
    points: ['Разработал клиентскую и серверную часть'],
    stack: ['React', 'Next.js', 'Nest.js'],
    demo: 'https://jambeat.vercel.app/', type: 'mobile', code: '',
    images: ['images/jambeat-2.png', 'images/jambeat-3.png', 'images/jambeat-4.png', 'images/jambeat-5.png', 'images/jambeat-6.png', 'images/jambeat-7.png', 'images/jambeat-8.png', 'images/jambeat-9.png']
  },
  {
    section: 'own',
    title: 'Лапки — платформа для владельцев питомцев',
    tagline: 'Общение, обмен опытом, полезная информация и услуги в одном месте.',
    role: 'Frontend', status: 'В разработке',
    points: ['Развивающийся личный проект'],
    stack: ['React', 'Next.js'],
    demo: '', type: 'mobile', code: '',
    images: ['images/lapki-1.png', 'images/lapki-2.png']
  },
  {
    section: 'own',
    title: 'Growth Hub — сообщество разработчиков',
    tagline: 'Совместное обучение, практика и создание реальных продуктов в команде единомышленников.',
    role: 'Основатель, разработка платформы',
    status: 'Развивается',
    points: [
      'Создал сообщество для совместного обучения и профессионального развития',
      'Разработал базу знаний с практическими квестами и обучающими материалами',
      'Организовал работу над собственными проектами и обмен опытом между участниками'
    ],
    stack: ['Astro', 'Starlight', 'Markdown', 'GitLab'],
    demo: 'https://growth-hub1.gitlab.io/vault/',
    code: '',
    images: ['images/growth-1.jpg', 'images/growth-2.jpg', 'images/growth-3.jpg', 'images/growth-4.jpg'],
  },
  {
    section: 'own',
    title: 'Besedki.ru — бронирование загородного отдыха',
    tagline: 'Поиск и бронирование беседок и мест для отдыха.',
    role: 'Frontend и backend', status: 'Дипломный проект',
    points: ['Клиентская и серверная часть', 'Рабочего демо нет, исходный код открыт'],
    stack: ['Vue', 'Nuxt', 'Nest.js'],
    demo: '', code: 'https://github.com/BesedkiRu',
    images: ['images/besedki-1.png', 'images/besedki-2.jpg', 'images/besedki-3.jpg', 'images/besedki-4.jpg', 'images/besedki-5.jpg']
  }
];

const stack = [
  'React', 'Next.js', 'Vue', 'Nuxt', 'React Native',
  'TypeScript', 'Effector', 'TanStack Query', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Nest.js', 'PostgreSQL',
];
// =========================

const sectionsEl = document.getElementById('sections');
const dlg = document.getElementById('project-dialog');
const linkClass = 'btn js-btn';
const chev = (d) => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const chevL = chev('M11 3.5L5.5 9l5.5 5.5');
const chevR = chev('M7 3.5L12.5 9 7 14.5');
const imgsOf = (p) => (p.images && p.images.length ? p.images : (p.image ? [p.image] : []));

/* ---------- Галерея в окне подробностей (как раньше) ---------- */
function coverHTML(p) {
  const imgs = imgsOf(p);
  if (p.type === 'mobile' && imgs.length) return mobileCoverHTML(p, imgs);
  const frame = 'flex aspect-[16/9] items-center justify-center overflow-hidden bg-line/60';

  if (imgs.length === 0) {
    return `<div class="${frame}"><span class="font-display text-5xl font-bold text-ink/20">${p.title.trim().charAt(0)}</span></div>`;
  }
  if (imgs.length === 1) {
    return `<div class="${frame}"><img src="${imgs[0]}" alt="Скриншот проекта ${p.title}" class="h-full w-full object-cover" loading="lazy"></div>`;
  }

  const slides = imgs.map((src, i) =>
    `<img src="${src}" alt="${p.title}, фото ${i + 1} из ${imgs.length}" draggable="false" loading="lazy" class="h-full w-full shrink-0 snap-center object-cover">`
  ).join('');
  const dots = imgs.map((_, n) =>
    `<button type="button" data-dot aria-label="Показать фото ${n + 1}" class="gallery-dot"></button>`
  ).join('');

  return `
    <div data-gallery class="relative aspect-[16/9] overflow-hidden bg-line/60" role="region" aria-roledescription="карусель" aria-label="Фото проекта ${p.title}">
      <div class="gallery-track flex h-full snap-x snap-mandatory overflow-x-auto" tabindex="0">${slides}</div>
      <button type="button" data-prev aria-label="Предыдущее фото" class="gallery-btn left-2">${chevL}</button>
      <button type="button" data-next aria-label="Следующее фото" class="gallery-btn right-2">${chevR}</button>
      <div class="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">${dots}</div>
    </div>`;
}

function mobileCoverHTML(p, imgs) {
  const phones = imgs.map((src, i) =>
    `<div class="phone"><img src="${src}" alt="${p.title}, экран ${i + 1} из ${imgs.length}" draggable="false" loading="lazy"></div>`
  ).join('');
  return `
    <div data-gallery data-strip class="strip-cover relative overflow-hidden bg-accent/10" role="region" aria-roledescription="карусель" aria-label="Экраны приложения ${p.title}">
      <div class="gallery-track strip-track" tabindex="0">${phones}</div>
      <button type="button" data-prev aria-label="Предыдущие экраны" class="gallery-btn left-2">${chevL}</button>
      <button type="button" data-next aria-label="Следующие экраны" class="gallery-btn right-2">${chevR}</button>
    </div>`;
}

function initGalleries(scope = document) {
  scope.querySelectorAll('[data-gallery]').forEach((g) => {
    const track = g.querySelector('.gallery-track');
    const count = track.children.length;
    const dots = [...g.querySelectorAll('[data-dot]')];
    const prev = g.querySelector('[data-prev]');
    const next = g.querySelector('[data-next]');

    const strip = g.hasAttribute('data-strip');
    const step = () => track.firstElementChild.offsetWidth + 12;
    const unit = () => (strip ? step() : track.clientWidth);
    const index = () => Math.round(track.scrollLeft / unit());
    const goTo = (i) => track.scrollTo({
      left: Math.max(0, Math.min(count - 1, i)) * unit(),
      behavior: 'smooth'
    });
    const update = () => {
      if (strip) {
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
        return;
      }
      const i = index();
      dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
      prev.disabled = i <= 0;
      next.disabled = i >= count - 1;
    };

    track.addEventListener('scroll', update, { passive: true });
    prev.addEventListener('click', () => goTo(index() - 1));
    next.addEventListener('click', () => goTo(index() + 1));
    dots.forEach((d, n) => d.addEventListener('click', () => goTo(n)));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index() + 1); }
    });

    let dragging = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      dragging = true; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (dragging) track.scrollLeft = startLeft - (e.clientX - startX);
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      goTo(index());
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    update();
    if (window.ResizeObserver) new ResizeObserver(update).observe(track);
  });
}

/* ---------- Карточка в ряду ---------- */
function thumbHTML(p) {
  const imgs = imgsOf(p);
  if (p.type === 'mobile' && imgs.length) return mobileCoverHTML(p, imgs);
  if (!imgs.length) return `<div class="pc-cover"><span class="font-display text-5xl font-bold text-ink/20">${p.title.trim().charAt(0)}</span></div>`;
  return `<div class="pc-cover"><img src="${imgs[0]}" alt="Скриншот проекта ${p.title}" loading="lazy" draggable="false"></div>`;
}

function chipsHTML(p) {
  return [
    p.status && `<li class="pc-chip pc-chip-status">${p.status}</li>`,
    p.nda && `<li class="pc-chip pc-chip-nda">NDA</li>`,
    p.scale && `<li class="pc-chip">${p.scale}</li>`
  ].filter(Boolean).join('');
}

const metaHTML = (p) => `${p.role}${p.period ? ' · ' + p.period : ''}`;

function cardHTML(p, i) {
  const mob = p.type === 'mobile' && imgsOf(p).length;
  return `
    <article class="project-card js-card pc${mob ? ' pc-mobile' : ''}" data-open="${i}">
      ${thumbHTML(p)}
      <div class="pc-body">
        <span class="pc-meta">${metaHTML(p)}</span>
        <h3 class="pc-title">${p.title}</h3>
        <span class="pc-tagline">${p.tagline}</span>
        <ul class="pc-chips">${chipsHTML(p)}</ul>
        <button type="button" class="pc-more" aria-haspopup="dialog">Подробнее →</button>
      </div>
    </article>`;
}

/* ---------- Секции и ряды ---------- */
function renderSections() {
  sectionsEl.innerHTML = sections.map((s) => {
    const items = projects.map((p, i) => [p, i]).filter(([p]) => p.section === s.key);
    return `
      <div class="proj-sec" data-sec="${s.key}">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="min-w-0">
            <h3 class="font-display text-2xl font-bold">${s.title}</h3>
            <p class="mt-2 max-w-xl text-muted">${s.desc}</p>
          </div>
          <div class="flex gap-2">
            <button type="button" data-rail-prev class="rail-btn" aria-label="Назад">${chevL}</button>
            <button type="button" data-rail-next class="rail-btn" aria-label="Вперёд">${chevR}</button>
          </div>
        </div>
        ${s.note ? `<p class="proj-note">${s.note}</p>` : ''}
        <div class="rail${items.some(([p]) => p.type === 'mobile') ? ' has-phones' : ''}" role="group" aria-label="${s.title}">${items.map(([p, i]) => cardHTML(p, i)).join('')}</div>
      </div>`;
  }).join('');

  sectionsEl.querySelectorAll('.proj-sec').forEach((sec) => {
    const rail = sec.querySelector('.rail');
    const prev = sec.querySelector('[data-rail-prev]');
    const next = sec.querySelector('[data-rail-next]');
    const update = () => {
      prev.disabled = rail.scrollLeft <= 1;
      next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1;
    };
    const by = (d) => rail.scrollBy({ left: d * rail.clientWidth * 0.8, behavior: 'smooth' });
    prev.addEventListener('click', () => by(-1));
    next.addEventListener('click', () => by(1));
    rail.addEventListener('scroll', update, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(update).observe(rail);
    update();
  });

  initGalleries(sectionsEl);
  window.dispatchEvent(new CustomEvent('ui:added-btn'));
  if (window.animateCards) window.animateCards();
}

/* ---------- Окно подробностей ---------- */
const closeIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12"/></svg>';
let closing = false;

function openProject(i) {
  const p = projects[i];
  const links = [
    p.demo && `<a class="${linkClass}" href="${p.demo}" target="_blank" rel="noopener" data-variant="link">Открыть сайт</a>`,
    p.code && `<a class="${linkClass}" href="${p.code}" target="_blank" rel="noopener" data-variant="link">Исходный код</a>`
  ].filter(Boolean).join('');

  dlg.setAttribute('aria-label', p.title);
  dlg.innerHTML = `
    <button type="button" class="dlg-x" data-close aria-label="Закрыть">${closeIcon}</button>
    <span class="dlg-handle" aria-hidden="true"></span>
    <div class="dlg-scroll">
      ${coverHTML(p)}
      <div class="dlg-info">
        <span class="pc-meta">${metaHTML(p)}</span>
        <h3 class="dlg-title">${p.title}</h3>
        <p class="dlg-tag">${p.tagline}</p>
        <ul class="pc-chips">${chipsHTML(p)}</ul>
        ${p.nda ? '<p class="dlg-nda">Внутренний продукт Wildberries под NDA. Публичной ссылки нет, показаны архитектура, стек и мой вклад.</p>' : ''}
        <h4 class="dlg-label">Что сделал</h4>
        <ul class="dlg-points">${p.points.map((t) => `<li>${t}</li>`).join('')}</ul>
        <h4 class="dlg-label">Стек</h4>
        <ul class="pc-chips">${p.stack.map((t) => `<li class="pc-chip">${t}</li>`).join('')}</ul>
        ${links ? `<div class="dlg-links">${links}</div>` : ''}
      </div>
    </div>`;

  closing = false;
  dlg.style.transform = '';
  dlg.style.transition = '';
  dlg.classList.remove('is-open');
  dlg.showModal();
  document.documentElement.classList.add('dlg-open');
  initGalleries(dlg);
  window.dispatchEvent(new CustomEvent('ui:added-btn'));
  void dlg.offsetWidth;
  dlg.classList.add('is-open');
}

function closeProject() {
  if (!dlg.open || closing) return;
  dlg.classList.remove('is-open');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { dlg.close(); return; }
  closing = true;
  setTimeout(() => { closing = false; dlg.close(); }, 320);
}

let downX = 0, downY = 0, openedByPointer = false;
sectionsEl.addEventListener('pointerdown', (e) => { downX = e.clientX; downY = e.clientY; });
sectionsEl.addEventListener('click', (e) => {
  if (e.target.closest('.gallery-btn, a')) return;
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return; // это было перетаскивание
  const card = e.target.closest('[data-open]');
  if (!card) return;
  openedByPointer = e.detail > 0; // 0 = открыли с клавиатуры (Enter на «Подробнее»)
  openProject(+card.dataset.open);
});
dlg.addEventListener('click', (e) => {
  if (e.target === dlg || e.target.closest('[data-close]')) closeProject();
});
dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeProject(); });
dlg.addEventListener('close', () => {
  document.documentElement.classList.remove('dlg-open');
  // Открыли мышью или пальцем: не оставляем рамку фокуса на карточке после закрытия
  const a = document.activeElement;
  if (openedByPointer && a && a !== document.body) a.blur();
});

// Свайп вниз за ручку (только телефон: на десктопе ручка скрыта)
let sheet = null;
dlg.addEventListener('pointerdown', (e) => {
  const h = e.target.closest('.dlg-handle');
  if (!h || closing) return;
  sheet = { y: e.clientY, dy: 0, t: performance.now(), id: e.pointerId };
  h.setPointerCapture(e.pointerId);
  dlg.style.transition = 'none';
});
dlg.addEventListener('pointermove', (e) => {
  if (!sheet || e.pointerId !== sheet.id) return;
  sheet.dy = Math.max(0, e.clientY - sheet.y);
  dlg.style.transform = `translateY(${sheet.dy}px)`;
});
const endSheet = (e) => {
  if (!sheet || e.pointerId !== sheet.id) return;
  const { dy, t } = sheet;
  sheet = null;
  const speed = dy / Math.max(1, performance.now() - t);
  dlg.style.transition = '';
  if (dy > 110 || (speed > 0.6 && dy > 30)) {
    dlg.style.transform = 'translateY(100%)';
    dlg.classList.remove('is-open');
    closing = true;
    setTimeout(() => { closing = false; dlg.close(); dlg.style.transform = ''; }, 320);
  } else {
    dlg.style.transform = '';
  }
};
dlg.addEventListener('pointerup', endSheet);
dlg.addEventListener('pointercancel', endSheet);


document.getElementById('stack').innerHTML = stack
  .map(s => `<li class="rounded-full border border-line px-4 py-1.5 text-sm">${s}</li>`)
  .join('');
document.getElementById('year').textContent = new Date().getFullYear();

renderSections();

/* ---------- Копирование почты ---------- */
const copyBtn = document.getElementById('copy-email');
if (copyBtn) {
  const wrap = copyBtn.parentElement;
  const tip = wrap.querySelector('[role="status"]');
  let timer;
  const show = (msg) => {
    wrap.classList.add('is-copied'); // прячем подсказку «Скопировать почту»
    tip.textContent = msg;
    tip.classList.add('is-on');
    clearTimeout(timer);
    timer = setTimeout(() => {
      tip.classList.remove('is-on');
      setTimeout(() => { tip.textContent = ''; }, 250);
    }, 1800);
  };
  // Подсказка «Скопировать почту» снова доступна после ухода курсора или фокуса
  wrap.addEventListener('mouseleave', () => wrap.classList.remove('is-copied'));
  copyBtn.addEventListener('blur', () => wrap.classList.remove('is-copied'));
  const fallbackCopy = (text) => { // для http и старых браузеров
    const t = document.createElement('textarea');
    t.value = text;
    t.setAttribute('readonly', '');
    t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(t);
    t.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    t.remove();
    return ok;
  };
  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.email;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; }
    catch (_) { ok = fallbackCopy(text); }
    show(ok ? 'Почта скопирована' : 'Не удалось скопировать');
  });
}
