// Auria: sonido y música hechos por código (sin archivos). Efectos cortos, tres músicas y vibración.
// Todo es opcional: si el navegador no deja sonar, el juego sigue igual.
(function () {
  "use strict";
  var CLAVE = "auria-ajustes", ctx = null, maestro = null, gMus = null, gFx = null, ruidoBuf = null, pulso = null, gVoz = null;
  var P = { musica: true, efectos: true, vibra: true };
  try { var g0 = JSON.parse(localStorage.getItem(CLAVE) || "null"); if (g0) for (var k0 in g0) P[k0] = g0[k0]; } catch (e) {}
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(P)); } catch (e) {} }

  function ini() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return true; }
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    try {
      ctx = new AC(); maestro = ctx.createDynamicsCompressor(); maestro.threshold.value = -14; maestro.ratio.value = 4; maestro.connect(ctx.destination);
      gMus = ctx.createGain(); gMus.gain.value = P.musica ? 0.16 : 0; gMus.connect(maestro);
      gFx = ctx.createGain(); gFx.gain.value = P.efectos ? 0.5 : 0; gFx.connect(maestro);
      // la melodía va por su propio camino: onda de pulso estrecho (el timbre de las consolas viejas) y un eco corto
      var re = new Float32Array(32), im = new Float32Array(32); for (var q = 1; q < 32; q++) im[q] = (2 / (q * Math.PI)) * Math.sin(q * Math.PI * 0.25);
      pulso = ctx.createPeriodicWave(re, im);
      gVoz = ctx.createGain(); gVoz.gain.value = 1; gVoz.connect(gMus);
      var eco = ctx.createDelay(1), vuelta = ctx.createGain(), filtro = ctx.createBiquadFilter(); eco.delayTime.value = 0.27; vuelta.gain.value = 0.32; filtro.type = "lowpass"; filtro.frequency.value = 2600;
      gVoz.connect(eco); eco.connect(filtro); filtro.connect(vuelta); vuelta.connect(eco); filtro.connect(gMus);
      var n = ctx.sampleRate, d; ruidoBuf = ctx.createBuffer(1, n, n); d = ruidoBuf.getChannelData(0); for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ctx = null; return false; }
    return true;
  }
  // una nota: oscilador con envolvente. f2 = frecuencia final si desliza.
  function nota(dest, tipo, f, t, dur, vol, f2, ataque) {
    var o = ctx.createOscillator(), g = ctx.createGain(); o.type = tipo; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (ataque || 0.008)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.03);
  }
  // una nota de la melodía: pulso estrecho con un poco de vibrato cuando es larga
  function canta(f, t, dur, vol) {
    var o = ctx.createOscillator(), g = ctx.createGain(); o.setPeriodicWave(pulso); o.frequency.setValueAtTime(f, t);
    if (dur > 0.3) { var l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5.5; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * 0.012, t + 0.25); l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur + 0.05); }
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.setValueAtTime(vol * 0.8, t + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(gVoz); o.start(t); o.stop(t + dur + 0.03);
  }
  function soplo(dest, t, dur, vol, tipoF, fF, fF2) {
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = ruidoBuf; s.loop = true;
    f.type = tipoF || "lowpass"; f.frequency.setValueAtTime(fF || 1200, t); if (fF2) f.frequency.exponentialRampToValueAtTime(fF2, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(dest); s.start(t, Math.random()); s.stop(t + dur + 0.03);
  }
  var NOTA = function (n) { return 440 * Math.pow(2, (n - 69) / 12); };   // número MIDI a frecuencia

  // ---------- efectos ----------
  var FX = {
    toque: function (t) { nota(gFx, "triangle", 920, t, 0.05, 0.12, 1300); },
    golpe: function (t) { soplo(gFx, t, 0.09, 0.5, "lowpass", 2200, 500); nota(gFx, "sine", 150, t, 0.1, 0.5, 60); },
    fuerte: function (t) { soplo(gFx, t, 0.14, 0.7, "lowpass", 3200, 400); nota(gFx, "sine", 190, t, 0.16, 0.7, 50); nota(gFx, "square", 660, t, 0.06, 0.08, 330); },
    flojo: function (t) { soplo(gFx, t, 0.06, 0.25, "bandpass", 900); nota(gFx, "sine", 120, t, 0.06, 0.25, 80); },
    chispa: function (t) { nota(gFx, "sine", 1568, t, 0.12, 0.3); nota(gFx, "sine", 2093, t + 0.05, 0.16, 0.28); nota(gFx, "triangle", 3136, t + 0.09, 0.12, 0.12); soplo(gFx, t, 0.08, 0.25, "highpass", 5000); },
    dano: function (t) { nota(gFx, "sine", 110, t, 0.2, 0.7, 45); soplo(gFx, t, 0.12, 0.45, "lowpass", 900, 200); },
    guardia: function (t) { nota(gFx, "square", 520, t, 0.09, 0.1); nota(gFx, "square", 783, t, 0.12, 0.08); soplo(gFx, t, 0.05, 0.2, "highpass", 3000); },
    rafaga: function (t) { nota(gFx, "sawtooth", 180, t, 0.45, 0.22, 900, 0.05); soplo(gFx, t, 0.5, 0.35, "bandpass", 500, 4000); nota(gFx, "sine", 1046, t + 0.4, 0.3, 0.3); },
    super: function (t) { nota(gFx, "sawtooth", 110, t, 0.7, 0.26, 1200, 0.08); soplo(gFx, t, 0.75, 0.45, "bandpass", 300, 6000); [72, 76, 79, 84].forEach(function (n, i) { nota(gFx, "triangle", NOTA(n), t + 0.55 + i * 0.05, 0.4, 0.22); }); },
    cura: function (t) { [72, 76, 79].forEach(function (n, i) { nota(gFx, "sine", NOTA(n), t + i * 0.06, 0.25, 0.22); }); },
    estado: function (t) { nota(gFx, "square", 330, t, 0.18, 0.1, 165); nota(gFx, "square", 311, t + 0.02, 0.18, 0.08, 150); },
    mejora: function (t) { nota(gFx, "triangle", 523, t, 0.1, 0.18); nota(gFx, "triangle", 784, t + 0.07, 0.16, 0.18); },
    cae: function (t) { nota(gFx, "triangle", 380, t, 0.4, 0.3, 70); soplo(gFx, t + 0.05, 0.35, 0.25, "lowpass", 1500, 150); },
    ruptura: function (t) { soplo(gFx, t, 0.3, 0.6, "highpass", 2500); [88, 91, 96, 100].forEach(function (n, i) { nota(gFx, "sine", NOTA(n), t + i * 0.025, 0.25, 0.16); }); },
    fase2: function (t) { nota(gFx, "sawtooth", 55, t, 1.1, 0.4, 41, 0.1); nota(gFx, "sawtooth", 58, t, 1.1, 0.3, 43, 0.1); soplo(gFx, t, 1.0, 0.4, "lowpass", 300, 2000); },
    premio: function (t) { nota(gFx, "sine", 1046, t, 0.12, 0.25); nota(gFx, "sine", 1568, t + 0.07, 0.2, 0.25); },
    raro: function (t) { [84, 88, 91, 96, 100].forEach(function (n, i) { nota(gFx, "sine", NOTA(n), t + i * 0.07, 0.35, 0.22); }); soplo(gFx, t, 0.5, 0.15, "highpass", 6000); },
    victoria: function (t) { [[60, 64, 67], [65, 69, 72], [67, 71, 74], [72, 76, 79, 84]].forEach(function (ac, i) { ac.forEach(function (n) { nota(gFx, "triangle", NOTA(n), t + i * 0.22, i === 3 ? 1.0 : 0.26, 0.2); nota(gFx, "sine", NOTA(n + 12), t + i * 0.22, i === 3 ? 0.9 : 0.2, 0.08); }); }); },
    derrota: function (t) { [[57, 60, 64], [55, 58, 62], [53, 57, 60], [52, 55, 59]].forEach(function (ac, i) { ac.forEach(function (n) { nota(gFx, "triangle", NOTA(n), t + i * 0.34, 0.5, 0.18, null, 0.04); }); }); },
    telon: function (t) { soplo(gFx, t, 0.35, 0.3, "bandpass", 400, 2400); },
    aparece: function (t) { nota(gFx, "sine", 392, t, 0.9, 0.2, 1568, 0.2); soplo(gFx, t, 0.9, 0.2, "highpass", 3000); [79, 84, 91].forEach(function (n, i) { nota(gFx, "sine", NOTA(n), t + 0.7 + i * 0.08, 0.5, 0.2); }); }
  };
  var ultimo = {};
  function fx(nombre) {
    if (!P.efectos || !FX[nombre] || !ini()) return;
    var ahora = ctx.currentTime; if (ultimo[nombre] && ahora - ultimo[nombre] < 0.035) return; ultimo[nombre] = ahora;   // no amontonar el mismo sonido
    try { FX[nombre](ahora + 0.005); } catch (e) { window.AURIA_SON.error = nombre + ": " + e.message; }
  }
  function vibra(p) { if (!P.vibra) return; try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }

  // ---------- música ----------
  // Un secuenciador de semicorcheas. Cada música es una progresión de acordes y cuatro voces: colchón, arpegio, bajo y ritmo.
  // Cada música: acordes (4 compases que se repiten), arpegio, bajo, ritmo y una melodía de 8 compases.
  // La melodía va en corcheas: número de nota, "-" la alarga, "." silencio.
  var MUSICAS = {
    plaza:   { bpm: 80,  ac: [[62, 66, 69, 73], [59, 62, 66, 69], [55, 59, 62, 66], [57, 61, 64, 69]], arp: [0, 2, 1, 3, 2, 1, 3, 2], ritmo: 0, bajo: 0, swing: 0.2, volMel: 0.2,
      mel: ["74 - 78 76 74 - 69 -", "71 - 74 73 71 - 66 -", "67 - 71 74 79 - 78 76", "76 - - 73 69 - . .", "74 - 78 81 83 - 81 78", "78 - 74 71 74 - 78 -", "79 78 76 74 71 - 74 76", "74 - - - . . 69 73"] },
    combate: { bpm: 120, ac: [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 60], [55, 59, 62, 67]], arp: [0, 1, 2, 3, 2, 1, 2, 3], ritmo: 1, bajo: 1, swing: 0, volMel: 0.17,
      mel: ["69 . 72 69 76 - 72 69", "77 - 76 72 69 - 65 69", "72 . 76 72 79 - 76 72", "74 - 71 74 79 77 79 -", "81 - 79 76 81 - 84 -", "84 81 77 81 84 - 81 77", "79 76 72 76 79 - 84 79", "83 - 79 74 71 74 79 83"] },
    jefe:    { bpm: 134, ac: [[50, 53, 57, 62], [46, 50, 53, 58], [43, 46, 50, 55], [45, 49, 52, 57]], arp: [0, 2, 3, 2, 1, 3, 2, 3], ritmo: 2, bajo: 2, swing: 0, volMel: 0.17,
      mel: ["74 . 74 77 81 - 77 74", "82 - 81 77 74 - 70 74", "79 . 79 82 86 - 82 79", "85 - 81 76 73 76 81 85", "86 - 81 86 89 - 86 81", "82 86 89 86 82 - 77 82", "79 82 86 82 79 - 74 79", "81 - 85 88 85 81 76 73"] }
  };
  Object.keys(MUSICAS).forEach(function (k) {   // la melodía, ya troceada: en cada corchea, la nota y cuántas corcheas dura
    MUSICAS[k].notas = MUSICAS[k].mel.map(function (c) { var x = c.split(" "), o = []; x.forEach(function (v, i) { if (v === "." || v === "-") { o.push(null); return; } var n = 1; while (x[i + n] === "-") n++; o.push([+v, n]); }); return o; });
  });
  var modo = null, paso = 0, tSig = 0, reloj = null;
  function programar(M, p, t, d) {
    var nc = Math.floor(p / 16), compas = nc % M.ac.length, ac = M.ac[compas], s = p % 16, vuelta = Math.floor(nc / 8);
    if (M.swing && s % 2 === 1) t += d * M.swing;   // las semicorcheas de en medio llegan un poco tarde: el balanceo
    if (s === 0) ac.forEach(function (n, i) { nota(gMus, i % 2 ? "sine" : "triangle", NOTA(n), t, d * 16, 0.13, null, d * 3); });   // colchón
    // el arpegio calla en la primera vuelta de la melodía y vuelve en la segunda: así la música respira
    if (s % 2 === 0 && (vuelta % 2 === 1 || !M.ritmo)) { var n = ac[M.arp[(s / 2) % M.arp.length]] + 12; nota(gMus, "triangle", NOTA(n), t, d * (M.ritmo ? 1.6 : 3), M.ritmo ? 0.11 : 0.12); }
    if (M.bajo) { if (s % (M.bajo === 2 ? 2 : 4) === 0 || s === 14) nota(gMus, "sawtooth", NOTA(ac[0] - 24 + ((M.bajo === 2 && s % 4 === 2) ? 12 : 0)), t, d * 1.8, 0.2); }
    else if (s === 0 || s === 6 || s === 10) nota(gMus, "sine", NOTA(ac[s === 6 ? 2 : 0] - 12), t, d * (s === 6 ? 3 : 5), 0.26, null, 0.03);   // bajo que camina
    if (s % 2 === 0) { var N = M.notas[nc % 8][s / 2]; if (N) canta(NOTA(N[0] + (vuelta % 4 === 3 && M.ritmo ? 12 : 0)), t, d * 2 * N[1] * 0.92, M.volMel); }   // melodía; cada cuarta vuelta sube una octava
    if (M.ritmo) {
      if (s % 4 === 0 || (M.ritmo === 2 && s === 10)) nota(gMus, "sine", 130, t, 0.14, 0.55, 45);   // bombo
      if (s % 4 === 2) soplo(gMus, t, 0.04, 0.12, "highpass", 7000);                      // plato
      if (s === 4 || s === 12) soplo(gMus, t, 0.1, 0.3, "bandpass", 1800);                // caja
      if (M.ritmo === 2 && s % 2 === 1) soplo(gMus, t, 0.025, 0.07, "highpass", 9000);
      if (nc % 4 === 3 && s >= 12) soplo(gMus, t, 0.06, 0.18 + 0.04 * (s - 12), "bandpass", 1400 + 200 * (s - 12));   // redoble al cerrar cada frase
    } else {
      if (s === 0 || s === 10) nota(gMus, "sine", 95, t, 0.12, 0.3, 50);                   // bombo suave, a contratiempo
      if (s % 2 === 0) soplo(gMus, t, 0.03, s % 4 === 2 ? 0.09 : 0.04, "highpass", 8000);  // maraca
      if (s === 4 || s === 12) nota(gMus, "triangle", 880, t, 0.03, 0.07, 660);            // palo
    }
  }
  function tic() {
    if (!ctx || !modo || !P.musica) return; var M = MUSICAS[modo], d = 60 / M.bpm / 4;
    if (tSig < ctx.currentTime) tSig = ctx.currentTime + 0.05;
    while (tSig < ctx.currentTime + 0.35) { try { programar(M, paso, tSig, d); } catch (e) { window.AURIA_SON.error = "musica: " + e.message; } paso++; tSig += d; }
  }
  function musica(m) {
    if (m === modo) return; modo = m; paso = 0; tSig = 0;
    if (!m) return; if (!ini()) return;
    if (!reloj) reloj = setInterval(tic, 110);
  }
  function ajustar(k, v) {
    P[k] = v; guardar(); if (!ctx) { if (v && k !== "vibra") ini(); return; }
    if (k === "musica") gMus.gain.setTargetAtTime(v ? 0.16 : 0, ctx.currentTime, 0.08);
    if (k === "efectos") gFx.gain.setTargetAtTime(v ? 0.5 : 0, ctx.currentTime, 0.02);
  }
  document.addEventListener("visibilitychange", function () { if (!ctx) return; try { if (document.hidden) ctx.suspend(); else ctx.resume(); } catch (e) {} });

  window.AURIA_SON = { ini: ini, fx: fx, vibra: vibra, musica: musica, ajustar: ajustar, ajustes: function () { return P; }, lista: Object.keys(FX), error: null, _ctx: function () { return ctx; }, _salida: function () { return maestro; } };
})();
