(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ============ CONFIGURACIÓN ============ */
  const NAME = 'Yamileth';
  const BIRTH_MONTH = 9;   // 0 = enero ... 9 = octubre
  const BIRTH_DAY = 4;

  // Carpeta y extensiones de imagen que se intentan (en este orden)
  const IMG_DIR = 'img/';
  const EXTS = ['png', 'webp', 'jpg', 'gif', 'svg'];

  const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

  // Para probar sin esperar: abre index.html?fecha=2026-10-04
  // o con hora: index.html?fecha=2026-10-03T23:59:50 (verás el cambio de medianoche)
  const params = new URLSearchParams(location.search);
  let offset = 0;
  if (params.get('fecha')) {
    const raw = params.get('fecha');
    const t = new Date(raw.includes('T') ? raw : raw + 'T12:00:00');
    if (!isNaN(t)) offset = t.getTime() - Date.now();
  }
  const now = () => new Date(Date.now() + offset);

  /* ============ FRASES (cambian cada día a las 12 a. m.) ============
     Solo frases bonitas sobre ella y un cariño sin condiciones. */
  const PHRASES = [
    'Tienes una cara preciosa, de esas que se quedan en la mente mucho rato.',
    'Tu sonrisa es de las que hacen que cualquier día se vea mejor.',
    'Qué bonita eres, Yamileth, y lo digo con toda sinceridad.',
    'Hay personas con una luz especial, y tú eres una de ellas.',
    'Tus ojos tienen algo que da ganas de mirarlos más de una vez.',
    'Mi cariño por ti no tiene condiciones: te quiero tal como eres.',
    'Quiero quererte sin condiciones, sin prisa y sin letra pequeña.',
    'Ojalá hoy te mires al espejo y veas lo hermosa que eres.',
    'Tu nombre suena bonito, y a ti te queda todavía mejor.',
    'Tienes una belleza que no necesita esfuerzo: simplemente se nota.',
    'Eres de esas personas que dan ganas de conocer cada vez más.',
    'Mi amor por ti no depende de nada: ni del día, ni del clima, ni de lo que pase.',
    'Con una sonrisa como la tuya, cualquier foto se ve como un recuerdo bonito.',
    'Eres linda por fuera y, por lo poco que conozco, todavía más por dentro.',
    'Si el cariño se pudiera medir, el mío por ti no tendría fondo.',
    'Hoy te deseo un día tan bonito como tú.',
    'Mereces que te quieran completa, sin condiciones y sin cambiar nada de ti.',
    'Tu carita bonita es lo primero que uno nota, y lo último que se olvida.',
    'Cada vez que pienso en ti, sonrío sin darme cuenta.',
    'Eres un regalo para quien tiene la suerte de conocerte.',
    'Quiero que sepas que eres hermosa, hoy y todos los días.',
    'Te quiero de la forma más sincera que existe: sin pedir nada a cambio.',
    'Tienes una mirada bonita, de esas que hablan sin decir nada.',
    'Todo en ti parece tener un toque de ternura.',
    'Mi amor por ti es de los que se quedan, sin importar qué pase.',
    'Ojalá nunca dejes de sonreír, porque te queda precioso.',
    'Eres bonita como un tulipán en primavera: suave, elegante y única.',
    'Aunque cambien las estaciones, mi cariño por ti siempre florece.',
    'Qué suerte tan grande es saber que existes.',
    'Eres una razón más para creer que las cosas bonitas sí existen.',
    'Te quiero sin condiciones, sin miedo y con todo el corazón.'
  ];

  const BIRTHDAY_PHRASE = 'Hoy el mundo celebra que naciste, y yo celebro haberte conocido.';

  const TULIP_COLORS = ['#FF8FB1', '#F0574F', '#FFC93C', '#B79CFF', '#FF9F5A', '#FF6F91', '#F7A6C8'];

  /* ============ PERSONAJES ============
     file  = nombre del archivo SIN extensión dentro de img/
             (ej. img/snoopy.png, img/snoopy.webp, img/snoopy.jpg...)
     url   = (opcional) link directo a una imagen; se prueba primero
     emoji = lo que se muestra si no hay imagen
  */
  const BGS = ['#FFF1BF', '#DDF1FB', '#FFE3EC', '#D5F2E3', '#E6DEFF', '#FFE5D0'];
  const CHARS = [
    { name: 'Snoopy',           file: 'snoopy',           emoji: '🐶', url: '', text: 'El beagle más soñador. Baila feliz todos los días y contagia su alegría.' },
    { name: 'Charlie Brown',    file: 'charlie-brown',    emoji: '🧒', url: '', text: 'A veces nada le sale, pero nunca deja de intentarlo. Ese es el mejor corazón.' },
    { name: 'Woodstock',        file: 'woodstock',        emoji: '🐤', url: '', text: 'Pequeño, leal y siempre al lado de su mejor amigo.' },
    { name: 'Lucy',             file: 'lucy',             emoji: '🥺', url: '', text: 'Segura y con mucho carácter. Se admira a quien sabe lo que quiere.' },
    { name: 'Linus',            file: 'linus',            emoji: '🧸', url: '', text: 'Su manta lo hace sentir a salvo. Todos tenemos algo que nos da calma.' },
    { name: 'Sally',            file: 'sally',            emoji: '🎀', url: '', text: 'Soñadora y risueña, siempre con el corazón por delante.' },
    { name: 'Schroeder',        file: 'schroeder',        emoji: '🎹', url: '', text: 'Vive por su piano. Qué bonito es tener algo que te apasione.' },
    { name: 'Peppermint Patty', file: 'peppermint-patty', emoji: '🏅', url: '', text: 'Alegre, deportista y de gran corazón. Una amiga que siempre suma.' },
    { name: 'Marcie',           file: 'marcie',           emoji: '👓', url: '', text: 'Lista, leal y cariñosa. La amiga que todo lo entiende.' },
    { name: 'Pig-Pen',          file: 'pig-pen',          emoji: '💨', url: '', text: 'Va feliz por la vida con su nubecita de polvo. Ser uno mismo es lo mejor.' },
    { name: 'Franklin',         file: 'franklin',         emoji: '🎒', url: '', text: 'Amable, tranquilo y buen amigo. La calma también es una forma de querer.' },
    { name: 'Rerun',            file: 'rerun',            emoji: '🚲', url: '', text: 'El pequeño observador. Se fija en todos los detalles bonitos.' },
    { name: 'Spike',            file: 'spike',            emoji: '🌵', url: '', text: 'Desde el desierto, el hermano de Snoopy también te manda saludos.' }
  ];
  CHARS.forEach((c, i) => { c.bg = BGS[i % BGS.length]; });
  const byName = (n) => CHARS.find((c) => c.name === n);

  /* ============ UTILIDADES ============ */
  const $ = (s) => document.querySelector(s);
  const pad = (n) => String(n).padStart(2, '0');
  const dayIndex = (d) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  const dayKey = (d) => d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  const isBirthday = (d) => d.getMonth() === BIRTH_MONTH && d.getDate() === BIRTH_DAY;

  function targetDate(n) {
    const y = n.getFullYear();
    const endOfDay = new Date(y, BIRTH_MONTH, BIRTH_DAY + 1, 0, 0, 0);
    return n >= endOfDay
      ? new Date(y + 1, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0)
      : new Date(y, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);
  }

  /* ============ TULIPANES (SVG dibujado aquí) ============ */
  const HEAD = 'M10 22 L14 4 L24 16 L30 2 L36 16 L46 4 L50 22 C50 44 42 60 30 60 C18 60 10 44 10 22Z';
  const MID  = 'M22 18 L30 2 L38 18 C40 38 36 56 30 60 C24 56 20 38 22 18Z';

  function tulipSVG(color) {
    return `<svg class="tulip" viewBox="0 0 60 130" role="img" aria-label="Tulipán">
      <path d="M30 60 C31 86 29 106 30 128" fill="none" stroke="#4FAF83" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 122 C12 112 8 90 14 74 C25 88 30 104 30 122Z" fill="#5CC195"/>
      <path d="M30 122 C48 108 52 88 46 72 C35 86 30 102 30 122Z" fill="#4FAF83"/>
      <path d="${HEAD}" fill="${color}" stroke="rgba(43,42,76,.12)" stroke-width="1.2"/>
      <path d="${MID}" fill="#fff" fill-opacity=".28"/>
    </svg>`;
  }

  function bouquetSVG() {
    const cols = ['#FF8FB1', '#F0574F', '#FFC93C', '#B79CFF', '#FF9F5A', '#FFE7EE'];
    const N = 13, B = { x: 210, y: 430 };
    const items = [];
    for (let i = 0; i < N; i++) {
      const a = -42 + (84 * i) / (N - 1);
      const stagger = i % 2 === 0 ? 0 : -42;
      const L = 300 - Math.abs(a) * 1.1 + stagger;
      const rad = (a * Math.PI) / 180;
      items.push({
        a, L,
        x: B.x + L * Math.sin(rad),
        y: B.y - L * Math.cos(rad),
        c: cols[i % cols.length],
        s: 1.05 + ((i * 7) % 5) * 0.03
      });
    }
    items.sort((p, q) => q.L - p.L); // los más altos al fondo

    const stems = items.map((o) =>
      `<line x1="${B.x}" y1="${B.y}" x2="${o.x.toFixed(1)}" y2="${o.y.toFixed(1)}" stroke="#4FAF83" stroke-width="5" stroke-linecap="round"/>`
    ).join('');

    const heads = items.map((o) =>
      `<g transform="translate(${o.x.toFixed(1)} ${o.y.toFixed(1)}) rotate(${o.a.toFixed(1)}) scale(${o.s}) translate(-30 -60)">
        <path d="${HEAD}" fill="${o.c}" stroke="rgba(43,42,76,.14)" stroke-width="1.2"/>
        <path d="${MID}" fill="#fff" fill-opacity=".28"/>
      </g>`
    ).join('');

    return `<svg viewBox="0 0 420 500" role="img" aria-label="Ramo de tulipanes">
      <path d="M210 430 C140 390 105 320 100 260 C155 300 200 360 210 430Z" fill="#5CC195"/>
      <path d="M210 430 C280 390 315 320 320 260 C265 300 220 360 210 430Z" fill="#4FAF83"/>
      ${stems}
      ${heads}
      <path d="M96 350 Q210 372 324 350 L236 492 Q210 500 184 492 Z" fill="#FFE9C7" stroke="#F2D3A2" stroke-width="2"/>
      <path d="M148 420 Q210 438 272 420 L266 442 Q210 460 154 442Z" fill="#F0574F"/>
      <ellipse cx="190" cy="436" rx="18" ry="9" transform="rotate(-22 190 436)" fill="#F0574F"/>
      <ellipse cx="230" cy="436" rx="18" ry="9" transform="rotate(22 230 436)" fill="#F0574F"/>
      <circle cx="210" cy="437" r="7" fill="#D9443C"/>
    </svg>`;
  }

  /* ============ COMPONENTE PERSONAJE ============
     Empieza mostrando el emoji. Intenta cargar la imagen con
     distintas extensiones; si carga alguna, reemplaza al emoji.
     Si ninguna existe, se queda el emoji (nunca se ve roto). */
  function makeChar(c, size, override) {
    const bases = override ? [override, c.file] : [c.file];
    const urls = [];
    if (c.url && !override) urls.push(c.url);
    bases.forEach((b) => EXTS.forEach((e) => urls.push(IMG_DIR + b + '.' + e)));

    const wrap = document.createElement('div');
    wrap.className = 'char char-' + size + ' missing';
    wrap.style.setProperty('--bg', c.bg);

    const ph = document.createElement('span');
    ph.className = 'ph';
    ph.innerHTML = '<b>' + c.emoji + '</b><small>' + c.name + '</small>';

    const img = new Image();
    img.alt = c.name;
    img.decoding = 'async';
    let i = 0;
    img.addEventListener('load', () => wrap.classList.remove('missing'));
    img.addEventListener('error', () => {
      i++;
      if (i < urls.length) img.src = urls[i];
    });
    img.src = urls[0];

    wrap.append(img, ph);
    return wrap;
  }

  function mount(sel, node) {
    const host = $(sel);
    host.innerHTML = '';
    host.appendChild(node);
  }

  /* ============ FONDO DE PARTÍCULAS ============ */
  function buildParticles() {
    const box = $('#particles');
    const colors = ['#F0574F', '#FFC93C', '#FF8FB1', '#7CC8EE', '#4FAF83', '#B79CFF'];
    const shapes = [
      '<path d="M12 3 L22 20 H2Z"/>',
      '<path d="M12 2 L14.8 8.6 L22 9.3 L16.5 14 L18.2 21 L12 17.3 L5.8 21 L7.5 14 L2 9.3 L9.2 8.6Z"/>',
      '<path d="M12 21 C4 14 2 10 2 7 C2 4 4.5 2.5 7 2.5 C9 2.5 11 4 12 6 C13 4 15 2.5 17 2.5 C19.5 2.5 22 4 22 7 C22 10 20 14 12 21Z"/>'
    ];
    for (let i = 0; i < 38; i++) {
      const el = document.createElement('span');
      el.className = 'p';
      const size = 12 + Math.random() * 18;
      el.style.width = el.style.height = size + 'px';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.color = colors[i % colors.length];
      el.style.animationDuration = 6 + Math.random() * 8 + 's';
      el.style.animationDelay = -Math.random() * 8 + 's';
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">${shapes[i % shapes.length]}</svg>`;
      box.appendChild(el);
    }
  }

  /* ============ LLUVIA DE TULIPANES (día del cumpleaños) ============ */
  let rainStarted = false;
  function startRain() {
    if (rainStarted) return;
    rainStarted = true;
    const box = $('#rain');
    const cols = ['#FF8FB1', '#F0574F', '#FFC93C', '#B79CFF', '#FF9F5A', '#FF6F91'];
    for (let i = 0; i < 26; i++) {
      const d = document.createElement('div');
      d.className = 'drop';
      d.style.left = Math.random() * 96 + '%';
      d.style.width = 22 + Math.random() * 22 + 'px';
      d.style.animationDuration = 7 + Math.random() * 7 + 's';
      d.style.animationDelay = -Math.random() * 12 + 's';
      d.innerHTML = tulipSVG(cols[i % cols.length]);
      box.appendChild(d);
    }
  }

  /* ============ CUENTA REGRESIVA ============ */
  function updateCountdown(n) {
    const diff = Math.max(0, targetDate(n) - n);
    const s = Math.floor(diff / 1000);
    $('#cd-d').textContent = pad(Math.floor(s / 86400));
    $('#cd-h').textContent = pad(Math.floor((s % 86400) / 3600));
    $('#cd-m').textContent = pad(Math.floor((s % 3600) / 60));
    $('#cd-s').textContent = pad(s % 60);
  }

  /* ============ FRASE DEL DÍA ============ */
  function renderPhrase(n, birthday, animate) {
    const idx = dayIndex(n);
    const text = birthday ? BIRTHDAY_PHRASE : PHRASES[idx % PHRASES.length];
    const color = TULIP_COLORS[idx % TULIP_COLORS.length];
    const c = CHARS[idx % CHARS.length];
    const bq = $('#phraseText');

    const apply = () => {
      bq.textContent = text;
      $('#phraseTulip').innerHTML = tulipSVG(color);
      $('#phraseDate').textContent = 'Frase de hoy · ' + n.getDate() + ' de ' + MONTHS[n.getMonth()];
      $('#phraseWho').innerHTML = 'Hoy te lo dice <b>' + c.name + '</b>';
      mount('#dayChar', makeChar(c, 'md'));
      bq.classList.remove('fade');
    };

    if (animate) {
      bq.classList.add('fade');
      setTimeout(apply, 500);
    } else {
      apply();
    }
  }

  /* ============ MODO NORMAL / MODO CUMPLEAÑOS ============ */
  let bouquetBuilt = false;
  function applyMode(birthday, n) {
    const t = targetDate(n);
    const longDate = t.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    $('#cuenta').hidden = birthday;
    $('#cumple').hidden = !birthday;

    const nav = $('#navCuenta');
    if (birthday) {
      nav.textContent = 'Tu día';
      nav.setAttribute('href', '#cumple');
      $('#heroLabel').textContent = '4 de octubre · ' + n.getFullYear();
      $('#heroTitle').textContent = '¡Feliz cumpleaños, ' + NAME + '!';
      $('#heroLead').textContent = 'Hoy todo es para ti: los tulipanes, la pandilla y cada palabra bonita que preparé.';
      $('#heroBtn').textContent = 'Ver tu sorpresa';
      $('#heroBtn').setAttribute('href', '#cumple');

      if (!bouquetBuilt) {
        $('#bouquet').innerHTML = bouquetSVG();
        mount('#bdaySnoopy', makeChar(byName('Snoopy'), 'bd', 'snoopy-cumple'));
        bouquetBuilt = true;
      }
      startRain();
    } else {
      nav.textContent = 'Cuenta regresiva';
      nav.setAttribute('href', '#cuenta');
      $('#heroLabel').textContent = 'Un cumpleaños muy especial';
      $('#heroTitle').textContent = 'Para ' + NAME + ', con todo mi cariño.';
      $('#heroLead').textContent = 'Hice este rinconcito con Snoopy y toda su pandilla para acompañarte hasta tu día. Cada día habrá una frase nueva, y cada frase, un tulipán.';
      $('#heroBtn').textContent = 'Ver mi frase de hoy';
      $('#heroBtn').setAttribute('href', '#frase');
      $('#cdDate').textContent = longDate;
    }
  }

  /* ============ REVELAR AL HACER SCROLL ============ */
  function setupReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
  }

  /* ============ CICLO PRINCIPAL (cada segundo) ============ */
  let lastKey = null;
  let lastMode = null;

  function tick() {
    const n = now();
    const b = isBirthday(n);

    if (b !== lastMode) { lastMode = b; applyMode(b, n); }
    if (!b) updateCountdown(n);

    const key = dayKey(n);
    if (key !== lastKey) {
      const first = lastKey === null;
      lastKey = key;
      renderPhrase(n, b, !first); // se actualiza sola a las 12:00 a. m.
    }
  }

  /* ============ INICIO ============ */
  document.querySelectorAll('[data-tulip]').forEach((el) => {
    el.innerHTML = tulipSVG(el.dataset.tulip);
  });

  mount('#heroSnoopy', makeChar(byName('Snoopy'), 'xl'));
  mount('#heroWoodstock', makeChar(byName('Woodstock'), 'sm'));

  const grid = $('#charGrid');
  CHARS.forEach((c) => {
    const item = document.createElement('article');
    item.className = 'char-item reveal';
    item.appendChild(makeChar(c, 'lg'));
    const h = document.createElement('h3');
    h.textContent = c.name;
    const p = document.createElement('p');
    p.textContent = c.text;
    item.append(h, p);
    grid.appendChild(item);
  });

  buildParticles();
  tick();
  setInterval(tick, 1000);
  setupReveal();
})();
