(function () {
  'use strict';
  var LANGS = ['es', 'pt', 'en', 'ca'];
  var COPY = {
    es: { name: 'ES', language: 'Idioma', skip: 'Saltar al contenido', entity: 'ENTIDAD', runtimeTitle: 'TU SEÑAL OMEGA', runtimeCopy: 'Identidad, frecuencia y estado temporal quedan en este navegador. No se envía nada a un servidor.', frequency: 'Frecuencia simbólica', exportState: 'Exportar estado', archiveTitle: 'ARCHIVO DE 10.000 IDEAS', archiveCopy: 'La matriz completa queda dentro de esta web. Se carga solo cuando la abres para proteger el tiempo de inicio.', loadArchive: 'CARGAR ARCHIVO', archiveSearch: 'Buscar Judas, audio, archivo, Zion...', archiveSealed: 'Archivo sellado // 0 datos transferidos', selected: 'seleccionadas localmente', nav: ['INICIO', 'ARTISTA', 'MÚSICA', 'JUDAS', 'ZION', 'CONCEPTO', 'PORTAL', 'ARCHIVO', 'AI LAB', 'STUDIO', 'DESAFÍOS', 'CONTACTO'], hero: 'BELENTANI PRESENTA • JUDAS ERA • 2026', heroCopy: 'Belentani dirige un ecosistema visual y sonoro donde el cristal, el neón y la voz operan como un solo sistema.', music: 'ARCHIVO SONORO', judas: 'ERA JUDAS', contact: 'PROTOCOLO DE CONTACTO' },
    pt: { name: 'PT', language: 'Idioma', skip: 'Saltar para o conteúdo', entity: 'ENTIDADE', runtimeTitle: 'O TEU SINAL OMEGA', runtimeCopy: 'Identidade, frequência e estado temporal ficam neste navegador. Nada é enviado para um servidor.', frequency: 'Frequência simbólica', exportState: 'Exportar estado', archiveTitle: 'ARQUIVO DE 10.000 IDEIAS', archiveCopy: 'A matriz completa está dentro deste site. É carregada apenas quando aberta para proteger o tempo inicial.', loadArchive: 'CARREGAR ARQUIVO', archiveSearch: 'Pesquisar Judas, áudio, arquivo, Zion...', archiveSealed: 'Arquivo selado // 0 dados transferidos', selected: 'selecionadas localmente', nav: ['INÍCIO', 'ARTISTA', 'MÚSICA', 'JUDAS', 'ZION', 'CONCEITO', 'PORTAL', 'ARQUIVO', 'AI LAB', 'STUDIO', 'DESAFIOS', 'CONTACTO'], hero: 'BELENTANI APRESENTA • JUDAS ERA • 2026', heroCopy: 'Belentani dirige um ecossistema visual e sonoro onde cristal, néon e voz operam como um só sistema.', music: 'ARQUIVO SONORO', judas: 'ERA JUDAS', contact: 'PROTOCOLO DE CONTACTO' },
    en: { name: 'EN', language: 'Language', skip: 'Skip to content', entity: 'ENTITY', runtimeTitle: 'YOUR OMEGA SIGNAL', runtimeCopy: 'Identity, frequency and temporal state stay in this browser. Nothing is sent to a server.', frequency: 'Symbolic frequency', exportState: 'Export state', archiveTitle: '10,000-IDEA ARCHIVE', archiveCopy: 'The full matrix lives inside this website. It loads only when opened to protect startup time.', loadArchive: 'LOAD ARCHIVE', archiveSearch: 'Search Judas, audio, archive, Zion...', archiveSealed: 'Archive sealed // 0 data transferred', selected: 'selected locally', nav: ['HOME', 'ARTIST', 'MUSIC', 'JUDAS', 'ZION', 'CONCEPT', 'PORTAL', 'ARCHIVE', 'AI LAB', 'STUDIO', 'CHALLENGES', 'CONTACT'], hero: 'BELENTANI PRESENTS • JUDAS ERA • 2026', heroCopy: 'Belentani directs a visual and sonic ecosystem where crystal, neon and voice operate as one system.', music: 'SONIC ARCHIVE', judas: 'JUDAS ERA', contact: 'CONTACT PROTOCOL' },
    ca: { name: 'CA', language: 'Idioma', skip: 'Saltar al contingut', entity: 'ENTITAT', runtimeTitle: 'EL TEU SENYAL OMEGA', runtimeCopy: 'La identitat, la freqüència i l’estat temporal es queden en aquest navegador. No s’envia res a cap servidor.', frequency: 'Freqüència simbòlica', exportState: 'Exportar estat', archiveTitle: 'ARXIU DE 10.000 IDEES', archiveCopy: 'La matriu completa és dins d’aquesta web. Només es carrega quan l’obres per protegir el temps d’inici.', loadArchive: 'CARREGAR ARXIU', archiveSearch: 'Cercar Judas, àudio, arxiu, Zion...', archiveSealed: 'Arxiu segellat // 0 dades transferides', selected: 'seleccionades localment', nav: ['INICI', 'ARTISTA', 'MÚSICA', 'JUDAS', 'ZION', 'CONCEPTE', 'PORTAL', 'ARXIU', 'AI LAB', 'STUDIO', 'DESAFIAMENTS', 'CONTACTE'], hero: 'BELENTANI PRESENTA • JUDAS ERA • 2026', heroCopy: 'Belentani dirigeix un ecosistema visual i sonor on el cristall, el neó i la veu operen com un sol sistema.', music: 'ARXIU SONOR', judas: 'ERA JUDAS', contact: 'PROTOCOL DE CONTACTE' }
  };
  var DRIVE = {
    es: { title: 'DRIVE CODEX', sub: 'CONTENIDO RECUPERADO // OMEGA DEFINITIVO // FUENTE LOCAL', heads: ['UN SISTEMA OPERATIVO CREATIVO', 'LA TRAICIÓN ES EL INPUT', 'ÁNGEL · GUERRERO · ANALÍTICO · CRONISTA', 'ARCHIVO AUDITABLE'], copy: ['La web deja de ser una página y se convierte en un mundo habitable: música, narrativa, IA y archivo visual operan dentro de una misma experiencia.', 'La historia se organiza en cinco fases: hombre integrado, deuda, robo, victoria y mentira. La voz queda como salida que nadie puede arrebatar.', 'Cuatro procesos internos sostienen al Artefacto. El visitante puede activar uno y dejar su señal local en el protocolo de ascenso.', 'Definición, narrativa, letras en cuatro idiomas, plan de 500 pasos y referencias de fotos quedan disponibles como documentos locales del proyecto.'] },
    pt: { title: 'DRIVE CODEX', sub: 'CONTEÚDO RECUPERADO // OMEGA DEFINITIVO // FONTE LOCAL', heads: ['UM SISTEMA OPERATIVO CRIATIVO', 'A TRAIÇÃO É O INPUT', 'ANJO · GUERREIRO · ANALÍTICO · CRONISTA', 'ARQUIVO AUDITÁVEL'], copy: ['O site deixa de ser uma página e torna-se um mundo habitável: música, narrativa, IA e arquivo visual operam na mesma experiência.', 'A história organiza-se em cinco fases: homem integrado, dívida, roubo, vitória e mentira. A voz permanece como saída que ninguém pode tirar.', 'Quatro processos internos sustentam o Artefacto. O visitante pode ativar um e deixar o seu sinal local no protocolo de ascensão.', 'Definição, narrativa, letras em quatro idiomas, plano de 500 passos e referências fotográficas ficam disponíveis localmente.'] },
    en: { title: 'DRIVE CODEX', sub: 'RECOVERED CONTENT // DEFINITIVE OMEGA // LOCAL SOURCE', heads: ['A CREATIVE OPERATING SYSTEM', 'BETRAYAL IS THE INPUT', 'ANGEL · WARRIOR · ANALYTICAL · CHRONICLER', 'AUDITABLE ARCHIVE'], copy: ['The site stops being a page and becomes a habitable world: music, narrative, AI and visual archive operate as one experience.', 'The story is organized in five phases: integrated man, debt, theft, victory and lie. The voice remains the output no one can take.', 'Four inner processes sustain the Artifact. Visitors can activate one and leave a local signal in the ascension protocol.', 'Definition, narrative, four-language lyrics, 500-step plan and photo references remain available as local project documents.'] },
    ca: { title: 'DRIVE CODEX', sub: 'CONTINGUT RECUPERAT // OMEGA DEFINITIU // FONT LOCAL', heads: ['UN SISTEMA OPERATIU CREATIU', 'LA TRAÏCIÓ ÉS L’INPUT', 'ÀNGEL · GUERRER · ANALÍTIC · CRONISTA', 'ARXIU AUDITABLE'], copy: ['La web deixa de ser una pàgina i es converteix en un món habitable: música, narrativa, IA i arxiu visual operen dins d’una mateixa experiència.', 'La història s’organitza en cinc fases: home integrat, deute, robatori, victòria i mentida. La veu queda com la sortida que ningú pot prendre.', 'Quatre processos interns sostenen l’Artefacte. El visitant en pot activar un i deixar el seu senyal local al protocol d’ascens.', 'Definició, narrativa, lletres en quatre idiomes, pla de 500 passos i referències fotogràfiques queden disponibles localment.'] }
  };
  var HERO = {
    es: { pre: 'BELENTANI // JUDAS ERA', claim: 'La herida se convierte en escena.', copy: 'JUDAS ERA es una obra audiovisual sobre el beso que marca, la memoria que permanece y la identidad que decide reescribirse. Entra para escuchar, recorrer el mito y encontrar la llave de tu propia lectura.' },
    pt: { pre: 'BELENTANI // JUDAS ERA', claim: 'A ferida transforma-se em cena.', copy: 'JUDAS ERA é uma obra audiovisual sobre o beijo que marca, a memória que permanece e a identidade que decide reescrever-se. Entra para ouvir, percorrer o mito e encontrar a chave da tua própria leitura.' },
    en: { pre: 'BELENTANI // JUDAS ERA', claim: 'The wound becomes a scene.', copy: 'JUDAS ERA is an audiovisual work about the kiss that marks us, the memory that remains and the identity that chooses to rewrite itself. Enter to listen, walk through the myth and find the key to your own reading.' },
    ca: { pre: 'BELENTANI // JUDAS ERA', claim: 'La ferida es converteix en escena.', copy: 'JUDAS ERA és una obra audiovisual sobre el bes que marca, la memòria que roman i la identitat que decideix reescriure’s. Entra per escoltar, recórrer el mite i trobar la clau de la teva pròpia lectura.' }
  };
  var ORIENTATION = {
    es: { title: 'No estás entrando en una página. Estás entrando en un archivo que todavía se está escribiendo.', lead: 'Belentani es el autor y el centro de esta experiencia. Judas Era es la obra: una ficción audiovisual sobre herida, deseo, memoria e identidad reescrita. Omega es la arquitectura que reúne música, imágenes, textos, herramientas y decisiones en un mismo recorrido.', proof: ['Una voz concreta, no una interfaz anónima.', 'Judas convierte la tensión en escena y sonido.', 'Las versiones y los materiales permanecen consultables.'] },
    pt: { title: 'Não estás a entrar numa página. Estás a entrar num arquivo que ainda está a ser escrito.', lead: 'Belentani é o autor e o centro desta experiência. Judas Era é a obra: uma ficção audiovisual sobre ferida, desejo, memória e identidade reescrita. Omega é a arquitectura que reúne música, imagens, textos, ferramentas e decisões num mesmo percurso.', proof: ['Uma voz concreta, não uma interface anónima.', 'Judas transforma a tensão em cena e som.', 'As versões e os materiais permanecem consultáveis.'] },
    en: { title: 'You are not entering a page. You are entering an archive that is still being written.', lead: 'Belentani is the author and the centre of this experience. Judas Era is the work: an audiovisual fiction about wound, desire, memory and rewritten identity. Omega is the architecture that brings music, images, texts, tools and decisions into one journey.', proof: ['A concrete voice, not an anonymous interface.', 'Judas turns tension into scene and sound.', 'Versions and materials remain available to explore.'] },
    ca: { title: 'No estàs entrant en una pàgina. Estàs entrant en un arxiu que encara s’està escrivint.', lead: 'Belentani és l’autor i el centre d’aquesta experiència. Judas Era és l’obra: una ficció audiovisual sobre ferida, desig, memòria i identitat reescrita. Omega és l’arquitectura que reuneix música, imatges, textos, eines i decisions en un mateix recorregut.', proof: ['Una veu concreta, no una interfície anònima.', 'Judas converteix la tensió en escena i so.', 'Les versions i els materials es poden consultar.'] }
  };
  var current = readLanguage();
  var listeners = [];
  function readLanguage() {
    var saved = ''; try { saved = localStorage.getItem('belentani_language') || ''; } catch (error) { /* optional */ }
    if (LANGS.indexOf(saved) >= 0) return saved;
    var browser = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return LANGS.indexOf(browser) >= 0 ? browser : 'es';
  }
  function t(key) { return COPY[current][key] || key; }
  function set(selector, value) { var el = document.querySelector(selector); if (el) el.textContent = value; }
  function apply() {
    var copy = COPY[current];
    document.documentElement.lang = current;
    document.documentElement.dataset.language = current;
    set('.skip-link', copy.skip);
    document.querySelectorAll('#omega-sidebar .sb-item span:last-child').forEach(function (el, index) { if (copy.nav[index]) el.textContent = copy.nav[index]; });
    var hero = HERO[current] || HERO.es;
    var heroPre = document.querySelector('.hero-pre'); if (heroPre) heroPre.textContent = '◉ ' + hero.pre + ' ◉';
    set('.hero-claim', hero.claim);
    set('.hero-sub', hero.copy);
    var orientation = ORIENTATION[current] || ORIENTATION.es;
    set('#orientationTitle', orientation.title);
    set('.story-intro__lead', orientation.lead);
    document.querySelectorAll('.story-intro__proof p').forEach(function (el, index) { if (orientation.proof[index]) el.textContent = orientation.proof[index]; });
    var musicTitle = document.querySelector('#music .sec-title'); if (musicTitle) musicTitle.textContent = copy.music;
    var judasTitle = document.querySelector('#judas .sec-title'); if (judasTitle) judasTitle.textContent = copy.judas;
    var contactTitle = document.querySelector('#contact .sec-title'); if (contactTitle) contactTitle.textContent = copy.contact;
    var runtime = document.getElementById('omegaRuntimePanel');
    if (runtime) { set('#omega-runtime-title', copy.runtimeTitle); set('.omega-runtime-copy', copy.runtimeCopy); set('label[for="omegaFrequency"]', copy.frequency); set('#omegaExport', copy.exportState); }
    var archive = document.getElementById('omegaIdeaArchive');
    if (archive) { set('#ideaArchiveTitle', copy.archiveTitle); set('#omegaIdeaArchive .omega-runtime-copy', copy.archiveCopy); set('#omegaIdeaArchive button', copy.loadArchive); var search = archive.querySelector('input'); if (search) search.placeholder = copy.archiveSearch; }
    var drive = DRIVE[current]; if (drive) { set('#driveCodexTitle', drive.title); set('#driveCodexSub', drive.sub); document.querySelectorAll('[data-drive-title]').forEach(function (el) { el.textContent = drive.heads[Number(el.dataset.driveTitle)] || el.textContent; }); document.querySelectorAll('[data-drive-copy]').forEach(function (el) { el.textContent = drive.copy[Number(el.dataset.driveCopy)] || el.textContent; }); }
    document.querySelectorAll('#omegaLanguage button').forEach(function (button) { button.setAttribute('aria-pressed', button.dataset.language === current ? 'true' : 'false'); });
    listeners.forEach(function (listener) { listener(copy, current); });
  }
  function setLanguage(language) {
    if (LANGS.indexOf(language) < 0 || language === current) return;
    current = language;
    try { localStorage.setItem('belentani_language', current); } catch (error) { /* optional */ }
    apply();
    window.dispatchEvent(new CustomEvent('omega:language', { detail: { language: current } }));
  }
  function mount() {
    var host = document.querySelector('.hud-top > div');
    if (!host || document.getElementById('omegaLanguage')) return;
    var wrap = document.createElement('div');
    wrap.id = 'omegaLanguage';
    wrap.className = 'omega-language';
    wrap.setAttribute('aria-label', COPY[current].language);
    LANGS.forEach(function (language) { var button = document.createElement('button'); button.type = 'button'; button.dataset.language = language; button.textContent = COPY[language].name; button.setAttribute('aria-label', COPY[language].language + ': ' + COPY[language].name); button.setAttribute('aria-pressed', language === current ? 'true' : 'false'); button.addEventListener('click', function () { setLanguage(language); }); wrap.appendChild(button); });
    host.insertBefore(wrap, host.firstChild);
    apply();
  }
  window.OMEGA_I18N = { t: t, setLanguage: setLanguage, subscribe: function (listener) { listeners.push(listener); } };
  function init() { mount(); apply(); setTimeout(mount, 250); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
