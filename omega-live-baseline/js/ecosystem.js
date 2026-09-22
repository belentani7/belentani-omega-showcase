(function () {
  'use strict';

  var path = window.location.pathname.replace(/\\/g, '/');
  var current = path === '/' || path.endsWith('/index.html') && !path.includes('/artist/') && !path.includes('/judas/') && !path.includes('/archive/') && !path.includes('/studio/') && !path.includes('/portal/') && !path.includes('/contact/') ? 'home' : (path.match(/\/(artist|judas|archive|studio|portal|contact)\//) || [null, 'home'])[1];
  document.documentElement.dataset.page = current;
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    link.classList.toggle('is-current', href.indexOf(current === 'home' ? './' : current + '/') >= 0);
  });

  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('://') >= 0 || link.target === '_blank') return;
    link.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.body.classList.add('is-leaving');
      window.setTimeout(function () { window.location.href = href; }, 180);
    });
  });

  var langButton = document.querySelector('[data-language-toggle]');
  var languages = ['ES', 'PT', 'EN', 'CA'];
  var langIndex = languages.indexOf((localStorage.getItem('belentani_language') || 'es').toUpperCase());
  if (langIndex < 0) langIndex = 0;
  function applyLanguage() {
    var language = languages[langIndex];
    if (langButton) langButton.textContent = language;
    document.documentElement.lang = language.toLowerCase();
    document.querySelectorAll('[data-copy]').forEach(function (element) {
      var values = (element.getAttribute('data-copy') || '').split('||');
      element.textContent = values[langIndex] || values[0] || element.textContent;
    });
    localStorage.setItem('belentani_language', language.toLowerCase());
  }
  if (langButton) langButton.addEventListener('click', function () { langIndex = (langIndex + 1) % languages.length; applyLanguage(); });
  applyLanguage();

  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-filter]');
    var items = group.querySelectorAll('[data-category]');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.dataset.filter;
        buttons.forEach(function (item) { item.setAttribute('aria-pressed', item === button ? 'true' : 'false'); });
        items.forEach(function (item) { item.hidden = filter !== 'all' && item.dataset.category !== filter; });
      });
    });
  });

  document.querySelectorAll('.media-card').forEach(function (card) {
    var image = card.querySelector('img');
    var heading = card.querySelector('h3');
    var description = card.querySelector('p');
    if (!image) return;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Abrir ' + (heading ? heading.textContent.trim() : 'pieza del archivo'));
    function openArchiveItem() {
      var layer = document.createElement('div');
      layer.className = 'archive-lightbox';
      layer.setAttribute('role', 'dialog');
      layer.setAttribute('aria-modal', 'true');
      layer.setAttribute('aria-label', heading ? heading.textContent.trim() : 'Pieza del archivo');
      layer.innerHTML = '<div class="archive-lightbox__backdrop" data-lightbox-close></div><div class="archive-lightbox__panel"><button class="archive-lightbox__close" type="button" data-lightbox-close aria-label="Cerrar pieza">Cerrar ×</button><img src="' + image.src + '" alt="' + image.alt.replace(/"/g, '&quot;') + '"><div class="archive-lightbox__meta"><p class="eyebrow">ARCHIVE ITEM</p><h2>' + (heading ? heading.textContent : 'Pieza del archivo') + '</h2><p>' + (description ? description.textContent : '') + '</p></div></div>';
      document.body.appendChild(layer);
      document.body.classList.add('has-lightbox');
      var close = function () { layer.remove(); document.body.classList.remove('has-lightbox'); document.removeEventListener('keydown', onKey); card.focus(); };
      var onKey = function (event) { if (event.key === 'Escape') close(); };
      layer.querySelectorAll('[data-lightbox-close]').forEach(function (element) { element.addEventListener('click', close); });
      document.addEventListener('keydown', onKey);
      layer.querySelector('.archive-lightbox__close').focus();
    }
    card.addEventListener('click', openArchiveItem);
    card.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openArchiveItem(); } });
  });

  document.querySelectorAll('[data-phase-group]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-phase]');
    var title = group.querySelector('.phase-readout h3');
    var copy = group.querySelector('.phase-readout p:not(.eyebrow)');
    buttons.forEach(function (button) { button.addEventListener('click', function () { buttons.forEach(function (item) { item.setAttribute('aria-selected', item === button ? 'true' : 'false'); }); if (title) title.textContent = button.dataset.phaseTitle; if (copy) copy.textContent = button.dataset.phaseCopy; }); });
  });

  var command = document.querySelector('[data-console-input]');
  var output = document.querySelector('[data-console-output]');
  var send = document.querySelector('[data-console-send]');
  function executeCommand() {
    if (!command || !output) return;
    var value = command.value.trim().toLowerCase();
    var response = value === 'belentani' ? '> AUTOR RECONOCIDO. ABRIENDO ARCHIVO DE VOZ.' : value === 'judas' ? '> NARRATIVA DISPONIBLE. CINCO ESTADOS EN ESPERA.' : value === 'omega' ? '> CONTENEDOR ACTIVO. ELIGE UN AMBIENTE.' : value ? '> SEÑAL RECIBIDA. PRUEBA: BELENTANI / JUDAS / OMEGA.' : '> ESCRIBE UNA PALABRA PARA ACTIVAR EL PORTAL.';
    output.textContent = response;
    command.value = '';
  }
  if (send) send.addEventListener('click', executeCommand);
  if (command) command.addEventListener('keydown', function (event) { if (event.key === 'Enter') executeCommand(); });
}());
