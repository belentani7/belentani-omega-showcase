(function () {
  'use strict';

  var phases = [
    {
      id: 'PHASE_I',
      title: 'La identidad todavía parece una sola pieza.',
      copy: 'El primer estado presenta al autor, su cuerpo de trabajo y la ilusión de una identidad estable. Antes de que aparezca Judas, la experiencia deja claro quién sostiene la mirada y por qué el archivo existe.',
      question: '¿Qué parte de ti has tenido que convertir en personaje?'
    },
    {
      id: 'PHASE_II',
      title: 'La deuda es aquello que sigue hablando cuando la escena termina.',
      copy: 'La deuda no se presenta como una cifra. Es una memoria que pide ser reconocida, una relación que deja una frecuencia en el cuerpo y una pregunta que el arte puede sostener sin resolverla demasiado pronto.',
      question: '¿Qué recuerdo sigue cobrando espacio en tu presente?'
    },
    {
      id: 'PHASE_III',
      title: 'El robo cambia la relación entre autor, personaje y mirada.',
      copy: 'Judas aparece como figura de quiebre. Lo que se intenta quitar puede ser una voz, una imagen, un nombre o la posibilidad de contar la propia versión. El archivo responde conservando las huellas.',
      question: '¿Qué parte de tu historia merece recuperar su nombre?'
    },
    {
      id: 'PHASE_IV',
      title: 'La victoria no borra la herida: le da una forma que puede compartirse.',
      copy: 'La transformación ocurre cuando la experiencia deja de ser solo daño y se convierte en composición. Música, vídeo, texto y cuerpo trabajan juntos para devolverle agencia a la voz.',
      question: '¿Cuándo una experiencia dejó de pertenecerte y empezó a convertirse en obra?'
    },
    {
      id: 'PHASE_V',
      title: 'Toda escena que parece definitiva vuelve a abrir una pregunta.',
      copy: 'La mentira es el estado que impide cerrar el mito como una moraleja. La obra deja espacio para la contradicción: ninguna interfaz puede sustituir la lectura humana ni decidir por completo qué significa una imagen.',
      question: '¿Qué versión de la historia falta todavía por escuchar?'
    }
  ];

  function byId(id) { return document.getElementById(id); }

  function mountNarrative() {
    var map = document.querySelector('[data-narrative-map]');
    if (!map) return;
    var nodes = Array.prototype.slice.call(map.querySelectorAll('.narrative-node'));
    var title = byId('phasePanelTitle');
    var copy = byId('phasePanelCopy');
    var question = byId('phasePanelQuestion');
    var id = byId('phasePanelId');
    var panel = byId('phasePanel');
    if (!nodes.length || !title || !copy || !question || !id) return;

    function render(index, moveFocus) {
      var phase = phases[index] || phases[0];
      nodes.forEach(function (node, nodeIndex) {
        var active = nodeIndex === index;
        node.classList.toggle('is-active', active);
        node.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      id.textContent = phase.id;
      title.textContent = phase.title;
      copy.textContent = phase.copy;
      question.textContent = phase.question;
      if (moveFocus && panel) panel.focus({ preventScroll: true });
      if (window.gsap && !document.documentElement.matches('[data-reduced-motion="true"]')) {
        window.gsap.fromTo(panel, { opacity: 0.35, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: true });
      }
    }

    nodes.forEach(function (node, index) {
      node.addEventListener('click', function () { render(index, true); });
      node.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        var direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
        var next = (index + direction + nodes.length) % nodes.length;
        nodes[next].focus();
        render(next, false);
      });
    });
    render(0, false);
  }

  function mountHeroFallback() {
    var video = byId('heroVideo');
    if (!video) return;
    video.addEventListener('error', function () {
      if (video.dataset.fallback === 'true') return;
      video.dataset.fallback = 'true';
      video.innerHTML = '<source src="assets/media/judas-hero.mp4" type="video/mp4">';
      video.load();
    });
  }

  function mountReveals() {
    if (!window.gsap || !window.ScrollTrigger || document.documentElement.matches('[data-reduced-motion="true"]')) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    var blocks = window.gsap.utils.toArray('.story-intro, .narrative-head, .narrative-panel, .concept-definition, .archive-guide__intro, .archive-guide__steps article');
    blocks.forEach(function (block) {
      window.gsap.fromTo(block, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 84%', once: true }
      });
    });
  }

  function mountAiZone() {
    var lab = document.getElementById('ailab');
    var widgets = [document.getElementById('aiChat'), document.getElementById('agentFace'), document.querySelector('.art-orbs')];
    if (!lab || !window.IntersectionObserver) return;
    function setZone(active) {
      document.body.classList.toggle('ai-zone', active);
      widgets.forEach(function (widget) { if (widget) widget.setAttribute('aria-hidden', active ? 'false' : 'true'); });
    }
    setZone(false);
    new IntersectionObserver(function (entries) { setZone(entries.some(function (entry) { return entry.isIntersecting; })); }, { threshold: 0.12 }).observe(lab);
  }

  function init() {
    mountNarrative();
    mountHeroFallback();
    mountReveals();
    mountAiZone();
  }

  window.BELENTANI_EXPERIENCE = { phases: phases };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
