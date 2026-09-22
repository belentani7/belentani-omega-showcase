const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const versionsDir = path.join(root, 'versions');
fs.mkdirSync(versionsDir, { recursive: true });

const versions = [
  { slug: '01-umbral', title: 'Umbral', subtitle: 'El primer estado del sistema', accent: 'var(--violet)', blurb: 'Una puerta de entrada hecha de memoria, presión y música.', intro: 'Aquí el visitante entra en el ecosistema sin explicar demasiado. Cada sonido y cada imagen funcionan como señal.' },
  { slug: '02-luz-quemada', title: 'Luz Quemada', subtitle: 'La herida encendida', accent: 'var(--red)', blurb: 'La violencia del gesto se vuelve superficie y pulso.', intro: 'La versión de la luz quemada muestra la tensión de Judas como una energía que quema y deja rastros.' },
  { slug: '03-cuerpo-memoria', title: 'Cuerpo Memoria', subtitle: 'La piel como registro', accent: 'var(--cyan)', blurb: 'El cuerpo conserva lo que la razón intenta negar.', intro: 'Esta variante pone el cuerpo en el centro y entiende el archivo como material sensorial.' },
  { slug: '04-ruido-sagrado', title: 'Ruido Sagrado', subtitle: 'El sistema respira', accent: 'var(--brass)', blurb: 'El error se vuelve liturgia y la distorsión se vuelve voz.', intro: 'Aquí la estética se vuelve ritual: un sistema que falla y aun así comunica.' },
  { slug: '05-puerta-negra', title: 'Puerta Negra', subtitle: 'La entrada al otro lado', accent: 'var(--violet)', blurb: 'La oscuridad se convierte en pausa, decisión y pozo.', intro: 'Esta versión convierte cada transición en un umbral más denso, más lento y más obsesivo.' },
  { slug: '06-cristal-vivo', title: 'Cristal Vivo', subtitle: 'El sistema se vuelve espejo', accent: 'var(--cyan)', blurb: 'La superficie refleja lo que aún no se ha nombrado.', intro: 'Aquí el archivo se vuelve una red de reflejos donde cada pieza responde a la otra.' },
  { slug: '07-voz-de-dios', title: 'Voz de Dios', subtitle: 'El canto como comando', accent: 'var(--red)', blurb: 'Una voz que no manda, pero sí altera la arquitectura.', intro: 'Esta versión concentra el peso emocional en una voz que atraviesa el espacio en lugar de explicarlo.' },
  { slug: '08-llave-dorada', title: 'Llave Dorada', subtitle: 'El objeto que cambia de mano', accent: 'var(--brass)', blurb: 'El símbolo se vuelve un emisor de historia y deuda.', intro: 'La llave dorada organiza la narrativa alrededor de la transferencia, el gesto y la memoria.' },
  { slug: '09-echo-de-judas', title: 'Eco de Judas', subtitle: 'El personaje como campo', accent: 'var(--violet)', blurb: 'Judas ya no es solo figura: es un sistema de ecos.', intro: 'El personaje se disuelve en múltiples resonancias para que su presencia jamás sea unívoca.' },
  { slug: '10-ritual-de-aire', title: 'Ritual de Aire', subtitle: 'El idioma del soplo', accent: 'var(--cyan)', blurb: 'El aire transporta la tensión y la hace material.', intro: 'La versión ritual de aire enfatiza la respiración, el silencio y el exceso del espacio.' },
  { slug: '11-archivo-sangre', title: 'Archivo Sangre', subtitle: 'El registro se vuelve carne', accent: 'var(--red)', blurb: 'La prueba deja huella en la superficie más íntima.', intro: 'Aquí las evidencias se vuelven corpóreas. El archivo ya no se limita a documentar: se vuelve cuerpo.' },
  { slug: '12-nexo-omega', title: 'Nexo Omega', subtitle: 'El centro del ecosistema', accent: 'var(--violet)', blurb: 'Todas las versiones se reconocen como una misma arquitectura.', intro: 'La variante Nexo Omega reúne los distintos modos de lectura en una sola lógica expansiva.' },
  { slug: '13-vida-en-vapor', title: 'Vida en Vapor', subtitle: 'La materia se vuelve fugaz', accent: 'var(--brass)', blurb: 'Lo efímero es el verdadero soporte del relato.', intro: 'Esta versión se sostiene en la evaporación, la velocidad y la pérdida de forma.' },
  { slug: '14-raiz-oculta', title: 'Raíz Oculta', subtitle: 'El origen bajo la superficie', accent: 'var(--cyan)', blurb: 'Todo lo visible encuentra su origen en una raíz no declarada.', intro: 'La raíz oculta hace visible lo que nunca se cuenta del todo: la base secreta del universo.' }
];

