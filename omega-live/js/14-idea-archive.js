(function () {
  'use strict';
  var records = [];
  var loaded = false;
  var selected = readSelected();

  function readSelected() {
    try { return JSON.parse(localStorage.getItem('belentani_idea_selection') || '[]'); } catch (error) { return []; }
  }
  function saveSelected() {
    try { localStorage.setItem('belentani_idea_selection', JSON.stringify(selected.slice(-100))); } catch (error) { /* optional */ }
  }
  function node(tag, className, value) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  }
  function render(list, query) {
    var output = document.getElementById('ideaArchiveResults');
    var count = document.getElementById('ideaArchiveCount');
    if (!output || !count) return;
    var filtered = list.filter(function (item) {
      var haystack = [item.id, item.text, item.module, item.mechanic, item.core, item.channel].join(' ').toLowerCase();
      return !query || haystack.indexOf(query.toLowerCase()) !== -1;
    });
    count.textContent = filtered.length + ' coincidencias // mostrando ' + Math.min(filtered.length, 60);
    output.replaceChildren();
    filtered.slice(0, 60).forEach(function (item) {
      var card = node('article', 'idea-record');
      var title = node('h3', '', '#' + String(item.id).padStart(4, '0') + ' // ' + item.module);
      var meta = node('p', 'idea-record__meta', [item.source, item.mechanic, item.core, item.channel].filter(Boolean).join(' · '));
      var body = node('p', 'idea-record__text', item.text);
      var button = node('button', 'omega-action omega-action--ghost', selected.indexOf(item.id) >= 0 ? 'SELECCIONADA' : 'AÑADIR A MI LOTE');
      button.type = 'button';
      button.disabled = selected.indexOf(item.id) >= 0;
      button.addEventListener('click', function () {
        if (selected.indexOf(item.id) === -1) selected.push(item.id);
        saveSelected();
        button.textContent = 'SELECCIONADA';
        button.disabled = true;
        var selectedCount = document.getElementById('ideaArchiveSelected');
        if (selectedCount) selectedCount.textContent = selected.length + ' seleccionadas localmente';
      });
      card.append(title, meta, body, button);
      output.appendChild(card);
    });
  }
  function mount() {
    var anchor = document.getElementById('omegaRuntimePanel');
    if (!anchor || document.getElementById('omegaIdeaArchive')) return !!anchor;
    var section = node('section', 'omega-idea-archive');
    section.id = 'omegaIdeaArchive';
    section.setAttribute('aria-labelledby', 'ideaArchiveTitle');
    var title = node('h2', '', 'ARCHIVO DE 10.000 IDEAS');
    title.id = 'ideaArchiveTitle';
    var copy = node('p', 'omega-runtime-copy', 'La matriz completa queda dentro de esta web. Se carga solo cuando la abres para proteger el tiempo de inicio.');
    var actions = node('div', 'idea-archive__actions');
    var load = node('button', 'omega-action', 'CARGAR ARCHIVO');
    load.type = 'button';
    var search = document.createElement('input');
    search.type = 'search';
    search.placeholder = 'Buscar Judas, audio, archivo, Zion...';
    search.setAttribute('aria-label', 'Buscar en las 10.000 ideas');
    search.disabled = true;
    var status = node('p', 'omega-runtime-gate', 'Archivo sellado // 0 datos transferidos');
    status.id = 'ideaArchiveCount';
    var selectedCount = node('p', 'idea-record__meta', selected.length + ' seleccionadas localmente');
    selectedCount.id = 'ideaArchiveSelected';
    var results = node('div', 'idea-archive__results');
    results.id = 'ideaArchiveResults';
    actions.append(load, search);
    section.append(title, copy, actions, status, selectedCount, results);
    anchor.insertAdjacentElement('afterend', section);
    load.addEventListener('click', function () {
      if (loaded) return render(records, search.value.trim());
      load.disabled = true;
      load.textContent = 'CARGANDO 10.000...';
      fetch('BELENTANI_CHAT_10K_LEDGER.json', { cache: 'force-cache' }).then(function (response) {
        if (!response.ok) throw new Error('ledger unavailable');
        return response.json();
      }).then(function (data) {
        records = data;
        loaded = true;
        search.disabled = false;
        load.textContent = 'ARCHIVO CARGADO';
        status.textContent = records.length + ' ideas indexadas // búsqueda local';
        render(records, '');
      }).catch(function () {
        load.disabled = false;
        load.textContent = 'REINTENTAR CARGA';
        status.textContent = 'No se pudo leer el archivo local.';
      });
    });
    search.addEventListener('input', function () { render(records, search.value.trim()); });
    return true;
  }
  function waitForRuntime() {
    if (mount()) return;
    var observer = new MutationObserver(function () { if (mount()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForRuntime); else waitForRuntime();
}());
