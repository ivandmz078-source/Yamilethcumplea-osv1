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

  /* ============ ILUSTRACIONES SVG (respaldo si no hay imagen) ============
     Dibujos propios, uno por personaje, basados en un objeto que lo identifica. */
  const S = 'stroke="#2B2A4C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const icon = (inner) => `<svg viewBox="0 0 100 100" aria-hidden="true">${inner}</svg>`;

  const ICONS = {
    // Casita de Snoopy
    'snoopy': icon(`
      <rect x="22" y="46" width="56" height="38" rx="3" fill="#fff" ${S}/>
      <polygon points="14,48 50,16 86,48" fill="#F0574F" ${S}/>
      <path d="M41 84 V68 a9 9 0 0 1 18 0 V84Z" fill="#2B2A4C"/>
      <path d="M74 88 H94 L91 79 H77Z" fill="#FFC93C" ${S}/>`),

    // Pelota de béisbol
    'charlie-brown': icon(`
      <circle cx="50" cy="50" r="30" fill="#fff" ${S}/>
      <path d="M33 26 Q46 50 33 74" fill="none" stroke="#F0574F" stroke-width="3" stroke-linecap="round"/>
      <path d="M67 26 Q54 50 67 74" fill="none" stroke="#F0574F" stroke-width="3" stroke-linecap="round"/>
      <path d="M36 36 l6 2 M39 46 l7 0 M39 56 l7 0 M36 66 l6 -2 M64 36 l-6 2 M61 46 l-7 0 M61 56 l-7 0 M64 66 l-6 -2" stroke="#F0574F" stroke-width="2" stroke-linecap="round"/>`),

    // Pollito
    'woodstock': icon(`
      <path d="M46 34 Q42 22 48 20 M52 33 Q54 22 60 23" fill="none" ${S}/>
      <circle cx="50" cy="56" r="26" fill="#FFD84D" ${S}/>
      <polygon points="24,56 37,51 37,61" fill="#FF9F5A" ${S}/>
      <circle cx="43" cy="50" r="3.2" fill="#2B2A4C"/>
      <ellipse cx="62" cy="60" rx="11" ry="7" transform="rotate(-20 62 60)" fill="#FFC21A" ${S}/>
      <path d="M44 82 V90 M56 82 V90" ${S} fill="none"/>`),

    // Balón de fútbol americano
    'lucy': icon(`
      <g transform="rotate(-28 50 50)">
        <ellipse cx="50" cy="50" rx="34" ry="21" fill="#B5651D" ${S}/>
        <path d="M34 50 H66" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <path d="M42 45 V55 M50 45 V55 M58 45 V55" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M22 44 Q20 50 22 56 M78 44 Q80 50 78 56" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`),

    // Cobija
    'linus': icon(`
      <path d="M18 28 Q50 18 82 28 V72 Q50 82 18 72Z" fill="#7CC8EE" ${S}/>
      <path d="M18 50 Q50 58 82 50 M50 22 V78" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>
      <path d="M50 46 C42 40 38 36 38 32 C38 29 40 27 43 27 C46 27 49 29 50 32 C51 29 54 27 57 27 C60 27 62 29 62 32 C62 36 58 40 50 46Z" fill="#FF8FB1" transform="translate(0 12) scale(1)"/>`),

    // Moño
    'sally': icon(`
      <path d="M50 50 L16 30 Q8 50 16 70Z" fill="#FF8FB1" ${S}/>
      <path d="M50 50 L84 30 Q92 50 84 70Z" fill="#FF8FB1" ${S}/>
      <path d="M46 56 L36 84 L46 78 L50 88 L52 58Z" fill="#F7A6C8" ${S}/>
      <path d="M54 56 L64 84 L54 78 L50 88 L48 58Z" fill="#F7A6C8" ${S}/>
      <circle cx="50" cy="50" r="8" fill="#F0574F" ${S}/>`),

    // Teclado de piano
    'schroeder': icon(`
      <rect x="14" y="32" width="72" height="42" rx="4" fill="#fff" ${S}/>
      <path d="M26 74 V32 M38 74 V32 M50 74 V32 M62 74 V32 M74 74 V32" stroke="#2B2A4C" stroke-width="1.6"/>
      <rect x="22" y="32" width="8" height="26" rx="1.5" fill="#2B2A4C"/>
      <rect x="34" y="32" width="8" height="26" rx="1.5" fill="#2B2A4C"/>
      <rect x="58" y="32" width="8" height="26" rx="1.5" fill="#2B2A4C"/>
      <rect x="70" y="32" width="8" height="26" rx="1.5" fill="#2B2A4C"/>
      <path d="M72 22 V10 L82 8 V20" fill="none" ${S}/>
      <circle cx="69" cy="22" r="3.5" fill="#2B2A4C"/><circle cx="79" cy="20" r="3.5" fill="#2B2A4C"/>`),

    // Medalla
    'peppermint-patty': icon(`
      <polygon points="30,12 50,46 40,50 22,16" fill="#F0574F" ${S}/>
      <polygon points="70,12 50,46 60,50 78,16" fill="#7CC8EE" ${S}/>
      <circle cx="50" cy="62" r="24" fill="#FFC93C" ${S}/>
      <circle cx="50" cy="62" r="16" fill="none" stroke="#B57A00" stroke-width="2"/>
      <path d="M50 51 L54 58.5 L62 59.5 L56 65 L57.5 73 L50 69 L42.5 73 L44 65 L38 59.5 L46 58.5Z" fill="#fff" ${S}/>`),

    // Lentes
    'marcie': icon(`
      <circle cx="31" cy="52" r="17" fill="#fff" fill-opacity=".65" ${S} stroke-width="3.5"/>
      <circle cx="69" cy="52" r="17" fill="#fff" fill-opacity=".65" ${S} stroke-width="3.5"/>
      <path d="M48 50 Q50 46 52 50" fill="none" ${S} stroke-width="3.5"/>
      <path d="M14 48 L6 42 M86 48 L94 42" ${S} stroke-width="3.5" fill="none"/>
      <path d="M22 44 Q26 40 31 40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),

    // Nubecita de polvo
    'pig-pen': icon(`
      <circle cx="34" cy="58" r="17" fill="#E4D9C6"/>
      <circle cx="54" cy="46" r="20" fill="#E4D9C6"/>
      <circle cx="70" cy="60" r="15" fill="#E4D9C6"/>
      <circle cx="50" cy="64" r="17" fill="#E4D9C6"/>
      <circle cx="40" cy="52" r="2.5" fill="#B8A88C"/><circle cx="60" cy="44" r="2.5" fill="#B8A88C"/>
      <circle cx="66" cy="62" r="2.5" fill="#B8A88C"/><circle cx="48" cy="66" r="2.5" fill="#B8A88C"/>
      <circle cx="18" cy="34" r="3" fill="#B8A88C"/><circle cx="84" cy="38" r="3" fill="#B8A88C"/>
      <circle cx="80" cy="80" r="2.5" fill="#B8A88C"/><circle cx="22" cy="80" r="2.5" fill="#B8A88C"/>`),

    // Mochila
    'franklin': icon(`
      <path d="M38 30 Q38 16 50 16 Q62 16 62 30" fill="none" ${S} stroke-width="4"/>
      <rect x="26" y="28" width="48" height="58" rx="16" fill="#4FAF83" ${S}/>
      <rect x="35" y="56" width="30" height="22" rx="7" fill="#5CC195" ${S}/>
      <path d="M35 46 H65" stroke="#2B2A4C" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="46" r="2.6" fill="#FFC93C" ${S} stroke-width="1.5"/>`),

    // Bicicleta
    'rerun': icon(`
      <circle cx="26" cy="64" r="17" fill="none" ${S} stroke-width="3.5"/>
      <circle cx="74" cy="64" r="17" fill="none" ${S} stroke-width="3.5"/>
      <path d="M26 64 L44 64 L58 40 L74 64 M44 64 L38 42 M58 40 L52 64" fill="none" stroke="#F0574F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M32 42 H46" ${S} stroke-width="4" fill="none"/>
      <path d="M58 40 L64 30 H72" ${S} stroke-width="4" fill="none"/>`),

    // Cactus
    'spike': icon(`
      <ellipse cx="50" cy="86" rx="34" ry="7" fill="#F2D3A2"/>
      <path d="M50 82 V30" stroke="#2B2A4C" stroke-width="21" stroke-linecap="round"/>
      <path d="M50 58 H33 V42" stroke="#2B2A4C" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M50 50 H67 V34" stroke="#2B2A4C" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M50 82 V30" stroke="#4FAF83" stroke-width="16" stroke-linecap="round"/>
      <path d="M50 58 H33 V42" stroke="#4FAF83" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M50 50 H67 V34" stroke="#4FAF83" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M50 44 V70" stroke="#5CC195" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="20" r="6" fill="#FF8FB1" ${S} stroke-width="2"/>`),

    // Pastel de cumpleaños
    'snoopy-cumple': icon(`
      <rect x="20" y="54" width="60" height="30" rx="5" fill="#FFE3EC" ${S}/>
      <path d="M20 62 Q28 72 36 62 Q44 72 52 62 Q60 72 68 62 Q76 72 80 62 V56 Q80 54 78 54 H22 Q20 54 20 56Z" fill="#FF8FB1" ${S}/>
      <rect x="35" y="38" width="6" height="16" rx="2" fill="#7CC8EE" ${S}/>
      <rect x="47" y="38" width="6" height="16" rx="2" fill="#FFC93C" ${S}/>
      <rect x="59" y="38" width="6" height="16" rx="2" fill="#B79CFF" ${S}/>
      <path d="M38 24 Q35 30 38 34 Q41 30 38 24Z M50 24 Q47 30 50 34 Q53 30 50 24Z M62 24 Q59 30 62 34 Q65 30 62 24Z" fill="#FF9F5A"/>
      <path d="M14 86 H86" ${S} fill="none"/>`)
  };

  /* ============ PERSONAJES ============
     file = nombre del archivo SIN extensión dentro de img/
            (ej. img/snoopy.png, img/snoopy.webp, img/snoopy.jpg...)
     url  = (opcional) link directo a una imagen; se prueba primero
     Si no hay imagen, se usa la ilustración de ICONS con el mismo nombre. */
  const BGS = ['#FFF1BF', '#DDF1FB', '#FFE3EC', '#D5F2E3', '#E6DEFF', '#FFE5D0'];
  const CHARS = [
    { name: 'Snoopy',           file: 'snoopy',           url: '', text: 'El beagle más soñador. Baila feliz todos los días y contagia su alegría.' },
    { name: 'Charlie Brown',    file: 'charlie-brown',    url: '', text: 'A veces nada le sale, pero nunca deja de intentarlo. Ese es el mejor corazón.' },
    { name: 'Woodstock',        file: 'woodstock',        url: '', text: 'Pequeño, leal y siempre al lado de su mejor amigo.' },
    { name: 'Lucy',             file: 'lucy',             url: '', text: 'Segura y con mucho carácter. Se admira a quien sabe lo que quiere.' },
    { name: 'Linus',            file: 'linus',            url: '', text: 'Su manta lo hace sentir a salvo. Todos tenemos algo que nos da calma.' },
    { name: 'Sally',            file: 'sally',            url: '', text: 'Soñadora y risueña, siempre con el corazón por delante.' },
    { name: 'Schroeder',        file: 'schroeder',        url: '', text: 'Vive por su piano. Qué bonito es tener algo que te apasione.' },
    { name: 'Peppermint Patty', file: 'peppermint-patty', url: '', text: 'Alegre, deportista y de gran corazón. Una amiga que siempre suma.' },
    { name: 'Marcie',           file: 'marcie',           url: '', text: 'Lista, leal y cariñosa. La amiga que todo lo entiende.' },
    { name: 'Pig-Pen',          file: 'pig-pen',          url: '', text: 'Va feliz por la vida con su nubecita de polvo. Ser uno mismo es lo mejor.' },
    { name: 'Franklin',         file: 'franklin',         url: '', text: 'Amable, tranquilo y buen amigo. La calma también es una forma de querer.' },
    { name: 'Rerun',            file: 'rerun',            url: '', text: 'El pequeño observador. Se fija en todos los detalles bonitos.' },
    { name: 'Spike',            file: 'spike',            url: '', text: 'Desde el desierto, el hermano de Snoopy también te manda saludos.' }
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
     Muestra primero la ilustración SVG. Intenta cargar la imagen
     real desde img/ con distintas extensiones; si carga alguna,
     reemplaza a la ilustración. Si no existe, se queda el dibujo. */
  function makeChar(c, size, override) {
    const bases = override ? [override, c.file] : [c.file];
    const urls = [];
    if (c.url && !override) urls.push(c.url);
    bases.forEach((b) => EXTS.forEach((e) => urls.push(IMG_DIR + b + '.' + e)));

    const wrap = document.createElement('div');
    wrap.className = 'char char-' + size + ' missing';
    wrap.style.setProperty('--bg', c.bg);

    const key = override || c.file;
    const label = override ? '¡Feliz cumpleaños!' : c.name;
    const ph = document.createElement('span');
    ph.className = 'ph';
    ph.innerHTML = (ICONS[key] || ICONS[c.file] || '') + '<small>' + label + '</small>';

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
