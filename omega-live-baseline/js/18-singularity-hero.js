(function () {
  'use strict';

  var canvas = document.getElementById('singularityHeroCanvas');
  if (!canvas || !window.THREE) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (error) {
    canvas.style.display = 'none';
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 160);
  var system = new THREE.Group();
  scene.add(system);
  camera.position.set(0, 24, 47);
  camera.lookAt(0, 0, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  var count = window.innerWidth < 640 ? 1600 : 3200;
  var positions = new Float32Array(count * 3);
  var colors = new Float32Array(count * 3);
  var seeds = new Float32Array(count * 3);
  var color = new THREE.Color();

  for (var i = 0; i < count; i += 1) {
    var radius = 5 + Math.pow(Math.random(), 1.18) * 34;
    var angle = Math.random() * Math.PI * 2;
    var y = (Math.random() - 0.5) * (5.5 / Math.max(radius, 5));
    var index = i * 3;
    positions[index] = Math.cos(angle) * radius;
    positions[index + 1] = y;
    positions[index + 2] = Math.sin(angle) * radius;
    seeds[index] = radius;
    seeds[index + 1] = angle;
    seeds[index + 2] = Math.random() * 6.28;
    var heat = Math.max(0, Math.min(1, 1 - (radius - 5) / 34));
    color.setHSL(.58 - heat * .48, .92, .48 + heat * .18);
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  var material = new THREE.PointsMaterial({
    size: window.innerWidth < 640 ? .17 : .24,
    vertexColors: true,
    transparent: true,
    opacity: .82,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  var disk = new THREE.Points(geometry, material);
  disk.rotation.x = -.12;
  system.add(disk);

  var blackHole = new THREE.Mesh(
    new THREE.SphereGeometry(4.05, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  system.add(blackHole);
  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(4.55, .07, 12, 96),
    new THREE.MeshBasicMaterial({ color: 0xffb34f, transparent: true, opacity: .8, blending: THREE.AdditiveBlending })
  );
  ring.rotation.x = Math.PI / 2;
  system.add(ring);

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    var width = Math.max(1, rect.width);
    var height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  var clock = new THREE.Clock();
  function animate() {
    if (document.hidden) { window.requestAnimationFrame(animate); return; }
    var time = clock.getElapsedTime();
    if (!reduced) {
      system.rotation.y = time * .035;
      ring.rotation.z = time * .12;
      var position = geometry.attributes.position.array;
      for (var j = 0; j < count; j += 1) {
        var k = j * 3;
        var radius = seeds[k];
        var baseAngle = seeds[k + 1];
        var orbit = baseAngle + time * (.12 + 1.2 / Math.sqrt(radius));
        position[k] = Math.cos(orbit) * radius;
        position[k + 2] = Math.sin(orbit) * radius;
        position[k + 1] = Math.sin(time * .7 + seeds[k + 2]) * (.18 + 2.1 / radius);
      }
      geometry.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  animate();
}());
