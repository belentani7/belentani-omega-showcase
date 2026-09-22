(function () {
  'use strict';
  var KEY = 'belentani_idea_engine_v1';
  var PROCESSES = [
    ['angel', 'ÁNGEL', 'Protege el recuerdo.', 'neon'],
    ['warrior', 'GUERRERO', 'Defiende el límite.', 'venom'],
    ['analytical', 'ANALÍTICO', 'Lee el patrón.', 'matrix'],
    ['chronicler', 'CRONISTA', 'Deja registro.', 'void']
  ];
  var FALLBACK = { frequency: 432, history: [], process: '', integrity: 100, branch: '', seals: [] };
  var state = read();
  function read() { try { return Object.assign({}, FALLBACK, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (error) { return Object.assign({}, FALLBACK); } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (error) { /* local state optional */ } }
  function el(tag, className, value) { var node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; }
  function addXP(amount) { if (typeof window.addXP === 'function') window.addXP(amount); }
  function setStatus(value) { var status = document.getElementById('ideaEngineStatus'); if (status) status.textContent = value; }
  function canvasHistory(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var width = canvas.width = Math.max(280, canvas.clientWidth * 2); var height = canvas.height = 100;
    ctx.clearRect(0, 0, width, height); ctx.strokeStyle = '#ff003c'; ctx.lineWidth = 3; ctx.beginPath();
    var data = state.history.slice(-30); if (!data.length) data = [state.frequency];
    data.forEach(function (value, index) { var x = index * (width / Math.max(1, data.length - 1)); var y = height / 2 - ((value - 639) / 220) * 34; if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.stroke();
  }
  function render(panel) {
    var processOutput = panel.querySelector('[data-process-output]');
    if (processOutput) processOutput.textContent = state.process ? 'PROCESO ACTIVO // ' + state.process.toUpperCase() : 'SIN PROCESO ELEGIDO';
    var integrity = panel.querySelector('[data-integrity]'); if (integrity) integrity.textContent = state.integrity + '%';
    var branch = panel.querySelector('[data-branch]'); if (branch) branch.textContent = state.branch ? 'RAMA // ' + state.branch : 'ELIGE UNA RAMA DEL CÓDICE';
    var seals = panel.querySelector('[data-seals]'); if (seals) seals.textContent = state.seals.length + '/7 SELLOS';
    var canvas = panel.querySelector('canvas'); if (canvas) canvasHistory(canvas);
    panel.querySelectorAll('[data-process]').forEach(function (button) { button.classList.toggle('on', button.dataset.process === state.process); });
    panel.querySelectorAll('[data-branch-choice]').forEach(function (button) { button.classList.toggle('on', button.dataset.branchChoice === state.branch); });
    panel.querySelectorAll('[data-seal]').forEach(function (button) { var active = state.seals.indexOf(button.dataset.seal) >= 0; button.disabled = active; button.textContent = active ? 'SELLO ' + button.dataset.seal + ' // OK' : 'DESCUBRIR SELLO ' + button.dataset.seal; });
  }
  function mount() {
    var anchor = document.getElementById('omegaRuntimePanel');
    if (!anchor || document.getElementById('ideaEngine')) return !!anchor;
    var panel = el('section', 'idea-engine'); panel.id = 'ideaEngine'; panel.setAttribute('aria-labelledby', 'ideaEngineTitle');
    var heading = el('h2', '', 'PROTOCOLO DE ASCENSO // FUNCIONAL'); heading.id = 'ideaEngineTitle';
    var intro = el('p', 'omega-runtime-copy', 'Cada elección modifica tu estado local. Esta capa ejecuta el canon: identidad, frecuencia, proceso, integridad y ramas del códice.');
    var grid = el('div', 'idea-engine__grid');
    var identityCard = el('article', 'idea-engine__card'); identityCard.append(el('h3', '', '01 // IDENTIDAD'), el('p', '', 'El visitante se convierte en entidad BEL-XX sin crear una cuenta.'), el('output', 'idea-engine__output', window.OMEGA_RUNTIME ? window.OMEGA_RUNTIME.identity() : 'BEL-XX'));
    var processCard = el('article', 'idea-engine__card'); processCard.append(el('h3', '', '02 // QUÉ PROCESO ERES'), el('p', '', 'Elige la voz que organiza tu interfaz.')); var processOutput = el('output', 'idea-engine__output'); processOutput.dataset.processOutput = ''; var processButtons = el('div', 'idea-engine__buttons');
    PROCESSES.forEach(function (process) { var button = el('button', 'omega-action omega-action--ghost', process[1]); button.type = 'button'; button.dataset.process = process[0]; button.title = process[2]; button.addEventListener('click', function () { state.process = process[0]; save(); document.documentElement.dataset.theme = process[3]; try { localStorage.setItem('omega_theme', process[3]); } catch (error) {} addXP(25); setStatus('PROCESO ACTIVADO // ' + process[1]); render(panel); }); processButtons.appendChild(button); }); processCard.append(processButtons, processOutput);
    var frequencyCard = el('article', 'idea-engine__card'); frequencyCard.append(el('h3', '', '03 // FRECUENCIA DIARIA'), el('p', '', 'Registra una frecuencia y observa tu historial local.')); var select = document.createElement('select'); select.className = 'idea-engine__select'; [432, 528, 639, 741, 852].forEach(function (value) { var option = el('option', '', value + ' Hz'); option.value = value; select.appendChild(option); }); select.value = state.frequency; var record = el('button', 'omega-action', 'REGISTRAR PULSO'); record.type = 'button'; var canvas = document.createElement('canvas'); canvas.className = 'idea-engine__wave'; canvas.setAttribute('aria-label', 'Historial visual de frecuencias'); frequencyCard.append(select, record, canvas); record.addEventListener('click', function () { state.frequency = Number(select.value); state.history.push(state.frequency); state.history = state.history.slice(-30); save(); if (window.OMEGA_RUNTIME) window.OMEGA_RUNTIME.frequency(); addXP(15); setStatus('PULSO REGISTRADO // ' + state.frequency + ' Hz'); render(panel); });
    var integrityCard = el('article', 'idea-engine__card'); integrityCard.append(el('h3', '', '04 // INTEGRIDAD'), el('p', '', 'Tus decisiones de misión dejan una señal persistente.')); var integrity = el('output', 'idea-engine__output', state.integrity + '%'); integrity.dataset.integrity = ''; var voice = el('button', 'omega-action omega-action--ghost', 'ELEGIR LA VOZ'); voice.type = 'button'; var betrayal = el('button', 'omega-action omega-action--ghost', 'ELEGIR LA TRAICIÓN'); betrayal.type = 'button'; voice.addEventListener('click', function () { state.integrity = Math.min(100, state.integrity + 5); save(); addXP(20); setStatus('VOZ ELEGIDA // INTEGRIDAD ' + state.integrity + '%'); render(panel); }); betrayal.addEventListener('click', function () { state.integrity = Math.max(0, state.integrity - 10); save(); setStatus('TRAICIÓN REGISTRADA // INTEGRIDAD ' + state.integrity + '%'); render(panel); }); integrityCard.append(integrity, voice, betrayal);
    var branchCard = el('article', 'idea-engine__card'); branchCard.append(el('h3', '', '05 // CÓDICE RAMIFICADO'), el('p', '', 'La misma historia abre una entrada distinta según tu decisión.')); var branchOutput = el('output', 'idea-engine__output'); branchOutput.dataset.branch = ''; var branchButtons = el('div', 'idea-engine__buttons'); [['llave', 'LA LLAVE'], ['canto', 'EL CANTO'], ['entre', 'EL ENTRE']].forEach(function (choice) { var button = el('button', 'omega-action omega-action--ghost', choice[1]); button.type = 'button'; button.dataset.branchChoice = choice[0]; button.addEventListener('click', function () { state.branch = choice[0]; save(); addXP(30); setStatus('RAMA ABIERTA // ' + choice[1]); render(panel); }); branchButtons.appendChild(button); }); branchCard.append(branchButtons, branchOutput);
    var sealCard = el('article', 'idea-engine__card'); sealCard.append(el('h3', '', '06 // SIETE BESOS OCULTOS'), el('p', '', 'Cada sello descubierto queda como logro local.')); var sealOutput = el('output', 'idea-engine__output', state.seals.length + '/7 SELLOS'); sealOutput.dataset.seals = ''; var sealButtons = el('div', 'idea-engine__buttons'); [1, 2, 3, 4, 5, 6, 7].forEach(function (number) { var button = el('button', 'omega-action omega-action--ghost', 'DESCUBRIR SELLO ' + number); button.type = 'button'; button.dataset.seal = String(number); button.addEventListener('click', function () { if (state.seals.indexOf(button.dataset.seal) === -1) { state.seals.push(button.dataset.seal); save(); addXP(10); setStatus('SELLO DESCUBIERTO // ' + button.dataset.seal); render(panel); } }); sealButtons.appendChild(button); }); sealCard.append(sealButtons, sealOutput);
    grid.append(identityCard, processCard, frequencyCard, integrityCard, branchCard, sealCard); var status = el('p', 'idea-engine__status', 'SISTEMA LISTO'); status.id = 'ideaEngineStatus'; panel.append(heading, intro, grid, status); anchor.insertAdjacentElement('afterend', panel); render(panel); return true;
  }
  function wait() { if (mount()) return; var observer = new MutationObserver(function () { if (mount()) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wait); else wait();
}());