function renderPage(version, index, total) {
  const prev = index > 0 ? versions[index - 1] : null;
  const next = index < total - 1 ? versions[index + 1] : null;
  return `<!doctype html>
<html lang="es" data-page="versions">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Versión ${version.title} del ecosistema BELENTANI / JUDAS ERA.">
  <title>BELENTANI — ${version.title}</title>
  <link rel="stylesheet" href="../css/ecosystem.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="env-archive">
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <header class="site-header">
    <a class="brand" href="../"><span class="brand-mark">B</span><span><strong>BELENTANI</strong><small>JUDAS ERA / OMEGA</small></span></a>
    <nav class="site-nav" aria-label="Navegación principal">
      <a href="../">Umbral</a><a href="../artist/">Artista</a><a href="../judas/">Judas</a><a href="../archive/">Archivo</a><a href="../studio/">Studio</a><a href="../portal/">Portal</a><a href="../contact/">Contacto</a><a class="is-current" href="./">Versiones</a>
    </nav>
    <div class="header-tools"><span class="system-state"><i></i> VERSION ${String(index + 1).padStart(2, '0')}</span><button class="lang-toggle" type="button" data-language-toggle>ES</button></div>
  </header>
  <main id="main" class="page-main">
    <section class="page-hero" style="--accent:${version.accent}">
      <p class="eyebrow">VERSIÓN ${String(index + 1).padStart(2, '0')} / ECOSISTEMA MASIVO</p>
      <h1>${version.title}<br><em>${version.subtitle}</em></h1>
      <p>${version.blurb}</p>
    </section>
    <div class="content-grid">
      <article class="panel panel-wide">
        <p class="eyebrow">ESTADO DE LA OBRA</p>
        <h2>${version.intro}</h2>
        <p>Esta página forma parte del mapa de versiones masivas de BELENTANI. No reemplaza la obra principal; la amplifica, la desdobla y la vuelve navegable.</p>
        <div class="route-links">
          <a href="../">Volver al umbral</a>
          <a href="./">Ver todas las versiones</a>
        </div>
      </article>
      <aside class="panel panel-side">
        <p class="eyebrow">NAVEGACIÓN DE VERSIONES</p>
        <ul class="list-clean">
          ${prev ? `<li><strong>Anterior</strong><a href="${prev.slug}/">${prev.title}</a></li>` : '<li><strong>Anterior</strong>Inicio del recorrido</li>'}
          ${next ? `<li><strong>Siguiente</strong><a href="${next.slug}/">${next.title}</a></li>` : '<li><strong>Siguiente</strong>Última versión</li>'}
        </ul>
      </aside>
      <article class="panel panel-full">
        <p class="eyebrow">LÓGICA DEL RECORRIDO</p>
        <div class="version-grid">
          <div class="version-card">
            <h3>Sensor</h3>
            <p>El visitante entra con una sensación distinta: más íntima, más material o más ritual.</p>
          </div>
          <div class="version-card">
            <h3>Archivo</h3>
            <p>Cada versión conserva una lógica propia de memoria, imagen y gesto.</p>
          </div>
          <div class="version-card">
            <h3>Puente</h3>
            <p>La obra se convierte en ecosistema porque cada versión extiende la anterior sin repetirla.</p>
          </div>
        </div>
      </article>
    </div>
  </main>
  <footer class="site-footer"><span>BELENTANI / JUDAS ERA</span><span>14 versiones + 1 umbral</span><a href="../contact/">Contacto ↗</a></footer>
  <script src="../js/ecosystem.js"></script>
</body>
</html>`;
}

function renderIndex() {
  const cards = versions.map((version, index) => `
    <a class="version-card version-card--listing" href="${version.slug}/">
      <span class="version-pill">V${String(index + 1).padStart(2, '0')}</span>
      <h3>${version.title}</h3>
      <p>${version.subtitle}</p>
      <small>${version.blurb}</small>
    </a>`).join('');

  return `<!doctype html>
<html lang="es" data-page="versions">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Mapa masivo de versiones de BELENTANI / JUDAS ERA.">
  <title>BELENTANI — Versiones</title>
  <link rel="stylesheet" href="../css/ecosystem.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="env-archive">
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <header class="site-header">
    <a class="brand" href="../"><span class="brand-mark">B</span><span><strong>BELENTANI</strong><small>JUDAS ERA / OMEGA</small></span></a>
    <nav class="site-nav" aria-label="Navegación principal">
      <a href="../">Umbral</a><a href="../artist/">Artista</a><a href="../judas/">Judas</a><a href="../archive/">Archivo</a><a href="../studio/">Studio</a><a href="../portal/">Portal</a><a href="../contact/">Contacto</a><a class="is-current" href="./">Versiones</a>
    </nav>
    <div class="header-tools"><span class="system-state"><i></i> MAPA MASIVO</span><button class="lang-toggle" type="button" data-language-toggle>ES</button></div>
  </header>
  <main id="main" class="page-main">
    <section class="page-hero" style="--accent:var(--violet)">
      <p class="eyebrow">VERSIONES / 14 AMBIENTES</p>
      <h1>El ecosistema<br><em>se multiplica.</em></h1>
      <p>En vez de una sola página, la obra se despliega en 14 versiones diferenciadas para que cada recorrido sea una entrada distinta.</p>
    </section>
    <div class="content-grid">
      <article class="panel panel-full">
        <p class="eyebrow">MAPA DE ENTRADAS</p>
        <div class="version-grid version-grid--listing">${cards}</div>
      </article>
    </div>
  </main>
  <footer class="site-footer"><span>BELENTANI / JUDAS ERA</span><span>14 versiones + 1 umbral</span><a href="../contact/">Contacto ↗</a></footer>
  <script src="../js/ecosystem.js"></script>
</body>
</html>`;
}

fs.writeFileSync(path.join(versionsDir, 'index.html'), renderIndex());

versions.forEach((version, index) => {
  const versionDir = path.join(versionsDir, version.slug);
  fs.mkdirSync(versionDir, { recursive: true });
  fs.writeFileSync(path.join(versionDir, 'index.html'), renderPage(version, index, versions.length));
});

console.log(`Generated ${versions.length + 1} version pages in ${versionsDir}`);
