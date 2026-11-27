/* Auria: reglas del juego. Sin pantalla: solo cuentas, para poder probarlas aparte. */
(function (root) {
  var D = root.AURIA_DATOS || (typeof require !== "undefined" ? require("./datos.js") : null);
  var M = {};
  var COSTE_INVOCAR = 5;
  // Calibración del combate, versión 8 (27-nov-2026): combates cortos, golpes anunciados que duelen y derrota posible.
  // Medido con check/tension.js (30 partidas completas por perfil). Para volver al combate de la versión 6:
  //   eAtk 0, eHp 0, eAtk2 2.5, eHp2 -0.3, jefeHp 0.95, subHp 0.95, pB 0.55, pEs 1.7, pR 2.6, justo 0, rup 1, bbGolpe 7
  M.CFG = { nivPorFase: 0.372, dif0: 3.3, dif1: 1.2, jefeHp: 1.6, jefeAtk: 0.68, xpBase: 30, xpPorFase: 3, nivBase: 30, nivAsc: 20, respiro: 0.12, muro: 0.3, jefeMuro: 0.2,
    eAtk: 0.5, eHp: -0.78, eAtk2: 10, eHp2: 0, eDef: 0, eDef2: -0.6, pen: 0,
    // subHp: vida de los jefes de zona. pG/pD/pB/pEs/pR: fuerza de cada acción enemiga (golpe, doble, barrido, especial, remate).
    // guardia/parada: cuánto daño pasa al cubrirse (normal / ante un golpe anunciado).
    // justo: un eco casi entero no cae por golpes que no se veían venir. rup: cuánto cuesta romper una carga. bbGolpe: ráfaga que da cada golpe propio.
    subHp: 1.7, pG: 1, pD: 0.65, pB: 0.8, pEs: 3.5, pR: 4.5, guardia: 0.5, parada: 0.2, justo: 1, rup: 0.6, bbGolpe: 5,
    // bbChispa: ráfaga que suelta el cristal de una chispa (el de un golpe normal da 6).
    bbChispa: 12,
    // topeEs: lo máximo que un especial quita a un eco, en parte de su vida máxima.
    topeEs: 0.65,
    // regHp / regAtk: retoque por región (1 = sin tocar). La Feria salía un escalón más dura que el resto.
    regHp: [1, 1, 1, 1, 0.85, 1, 1, 1], regAtk: [1, 1, 1, 1, 0.88, 1, 1, 1] };
  
  M.COSTE_INVOCAR = COSTE_INVOCAR;

  // ECOS DE LEYENDA: seis, uno por elemento. Solo responden en el altar, muy de tarde en tarde. Llegan ya con sus cinco estrellas.
  var LEYENDAS = {
    ilda:   { n: "Ilda",   t: "Capitana de escoltas",  el: "Brasa",  hp: 560, atk: 185, def: 110, hits: 4, bb: { n: "Paso franco",     tipo: "uno",   pot: 4.0 } },
    nacar:  { n: "Nácar",  t: "Fundidora de campanas", el: "Marea",  hp: 620, atk: 140, def: 150, hits: 3, bb: { n: "Toque a rebato",  tipo: "todos", pot: 1 } },
    sabina: { n: "Sabina", t: "Sembradora",            el: "Bosque", hp: 600, atk: 135, def: 145, hits: 3, bb: { n: "Injerto",         tipo: "cura",  pot: 0.45 } },
    orfeo:  { n: "Orfeo",  t: "Maestro de taller",     el: "Rayo",   hp: 500, atk: 190, def: 100, hits: 4, bb: { n: "Interruptor",     tipo: "todos", pot: 2.4 } },
    clara:  { n: "Clara",  t: "Panadera",              el: "Alba",   hp: 650, atk: 128, def: 160, hits: 3, bb: { n: "Amanece",         tipo: "todos", pot: 1 } },
    nadie:  { n: "Nadie",  t: "El sin nombre",         el: "Ocaso",  hp: 520, atk: 195, def: 95,  hits: 5, bb: { n: "Eco del eco",     tipo: "uno",   pot: 3.8 } }
  };
  Object.keys(LEYENDAS).forEach(function (id) { var L = LEYENDAS[id]; L.rar = 5; L.leyenda = true; D.HEROES[id] = L; D.NOMBRES[id] = L.n; });
  M.esLeyenda = function (id) { return !!(D.HEROES[id] && D.HEROES[id].leyenda); };

  // ECOS SECRETOS: no salen del altar. Se unen al completar cada zona del evento «El libro de otro mundo» (colaboración con Elden Ivalice).
  var SECRETOS = {
    tam:    { n: "Tam",    t: "Huérfano de la calle",       el: "Rayo",   hp: 400, atk: 124, def: 88,  hits: 5, bb: { n: "Cinco dedos",        tipo: "todos", pot: 2.0 } },
    hollis: { n: "Hollis", t: "Soldado retirado",           el: "Bosque", hp: 520, atk: 104, def: 128, hits: 2, bb: { n: "Formación cerrada",  tipo: "todos", pot: 1 } },
    llum:   { n: "Llum",   t: "Lectora de otro mundo",      el: "Alba",   hp: 440, atk: 112, def: 108, hits: 3, bb: { n: "Luz de casa",        tipo: "cura",  pot: 0.4 } },
    ulric:  { n: "Ulric",  t: "Agente con ganas de acabar", el: "Ocaso",  hp: 430, atk: 134, def: 92,  hits: 4, bb: { n: "Último servicio",    tipo: "uno",   pot: 3.4 } },
    eren:   { n: "Eren",   t: "Lector de otro mundo",       el: "Brasa",  hp: 470, atk: 130, def: 104, hits: 3, bb: { n: "Porque sí",          tipo: "uno",   pot: 3.2 } }
  };
  Object.keys(SECRETOS).forEach(function (id) { var X = SECRETOS[id]; X.rar = 4; X.secreto = true; D.HEROES[id] = X; D.NOMBRES[id] = X.n; });
  M.esSecreto = function (id) { return !!(D.HEROES[id] && D.HEROES[id].secreto); };
  M.deAltar = function (id) { return !D.HEROES[id].secreto; };
  var ENEMIGOS_EVENTO = {
    ev_soldado:        { n: "Soldado del clan",   el: "Brasa",  hp: 130, atk: 36, def: 26 },
    ev_soldada:        { n: "Soldada del clan",   el: "Marea",  hp: 120, atk: 38, def: 22 },
    ev_lancero:        { n: "Lancero a sueldo",   el: "Rayo",   hp: 115, atk: 42, def: 18 },
    ev_ballestera:     { n: "Ballestera a sueldo", el: "Bosque", hp: 100, atk: 46, def: 14 },
    ev_contrabandista: { n: "Contrabandista",     el: "Ocaso",  hp: 110, atk: 40, def: 16 },
    ev_capitan:        { n: "Capitán del clan",   el: "Brasa",  hp: 480, atk: 46, def: 38, jefe: 1, sub: 1, arte: "ev_soldado" },
    dalric_venn:       { n: "Dalric Venn",        el: "Ocaso",  hp: 950, atk: 54, def: 46, jefe: 1 }
  };
  Object.keys(ENEMIGOS_EVENTO).forEach(function (k) { D.ENEMIGOS[k] = ENEMIGOS_EVENTO[k]; });
  D.NOMBRES.dalric_venn = "Dalric Venn";
  M.PROB_LEYENDA = 0.01;      // una de cada cien llamadas
  M.SEGURO_LEYENDA = 100;     // y como mucho cien llamadas seguidas sin que responda una

  M.nuevaPartida = function () {
    var nueva = { v: 2, oro: 0, gemas: 15, pociones: 3, ascuas: 1, fragmentos: 0, medallas: 0, mejoras: {},
      unidades: { kael: { lv: 1, xp: 0, asc: 0, res: 0 } }, escuadron: ["kael"],
      hechas: {}, vistas: {}, final: null, mats: {}, items: {}, bolsa: {}, xpBanco: 0, granja: nuevaGranja() };
    M.usarPartida(nueva); return nueva;
  };
  function nuevaGranja() { return { nivel: 1, t: 0, llaves: {} }; }

  // Estrellas: todo eco puede llegar a 5. Las de salida dependen de su rareza; las demás se ganan con medallas.
  M.MAX_ESTRELLAS = 5;
  M.maxAsc = function (id) { return M.MAX_ESTRELLAS - D.HEROES[id].rar; };
  M.estrellas = function (id, u) { return Math.min(M.MAX_ESTRELLAS, D.HEROES[id].rar + (u.asc || 0)); };
  M.maxNivel = function (u, id) { var e = id ? M.estrellas(id, u) : 2 + (u.asc || 0); return 30 + 20 * (e - 2); };   // 2★ 30 · 3★ 50 · 4★ 70 · 5★ 90
  M.xpPara = function (lv) { return 30 + 22 * lv; };
  // Lo que gana un eco en cada estrella, según el tipo de su ráfaga.
  M.RASGOS = {
    uno:   [null, null, null, { n: "Remate", d: "Hace un 25 % más de daño a enemigos por debajo de media vida." }, { n: "Rompedor", d: "Su daño cuenta el doble para romper cargas." }, { n: "Despertar", d: "Da un golpe más en cada ataque y su ráfaga atraviesa las defensas." }],
    todos: [null, null, null, { n: "Onda", d: "Su ráfaga da 10 de ráfaga a cada compañero." }, { n: "Brecha", d: "Su ráfaga baja la defensa de los enemigos durante dos turnos." }, { n: "Despertar", d: "Da un golpe más en cada ataque y su súper ráfaga aturde a los enemigos comunes." }],
    cura:  [null, null, null, { n: "Alivio", d: "Su ráfaga cura además un 15 % extra al más herido." }, { n: "Aliento", d: "Su ráfaga da 15 de ráfaga a cada compañero." }, { n: "Despertar", d: "Da un golpe más en cada ataque, su ráfaga quita los estados alterados y su súper ráfaga levanta a un compañero caído." }],
    apoyo: [null, null, null, { n: "Temple", d: "Los efectos de su ráfaga duran un turno más." }, { n: "Aliento", d: "Su ráfaga da 15 de ráfaga a cada compañero." }, { n: "Despertar", d: "Da un golpe más en cada ataque y su ráfaga además quita los estados alterados y cura un 15 %." }]
  };
  M.rasgos = function (id, u) { var t = D.HEROES[id].bb.tipo, e = M.estrellas(id, u), o = {}; for (var k = 3; k <= e; k++) o[M.RASGOS[t][k].n] = 1; return o; };
  // Suma lo que aportan el arma y el equipo que lleva puestos un eco.
  M.bonus = function (u) {
    var t = { hp: 0, atk: 0, def: 0, raf: 0, bbIni: 0, res: {} };
    [u.arma, u.equipo].forEach(function (id) {
      var it = id && D.ITEMS[id]; if (!it) return; var b = it.bonus, tp = 1 + 0.1 * M.temple(id);
      t.hp += (b.hp || 0) * tp; t.atk += (b.atk || 0) * tp; t.def += (b.def || 0) * tp; t.raf += (b.raf || 0) * tp; t.bbIni += b.bbIni || 0;
      if (b.res) for (var e in b.res) t.res[e] = (t.res[e] || 0) + b.res[e];
    });
    return t;
  };
  M.stats = function (id, u) {
    var b = D.HEROES[id], k = (1 + 0.06 * (u.lv - 1)) * (1 + 0.25 * (u.asc || 0)) * (1 + 0.05 * (u.res || 0)), x = M.bonus(u);
    var tm = M.mods(id, u);
    return { hp: Math.round(b.hp * k * (1 + x.hp + (tm.hp || 0))), atk: Math.round(b.atk * k * (1 + x.atk + (tm.atk || 0))), def: Math.round(b.def * k * (1 + x.def + (tm.def || 0))) };
  };
  M.multElemento = function (a, d) { return D.FUERTE[a] === d ? 1.5 : (D.FUERTE[d] === a ? 0.75 : 1); };

  M.darXp = function (u, xp, id) {
    var subio = 0, tope = M.maxNivel(u, id); u.xp += xp;
    while (u.lv < tope && u.xp >= M.xpPara(u.lv)) { u.xp -= M.xpPara(u.lv); u.lv++; subio++; }
    if (u.lv >= tope) u.xp = 0;
    return subio;
  };
  // ---------- bono de experiencia ----------
  // Cada victoria guarda en un fondo común tanta experiencia como gana un eco del escuadrón.
  // Se gasta en quien quieras: sirve para poner al día a un eco nuevo sin tener que criarlo desde cero.
  M.xpHastaNivel = function (u, id, objetivo) {   // experiencia que le falta para llegar a ese nivel
    var tope = Math.min(objetivo, M.maxNivel(u, id)), s = -u.xp; if (tope <= u.lv) return 0;
    for (var l = u.lv; l < tope; l++) s += M.xpPara(l); return Math.max(0, s);
  };
  M.nivelConBono = function (save, id, objetivo) {   // hasta qué nivel llega con lo guardado, sin pasar del objetivo
    var u = save.unidades[id], tope = Math.min(objetivo, M.maxNivel(u, id)), l = u.lv;
    while (l < tope && M.xpHastaNivel(u, id, l + 1) <= (save.xpBanco || 0)) l++;
    return l;
  };
  M.usarBono = function (save, id, objetivo) {
    var u = save.unidades[id]; if (!u) return 0;
    var hasta = M.nivelConBono(save, id, objetivo); if (hasta <= u.lv) return 0;
    var coste = M.xpHastaNivel(u, id, hasta), antes = u.lv; save.xpBanco -= coste; M.darXp(u, coste, id); return u.lv - antes;
  };
  // Subir una estrella cuesta medallas de eco (salen de los ecos repetidos) y oro, con el eco al nivel máximo.
  M.costeAscender = function (u, id) { var e = M.estrellas(id, u); return { medallas: [0, 0, 3, 6, 10][e] || 99, oro: 800 * (e - 1) * (e - 1), nivel: [0, 0, 20, 35, 50][e] || 99 }; };
  M.puedeAscender = function (save, id) {
    var u = save.unidades[id]; if (!u || M.estrellas(id, u) >= M.MAX_ESTRELLAS || u.lv < M.costeAscender(u, id).nivel) return false;
    var c = M.costeAscender(u, id); return save.oro >= c.oro && (save.medallas || 0) >= c.medallas;
  };
  M.ascender = function (save, id) {
    if (!M.puedeAscender(save, id)) return false;
    var u = save.unidades[id], c = M.costeAscender(u, id);
    save.oro -= c.oro; save.medallas -= c.medallas; u.asc = (u.asc || 0) + 1; u.xp = 0; return true;
  };
  M.MEDALLAS_POR_REPETIDO = { 2: 1, 3: 2, 4: 4, 5: 12 };
  // Devuelve true si el eco es nuevo. Si ya lo tenías, lo cambia por medallas.
  M.unir = function (save, id) {
    if (save.unidades[id]) { save.medallas = (save.medallas || 0) + M.MEDALLAS_POR_REPETIDO[D.HEROES[id].rar]; return false; }
    save.unidades[id] = { lv: 1, xp: 0, asc: 0, res: 0 };
    if (save.escuadron.length < 6) save.escuadron.push(id);
    return true;
  };
  M.invocar = function (save, rng) {
    if (save.gemas < COSTE_INVOCAR) return null;
    save.gemas -= COSTE_INVOCAR;
    save.sinLeyenda = (save.sinLeyenda || 0) + 1;
    var r = rng(), rar = r < 0.10 ? 4 : (r < 0.40 ? 3 : 2);
    if (rng() < M.PROB_LEYENDA || save.sinLeyenda >= M.SEGURO_LEYENDA) { rar = 5; save.sinLeyenda = 0; }
    var pool = Object.keys(D.HEROES).filter(function (id) { return D.HEROES[id].rar === rar && !D.HEROES[id].secreto; });
    if (rar === 5) { var faltan = pool.filter(function (id) { return !save.unidades[id]; }); if (faltan.length) pool = faltan; }
    var id = pool[Math.floor(rng() * pool.length)], nuevo = M.unir(save, id);
    return { id: id, nuevo: nuevo, medallas: nuevo ? 0 : M.MEDALLAS_POR_REPETIDO[rar], leyenda: rar === 5 };
  };
  // Llamar equipo en vez de ecos: armas y piezas ya forjadas, o un lote de materiales. Nunca armas finales ni trofeos.
  M.invocarEquipo = function (save, rng) {
    if (save.gemas < COSTE_INVOCAR) return null;
    save.gemas -= COSTE_INVOCAR; save.items = save.items || {}; save.mats = save.mats || {};
    var r = rng(), E = D.ELEMENTOS[Math.floor(rng() * 6)], e = E.toLowerCase(), id = null;
    function pick(f) { var l = Object.keys(D.ITEMS).filter(f); return l[Math.floor(rng() * l.length)]; }
    save.sinArmaLeyenda = (save.sinArmaLeyenda || 0) + 1;
    var quedan = Object.keys(D.ITEMS).filter(function (k) { return D.ITEMS[k].leyenda && !M.tiene(save, k); });
    if (quedan.length && (rng() < M.PROB_LEYENDA || save.sinArmaLeyenda >= M.SEGURO_LEYENDA)) {
      id = quedan[Math.floor(rng() * quedan.length)]; save.sinArmaLeyenda = 0; save.items[id] = 1; return { item: id, raro: true, leyenda: true };
    }
    if (r < 0.05) id = "arma_" + e + "_2";
    else if (r < 0.20) id = "arma_" + e + "_1";
    else if (r < 0.24) id = pick(function (k) { var it = D.ITEMS[k]; return it.oficio && it.nivel === 2; });
    else if (r < 0.34) id = pick(function (k) { var it = D.ITEMS[k]; return it.oficio && it.nivel === 1; });
    else if (r < 0.50) id = pick(function (k) { var it = D.ITEMS[k]; return it.tipo === "equipo" && it.el; });
    else if (r < 0.66) id = pick(function (k) { var it = D.ITEMS[k]; return it.tipo === "equipo" && !it.el && it.nivel === 2; });
    if (id) { save.items[id] = (save.items[id] || 0) + 1; return { item: id, raro: D.ITEMS[id].nivel >= 2 && D.ITEMS[id].tipo === "arma" }; }
    var m = {}; m["mat_" + e + "_1"] = 4; m["mat_" + e + "_2"] = 1; for (var k in m) save.mats[k] = (save.mats[k] || 0) + m[k];
    return { mats: m };
  };
  // Los fragmentos de recuerdo de los jefes se funden en medallas.
  M.FRAG_POR_MEDALLA = 4;
  M.fundir = function (save) { if (save.fragmentos < M.FRAG_POR_MEDALLA) return false; save.fragmentos -= M.FRAG_POR_MEDALLA; save.medallas = (save.medallas || 0) + 1; return true; };
  // Pone al día una partida guardada con reglas anteriores.
  M.migrar = function (save) {
    save.mats = save.mats || {}; save.items = save.items || {}; save.medallas = save.medallas || 0;
    save.hechas = save.hechas || {}; save.vistas = save.vistas || {}; save.mejoras = save.mejoras || {};
    if (save.final && !(D.FINALES && D.FINALES[save.final])) save.final = null;
    ["oro", "gemas", "pociones", "ascuas", "fragmentos"].forEach(function (k) { if (typeof save[k] !== "number" || !isFinite(save[k]) || save[k] < 0) save[k] = 0; });
    // lo que ya no existe en el juego se retira sin romper nada: piezas, materiales y mejoras de versiones anteriores
    Object.keys(save.items).forEach(function (k) { if (!D.ITEMS[k] || !(save.items[k] > 0)) delete save.items[k]; });
    Object.keys(save.mats).forEach(function (k) { if (!D.MATS[k] || !(save.mats[k] > 0)) delete save.mats[k]; });
    Object.keys(save.mejoras).forEach(function (k) { if (!D.ITEMS[k]) delete save.mejoras[k]; });
    save.bolsa = save.bolsa || {}; M.usarPartida(save);
    if (!save.bestia) { save.bestia = {}; Object.keys(save.hechas || {}).forEach(function (k) { var m = /^(\d)-(\d)-(\d)$/.exec(k); if (m) anotarBestias(save, M.fase(+m[1], +m[2], +m[3], 0)); }); }
    if (save.xpBanco == null) {   // partidas anteriores al bono: se les reconoce lo que ya han luchado
      var top = 1; Object.keys(save.unidades).forEach(function (k) { top = Math.max(top, save.unidades[k].lv); });
      save.xpBanco = 0; for (var lb = 1; lb < top; lb++) save.xpBanco += M.xpPara(lb);
    }
    if (!save.granja) {   // partidas anteriores a la granja: se les entrega lo que ya habrían ganado
      save.granja = nuevaGranja();
      M.LLAVES_GRANJA.forEach(function (x) { if (save.hechas[x.fase]) save.granja.llaves[x.id] = (save.granja.llaves[x.id] || 0) + 1; });
    }
    var gj = save.granja;
    if (typeof gj.t !== "number") {   // huerto antiguo de tres parcelas: se funde en uno y no se pierde nada
      var ts = Object.keys(gj.t || {}).map(function (k) { return gj.t[k]; }); gj.t = ts.length ? Math.min.apply(null, ts) : 0;
      gj.llaves.abono = (gj.llaves.abono || 0) + (gj.llaves.semilla_flor || 0) + (gj.llaves.semilla_raiz || 0) + (ts.length > 1 ? ts.length - 1 : 0);
      delete gj.llaves.semilla_flor; delete gj.llaves.semilla_raiz;
      var ing = gj.ing || {}, mapa = { hierba: "pocion", flor: "remedio", raiz: "ascua", hierbaR: "pocionM", florR: "elixir", raizR: "ascuaM" };
      Object.keys(mapa).forEach(function (k) { if (ing[k] > 0) M.darObjeto(save, mapa[k], ing[k]); }); delete gj.ing;
    }
    Object.keys(save.unidades).forEach(function (id) {
      var u = save.unidades[id]; if (!D.HEROES[id]) { delete save.unidades[id]; return; }
      u.asc = Math.min(u.asc || 0, M.maxAsc(id)); u.lv = Math.max(1, Math.min(u.lv || 1, M.maxNivel(u, id))); u.xp = u.xp > 0 ? u.xp : 0; u.res = u.res || 0;
      ["arma", "equipo"].forEach(function (hc) { var it = u[hc] && D.ITEMS[u[hc]]; if (u[hc] && (!it || it.tipo !== hc || !save.items[u[hc]] || !M.puedeLlevar(id, u[hc]))) u[hc] = null; });
    });
    if (!Object.keys(save.unidades).length) save.unidades.kael = { lv: 1, xp: 0, asc: 0, res: 0 };
    // el escuadrón: solo ecos que tengas, sin repetir, entre uno y seis
    var visto = {}; save.escuadron = (save.escuadron || []).filter(function (id) { if (!save.unidades[id] || visto[id]) return false; visto[id] = 1; return true; }).slice(0, 6);
    if (!save.escuadron.length) save.escuadron = [save.unidades.kael ? "kael" : Object.keys(save.unidades)[0]];
    // nadie lleva más copias de una pieza de las que hay
    var puestas = {}; save.escuadron.concat(Object.keys(save.unidades)).forEach(function (id) { var u = save.unidades[id]; if (u._rev) return; u._rev = 1;
      ["arma", "equipo"].forEach(function (hc) { if (!u[hc]) return; puestas[u[hc]] = (puestas[u[hc]] || 0) + 1; if (puestas[u[hc]] > save.items[u[hc]]) { u[hc] = null; } }); });
    Object.keys(save.unidades).forEach(function (id) { delete save.unidades[id]._rev; });
    return save;
  };

  var OLAS = [
    [[0, 0], [0, 1]],
    [[0, 1], [1, 2], [0, 2]],
    [[1, 2], [2, 3], [0, 1, 2]],
    [[0, 3], [1, 2, 3], [2, 3, 3]],
    [[0, 1, 2], [1, 2, 3], ["J", 1, 3]]
  ];
  // Grados de dificultad. Cada grado vuelve la región más dura y da a los enemigos movimientos nuevos.
  M.GRADOS = [{ n: "Normal", salto: 0 }, { n: "Difícil", salto: 50 }, { n: "Eclipse", salto: 110 }];
  M.indice = function (r, a, f) { return r * 25 + a * 5 + f; };
  M.clave = function (r, a, f, t) { return r + "-" + a + "-" + f + (t ? "@" + t : ""); };
  // Lo que pide cada jefe. Coraza: quien no lleve un arma forjada le hace un 40 % menos de daño.
  // Presencia: por cada estrella que le falte a un eco, le hace un 25 % menos de daño y recibe un 25 % más.
  M.exigencia = function (r, a, t) {
    var gran = a === 4, sub = a === 1 || a === 3; if (!gran && !sub) return null;
    var rr = r + (t ? 8 : 0);
    var presencia = gran ? [0, 0, 3, 3, 4, 4, 4, 4, 5][Math.min(8, rr)] : [0, 0, 0, 0, 3, 3, 4, 4][Math.min(7, rr)];
    var coraza = gran ? rr >= 3 : rr >= 5;
    return (presencia || coraza) ? { presencia: presencia, coraza: coraza } : null;
  };
  M.fase = function (r, a, f, t) {
    t = t || 0;
    var zona = D.ZONAS[r], g = M.indice(r, a, f), ge = g + M.GRADOS[t].salto, lvl = 1 + Math.round(ge * M.CFG.nivPorFase);
    var trucos = t * 2 + (r >= 2 ? 1 : 0) + (r >= 5 ? 1 : 0); // cuánto repertorio traen los enemigos
    var idx = [0, 1, 2, 3].map(function (k) { return (a * 2 + k) % 8; });
    var final = f === 4, jefe = null, variante = false;
    if (final) {
      if (a === 4) jefe = zona.jefe; else if (a === 1) jefe = zona.subjefes[0]; else if (a === 3) jefe = zona.subjefes[1]; else { jefe = zona.comunes[idx[3]]; variante = true; }
    }
    var ex = final ? M.exigencia(r, a, t) : null;
    function mk(id, extra) { var o = { id: id, lvl: lvl, g: t ? 99 : g, ge: ge, trucos: trucos, t: t }; if (ex && id === jefe) { o.coraza = ex.coraza; o.presencia = ex.presencia; } for (var k in extra) o[k] = extra[k]; return o; }
    var olas = OLAS[f].map(function (o) {
      return o.map(function (x, pos) { return x === "J" ? mk(jefe, { variante: variante, pos: pos }) : mk(zona.comunes[idx[x]], { arq: idx[x], pos: pos }); });
    });
    if (final && a === 4 && zona.extra) olas.push([mk(zona.extra, { pos: 0 })]);
    return { r: r, a: a, f: f, t: t, g: g, ge: ge, nombre: zona.areas[a] + " " + (f + 1), lvl: lvl, olas: olas, jefe: final, granJefe: final && a === 4, trucos: trucos, exigencia: ex };
  };
  M.anterior = function (r, a, f) {
    if (f > 0) return [r, a, f - 1]; if (a > 0) return [r, a - 1, 4]; if (r > 0) return [r - 1, 4, 4]; return null;
  };
  // Cada lugar abre su versión Difícil al completarlo en Normal, y Eclipse al completarlo en Difícil.
  M.lugarAbierto = function (save, r, a, t) { return !t ? M.desbloqueada(save, r, a, 0, 0) : !!save.hechas[M.clave(r, a, 4, t - 1)]; };
  M.gradoAbierto = function (save, r, t) {
    if (!t) return M.desbloqueada(save, r, 0, 0, 0);
    for (var a = 0; a < 5; a++) if (M.lugarAbierto(save, r, a, t)) return true; return false;
  };
  // Lo que multiplica cada dificultad: oro, experiencia y gemas de la primera vez.
  M.PREMIO_GRADO = [{ oro: 1, xp: 1, gemas: 1 }, { oro: 1.6, xp: 1.4, gemas: 1.5 }, { oro: 2.4, xp: 1.8, gemas: 2 }];
  M.desbloqueada = function (save, r, a, f, t) {
    t = t || 0;
    if (t) return f === 0 ? M.lugarAbierto(save, r, a, t) : !!save.hechas[M.clave(r, a, f - 1, t)];
    var p = M.anterior(r, a, f); if (!p) return true;
    return !!save.hechas[M.clave(p[0], p[1], p[2], 0)];
  };


  // ---------- misiones secretas ----------
  // Dos por región. El eco perdido se abre al terminar la tercera zona; la incursión, al vencer al jefe.
  var PERDIDOS = ["rosal", "mirra", "nerea", "ziva", "morwen", "liora", "azrak", "ysolde"];
  M.SECRETAS = [];
  D.ZONAS.forEach(function (z, r) {
    M.SECRETAS.push({ id: "eco-" + r, r: r, tipo: "eco", heroe: PERDIDOS[r], req: r + "-2-4", n: "Eco perdido: " + D.HEROES[PERDIDOS[r]].n, d: "Un eco que nadie llamó vaga por la región. Si lo vences, se une al gremio." });
    M.SECRETAS.push({ id: "raid-" + r, r: r, tipo: "raid", req: r + "-4-4", n: "Incursión: " + D.ENEMIGOS[z.jefe].n, d: "El jefe vuelve con todo su repertorio y el triple de vida. Tienes 16 turnos. Suelta sellos de incursión." });
  });
  M.secreta = function (id) {
    if (id.indexOf("torre:") === 0) { var n = +id.slice(6); return { id: id, r: (n - 1) % 8, tipo: "torre", n: "Torre · piso " + n, d: n % 10 === 0 ? "Un gran jefe guarda este piso." : (n % 5 === 0 ? "Un jefe guarda este piso." : "La Torre no tiene tarde ni mañana. Solo el piso siguiente.") }; }
    if (id.indexOf("arena:") === 0) return { id: id, r: 0, tipo: "arena", n: "Arena", d: "Otro gremio ha llamado a los suyos. Aquí nadie se va: solo se mide." };
    if (id.indexOf("ev:") === 0) { var pe = id.split(":"); return M.EVENTO.zonas[+pe[1]] && +pe[2] >= 0 && +pe[2] < 5 ? { id: id, r: Math.min(7, +pe[1] + 1), tipo: "evento", z: +pe[1], f: +pe[2], n: M.EVENTO.zonas[+pe[1]].n, d: M.EVENTO.n } : null; }
    if (id.indexOf("rec:") === 0) { var mm = D.MEMORIAS[id.slice(4)]; return mm ? { id: id, r: mm.r, tipo: "recuerdo", eco: id.slice(4), n: mm.n, d: "Un recuerdo de " + D.HEROES[id.slice(4)].n + "." } : null; }
    if (id.indexOf("vec:") === 0) { var vv = M.VECINOS.filter(function (x) { return x.id === id.slice(4); })[0]; return { id: id, r: vv.r, tipo: "vecino", n: vv.mis.n, d: vv.mis.d, pide: vv.mis.pide }; }
    return M.SECRETAS.filter(function (s) { return s.id === id; })[0];
  };
  M.secretaAbierta = function (save, id) {
    if (id.indexOf("torre:") === 0) return M.torreAbierta(save) && +id.slice(6) <= M.pisoTorre(save);
    if (id.indexOf("arena:") === 0) return M.arenaAbierta(save);
    if (id.indexOf("vec:") === 0) return M.regionesHechas(save) >= M.secreta(id).pide;
    if (id.indexOf("rec:") === 0) return M.recuerdo(save, id.slice(4)).abierto;
    if (id.indexOf("ev:") === 0) { var se = M.secreta(id), ze = M.eventoZona(save, se.z); return ze.abierta && se.f <= ze.hechas; }
    var s = M.secreta(id); return !!s && !!save.hechas[s.req];
  };
  M.faseSecreta = function (id, save) {
    if (id.indexOf("torre:") === 0) return M.faseTorre(+id.slice(6));
    if (id.indexOf("arena:") === 0) return M.faseArena(save);
    if (id.indexOf("vec:") === 0) return M.faseVecino(id.slice(4));
    if (id.indexOf("rec:") === 0) return M.faseRecuerdo(id.slice(4), save);
    if (id.indexOf("ev:") === 0) { var qe = M.secreta(id); return M.faseEvento(qe.z, qe.f); }
    var s = M.secreta(id), zona = D.ZONAS[s.r], raid = s.tipo === "raid";
    var g = M.indice(s.r, raid ? 4 : 2, 4), ge = g + (raid ? 45 : 15), lvl = 1 + Math.round(ge * M.CFG.nivPorFase), trucos = raid ? 4 : 2;
    function mk(idE, extra) { var o = { id: idE, lvl: lvl, g: 99, ge: ge, trucos: trucos, t: 0 }; for (var k in extra) o[k] = extra[k]; return o; }
    var olas = raid
      ? [[mk(zona.subjefes[0], { pos: 0 }), mk(zona.subjefes[1], { pos: 1 })], [mk(zona.extra || zona.jefe, { raid: true, pos: 0 })]]
      : [[mk(zona.comunes[2], { arq: 2, pos: 0 }), mk(zona.comunes[5], { arq: 5, pos: 1 })], [mk("eco:" + s.heroe, { pos: 0 }), mk(zona.comunes[4], { arq: 4, pos: 1 })]];
    return { r: s.r, a: raid ? 4 : 2, f: 4, t: 0, g: g, ge: ge, nombre: s.n, lvl: lvl, olas: olas, jefe: true, granJefe: raid, trucos: trucos, secreta: id, raid: raid, limite: raid ? 16 : 0 };
  };

  // =====================================================================
  // MÁS ALLÁ DE LA HISTORIA: Torre, Arena, encargos del día y logros
  // =====================================================================
  function process_env(k, d) { return (typeof process !== "undefined" && process.env && process.env[k]) || d; }
  var HOY = "0";
  M.usarDia = function (d) { HOY = String(d); };
  function cuenta(save) {
    save.stats = save.stats || {}; save.logros = save.logros || {}; save.arena = save.arena || { v: 0 };
    if (!save.diario || save.diario.dia !== HOY) save.diario = { dia: HOY, prog: {}, cobrado: {} };
    return save;
  }
  function inc(save, k, n) { if (!n) return; cuenta(save); save.stats[k] = (save.stats[k] || 0) + n; save.diario.prog[k] = (save.diario.prog[k] || 0) + n; }
  M.anotar = inc;
  // ---- Torre: pisos sin fin, cada uno más alto que el anterior. Cada 5, un jefe; cada 10, un gran jefe.
  M.faseTorre = function (n) {
    var r = (n - 1) % 8, zona = D.ZONAS[r], lvl = 4 + 2 * n, ge = Math.round((lvl - 1) / M.CFG.nivPorFase), trucos = Math.min(4, Math.floor(n / 8)), gran = n % 10 === 0, sub = !gran && n % 5 === 0, c = zona.comunes, k = n % 8;
    var sube = 1 + Math.max(0, n - 10) * (+process_env("TM", 0.05));   // a partir del piso 10 la Torre aprieta un 5 % más por piso
    function mk(idE, extra) { var o = { id: idE, lvl: lvl, g: 99, ge: ge, trucos: trucos, t: 0, mhp: sube, matk: Math.sqrt(sube) }; for (var x in extra) o[x] = extra[x]; return o; }
    function com(d, pos) { var i = (k + d) % 8; return mk(c[i], { arq: i, pos: pos }); }
    var o1 = [com(0, 0), com(3, 1)]; if (n > 6) o1.push(com(5, 2));
    var o2 = gran ? [mk(zona.jefe, { pos: 0, coraza: n >= 30, presencia: n >= 20 ? 3 : 0 })] : (sub ? [mk(zona.subjefes[Math.floor(n / 5) % 2], { pos: 0 }), com(1, 1)] : [com(1, 0), com(6, 1), com(2, 2)]);
    return { r: r, a: 4, f: 4, t: 0, g: M.indice(r, 2, 2), ge: ge, nombre: "Torre · piso " + n, lvl: lvl, olas: [o1, o2], jefe: gran || sub, granJefe: gran, trucos: trucos, secreta: "torre:" + n, torre: n, limite: 0 };
  };
  M.pisoTorre = function (save) { return (save.torre || 0) + 1; };
  M.torreAbierta = function (save) { return !!save.hechas["0-4-4"]; };
  // ---- Arena: duelos contra el escuadrón de otro gremio. Cada victoria cuenta para el rango.
  M.RANGOS = [{ n: "Bronce", v: 0, gemas: 0 }, { n: "Plata", v: 5, gemas: 15 }, { n: "Oro", v: 12, gemas: 30 }, { n: "Platino", v: 22, gemas: 45 }, { n: "Eclipse", v: 35, gemas: 60 }];
  M.rangoArena = function (save) { var v = (save.arena || { v: 0 }).v, k = 0; M.RANGOS.forEach(function (R, i) { if (v >= R.v) k = i; }); return { i: k, n: M.RANGOS[k].n, v: v, sig: M.RANGOS[k + 1] || null }; };
  M.arenaAbierta = function (save) { return !!save.hechas["1-4-4"]; };
  var GREMIOS = ["Gremio del Farol Rojo", "Los Relojeros de Sal", "Hermandad del Puerto Viejo", "La Compañía del Tiovivo", "Gremio de las Tres Campanas", "Los del Último Turno", "Cofradía del Brezo", "La Mesa de Cobre"];
  M.rivalArena = function (save) {
    cuenta(save); var v = save.arena.v, s = (v * 7919 + 13) >>> 0;
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    var ids = Object.keys(D.HEROES).filter(function (k) { return !D.HEROES[k].leyenda && !D.HEROES[k].secreto; }), n = v >= 12 ? 4 : 3, eq = [];
    while (eq.length < n) { var id = ids[Math.floor(rnd() * ids.length)]; if (eq.indexOf(id) < 0) eq.push(id); }
    var med = Math.round(save.escuadron.reduce(function (t, id) { return t + save.unidades[id].lv; }, 0) / save.escuadron.length);
    return { n: GREMIOS[v % GREMIOS.length], ecos: eq, lvl: Math.max(3, med - 4 + Math.floor(v / 3)), v: v };
  };
  M.faseArena = function (save) {
    var R = M.rivalArena(save), ge = Math.round((R.lvl - 1) / M.CFG.nivPorFase);
    var ola = R.ecos.map(function (id, pos) { return { id: "eco:" + id, lvl: R.lvl, g: 99, ge: 0, trucos: Math.min(3, Math.floor(R.v / 8)), t: 0, pos: pos, mhp: +process_env("AH", 0.3), matk: +process_env("AA", 1.9) + 0.02 * R.v }; });
    return { r: R.v % 8, a: 2, f: 2, t: 0, g: 60, ge: ge, nombre: "Arena · " + R.n, lvl: R.lvl, olas: [ola], jefe: false, granJefe: false, trucos: 0, secreta: "arena:" + R.v, arena: true, limite: 0 };
  };
  // ---- Encargos del día: tres tareas que cambian cada día.
  var ENCARGOS = [
    { k: "victorias", n: 3, t: "Gana 3 combates", ico: "ico_menu_misiones" }, { k: "chispas", n: 25, t: "Saca 25 chispas", ico: "ei_hb_058" },
    { k: "rafagas", n: 6, t: "Lanza 6 ráfagas", ico: "ico_cristal_rafaga" }, { k: "criaturas", n: 15, t: "Vence a 15 criaturas", ico: "ico_menu_logros" },
    { k: "cosechas", n: 1, t: "Recoge una cosecha del huerto", ico: "ico_mat_bosque_1" }, { k: "forjas", n: 1, t: "Forja o templa una pieza", ico: "ico_menu_forja" },
    { k: "limpias", n: 2, t: "Gana 2 combates sin que caiga ningún eco", ico: "ico_corazon" },
    { k: "torre", n: 1, t: "Supera un piso de la Torre", ico: "ico_menu_arena", pide: "torre" }, { k: "arena", n: 1, t: "Gana un duelo en la Arena", ico: "ico_ficha_arena", pide: "arena" }];
  M.encargos = function (save) {
    cuenta(save); var h = 0; for (var i = 0; i < HOY.length; i++) h = (h * 31 + HOY.charCodeAt(i)) >>> 0;
    var pool = ENCARGOS.filter(function (e) { return !e.pide || (e.pide === "torre" ? M.torreAbierta(save) : M.arenaAbierta(save)); }), L = [];
    while (L.length < 3) { h = (h * 1664525 + 1013904223) >>> 0; var e = pool[h % pool.length]; if (L.indexOf(e) < 0) L.push(e); }
    var premio = { gemas: 6, oro: 400 * (1 + M.regionesHechas(save)) };
    return L.map(function (e) { var p = Math.min(e.n, save.diario.prog[e.k] || 0); return { k: e.k, t: e.t, ico: e.ico, n: e.n, prog: p, hecho: p >= e.n, cobrado: !!save.diario.cobrado[e.k], premio: premio }; });
  };
  M.cobrarEncargo = function (save, k) {
    var e = M.encargos(save).filter(function (x) { return x.k === k; })[0]; if (!e || !e.hecho || e.cobrado) return null;
    save.diario.cobrado[k] = 1; save.gemas += e.premio.gemas; save.oro += e.premio.oro; return e.premio;
  };
  M.diaCompleto = function (save) { var L = M.encargos(save); return { listo: L.every(function (e) { return e.cobrado; }), cobrado: !!save.diario.cobrado._todo }; };
  M.cobrarDia = function (save) { var d = M.diaCompleto(save); if (!d.listo || d.cobrado) return false; save.diario.cobrado._todo = 1; save.medallas = (save.medallas || 0) + 1; M.darObjeto(save, "elixir", 1); return true; };
  // ---- Logros: metas largas con tres escalones. Cada escalón da gemas una vez.
  var LOGROS = [
    { id: "regiones", n: "Soltador de tardes", d: "Regiones completadas", ico: "ico_menu_misiones", m: [1, 4, 8], f: function (s) { return M.regionesHechas(s); } },
    { id: "ecos", n: "El gremio lleno", d: "Ecos reunidos", ico: "ico_menu_ecos", m: [10, 25, 48], f: function (s) { return Object.keys(s.unidades).length; } },
    { id: "bestias", n: "Naturalista", d: "Criaturas distintas vencidas", ico: "ico_menu_logros", m: [30, 60, 88], f: function (s) { return M.bestiario(s).reduce(function (t, z) { return t + z.vistos; }, 0); } },
    { id: "torre", n: "Sin vértigo", d: "Pisos de la Torre superados", ico: "ico_menu_arena", m: [10, 25, 50], f: function (s) { return s.torre || 0; } },
    { id: "arena", n: "Duelista", d: "Duelos ganados en la Arena", ico: "ico_ficha_arena", m: [5, 15, 35], f: function (s) { return (s.arena || { v: 0 }).v; } },
    { id: "victorias", n: "Oficio", d: "Combates ganados", ico: "ico_sello_gremio", m: [25, 100, 300], f: function (s) { return (s.stats || {}).victorias || 0; } },
    { id: "chispas", n: "A compás", d: "Chispas sacadas", ico: "ei_hb_058", m: [100, 1000, 5000], f: function (s) { return (s.stats || {}).chispas || 0; } },
    { id: "estrellas", n: "Recuerdo entero", d: "Ecos con 5 estrellas", ico: "ico_estrella", m: [1, 3, 6], f: function (s) { return Object.keys(s.unidades).filter(function (id) { return M.estrellas(id, s.unidades[id]) >= 5; }).length; } },
    { id: "maestras", n: "Maestría", d: "Habilidades maestras aprendidas", ico: "ei_hb_050", m: [1, 5, 12], f: function (s) { var n = 0; Object.keys(s.unidades).forEach(function (id) { var t = s.unidades[id].tal || {}; Object.keys(t).forEach(function (k) { if (k.slice(-4) === ".cap") n++; }); }); return n; } },
    { id: "temple", n: "Buen temple", d: "Piezas templadas a +5", ico: "ico_menu_forja", m: [1, 3, 8], f: function (s) { return Object.keys(s.mejoras || {}).filter(function (k) { return s.mejoras[k] >= 5; }).length; } },
    { id: "cosechas", n: "Mano de huerto", d: "Cosechas recogidas", ico: "ico_mat_bosque_1", m: [10, 50, 150], f: function (s) { return (s.stats || {}).cosechas || 0; } }];
  var GEMAS_LOGRO = [10, 20, 40];
  M.logros = function (save) {
    cuenta(save);
    return LOGROS.map(function (L) {
      var v = L.f(save), niv = L.m.map(function (meta, i) { return { meta: meta, gemas: GEMAS_LOGRO[i], cobrado: !!save.logros[L.id + ":" + i], listo: v >= meta }; });
      var sig = niv.filter(function (x) { return !x.cobrado; })[0] || null;
      return { id: L.id, n: L.n, d: L.d, ico: L.ico, valor: v, niveles: niv, sig: sig, cobrable: !!sig && sig.listo };
    });
  };
  M.cobrarLogro = function (save, id) {
    var L = M.logros(save).filter(function (x) { return x.id === id; })[0]; if (!L || !L.cobrable) return 0;
    var i = L.niveles.indexOf(L.sig); save.logros[id + ":" + i] = 1; save.gemas += L.sig.gemas; return L.sig.gemas;
  };
  M.pendientes = function (save) {
    var e = M.encargos(save).filter(function (x) { return x.hecho && !x.cobrado; }).length, d = M.diaCompleto(save);
    return { encargos: e + (d.listo && !d.cobrado ? 1 : 0), logros: M.logros(save).filter(function (x) { return x.cobrable; }).length };
  };

  // ---------- repertorio de los enemigos ----------
  // g golpe · d doble · b barrido (a todos) · ca carga · es especial (a todos, muy fuerte) · m marca · r remate (al marcado)
  // G se cubre · c cura a un aliado · gr grito (sube el ataque de los suyos) · dr drena ráfaga
  var ARQ = [
    [["g"], ["g", "g", "d"], ["d", "g", "b"]],        // bruto
    [["g"], ["g", "G", "g"], ["G", "g", "b"]],        // duro
    [["d", "g"], ["d", "g"], ["d", "d", "g"]],        // rápido
    [["g"], ["g", "m", "r"], ["m", "r", "g"]],        // francotirador
    [["g"], ["g", "c", "g"], ["c", "g", "c"]],        // curandero
    [["g"], ["g", "gr", "g", "g"], ["gr", "g", "d"]], // cabecilla
    [["g"], ["G", "g", "g"], ["G", "b", "g"]],        // acorazado
    [["g"], ["g", "dr", "g"], ["dr", "g", "d"]]       // ladrón
  ];
  var EXTRA_JEFE = { roble_andante: "c", wyrm_fundicion: "G", leviatan: "dr", coloso_bobinas: "d", maestro_pista: "gr", campana_ahogada: "c", recaudador: "dr", arconte: "gr", arconte_desatado: "b" };
  M.ESPECIAL = { roble_andante: "Lluvia de ramas", wyrm_fundicion: "Colada", leviatan: "Galerna", coloso_bobinas: "Descarga total", maestro_pista: "Gran final", campana_ahogada: "Tañido hondo", recaudador: "Cobro", arconte: "Eclipse total", arconte_desatado: "Sol roto" };
  function patronDe(e, b) {
    var T = e.trucos || 0;
    if (e.variante) return T >= 1 ? ["g", "ca", "es", "d"] : ["g", "g", "d"];
    if (e.id.indexOf("eco:") === 0) return ["g", "m", "r", "d", "ca", "es"];
    if (b.jefe && b.sub) return T === 0 ? ["g", "g", "ca", "es"] : (T < 3 ? ["g", "m", "r", "ca", "es"] : ["m", "r", "b", "ca", "es", "gr"]);
    if (b.jefe) {
      var x = EXTRA_JEFE[e.id] || "d";
      if (T === 0) return ["g", "g", "ca", "es"];
      if (T === 1) return ["g", "b", "ca", "es", "m", "r"];
      if (T === 2) return ["b", "m", "r", "ca", "es", x];
      return ["m", "r", "ca", "es", x, "b", "ca", "es"];
    }
    return ARQ[e.arq || 0][T === 0 ? 0 : (T < 3 ? 1 : 2)];
  }
  var TXT = { g: "Golpe", d: "Dos golpes", b: "Barrido a todos", ca: "Va a cargar", es: "¡Ataque especial!", m: "Va a apuntar", r: "Remate", G: "Se va a cubrir", c: "Va a curar", gr: "Va a gritar", dr: "Roba ráfaga" };
  // Lo que hará el enemigo cuando acabe tu turno. Es lo que se enseña encima de su cabeza.
  M.intencion = function (st, ei) {
    var e = st.enemigos[ei]; if (!e || !e.vivo) return null;
    if (e.aturdido > 0) return { tipo: "at", txt: "Aturdido", peligro: 0 };
    var act = e.patron[e.paso % e.patron.length];
    if (act === "es" && !e.carga) act = "g";
    if (act === "r" && !(e.marca >= 0 && st.aliados[e.marca] && st.aliados[e.marca].vivo)) act = "g";
    var txt = TXT[act];
    if (act === "es") txt = "¡" + (M.ESPECIAL[e.id] || "Ataque especial") + "!";
    if (act === "r") txt = "Remate a " + st.aliados[e.marca].n;
    return { tipo: act, txt: txt, peligro: act === "es" || act === "r" ? 2 : (act === "b" || act === "ca" || act === "m" ? 1 : 0) };
  };
  M.umbralRuptura = function (e) { return Math.round(e.max * (e.jefe && !e.sub ? 0.10 : (e.sub ? 0.14 : 0.2)) * (1 + 0.15 * (e.t || 0)) * M.CFG.rup); };

  function baseEnemigo(id) {
    if (id.indexOf("eco:") !== 0) return D.ENEMIGOS[id];
    var hh = D.HEROES[id.slice(4)];   // un eco perdido pelea con las cifras de su héroe, adaptadas a jefe
    return { n: "Eco perdido de " + hh.n, el: hh.el, hp: hh.hp * 2.2, atk: hh.atk * 0.42, def: hh.def * 0.5, jefe: 1, sub: 1 };
  }
  M.baseEnemigo = baseEnemigo;
  function crearEnemigo(e) {
    var b = baseEnemigo(e.id), L = e.lvl, g = e.g || 0;
    // las primeras fases son suaves: se pueden pasar con un solo eco
    var arranque = Math.min(1, 0.3 + g * 0.03);   // la primera región entera es de aprendizaje
    var k = (1 + 0.06 * (L - 1)) * (1 + 0.25 * Math.min(3, L / 20)) * (M.CFG.dif0 + M.CFG.dif1 * Math.min(1.4, (L - 1) / 74)) * arranque * (1 + M.CFG.muro * Math.max(0, Math.min(1.5, (L - 10) / 65)));
    var jm = b.jefe ? 1 + M.CFG.jefeMuro * Math.min(1.5, Math.max(0, L - 10) / 65) * (b.sub ? 0.5 : 1) : 1;
    // pasada la región de aprendizaje, los enemigos pegan más y aguantan menos: combates más cortos y con más riesgo
    var rampa = Math.max(0, Math.min(1, (g - 15) / 35)), tarde = Math.max(0, Math.min(1.6, ((e.ge != null ? e.ge : g) - 50) / 150));
    function reg(t) { return (t && t[Math.max(0, Math.min(7, Math.floor(g / 25)))]) || 1; }   // retoque fino por región de la historia
    var kAtk = Math.max(0.05, 1 + M.CFG.eAtk * rampa + M.CFG.eAtk2 * tarde) * reg(M.CFG.regAtk), kHp = Math.max(0.1, 1 + M.CFG.eHp * Math.max(0, Math.min(1, (g - 15) / 20)) + M.CFG.eHp2 * tarde) * reg(M.CFG.regHp), kDef = Math.max(0.05, 1 + M.CFG.eDef * rampa + M.CFG.eDef2 * tarde);
    var hp = Math.round(b.hp * k * kHp * jm * (b.jefe ? 0.95 + ((b.sub ? M.CFG.subHp : M.CFG.jefeHp) - 0.95) * rampa : 1) * (e.variante ? 2.4 : 1) * (e.raid ? 3 : 1) * (e.mhp || 1));
    var patron = patronDe(e, b);
    return { id: e.id, n: b.n + (e.variante ? " feroz" : ""), el: b.el, hp: hp, max: hp, atk: Math.round(b.atk * k * kAtk * (e.variante ? 1.15 : 1) * (b.jefe ? M.CFG.jefeAtk * Math.sqrt(jm) : 1) * (e.matk || 1)), def: Math.round(b.def * k * kDef),
      jefe: !!b.jefe, sub: !!b.sub, variante: !!e.variante, raid: !!e.raid, vivo: true, pose: 0, t: e.t || 0,
      coraza: !!e.coraza, presencia: e.presencia || 0, patron: patron, paso: (e.pos || 0) % patron.length, carga: false, dCarga: 0, aturdido: 0, escudo: false, furia: 0, marca: -1, rabia: false, trucos: e.trucos || 0 };
  }
  M.crearCombate = function (save, r, a, f0, t, secreta) {
    var f = secreta ? M.faseSecreta(secreta, save) : M.fase(r, a, f0, t);
    var aliados = save.escuadron.map(function (id) {
      var u = save.unidades[id], st = M.stats(id, u), b = D.HEROES[id], x = M.bonus(u), rg = M.rasgos(id, u);
      var mo = M.mods(id, u);
      return { id: id, n: b.n, el: b.el, hp: st.hp, max: st.hp, atk: st.atk, def: st.def, hits: b.hits + (rg.Despertar ? 1 : 0) + (mo.golpes || 0), bb: Math.min(200, x.bbIni + (mo.bbIni || 0)), raf: 1 + x.raf + (mo.rafMas || 0), m: mo, es: mo.amanecer ? { defensa: mo.amanecer + 1 } : {}, res: x.res, bbdef: b.bb, rg: rg, arma: !!u.arma, estr: M.estrellas(id, u), vivo: true, actuo: false, guardia: false, pose: 0 };
    });
    return { fase: f, aliados: aliados, enemigos: f.olas[0].map(crearEnemigo), ola: 0, turno: 1, objetivo: 0, objetoUsado: false, fin: null, cadena: 0, mejorCadena: 0, chispas: 0, chispasTurno: 0, mejorChispas: 0, reloj: 0 };
  };

  function vivos(l) { return l.filter(function (x) { return x.vivo; }); }
  function idxObjetivo(st) {
    if (st.enemigos[st.objetivo] && st.enemigos[st.objetivo].vivo) return st.objetivo;
    for (var i = 0; i < st.enemigos.length; i++) if (st.enemigos[i].vivo) return i;
    return -1;
  }
  function dano(atk, mult, el, def, rng) { var P = 100 + atk * M.CFG.pen; return Math.max(1, Math.round(atk * mult * el * P / (P + def) * (0.9 + rng() * 0.2))); }
  function subirBB(a, v) { if (a.vivo) a.bb = Math.min(200, a.bb + Math.round((a.es && a.es.rafaga > 0 ? v * 2 : v) * (1 + ((a.m && a.m.carga) || 0)))); }

  // ---------- ritmo ----------
  // Cada eco pega a su compás: los de un solo golpe tardan en descargar, los de muchos golpes empiezan pronto y pegan seguido.
  // Devuelve en milisegundos cuándo cae cada golpe desde que lo tocas. Es fijo para cada eco: se aprende.
  function semilla(id) { var x = 2166136261; for (var i = 0; i < id.length; i++) { x ^= id.charCodeAt(i); x = Math.imul(x, 16777619); } return (x >>> 0) % 121 - 60; }
  M.ritmo = function (id, hits) {
    var n = hits || D.HEROES[id].hits, ini = 640 - 75 * Math.min(6, n) + semilla(id), paso = 150 - 12 * Math.min(6, n), o = [];
    for (var k = 0; k < n; k++) o.push(Math.max(120, ini + k * paso));
    return o;
  };
  M.VENTANA_CHISPA = 110;   // ms: dos golpes de ecos distintos sobre el mismo enemigo dentro de esta ventana hacen chispa
  M.BONO_CHISPA = 2;   // una chispa dobla el golpe: es lo que separa jugar a compás de dejar el automático

  // Un golpe concreto de un plan. t es el instante en que cae (reloj del combate, en ms).
  // =====================================================================
  // ARMAS CON OFICIO
  // Cada familia de arma hace una cosa distinta. Tres calidades por familia; cualquier arma se puede templar de +1 a +5.
  // =====================================================================
  // Cada familia tiene un PESO (cuánto ataque da el arma: las de filo pegan más que las varas o los trucos) y un EFECTO que crece con la calidad.
  // Además, cada arma de oficio tiene un RASGO PROPIO que no comparte con ninguna otra: por eso dos espadas no son la misma espada.
  M.FAMILIAS = {
    espada:      { n: "Espada",      clase: "Filo",        peso: 1.0,  k: "normal",    v: [0.08, 0.14, 0.22], d: "Sus ataques normales pegan un {v} más." },
    mandoble:    { n: "Mandoble",    clase: "Filo pesado", peso: 1.25, k: "rompe",     v: [0.30, 0.60, 1.00], d: "Rompe las cargas del enemigo un {v} más rápido." },
    lanza:       { n: "Lanza",       clase: "Punta",       peso: 1.0,  k: "perf",      v: [0.10, 0.18, 0.28], d: "Sus ataques normales ignoran un {v} de la defensa." },
    arco:        { n: "Arco",        clase: "Distancia",   peso: 0.9,  k: "rapido",    v: [0.15, 0.25, 0.35], d: "Sus golpes caen un {v} antes: cambia su compás." },
    polvora:     { n: "Pólvora",     clase: "Distancia",   peso: 1.0,  k: "lleno",     v: [0.20, 0.35, 0.50], d: "Pega un {v} más a enemigos con la vida entera." },
    daga:        { n: "Daga",        clase: "Filo corto",  peso: 0.85, k: "doble",     v: [0.06, 0.11, 0.17], d: "Cada golpe tiene un {v} de repetirse a media fuerza." },
    puno:        { n: "Puños",       clase: "Golpe",       peso: 0.8,  k: "bbGolpe",   v: [3, 6, 9],          d: "Cada ataque le da {v} de ráfaga extra." },
    vara:        { n: "Vara",        clase: "Magia",       peso: 0.5,  k: "rafMas",    v: [0.06, 0.12, 0.20], d: "Su ráfaga pega o cura un {v} más." },
    instrumento: { n: "Instrumento", clase: "Magia",       peso: 0.4,  k: "curaGolpe", v: [0.02, 0.035, 0.05], d: "Al atacar cura al compañero más herido un {v} de su vida." },
    truco:       { n: "Truco",       clase: "Maña",        peso: 0.6,  k: "debilita",  v: [0.05, 0.09, 0.14], d: "Cada golpe tiene un {v} de dejar debilidad." },
    escudo:      { n: "Escudo",      clase: "Defensa",     peso: 0,    k: "prot",      v: [0.06, 0.10, 0.15], d: "Recibe un {v} menos de daño." }
  };
  // Texto de cada rasgo propio. {v} es su valor.
  var TXT_RASGO = {
    pulso: "sus chispas pegan un {v} más", verdugo: "pega un {v} más a enemigos por debajo del 30 % de vida", cadencia: "cada chispa suya le da +2 % de daño, hasta un {v}",
    robo: "se cura un {v} del daño que hace", lleno: "pega un {v} más a enemigos con la vida entera", alMatar: "gana {v} de ráfaga al rematar a un enemigo",
    aliento2: "una vez por combate, al bajar del 30 % de vida recupera un {v}", bbGolpe: "cada ataque le da {v} de ráfaga extra", rapido: "sus golpes caen un {v} antes",
    esquiva: "{v} de esquivar un golpe", doble: "{v} de que cada golpe se repita a media fuerza", prot: "recibe un {v} menos de daño", oido: "le vale un margen un {v} mayor para hacer chispa",
    debilita: "{v} de dejar debilidad con cada golpe", carga: "su barra de ráfaga se llena un {v} más rápido", estela: "su ráfaga da {v} de ráfaga a cada compañero",
    savia: "recupera un {v} de su vida cada turno", bbIni: "empieza el combate con {v} de ráfaga", impetu: "recupera {v} de ráfaga tras lanzar la suya", tenaz: "{v} de sacudirse un estado alterado",
    rafPerf: "su ráfaga ignora un {v} de la defensa", proc: "{v} de dejar con cada golpe el estado de su elemento", golpes: "da {v} golpe más en cada ataque, aunque ya dé cinco",
    rompe: "rompe las cargas un {v} más rápido", perf: "sus ataques normales ignoran un {v} de la defensa"
  };
  var FAM_ELEMENTO = { Brasa: "espada", Bosque: "arco", Marea: "lanza", Rayo: "polvora", Alba: "vara", Ocaso: "daga" };
  var ARTE_ELEMENTO = { Brasa: ["01", "13", "36"], Bosque: ["11", "12", "07"], Marea: ["41", "45", "20"], Rayo: ["46", "42", "26"], Alba: ["02", "23", "31"], Ocaso: ["09", "38", "16"] };
  var OFICIO = [   // [arte, nombre, familia, rasgo propio, valor]
    ["06", "Florete", "espada", "pulso", 0.10], ["15", "Katana", "espada", "verdugo", 0.25], ["22", "Espada de arena", "espada", "cadencia", 0.16], ["35", "Florete rojo", "espada", "robo", 0.03],
    ["03", "Mandoble pesado", "mandoble", "lleno", 0.10], ["48", "Hacha del norte", "mandoble", "alMatar", 25], ["24", "Mandoble de fe", "mandoble", "aliento2", 0.20], ["44", "Llave de artífice", "mandoble", "bbGolpe", 3],
    ["49", "Lanza alada", "lanza", "perf", 0.12], ["39", "Ballesta larga", "arco", "lleno", 0.25],
    ["04", "Vendas de puño", "puno", "esquiva", 0.06], ["10", "Garras de hierro", "puno", "doble", 0.08], ["14", "Guanteletes", "puno", "prot", 0.08], ["50", "Garras fieras", "puno", "robo", 0.03], ["25", "Guantes de maestro", "puno", "oido", 0.20],
    ["05", "Bastón negro", "vara", "debilita", 0.05], ["17", "Vara azul", "vara", "carga", 0.12], ["18", "Cetro de espejos", "vara", "estela", 6], ["40", "Vara de hojas", "vara", "savia", 0.02], ["19", "Cayado del presagio", "vara", "bbIni", 20], ["28", "Bastón del reloj", "vara", "impetu", 20],
    ["51", "Vara de tierra", "vara", "tenaz", 0.30], ["32", "Vara arcana", "vara", "rafPerf", 0.15], ["34", "Vara elemental", "vara", "proc", 0.10],
    ["08", "Cuerno de llamada", "instrumento", "estela", 4], ["33", "Libro de notas", "instrumento", "carga", 0.10], ["37", "Campanilla de espíritus", "instrumento", "savia", 0.06], ["29", "Frasco de mezclas", "instrumento", "proc", 0.06],
    ["27", "Cuerda de trucos", "truco", "esquiva", 0.05], ["30", "Fusta de domador", "truco", "golpes", 1], ["47", "Látigo de lanista", "truco", "golpes", 1], ["43", "Bolas de malabarista", "truco", "oido", 0.15],
    ["21", "Escudo grande", "escudo", "aliento2", 0.15]
  ];
  (function () {
    var cuenta = {};
    // las armas de elemento ganan dibujo y familia; las dos mejores, además, dejan el estado de su elemento
    D.ELEMENTOS.forEach(function (E) { [1, 2, 3].forEach(function (n) {
      var it = D.ITEMS["arma_" + E.toLowerCase() + "_" + n]; if (!it) return;
      it.ico = "ei_arma_" + ARTE_ELEMENTO[E][n - 1]; it.fam = FAM_ELEMENTO[E]; if (n > 1) it.propio = { k: "proc", v: n === 2 ? 0.06 : 0.12 };
    }); });
    // las armas de oficio valen para cualquier eco
    OFICIO.forEach(function (o, i) {
      var f = o[2], F = M.FAMILIAS[f], pos = cuenta[f] = (cuenta[f] || 0) + 1, nivel = ((pos - 1) % 3) + 1, E = D.ELEMENTOS[i % D.ELEMENTOS.length].toLowerCase();
      var mats = {}; if (nivel === 1) mats["mat_" + E + "_1"] = 6; else if (nivel === 2) { mats["mat_" + E + "_1"] = 6; mats["mat_" + E + "_2"] = 4; } else { mats["mat_" + E + "_2"] = 6; mats["mat_" + E + "_3"] = 3; mats.sello_incursion = 1; }
      var bonus = f === "escudo" ? { def: [0.08, 0.14, 0.22][nivel - 1] } : { atk: Math.round([0.04, 0.09, 0.15][nivel - 1] * F.peso * 1000) / 1000 };
      if (nivel === 3) bonus.hp = 0.05;
      D.ITEMS["of_" + o[0]] = { n: o[1], tipo: "arma", el: null, nivel: nivel, ico: "ei_arma_" + o[0], fam: f, oficio: true, propio: { k: o[3], v: o[4] }, bonus: bonus, receta: { oro: [350, 1000, 2600][nivel - 1], mats: mats } };
    });
    // piezas de arma final y trofeos: dibujos reciclados
    var LEG = { Brasa: ["16", "20", "15"], Marea: ["08", "17", "05"], Bosque: ["06", "25", "21"], Rayo: ["22", "24", "13"], Alba: ["12", "19", "31"], Ocaso: ["18", "26", "29"] };
    var TRO = ["02", "23", "10", "03", "09", "14", "28", "33"];
    D.ELEMENTOS.forEach(function (E) { [1, 2, 3].forEach(function (n) { var m = D.MATS["leg_" + E.toLowerCase() + "_" + n]; if (m && LEG[E]) m.ico = "ei_t_" + LEG[E][n - 1]; }); });
    for (var r = 0; r < 8; r++) if (D.MATS["trofeo_" + r]) D.MATS["trofeo_" + r].ico = "ei_t_" + TRO[r];
  })();
  // ARMAS DE LEYENDA: seis. No se forjan: solo salen del arcón del altar, y solo puede existir una de cada.
  var ARMAS_LEYENDA = {
    tarde_entera:    { n: "Tarde Entera",      fam: "mandoble",    ico: "ei_arma_24", bonus: { atk: 0.24, hp: 0.06 },  mods: { todoChispa: 1 },         txt: "Todos sus golpes hacen chispa, vengan cuando vengan." },
    segunda_estrofa: { n: "Segunda Estrofa",   fam: "instrumento", ico: "ei_arma_33", bonus: { atk: 0.12, hp: 0.12 },  mods: { estrofa: 0.05 },         txt: "Cada vez que ataca, cura un 5 % a todo el grupo y le quita los estados alterados a un compañero." },
    reloj_tumbado:   { n: "Reloj Tumbado",     fam: "vara",        ico: "ei_arma_28", bonus: { atk: 0.14, raf: 0.2, bbIni: 100 }, mods: { gratis: 1 }, txt: "Empieza con la barra de ráfaga llena, y la primera ráfaga del combate no la gasta." },
    el_lapiz:        { n: "El Lápiz",          fam: "daga",        ico: "ei_arma_38", bonus: { atk: 0.2 },             mods: { tacha: 1 },              txt: "Cada golpe suyo tacha al enemigo: todo el grupo le pega un 25 % más durante dos turnos." },
    cerrojo:         { n: "Cerrojo de Dentro", fam: "escudo",      ico: "ei_arma_21", bonus: { def: 0.3, hp: 0.12 },   mods: { cerrojo: 1 },            txt: "Una vez por combate, el golpe que lo mataría lo deja con 1 de vida y nada más le hace daño ese turno." },
    galerna:         { n: "Galerna",           fam: "truco",       ico: "ei_arma_47", bonus: { atk: 0.14 },            mods: { golpes: 2, arco: 1 },    txt: "Da dos golpes más en cada ataque, y cada golpe salta a otro enemigo con la mitad de fuerza." }
  };
  Object.keys(ARMAS_LEYENDA).forEach(function (k) {
    var A = ARMAS_LEYENDA[k];
    D.ITEMS[k] = { n: A.n, tipo: "arma", el: null, nivel: 3, unico: 1, leyenda: A, ico: A.ico, arte: "ico_arm_" + k, fam: A.fam, bonus: A.bonus, receta: { oro: 0, mats: {} } };
  });
  var MEJORAS = {};   // nivel de temple de cada pieza (de la partida cargada)
  M.usarPartida = function (save) { save.mejoras = save.mejoras || {}; MEJORAS = save.mejoras; cuenta(save); };
  M.temple = function (itemId) { return MEJORAS[itemId] || 0; };
  M.costeTemple = function (itemId) {
    var it = D.ITEMS[itemId], n = M.temple(itemId); if (!it || n >= 5) return null;
    var mats = {}, base = Object.keys(it.receta.mats).filter(function (k) { return k.indexOf("mat_") === 0; })[0];
    if (base) mats[base] = 2 + 2 * n; if (n >= 3) mats.sello_incursion = 1;
    return { oro: 250 * it.nivel * (n + 1), mats: mats };
  };
  M.puedeTemplar = function (save, itemId) {
    var c = M.costeTemple(itemId); if (!c || !M.tiene(save, itemId) || save.oro < c.oro) return false;
    return Object.keys(c.mats).every(function (m) { return (save.mats[m] || 0) >= c.mats[m]; });
  };
  M.templar = function (save, itemId) {
    if (!M.puedeTemplar(save, itemId)) return false; var c = M.costeTemple(itemId);
    save.oro -= c.oro; Object.keys(c.mats).forEach(function (m) { save.mats[m] -= c.mats[m]; });
    save.mejoras[itemId] = M.temple(itemId) + 1; MEJORAS = save.mejoras; inc(save, "forjas", 1); return true;
  };
  // Lo que hace el arma por su familia, ya con el temple aplicado.
  function valorTxt(v) { return v < 1 ? Math.round(v * 100) + " %" : String(Math.round(v)); }
  M.efectoArma = function (itemId) {
    var it = D.ITEMS[itemId], F = it && it.fam && M.FAMILIAS[it.fam]; if (!F) return null;
    var tp = 1 + 0.1 * M.temple(itemId), v = F.v[it.nivel - 1] * tp;
    return { k: F.k, v: v, fam: F.n, clase: F.clase, texto: F.d.replace("{v}", valorTxt(v)) };
  };
  // El rasgo propio de un arma: lo que solo hace ella. Los que cuentan golpes no crecen con el temple.
  M.rasgoArma = function (itemId) {
    var it = D.ITEMS[itemId], P = it && it.propio;
    if (it && it.leyenda) return { k: "leyenda", v: 1, texto: it.leyenda.txt, leyenda: true };
    if (!P) return null;
    var v = P.k === "golpes" ? P.v : P.v * (1 + 0.1 * M.temple(itemId)), t = (TXT_RASGO[P.k] || P.k).replace("{v}", valorTxt(v));
    return { k: P.k, v: v, texto: t.charAt(0).toUpperCase() + t.slice(1) + "." };
  };


  // =====================================================================
  // ÁRBOL DE HABILIDADES
  // Cuatro ramas por eco: Cuerpo y Compás (comunes), la de su elemento y la de su ráfaga.
  // Todo son porcentajes: probabilidad, cuánto, o a partir de qué vida. Un punto cada 5 niveles y tres por estrella ganada.
  // Cada rama se corona con una habilidad maestra: pide 6 puntos en la rama y cuesta 2.
  // =====================================================================
  function N(k, n, v, d, ico) { return { k: k, n: n, v: v, max: v.length, d: d, ico: "ei_hb_" + ico }; }
  function esc5(x) { return [x, 2 * x, 3 * x, 4 * x, 5 * x]; }
  var EST_TAL = { Brasa: "quemadura", Marea: "debilidad", Bosque: "veneno", Rayo: "paralisis", Alba: "ceguera", Ocaso: "maldicion" };
  var RAMA_CUERPO = { id: "cuerpo", n: "Cuerpo", lema: "Aguantar es la mitad de ganar.", nodos: [
    N("hp", "Vigor", esc5(0.04), "+{v} de vida.", "030"),
    N("def", "Temple", esc5(0.03), "+{v} de defensa.", "066"),
    N("tenaz", "Tenaz", [0.15, 0.30, 0.45], "{v} de sacudirse un estado alterado nada más recibirlo.", "046"),
    N("aliento2", "Segundo aliento", [0.15, 0.25, 0.35], "Una vez por combate, al bajar del 30 % de vida recupera un {v}.", "008")],
    cap: N("ultima", "Última luz", [1], "Una vez por combate sobrevive a un golpe mortal con un 1 % de vida.", "050") };
  var RAMA_COMPAS = { id: "compas", n: "Compás", lema: "Quien pega a tiempo pega dos veces.", nodos: [
    N("pulso", "Pulso", [0.10, 0.20, 0.30], "Sus chispas pegan un {v} más (de +100 % a +{t}).", "055"),
    N("oido", "Oído fino", [0.15, 0.30, 0.45], "Le vale un margen un {v} mayor para hacer chispa.", "027"),
    N("doble", "Golpe doble", [0.08, 0.16, 0.24], "{v} de que cada golpe se repita a media fuerza.", "019"),
    N("cadencia", "Cadencia", [0.10, 0.20, 0.30], "Cada chispa que saca le da +2 % de daño el resto del combate, hasta un {v}.", "155")],
    cap: N("metronomo", "Metrónomo", [1], "Su primer golpe de cada turno siempre es chispa.", "029") };
  var RAMAS_ELEMENTO = {
    Brasa: { n: "Brasa", lema: "Lo que arde no descansa.", nodos: [
      N("proc", "Ascuas", [0.06, 0.12, 0.18], "{v} de quemar al enemigo con cada golpe.", "086"),
      N("vsEst", "Fragua", [0.10, 0.20, 0.30], "Pega un {v} más a enemigos quemados.", "004"),
      N("atk", "Calor", esc5(0.04), "+{v} de ataque.", "020"),
      N("alMatar", "Rescoldo", [10, 20, 30], "Cuando remata a un enemigo gana {v} de ráfaga.", "063")],
      cap: N("durEst", "Incendio", [2], "Sus quemaduras duran 2 turnos más.", "103") },
    Marea: { n: "Marea", lema: "El mar devuelve lo que se le da.", nodos: [
      N("proc", "Resaca", [0.06, 0.12, 0.18], "{v} de dejar debilidad con cada golpe.", "158"),
      N("robo", "Marea viva", [0.03, 0.06, 0.09], "Se cura un {v} del daño que hace.", "104"),
      N("hp", "Fondo", esc5(0.04), "+{v} de vida.", "070"),
      N("vsEst", "Corriente", [0.10, 0.20, 0.30], "Pega un {v} más a enemigos debilitados.", "092")],
      cap: N("roboGrupo", "Pleamar", [1], "Lo que se cura al golpear llega también, a la mitad, a todo el grupo.", "006") },
    Bosque: { n: "Bosque", lema: "La raíz gana siempre, solo que despacio.", nodos: [
      N("proc", "Espina", [0.06, 0.12, 0.18], "{v} de envenenar con cada golpe.", "059"),
      N("proc2", "Raíces", [0.05, 0.10, 0.15], "{v} de enraizar: al enraizado es más fácil sacarle chispas.", "080"),
      N("def", "Corteza", esc5(0.03), "+{v} de defensa.", "127"),
      N("savia", "Savia", [0.02, 0.04, 0.06], "Recupera un {v} de su vida al final de cada turno.", "099")],
      cap: N("brote", "Rebrote", [1], "Una vez por combate, al caer vuelve a levantarse con un 30 % de vida.", "143") },
    Rayo: { n: "Rayo", lema: "Antes de que te des cuenta.", nodos: [
      N("proc", "Voltaje", [0.04, 0.08, 0.12], "{v} de paralizar con cada golpe (a los jefes los debilita).", "009"),
      N("carga", "Carga estática", [0.10, 0.20, 0.30], "Su barra de ráfaga se llena un {v} más rápido.", "088"),
      N("esquiva", "Reflejos", [0.08, 0.16, 0.24], "{v} de esquivar un golpe.", "031"),
      N("arco", "Arco voltaico", [0.10, 0.20, 0.30], "{v} de que el golpe salte a otro enemigo a media fuerza.", "096")],
      cap: N("bbIni", "Sobrecarga", [50], "Empieza cada combate con 50 de ráfaga.", "098") },
    Alba: { n: "Alba", lema: "Hasta la tarde más larga tiene mañana.", nodos: [
      N("proc", "Deslumbrar", [0.06, 0.12, 0.18], "{v} de cegar con cada golpe.", "058"),
      N("bendicion", "Bendición", [0.10, 0.20, 0.30], "Las curas que recibe le hacen un {v} más.", "005"),
      N("hp", "Fe", esc5(0.04), "+{v} de vida.", "075"),
      N("amanecer", "Amanecer", [1, 2, 3], "Empieza el combate con Defensa + durante {v} turno(s).", "051")],
      cap: N("gracia", "Gracia", [1], "Una vez por combate, cuando cae un compañero lo levanta con un 25 % de vida.", "001") },
    Ocaso: { n: "Ocaso", lema: "La sombra cobra sus deudas.", nodos: [
      N("proc", "Maldecir", [0.06, 0.12, 0.18], "{v} de maldecir con cada golpe: el enemigo no se puede curar.", "061"),
      N("robo", "Sed", [0.03, 0.06, 0.09], "Se cura un {v} del daño que hace.", "052"),
      N("atk", "Filo oscuro", esc5(0.04), "+{v} de ataque.", "097"),
      N("verdugo", "Verdugo", [0.10, 0.20, 0.30], "Pega un {v} más a enemigos por debajo del 30 % de vida.", "120")],
      cap: N("eclipse", "Eclipse", [0.25], "Pega un 25 % más a cualquier enemigo con un estado alterado.", "089") }
  };
  var RAMAS_RAFAGA = {
    uno: { n: "Filo", lema: "Un solo golpe, pero ese.", nodos: [
      N("rafMas", "Filo", esc5(0.06), "Su ráfaga pega un {v} más.", "002"),
      N("rafPerf", "Perforar", [0.10, 0.20, 0.30], "Su ráfaga ignora un {v} de la defensa.", "024"),
      N("ejecutor", "Ejecutor", [0.15, 0.30, 0.45], "Su ráfaga pega un {v} más a enemigos bajo media vida.", "003"),
      N("impetu", "Ímpetu", [10, 20, 30], "Tras lanzar la ráfaga recupera {v} de ráfaga.", "025")],
      cap: N("remateBB", "Golpe de gracia", [60], "Si su ráfaga remata a un enemigo, recupera 60 de ráfaga.", "100") },
    todos: { n: "Tormenta", lema: "Que no quede nadie sin su parte.", nodos: [
      N("rafMas", "Onda larga", esc5(0.06), "Su ráfaga pega un {v} más.", "011"),
      N("estela", "Estela", [4, 8, 12], "Su ráfaga da {v} de ráfaga a cada compañero.", "037"),
      N("replica", "Réplica", [0.10, 0.20, 0.30], "{v} de que cada golpe de la ráfaga pegue un 40 % más.", "026"),
      N("barrida", "Barrida", [0.05, 0.10, 0.15], "Su ráfaga pega un {v} más por cada enemigo en pie además del primero.", "102")],
      cap: N("tormenta", "Ojo de la tormenta", [1], "Su ráfaga deja su estado siempre, y dura un turno más.", "092") },
    cura: { n: "Alivio", lema: "Nadie se queda atrás.", nodos: [
      N("rafMas", "Manos", esc5(0.08), "Su ráfaga cura un {v} más.", "005"),
      N("rocio", "Rocío", [1, 2, 3], "Su ráfaga deja regeneración durante {v} turno(s).", "099"),
      N("consuelo", "Consuelo", [5, 10, 15], "Su ráfaga da {v} de ráfaga a cada compañero.", "103"),
      N("vigilia", "Vigilia", [0.15, 0.30, 0.45], "Cuando un compañero baja del 25 % de vida, {v} de curarle un 15 % al momento.", "006")],
      cap: N("milagro", "Milagro", [1], "Su ráfaga levanta a un compañero caído con un 30 % de vida.", "143") },
    apoyo: { n: "Baluarte", lema: "Detrás de mí.", nodos: [
      N("largo", "Largo aliento", [1, 2], "Los efectos de su ráfaga duran {v} turno(s) más.", "071"),
      N("arenga", "Arenga", [1, 2, 3], "Su ráfaga sube además el ataque del grupo durante {v} turno(s).", "020"),
      N("bbIni", "Reserva", [20, 40, 60], "Empieza cada combate con {v} de ráfaga.", "063"),
      N("autoCura", "Pie firme", [0.08, 0.16, 0.24], "Al lanzar su ráfaga se cura un {v} de su vida.", "008")],
      cap: N("egida", "Égida", [1], "Su ráfaga bloquea por completo el siguiente golpe que reciba cada compañero.", "046") }
  };
  M.ramas = function (id) {
    var h = D.HEROES[id], E = RAMAS_ELEMENTO[h.el], R = RAMAS_RAFAGA[h.bb.tipo];
    return [RAMA_CUERPO, RAMA_COMPAS,
      { id: "elemento", n: E.n, lema: E.lema, nodos: E.nodos, cap: E.cap, el: h.el },
      { id: "rafaga", n: R.n, lema: R.lema, nodos: R.nodos, cap: R.cap }];
  };
  function clave(rama, nodo, esCap) { return rama.id + "." + (esCap ? "cap" : nodo.k); }
  M.claveTalento = clave;
  M.rangoTalento = function (u, rama, nodo, esCap) { return (u.tal || {})[clave(rama, nodo, esCap)] || 0; };
  M.puntosTalento = function (id, u) {
    var total = Math.floor(u.lv / 5) + 3 * (M.estrellas(id, u) - 2), usados = 0, t = u.tal || {};
    Object.keys(t).forEach(function (k) { usados += k.slice(-4) === ".cap" ? 2 * t[k] : t[k]; });
    return { total: total, usados: usados, libres: total - usados };
  };
  M.puntosEnRama = function (u, rama) { var s = 0, t = u.tal || {}; rama.nodos.forEach(function (n) { s += t[clave(rama, n)] || 0; }); return s; };
  M.puedeTalento = function (id, u, rama, nodo, esCap) {
    var p = M.puntosTalento(id, u), r = M.rangoTalento(u, rama, nodo, esCap);
    if (esCap) return r < 1 && p.libres >= 2 && M.puntosEnRama(u, rama) >= 6;
    return r < nodo.max && p.libres >= 1;
  };
  M.subirTalento = function (save, id, ramaId, k) {
    var u = save.unidades[id], rama = M.ramas(id).filter(function (x) { return x.id === ramaId; })[0]; if (!u || !rama) return false;
    var esCap = k === "cap", nodo = esCap ? rama.cap : rama.nodos.filter(function (n) { return n.k === k; })[0];
    if (!nodo || !M.puedeTalento(id, u, rama, nodo, esCap)) return false;
    u.tal = u.tal || {}; var c = clave(rama, nodo, esCap); u.tal[c] = (u.tal[c] || 0) + 1; return true;
  };
  M.costeOlvidar = function (id, u) { return 150 * M.puntosTalento(id, u).usados; };
  M.olvidarTalentos = function (save, id) {
    var u = save.unidades[id], c = M.costeOlvidar(id, u); if (!c || save.oro < c) return false;
    save.oro -= c; u.tal = {}; return true;
  };
  // Reparte los puntos libres con criterio sencillo (lo usa el botón «Repartir por mí» y la simulación).
  M.autoTalentos = function (save, id) {
    var u = save.unidades[id], hecho = 0, vueltas = 0;
    while (M.puntosTalento(id, u).libres > 0 && vueltas++ < 80) {
      var ramas = M.ramas(id), orden = [ramas[3], ramas[2], ramas[1], ramas[0]], ok = false;
      for (var i = 0; i < orden.length && !ok; i++) { var R = orden[i];
        if (M.puedeTalento(id, u, R, R.cap, true)) { ok = M.subirTalento(save, id, R.id, "cap"); break; }
        if (M.puntosEnRama(u, R) >= 6 && i < orden.length - 1 && M.rangoTalento(u, R, R.cap, true)) continue;
        for (var j = 0; j < R.nodos.length && !ok; j++) if (M.puedeTalento(id, u, R, R.nodos[j]) && M.puntosEnRama(u, R) < 6 + (M.rangoTalento(u, R, R.cap, true) ? 99 : 0)) ok = M.subirTalento(save, id, R.id, R.nodos[j].k);
      }
      if (!ok) break; hecho++;
    }
    return hecho;
  };
  // Valor que tiene (o tendría) un nodo a cierto rango, ya como texto.
  M.textoNodo = function (nodo, rango) {
    var v = nodo.v[Math.max(0, Math.min(nodo.max, rango) - 1)], pc = v < 1;
    return nodo.d.replace("{v}", pc ? Math.round(v * 100) + " %" : String(v)).replace("{t}", Math.round((M.BONO_CHISPA - 1 + v) * 100) + " %");
  };
  // Suma de todo lo que modifican las habilidades y el arma de un eco.
  M.mods = function (id, u) {
    var m = {}, t = u.tal || {};
    function suma(k, v) { m[k] = (m[k] || 0) + v; }
    M.ramas(id).forEach(function (R) {
      R.nodos.forEach(function (n) { var r = t[clave(R, n)] || 0; if (r) suma(n.k, n.v[r - 1]); });
      if (t[clave(R, R.cap, true)]) suma(R.cap.k, R.cap.v[0]);
    });
    if (u.arma) { var ef = M.efectoArma(u.arma); if (ef) suma(ef.k, ef.v); var rs = M.rasgoArma(u.arma); if (rs && !rs.leyenda) suma(rs.k, rs.v); var L = D.ITEMS[u.arma] && D.ITEMS[u.arma].leyenda; if (L) for (var kl in L.mods) suma(kl, L.mods[kl]); }
    return m;
  };

  // =====================================================================
  // MUNDO VIVO: vecinos de la plaza y bestiario
  // =====================================================================
  // Cada región que sueltas trae a alguien a la plaza. Lo que dicen cambia según avanzas.
  M.regionesHechas = function (save) { var n = 0; for (var r = 0; r < 8; r++) if (save.hechas[M.clave(r, 4, 4)]) n++; else break; return n; };
  var ODILA = [
    "Empieza por las colinas. Y no corras: llevan treinta años esperando, no les va de una tarde.",
    "Brina ha traído pan. No le digas que está quemado: es que es así.",
    "Hulda pasa lista en mi plaza. Le he dicho que aquí no hay turno de noche. Me ha mirado como si le hablara de dragones.",
    "Con cada región que sueltas, la plaza hace más ruido. Se me había olvidado cómo sonaba la gente.",
    "Un rayo que por fin cae. Treinta años, y todavía me sobresalta que las cosas terminen.",
    "Don Tramoya quiere montar una función aquí. Le he dicho que sí, con una condición: que acabe.",
    "Ya llueve en el monasterio. Tendré que buscar dónde guardé el paraguas. Y por qué lo guardé.",
    "Las salinas tenían mi letra en más fichas de las que me gustaría. Pregunta lo que quieras, chico. Ya no escondo el cajón.",
    "Estabas de turno. Eso es todo lo que hizo falta. Siéntate un rato, anda."];
  // Cada vecino tiene tres cosas: lo que dice (cambia con el avance), un regalo al día y un encargo propio que abre un combate con su trozo de historia.
  var EXPRV = { "-": "triste", "+": "alegre", "!": "enfadado", "?": "sorprendido", "*": "decidido" };
  function guion(s) { return s.split("|").map(function (x) { var m = /^(e:[a-z_]+|[a-z]+)([-+!?*]?):(.*)$/.exec(x); return { q: m[1], e: EXPRV[m[2]] || "neutral", t: m[3] }; }); }
  D.NOMBRES.nuno = "Nuño";
  M.VECINOS = [
    { id: "brina", r: 0, regalo: ["pocion", 2, "Pan de hoy. Quemado, que es como sale."],
      l: [[0, "He cerrado la casa de las colinas. Tomé ya merendó. Ahora el pan sobra, así que lo traigo aquí."], [3, "Le he dado pan al contramaestre. Dice que sabe a tierra firme. No sé si es un cumplido."], [9, "Hoy el pan me ha salido sin quemar. A ver si me acostumbro."]],
      mis: { pide: 1, zona: 2, n: "La casa del pozo", d: "Brina quiere que alguien suba a la casa de Dalia antes de que el monte se la quede.",
        a: "brina:La casa del pozo sigue en pie. Subid antes de que el brezo le tape la puerta.|dalia:No hace falta, Brina.|brina:Hace. Una casa cerrada treinta años guarda cosas que su dueña ya no.",
        c: "narrador:Dentro, la mesa está puesta. Dos platos.|kael:¿Vivías con alguien?|dalia-:No lo sé.|dalia:Me sé los nombres de todo el monte. Y no sé para quién era ese plato.|brina-:Yo sí, hija. Pero no me toca a mí decírtelo." } },
    { id: "hulda", r: 1, regalo: ["oro", 300, "El jornal. Aquí se paga al que baja."],
      l: [[0, "He pasado lista en la plaza, por costumbre. Sesenta y uno, y por primera vez no ha contestado ninguno. Ya era hora."], [4, "Aquí no hay turnos. Me siento a esta hora y me levanto a esta hora. Es lo que tiene que siempre sea la misma."], [9, "En mi lista sigue faltando uno. Pero ya sé dónde está, y no pienso tacharlo."]],
      mis: { pide: 2, zona: 0, n: "El número sesenta y dos", d: "En la bocamina sigue colgada una chapa. Hulda quiere que la recoja su dueño.",
        a: "hulda:En el tablero queda una chapa. La sesenta y dos. No la he tocado en treinta años.|kael:¿Por qué?|hulda:Porque las chapas las recoge el que sale. Baja a por la tuya.",
        c: "narrador:La chapa está caliente. Detrás, alguien ha ido rascando una raya por cada año.|kael:Treinta rayas.|hulda:Y treinta jornales en un sobre, chico. No se le deja de pagar a uno que sigue en el turno.|kael-:Capataz…|hulda:Firma aquí. Recibí conforme." } },
    { id: "peio", r: 2, regalo: ["remedio", 1, "Para el mareo de tierra. A mí me va bien."],
      l: [[0, "El barco se fue al fondo como tiene que irse un barco: de una vez. Yo me he quedado en tierra, a ver qué es eso de no obedecer a nadie."], [6, "El abad dice que su lluvia no caía. Le he dicho que la nuestra no paraba. Nos hemos reído poco, pero nos hemos reído."], [9, "Si esto es mar en calma, yo no lo conocía. Me gusta."]],
      mis: { pide: 3, zona: 1, n: "El cuaderno de bitácora", d: "El cuaderno del barco quedó en el naufragio. Peio quiere saber qué apuntó la capitana aquella noche.",
        a: "peio:El cuaderno de bitácora se quedó en el puente. La capitana apuntaba hasta los estornudos.|sirel!:¡Peio! Eso es privado.|peio:Capitana, llevamos treinta años hundidos. Privado ya no queda nada.",
        c: "narrador:La última página está seca. Una sola línea, con letra de prisa.|peio:«La pasajera no ha dormido. Ha preguntado tres veces si desde el mar se ve la catedral.»|sirel-:Le dije que sí. Que se veía.|sirel:No era verdad. Pero no me lo preguntaba a mí." } },
    { id: "calixta", r: 3, regalo: ["bono", 150, "Lecturas del taller. Algo se aprende."],
      l: [[0, "Chispa se ha traído medio taller a cuestas. Si oís un zumbido en el almacén, es él dándose cuerda."], [6, "Le estoy haciendo un reloj a la plaza. No sé a qué hora ponerlo, así que de momento solo hace tic."], [9, "El reloj de la plaza ya hace tac. Mi abuela decía que lo difícil era el tac."]],
      mis: { pide: 4, zona: 4, n: "La silla de la abuela", d: "La silla sigue al pie de la torre. Calixta quiere bajarla a la plaza.",
        a: "calixta:La silla de mi abuela sigue al pie de la torre. No quiero que se quede sola ahí arriba.|chispa:Tic. Peso de la silla: poco. Peso de subir a por ella: mucho. Tic.|calixta:Por eso vienes tú.",
        c: "narrador:Debajo del asiento hay algo grabado a navaja.|calixta?:«Vi a dos mujeres bajo la torre. Una lloraba. La otra apretaba un lápiz.»|vesper:Tu abuela lo vio todo.|calixta-:Y no se lo contó a nadie. Se sentó a esperar a que alguien preguntara." } },
    { id: "tramoya", r: 4, regalo: ["gemas", 2, "Dos entradas de cortesía. No se revenden."],
      l: [[0, "¡Público fijo! Señoras, señores: en esta plaza se sienta uno y nadie le obliga a quedarse. Qué novedad."], [7, "He guardado la butaca de la fila uno. Por si alguien llega tarde. En el teatro siempre llega alguien tarde."], [9, "Bajó el telón. ¿Saben lo mejor de un telón? Que mañana se puede volver a subir. Mañana. Qué palabra."]],
      mis: { pide: 5, zona: 1, n: "La fila uno", d: "Hay que desmontar la butaca reservada antes de que la feria se vaya. Tramoya no se atreve solo.",
        a: "tramoya:Señoras, señores: hay que desmontar la fila uno. Y yo esa butaca no la toco solo.|matias:Es una butaca, don Tramoya.|tramoya:Es una butaca en la que no se ha sentado nadie en treinta años. Eso ya no es una butaca.",
        c: "narrador:Debajo del asiento, sujeto con una chincheta, hay un dibujo de niño: un sol con cara, entero.|matias:Lleva una letra por detrás. «Para que sepas cómo era.»|tramoya-:La señora no reservó para que el chico viera la función.|tramoya:Reservó para enseñarle un sol." } },
    { id: "benet", r: 5, regalo: ["ascua", 1, "Un cabo de vela del altar. Enciende lo que haga falta."],
      l: [[0, "Los hermanos se fueron mojados y contentos. Yo he bajado a secarme. Tardaré: son treinta años de gotas."], [7, "Ya no rezo con prisa. Pido las cosas enteras o no las pido."], [9, "Toqué a difuntos por todos. Luego toqué a fiesta, que también me la sé."]],
      mis: { pide: 7, zona: 0, n: "La carta de la gota", d: "Al caer la lluvia cayó también la carta que llevaba treinta años dentro de una gota. Benet no quiere leerla solo.",
        a: "benet:La carta de la gota ha caído con la lluvia. Está en la escalinata, mojada.|kael:¿Y no la ha leído?|benet:No es mía, hijo. Pero me parece que sé de quién es. Y me parece que tú también.",
        c: "narrador:La tinta se ha corrido. Solo se salvan dos líneas.|kael:«Kael: gracias.»|kael-:«No sé escribir lo demás.»|odila-:Treinta años de archivera y no supe pasar de la primera línea.|kael:Maestra. Con la primera ya llegaba." } },
    { id: "ulmo", r: 6, regalo: ["fragmento", 1, "Un nombre que he encontrado suelto. Guárdalo tú."],
      l: [[0, "He traído los libros. Leo un nombre en voz alta cada tarde, sin correr. A este paso acabo dentro de mucho, y me parece bien."], [8, "He apuntado el tuyo con su apellido, chico. Arrén. Queda bonito en tinta."], [9, "Hoy he apuntado una fecha nueva. Hacía treinta años que escribía siempre la misma."]],
      mis: { pide: 8, zona: 2, n: "El nombre que sobra", d: "En el archivo de sal hay un nombre apuntado que no tiene emblema ni baja. Ulmo no sabe dónde ponerlo.",
        a: "ulmo:Me sobra un nombre. Está apuntado con buena letra y no tiene emblema, ni baja, ni nada.|sepia:En mi mapa tampoco está. Y en mi mapa está todo el mundo.|ulmo:Por eso me preocupa.",
        c: "ulmo:Aquí. «Arrén, Ilda. Escolta. Sin baja.»|kael?:Arrén.|odila:…|kael:Maestra. Usted la conocía.|odila-:Sin baja quiere decir que nadie la vio morir, Kael. No quiere decir más.|kael*:Ni menos." } }
  ];
  var NUNO = ["No he visto la noche nunca. Me han dicho que es como cerrar los ojos, pero con todo el mundo a la vez.", "Enciendo los faroles igual. Por si acaso un día hacen falta.", "Si amanece, ¿hay que apagarlos? Nadie me lo ha explicado."];
  M.vecinos = function (save) {
    cuenta(save); var n = M.regionesHechas(save), fin = save.final ? 9 : n, reg = save.diario.regalos = save.diario.regalos || {};
    var L = [{ id: "odila", texto: ODILA[Math.min(8, n)], clave: "vec-odila-" + Math.min(8, n) }];
    M.VECINOS.forEach(function (v) {
      if (n <= v.r) return; var k = 0;
      v.l.forEach(function (x, i) { if (fin >= x[0]) k = i; });
      var hecha = !!save.hechas["S:vec:" + v.id];
      L.push({ id: v.id, texto: v.l[k][1], clave: "vec-" + v.id + "-" + k, regalo: v.regalo, regalado: !!reg[v.id],
        mis: { n: v.mis.n, d: v.mis.d, pide: v.mis.pide, abierta: n >= v.mis.pide, hecha: hecha } });
    });
    if (((save.stats || {}).victorias || 0) >= 25) L.push({ id: "nuno", texto: NUNO[Math.min(2, Math.floor(n / 3))], clave: "vec-nuno-" + Math.min(2, Math.floor(n / 3)), regalo: ["oro", 200, "Lo que sobra del aceite de los faroles."], regalado: !!reg.nuno, nota: "Llegó al verte ganar 25 combates." });
    L.forEach(function (v) { v.aviso = (v.regalo && !v.regalado) || (v.mis && v.mis.abierta && !v.mis.hecha); });
    return L;
  };
  M.regaloVecino = function (save, id) {
    var v = M.vecinos(save).filter(function (x) { return x.id === id; })[0]; if (!v || !v.regalo || v.regalado) return null;
    var t = v.regalo[0], c = v.regalo[1], esc = 1 + M.regionesHechas(save);
    if (t === "oro") { c *= esc; save.oro += c; } else if (t === "gemas") save.gemas += c; else if (t === "bono") { c *= esc; save.xpBanco = (save.xpBanco || 0) + c; }
    else if (t === "fragmento") save.fragmentos += c; else M.darObjeto(save, t, c);
    save.diario.regalos[id] = 1; return { tipo: t, cant: c, texto: v.regalo[2] };
  };
  // RECUERDOS: cada eco guarda uno. Se abre cuando el eco llega al nivel 15 (los de la historia piden además haber llegado a su capítulo).
  // Es un combate a su nivel, con lo que se dice antes y después. Recuperarlo le da un 5 % más de vida, ataque y defensa para siempre.
  M.NIVEL_RECUERDO = 15;
  M.recuerdo = function (save, id) {
    var mm = D.MEMORIAS && D.MEMORIAS[id], u = save.unidades[id]; if (!mm || !u) return null;
    var hecho = !!save.hechas["S:rec:" + id], falta = null;
    if (u.lv < M.NIVEL_RECUERDO) falta = "Se abre cuando llegue al nivel " + M.NIVEL_RECUERDO + ".";
    else if (M.regionesHechas(save) < mm.pide) falta = "Todavía no se acuerda. Sigue con la historia: " + D.ZONAS[mm.pide - 1].n + ".";
    return { id: id, n: mm.n, hecho: hecho, abierto: !falta, falta: falta, apertura: guion(mm.a), cierre: guion(mm.c) };
  };
  M.recuerdosHechos = function (save) { return Object.keys(save.hechas).filter(function (k) { return k.indexOf("S:rec:") === 0; }).length; };
  M.faseRecuerdo = function (id, save) {
    var mm = D.MEMORIAS[id], zona = D.ZONAS[mm.r], c = zona.comunes, u = (save && save.unidades[id]) || { lv: M.NIVEL_RECUERDO };
    var lvl = Math.max(3, u.lv - 5), ge = Math.round((lvl - 1) / M.CFG.nivPorFase);   // un recuerdo no es un muro: va algo por debajo de su nivel y sin la subida de fuerza del final del juego
    function mk(idE, extra) { var o = { id: idE, lvl: lvl, g: 99, ge: 0, trucos: 1, t: 0, mhp: 0.8 }; for (var k in extra) o[k] = extra[k]; return o; }
    return { r: mm.r, a: 2, f: 2, t: 0, g: M.indice(mm.r, 2, 2), ge: ge, nombre: mm.n, lvl: lvl, olas: [[mk(c[2], { arq: 2, pos: 0 }), mk(c[5], { arq: 5, pos: 1 })], [mk(c[0], { arq: 0, pos: 0 }), mk(c[3], { arq: 3, pos: 1 })]],
      jefe: false, granJefe: false, trucos: 1, secreta: "rec:" + id, recuerdo: id, limite: 0, apertura: guion(mm.a), cierre: guion(mm.c) };
  };
  // EVENTO «El libro de otro mundo»: cinco zonas de cinco combates. Al completar cada zona se une un eco secreto.
  // Es una colaboración con Elden Ivalice y queda fuera del canon de Auria: nada de lo que pasa aquí toca la historia del sol parado.
  M.EVENTO = { id: "otro_mundo", n: "El libro de otro mundo", sub: "Colaboración · Elden Ivalice", pide: 1,
    d: "En el archivo ha aparecido un libro que no es de aquí. Quien lo abre, cruza. Al otro lado hay dos hermanos que buscan el camino a casa y un clan que cobra por encontrarlos antes.",
    zonas: [
      { n: "El barranco",        eco: "tam",    lvl: 7, fondo: "map_ev_1", com: ["ev_contrabandista", "ev_lancero", "ev_soldado"] },
      { n: "El lavadero",        eco: "hollis", lvl: 16, fondo: "map_ev_2", com: ["ev_soldado", "ev_soldada", "ev_ballestera"] },
      { n: "La mina del clan",   eco: "llum",   lvl: 25, fondo: "map_ev_3", com: ["ev_lancero", "ev_contrabandista", "ev_soldada"] },
      { n: "La plaza del tablón", eco: "ulric", lvl: 34, fondo: "map_ev_4", com: ["ev_ballestera", "ev_soldado", "ev_lancero"] },
      { n: "Las ruinas",         eco: "eren",   lvl: 44, fondo: "map_ev_5", com: ["ev_soldada", "ev_ballestera", "ev_contrabandista"] }
    ] };
  var EV_FASES = ["Primer paso", "Rastro", "Emboscada", "Lo que guardan", "Quien manda aquí"];
  var EV_GUION = {
    "0-0": { a: "narrador:El libro se abre solo por una página en blanco. Al otro lado huele a polvo y a tomillo.|kael:Esto no es Auria.|dalia:Aquí el sol se mueve. Míralo.|tam+:¿Sois de los del libro? Menos mal. Corred, que vienen cobrando." },
    "0-4": { c: "tam:Los buscan a los dos. Un chico y una chica, con ropa rara. Dan cien por cada uno.|kael:¿Y tú por qué no cobras?|tam-:Porque el chico me dio su pan sin preguntarme nada. Eso no se vende.|tam+:Os llevo. Me sé todos los atajos y casi todos los tejados." },
    "1-0": { a: "narrador:Junto al arroyo, un viejo llena una jarra. Lleva hombreras de soldado y ninguna prisa.|hollis:Si venís a alistarme, llegáis treinta años tarde.|tam:Es Hollis. No obedece a nadie. Es lo mejor que tiene." },
    "1-4": { c: "hollis-:Me pasé la vida cumpliendo órdenes bien dadas para cosas mal pensadas.|dalia:¿Y ahora?|hollis:Ahora hay dos críos perdidos y un clan con contrato. Para eso no hace falta orden.|hollis+:Llevo la jarra. No se discute." },
    "2-0": { a: "tam:La chica está abajo. La tienen copiando un libro: dicen que solo ella sabe leerlo.|kael:¿Presa?|tam:Ellos lo llaman «contrato de servicios».|hollis:He firmado unos cuantos de esos. Se sale igual: por la puerta." },
    "2-4": { c: "llum:¿Venís de otro libro? Qué alivio. Pensaba que éramos los únicos que se habían caído en uno.|dalia:¿Estás bien?|llum:Yo sí. Mi hermano no para: ve a alguien en apuros y va. No lo piensa.|kael:Me suena.|llum+:Entonces sabéis dónde buscarlo: donde haya más lío." },
    "3-0": { a: "narrador:En la plaza, un hombre con capa lee el tablón de encargos sin ganas.|ulric:«Dos lectores, vivos. Paga el clan Venn.» Me faltan tres encargos para acabar el servicio y me toca este.|llum:¿Y lo vas a cobrar?|ulric-:Estoy decidiendo cuánto me importa." },
    "3-4": { c: "ulric:He contado. Veintiséis años, once de servicio y ni una sola cosa de la que presumir.|ulric:Entregar a dos críos no me iba a arreglar la cuenta.|hollis:Bienvenido al retiro, chaval.|ulric+:No me llames chaval. Y sé por dónde sube Venn a las ruinas." },
    "4-0": { a: "narrador:En lo alto de las ruinas, un chico con una capa roja sujeta una puerta. Detrás hay gente del pueblo.|eren:¡Llum! ¡No subas, que son muchos!|llum:¡He traído a otros muchos!|e:dalric_venn:Qué escena. Lástima que yo cobre por lector entregado y no por lágrima." },
    "4-4": { c: "e:dalric_venn-:Contrato incumplido. Voy a tener que devolver el anticipo.|eren:Podías no haberlo firmado.|e:dalric_venn:Chico, todo el mundo necesita una razón para hacer las cosas. La mía pagaba bien.|eren+:Yo no. Si alguien necesita ayuda, voy. No hay más.|llum:Ya os lo dije.|kael:La página de vuelta sigue abierta. ¿Volvéis a casa?|eren:Aún no. Aquí queda gente con contratos. Pero si os hace falta una mano al otro lado… llamadnos." }
  };
  M.eventoAbierto = function (save) { return M.regionesHechas(save) >= M.EVENTO.pide; };
  M.eventoHecha = function (save, z, f) { return !!save.hechas["S:ev:" + z + ":" + f]; };
  M.eventoZona = function (save, z) {
    var Z = M.EVENTO.zonas[z], hechas = 0; for (var f = 0; f < 5; f++) if (M.eventoHecha(save, z, f)) hechas++;
    var abierta = M.eventoAbierto(save) && (z === 0 || M.eventoZona(save, z - 1).completa);
    return { z: z, n: Z.n, eco: Z.eco, lvl: Z.lvl, fondo: Z.fondo, hechas: hechas, completa: hechas >= 5, abierta: abierta, siguiente: Math.min(4, hechas), fases: EV_FASES };
  };
  M.eventoResumen = function (save) { var zs = M.EVENTO.zonas.map(function (_, z) { return M.eventoZona(save, z); }); return { zonas: zs, hechas: zs.reduce(function (s, x) { return s + x.hechas; }, 0), ecos: zs.filter(function (x) { return x.completa; }).length }; };
  M.faseEvento = function (z, f) {
    var Z = M.EVENTO.zonas[z], lvl = Z.lvl + Math.round(f * 1.5), ge = Math.round((lvl - 1) / M.CFG.nivPorFase), c = Z.com, tr = Math.min(3, z), G = EV_GUION[z + "-" + f] || {};
    function mk(idE, extra) { var o = { id: idE, lvl: lvl, g: 99, ge: Math.min(ge, 60 + z * 10), trucos: tr, t: 0, mhp: z >= 3 ? 0.75 : 1 }; for (var k in extra) o[k] = extra[k]; return o; }
    var olas = [[mk(c[0], { arq: (z + f) % 8, pos: 0 }), mk(c[1], { arq: (z + f + 3) % 8, pos: 1 })], [mk(c[1], { arq: (f + 5) % 8, pos: 0 }), mk(c[2], { arq: (z + 2) % 8, pos: 1 }), mk(c[0], { arq: (f + 1) % 8, pos: 2 })]];
    if (f === 4) olas.push(z === 4 ? [mk("dalric_venn", { pos: 0 }), mk("ev_ballestera", { arq: 5, pos: 1 }), mk("ev_soldado", { arq: 0, pos: 2 })] : [mk("ev_capitan", { pos: 0 }), mk(c[2], { arq: 4, pos: 1 })]);
    else if (f >= 2) olas.push([mk(c[2], { arq: (z + f + 6) % 8, pos: 0 }), mk(c[0], { arq: (f + 2) % 8, pos: 1 }), mk(c[1], { arq: 7, pos: 2 })]);
    return { r: Math.min(7, z + 1), a: 2, f: f, t: 0, g: M.indice(Math.min(7, z + 1), 2, f), ge: ge, nombre: Z.n + " · " + EV_FASES[f], lvl: lvl, olas: olas,
      jefe: f === 4, granJefe: f === 4 && z === 4, trucos: tr, secreta: "ev:" + z + ":" + f, evento: { z: z, f: f, eco: Z.eco }, fondo: Z.fondo, limite: 0,
      apertura: G.a ? guion(G.a) : null, cierre: G.c ? guion(G.c) : null };
  };
  M.faseVecino = function (id) {
    var v = M.VECINOS.filter(function (x) { return x.id === id; })[0], zona = D.ZONAS[v.r], a = v.mis.zona, g = M.indice(v.r, 4, 4), ge = g + 8, lvl = 1 + Math.round(ge * M.CFG.nivPorFase), c = zona.comunes;
    function mk(idE, extra) { var o = { id: idE, lvl: lvl, g: 99, ge: ge, trucos: 1, t: 0 }; for (var k in extra) o[k] = extra[k]; return o; }
    return { r: v.r, a: a, f: 4, t: 0, g: g, ge: ge, nombre: v.mis.n, lvl: lvl, olas: [[mk(c[1], { arq: 1, pos: 0 }), mk(c[4], { arq: 4, pos: 1 }), mk(c[6], { arq: 6, pos: 2 })], [mk(zona.subjefes[a % 2], { pos: 0 }), mk(c[3], { arq: 3, pos: 1 })]],
      jefe: true, granJefe: false, trucos: 1, secreta: "vec:" + id, vecino: id, limite: 0, apertura: guion(v.mis.a), cierre: guion(v.mis.c) };
  };
  // Bestiario: cuántas veces has vencido a cada criatura.
  function anotarBestias(save, F) { save.bestia = save.bestia || {}; F.olas.forEach(function (o) { o.forEach(function (e) { save.bestia[e.id] = (save.bestia[e.id] || 0) + 1; }); }); }
  // Quién era cada criatura antes de la noche del eclipse. Se recuerda al vencerla tres veces (a los jefes, una).
  M.QUIEN = { "bulbo": "Un huerto entero que nadie volvió a regar. Cada bulbo guarda el nombre de quien lo plantó.", "jabali": "El perro de un cazador. Lo esperó en el mismo claro hasta que le creció el musgo.", "hada_avispa": "Una niña que perseguía avispas con un bote. Sigue jugando; solo ha cambiado de tamaño.", "seta_saltarina": "Un buhonero que se sentó a descansar bajo un roble «solo un rato».", "espantapajaros": "Tasio, jornalero. Le mandaron vigilar el trigo hasta la siega. La siega no llegó.", "cuervo_brezo": "El cartero de las colinas. Aún lleva cartas en el pico; no recuerda para quién.", "oveja_zarza": "El rebaño de Marga. Ninguna se ha ido: esperan a que alguien las cuente.", "tocon": "Un leñador que dejó el hacha clavada «para mañana».", "pastora_zarzas": "Marga, pastora. Salió a por una oveja que faltaba y no quiso volver con una de menos.", "ciervo_florido": "Tomé, el marido de Brina. Salió a merendar al monte y se le hizo de tarde para siempre.", "roble_andante": "Roque, guardabosques y maestro de Fenn. Se sentó a esperar a que su aprendiz volviera.", "diablillo": "Chispas de un horno que nadie apagó. Son obra de la mina, no de nadie… o de todos.", "salamandra": "Las lagartijas que los mineros alimentaban con migas. Hermanas pequeñas de Miga.", "minero_escoria": "Un minero de un turno muy anterior. Sigue picando: nadie le dijo que había acabado.", "murcielago_ceniza": "Los canarios de la mina. Cuando dejó de haber aire limpio, aprendieron a vivir sin él.", "vagoneta": "Una mula de carga. Hizo tantas veces el mismo camino que acabó siendo el camino.", "gusano_carbon": "Un barrenero que abría galerías. Sigue abriéndolas, ya sin herramientas.", "farol_errante": "El farolero de la bocamina. Baja a encender luces que ya no están.", "capataz": "El capataz anterior a Hulda. Pasaba lista sin mirar a nadie a la cara. Así se quedó.", "golem_vagonetas": "Seis vagonetas que un mozo no llegó a descargar. Las apiló el tiempo.", "la_compuerta": "No fue nadie: es la puerta que Brakk forjó. Guarda lo último que le mandaron guardar.", "wyrm_fundicion": "Miga, una lagartija. Treinta años comiendo de un horno que no se apaga.", "cangrejo": "Un calafate. Tapaba grietas en los cascos; ahora lleva el casco puesto.", "medusa": "El farol de un pesquero que se fue al agua encendido.", "sirenido": "Un grumete que quería ser pirata. Lo es, a su manera.", "gaviota_tormenta": "Las gaviotas del puerto, clavadas en el aire a medio grito.", "percebe": "Un mariscador que se agarró a la roca cuando vino la ola. No se ha soltado.", "ancla_fantasma": "El ancla de un barco que zarpó sin ella. Sigue buscando fondo.", "pulpo_tintorero": "El escribiente del puerto. Apuntaba las mareas; se le acabó el papel, no la tinta.", "marinero_ahogado": "Uno de los tres que saltaron por la borda. No cayó al agua: se quedó en el aire.", "mascaron": "La talla de la hija del carpintero de ribera. Él le puso su cara; ella se quedó contando.", "kraken_sogas": "Las sogas de la bodega. Les mandaron guardar un cofre y no han aflojado un nudo.", "leviatan": "La galerna entera de aquella noche, con un ojo en medio. Dice nombres; no es de nadie.", "chispa_errante": "Lo que sobra de un rayo que lleva treinta años a punto de caer.", "veleta": "El veletero de la meseta. Subió a engrasar una y el viento ya no cambió.", "cuervo_cobre": "Juguetes de cuerda del taller. Alguien les dio cuerda de más.", "automata_oxidado": "El primer ayudante del taller grande. Sigue esperando la siguiente orden.", "oveja_nube": "El rebaño de la abuela de Calixta. Les subió la tormenta a la lana.", "engranaje": "Una pieza del molino que se soltó. Rueda buscando dónde encajaba.", "aprendiz_bobina": "Un aprendiz del taller que se quedó «a terminar una cosa».", "cometa_dientes": "La cometa de un niño. Él soltó el hilo; ella no.", "molino_desbocado": "El molino del pueblo. Lleva treinta años moliendo la misma tarde.", "gemelos_pararrayos": "Pol y Nela, aprendices de Seren. Doce años. Les dijeron: «sujetad un momento».", "coloso_bobinas": "La máquina que sujeta el rayo. La hizo Seren para que no tuvieran que sujetarlo dos.", "titere": "Los títeres del teatrillo. El titiritero se fue a cenar y dejó la función a medias.", "payaso_serrin": "Un payaso al que nadie le rio el último chiste. Lo sigue contando.", "tragafuegos": "El tragafuegos de la feria. Tomó aire para el número final y no lo ha soltado.", "caballito": "Los caballos del tiovivo. Miran todos al este, hacia la catedral.", "oso_trapo": "El oso de trapo de un niño enfermo. Baila para que no se le haga larga la espera.", "mono_organillero": "El mono del organillero. La canción se le quedó en la última vuelta.", "espejo_deformante": "Los espejos de la barraca. Devuelven a la gente como era aquella noche.", "funambulista": "La funambulista. Iba por la mitad del cable cuando el sol se paró.", "forzudo": "El forzudo. Cree que sostiene la carpa. La carpa se sostiene sola; nadie se lo ha dicho.", "adivina": "La adivina. Desde aquella noche solo acierta cosas que ya han pasado. A Kael le leyó la mano.", "maestro_pista": "El Maestro de Pista. No puede anunciar el final: lo tienen atado con nudos de madre.", "gota_centinela": "Lluvia que no llegó al suelo. Cada gota es una petición a medio rezar.", "monje_piedra": "Un hermano que hizo voto de no moverse hasta que lloviera.", "carpa_voladora": "Las carpas del estanque. Con el agua colgada en el aire, aprendieron a nadar en ella.", "farol_papel": "Faroles de difuntos que nadie pudo soltar: la campana estaba hundida.", "cabra_niebla": "Las cabras del monasterio. Subieron a la niebla y no encuentran la bajada.", "campanilla_viva": "Las campanillas del refectorio. Llaman a una cena que lleva treinta años servida.", "escriba_tinta": "Un copista. Se le mojó la página que copiaba y no supo cómo seguía.", "grulla_papel": "Mil grullas de papel de un novicio. Le faltaba una para pedir el deseo.", "hortelano_nubes": "El hermano Lluc. Cultiva nubes en bancales y espera a poder regar.", "dragon_canalon": "El canalón del claustro. Treinta años atascado con agua que no baja.", "campana_ahogada": "La campana de difuntos. Seren la hundió para que nadie tocara por los suyos.", "escorpion_sal": "Un sellador de fichas. Sigue poniendo el sello; ya no mira en qué.", "buitre_notario": "Un notario. Da fe de todo lo que pasa, y aquí hace treinta años que no pasa nada.", "estatua_sal": "Alguien que se volvió a mirar atrás. Hay muchos. Ulmo intenta apuntarlos a todos.", "caravanero": "Un caravanero de la ruta de la sal. Perdió la sombra el día que perdió el nombre.", "lagarto_espejismo": "Un guía de las salinas. Enseña caminos que existieron.", "monton_emblemas": "Emblemas que nadie reclamó. Pesan poco: sus dueños dejaron poco a medias.", "viento_cara": "Nombres dichos en voz alta que no encontraron a quién volver.", "camello_huesos": "La bestia de una caravana. Siguió andando cuando ya no quedaba nadie a quien llevar.", "aduanero": "El aduanero. Guarda un recibo a nombre de alguien y no lo enseña: es confidencial.", "esfinge_sal": "La que hace la pregunta. Solo deja pasar a quien contesta lo que es verdad.", "recaudador": "El Recaudador. Pesa lo que cada uno dejó a medias. Pone el dedo en la balanza.", "gargola": "Los canteros de la catedral. Odila aún les debe un jornal.", "espectro": "Fieles que entraron a rezar aquella tarde y no vieron motivo para salir.", "armadura_hueca": "La guardia de la puerta. Nunca la cerraron: nadie llegaba hasta aquí.", "cirio_andante": "Velas encendidas por alguien. Ninguna se ha consumido.", "organillo_tubos": "El órgano. Acompaña una canción de cuna que se para siempre en el mismo sitio.", "angel_escayola": "Un ángel del retablo que se cayó la noche del eclipse. Nadie lo ha recogido.", "rata_sacristia": "Las ratas de la sacristía. Las únicas que aquí han seguido con su vida.", "incensario": "El monaguillo dejó el incensario balanceándose. Sigue.", "campanero_doble": "Dos campaneros que nunca se pusieron de acuerdo sobre qué hora era.", "vidriera_mayor": "Gente guardada en el cristal. Una mujer de azul mira a Dalia como quien la conoce.", "arconte": "Seren, archivera. Madre de Edrin. Lleva treinta años con las dos manos en un reloj.", "arconte_desatado": "Lo que queda de Seren cuando ya no le queda nada que sostener." };
  M.VECES_RECUERDO = 3;
  M.bestiario = function (save) {
    var b = save.bestia || {};
    return D.ZONAS.map(function (z, r) {
      var ids = z.comunes.concat(z.subjefes).concat([z.jefe]);
      return { r: r, n: z.n, total: ids.length, vistos: ids.filter(function (i) { return b[i]; }).length,
        lista: ids.map(function (id) { var e = D.ENEMIGOS[id]; var cl = id === z.jefe ? "Gran jefe" : (z.subjefes.indexOf(id) >= 0 ? "Jefe" : "Común"), v = b[id] || 0, pide = cl === "Común" ? M.VECES_RECUERDO : 1;
          return { id: id, n: e.n, el: e.el, veces: v, clase: cl, quien: v >= pide ? M.QUIEN[id] : null, pide: pide }; }) };
    });
  };
  M.debilA = function (el) { return D.ELEMENTOS.filter(function (x) { return D.FUERTE[x] === el; })[0]; };

  // ---------- estados alterados y mejoras ----------
  // Cada luchador lleva en "es" los estados que tiene y cuántos turnos le quedan.
  M.ESTADOS = {
    veneno:      { n: "Veneno", malo: 1, ico: "ico_est_veneno", d: "Pierde un 15 % de su vida al final de cada turno." },
    quemadura:   { n: "Quemadura", malo: 1, ico: "ico_est_quemadura", d: "Pierde un 10 % de su vida cada turno y pega un 10 % menos." },
    paralisis:   { n: "Parálisis", malo: 1, ico: "ico_est_paralisis", d: "Pierde un turno. Después no se le puede volver a paralizar ni dormir durante 3 turnos." },
    sueno:       { n: "Sueño", malo: 1, ico: "ico_est_sueno", d: "No actúa hasta que lo golpean, y ese golpe le duele la mitad más. Después no se le puede volver a dormir ni paralizar durante 3 turnos." },
    ceguera:     { n: "Ceguera", malo: 1, ico: "ico_est_ceguera", d: "Falla uno de cada tres golpes." },
    maldicion:   { n: "Maldición", malo: 1, ico: "ico_est_maldicion", d: "Las curas no le hacen efecto: ni pociones, ni ráfagas, ni regeneración. Se quita con un remedio o esperando." },
    debilidad:   { n: "Debilidad", malo: 1, ico: "ico_est_debilidad", d: "Recibe un 30 % más de daño." },
    tachado:     { n: "Tachado", malo: 1, ico: "ico_est_debilidad", d: "Lo ha marcado El Lápiz: recibe un 25 % más de daño." },
    enraizado:   { n: "Enraizado", malo: 1, ico: "ico_est_enraizado", d: "No puede cubrirse ni lanzar ráfagas. A un enemigo enraizado es más fácil sacarle chispas." },
    ataque:      { n: "Ataque +", ico: "ico_est_ataque_mas", d: "Pega un 30 % más." },
    defensa:     { n: "Defensa +", ico: "ico_est_defensa_mas", d: "Recibe un 30 % menos de daño." },
    barrera:     { n: "Barrera", ico: "ico_est_defensa_mas", d: "Recibe un 60 % menos de daño de un elemento." },
    rafaga:      { n: "Ráfaga +", ico: "ico_est_rafaga_mas", d: "Su barra de ráfaga se llena el doble de rápido." },
    regeneracion:{ n: "Regeneración", ico: "ico_est_regeneracion", d: "Recupera un 8 % de vida cada turno." }
  };
  function tiene(u, n) { return !!(u && u.es && u.es[n] > 0); }
  M.tieneEstado = tiene;
  M.estadosDe = function (u) { return u && u.es ? Object.keys(u.es).filter(function (k) { return u.es[k] > 0; }) : []; };
  function inmovil(u) { return tiene(u, "paralisis") || tiene(u, "sueno"); }
  M.inmovil = inmovil;
  function poner(st, ev, lado, i, n, turnos, extra) {
    var u = (lado === "a" ? st.aliados : st.enemigos)[i]; if (!u || !u.vivo) return false;
    // los jefes no se duermen ni se paralizan: se quedan debilitados
    if (lado === "e" && u.jefe && (n === "paralisis" || n === "sueno")) n = "debilidad";
    if (lado === "a" && M.ESTADOS[n].malo && u.m && u.m.tenaz && (st._r || Math.random)() < u.m.tenaz) { ev.push({ t: "resiste", lado: lado, i: i, n: n }); return false; }
    if ((n === "paralisis" || n === "sueno") && (u.inmune > 0 || inmovil(u))) { ev.push({ t: "resiste", lado: lado, i: i, n: n }); return false; }
    if (n === "paralisis" || n === "sueno") u.inmune = turnos + 3;   // los turnos que dura, más tres de respiro
    u.es = u.es || {}; u.es[n] = Math.max(u.es[n] || 0, turnos);
    if (n === "barrera") u.barreraEl = extra;
    if (lado === "a" && (n === "paralisis" || n === "sueno")) u.guardia = false;
    ev.push({ t: "estado", lado: lado, i: i, n: n, v: turnos, el: extra }); return true;
  }
  M._poner = poner;
  function limpiar(st, ev, lado, i, cuales) {
    var u = (lado === "a" ? st.aliados : st.enemigos)[i]; if (!u || !u.es) return 0; var q = 0;
    Object.keys(u.es).forEach(function (k) { if (M.ESTADOS[k].malo && (!cuales || cuales.indexOf(k) >= 0)) { delete u.es[k]; q++; } });
    if (q) ev.push({ t: "limpia", lado: lado, i: i }); return q;
  }
  // Curar pasa siempre por aquí: la maldición lo impide.
  function sanar(st, ev, i, c, extra) {
    var x = st.aliados[i]; if (!x || !x.vivo) return 0;
    if (tiene(x, "maldicion")) { ev.push({ t: "sin-cura", i: i }); return 0; }
    c = Math.min(Math.round(c * (1 + ((x.m && x.m.bendicion) || 0))), x.max - x.hp); x.hp += c; var e = { t: "cura", i: i, v: c }; if (extra) for (var k in extra) e[k] = extra[k]; ev.push(e); return c;
  }
  // Paso de turno de los estados de un bando: daños, regeneración y cuenta atrás.
  function pasoEstados(st, ev, lado) {
    var l = lado === "a" ? st.aliados : st.enemigos;
    l.forEach(function (u, i) {
      if (u.vivo && u.inmune > 0) u.inmune--;
      if (lado === "a" && u.vivo && u.m && u.m.savia && !u.es) u.es = {};
      if (!u.vivo || !u.es) return;
      var jefe = lado === "e" && u.jefe, d = 0;
      if (tiene(u, "veneno")) d += Math.round(u.max * (jefe ? 0.03 : 0.15));
      if (tiene(u, "quemadura")) d += Math.round(u.max * (jefe ? 0.02 : 0.10));
      if (d > 0) {
        u.hp = Math.max(0, u.hp - d); ev.push({ t: "estado-dano", lado: lado, i: i, d: d, n: tiene(u, "veneno") ? "veneno" : "quemadura" });
        if (u.hp <= 0) { u.vivo = false; u.carga = false; if (lado === "a") u.bb = 0; u.es = {}; ev.push({ t: "cae", lado: lado, i: i }); return; }
      }
      if (lado === "a" && tiene(u, "regeneracion")) sanar(st, ev, i, Math.round(u.max * 0.08));
      if (lado === "a" && u.m && u.m.savia && u.hp < u.max) sanar(st, ev, i, Math.round(u.max * u.m.savia));
      Object.keys(u.es).forEach(function (k) { if (--u.es[k] <= 0) { delete u.es[k]; ev.push({ t: "estado-fin", lado: lado, i: i, n: k }); } });
    });
  }
  // Qué estado contagia cada enemigo, según su elemento. La primera región no tiene estados: es para aprender.
  var EST_ELEMENTO = { Brasa: ["quemadura", 2], Bosque: ["veneno", 2], Rayo: ["paralisis", 1], Marea: ["debilidad", 2], Alba: ["ceguera", 2], Ocaso: ["maldicion", 2] };
  var EST_ALTERNO = { Bosque: ["enraizado", 2], Ocaso: ["sueno", 2] };
  M.estadoDeEnemigo = function (st, e) {
    if (st.fase.r < 1 && !st.fase.t && !st.fase.secreta) return null;
    var id = e.id.replace("eco:", "");
    return (EST_ALTERNO[e.el] && semilla(id) % 2) ? EST_ALTERNO[e.el] : EST_ELEMENTO[e.el];
  };

  // ---------- ráfagas con efecto ----------
  // apoyo: no pega, protege o anima al grupo. El resto son añadidos a la ráfaga de siempre.
  var EF = {
    gorm:   { apoyo: 1, bufos: [["defensa", 3]], txt: "Sube la defensa de todo el grupo." },
    liora:  { apoyo: 1, bufos: [["defensa", 3], ["regeneracion", 3]], txt: "Sube la defensa del grupo y lo va curando poco a poco." },
    aurel:  { apoyo: 1, barrera: 3, bufos: [["rafaga", 3]], txt: "Levanta una barrera contra el elemento del enemigo más peligroso y acelera las ráfagas del grupo." },
    anselm: { apoyo: 1, barrera: 3, limpia: 1, txt: "Levanta una barrera contra el elemento del enemigo más peligroso y quita los estados alterados." },
    ferran: { apoyo: 1, bufos: [["rafaga", 3], ["ataque", 2]], bb: 25, txt: "Da 25 de ráfaga a cada compañero, acelera sus barras y les sube el ataque." },
    matias: { apoyo: 1, bufos: [["defensa", 3]], barrera: 3, txt: "Sube la defensa del grupo y además lo protege del elemento del enemigo más peligroso." },
    dalia:  { bufos: [["regeneracion", 2]], txt: "Además deja regeneración." },
    osval:  { bufos: [["regeneracion", 3]], txt: "Además deja regeneración larga." },
    mielina:{ bufos: [["regeneracion", 3]], txt: "Además deja regeneración larga." },
    nacha:  { bufos: [["ataque", 3]], txt: "Además sube el ataque del grupo." },
    edrin:  { bufos: [["rafaga", 3]], txt: "Además acelera las ráfagas del grupo." },
    gallo:  { limpia: ["sueno", "paralisis", "ceguera"], bufos: [["ataque", 2]], txt: "Además despierta a los dormidos, quita parálisis y ceguera y sube el ataque." },
    aina:   { limpia: 1, txt: "Además quita todos los estados alterados." },
    mirra:  { est: ["quemadura", 3, 1] }, tizon: { est: ["quemadura", 3, 1] }, saela: { est: ["quemadura", 3, 1] },
    boleto: { est: ["veneno", 3, 1] }, fenn: { est: ["veneno", 3, 1] },
    tolo:   { est: ["enraizado", 2, 1] }, sepia: { est: ["enraizado", 3, 1] },
    lince:  { est: ["debilidad", 2, 1] }, vesper: { est: ["debilidad", 2, 1] }, urraca: { est: ["debilidad", 2, 1] }, maris: { est: ["debilidad", 2, 1] },
    tobias: { est: ["paralisis", 1, 0.5] }, volta: { est: ["paralisis", 1, 1] }, nube: { est: ["paralisis", 1, 0.4] },
    clarisa:{ est: ["ceguera", 2, 1] }, lucera: { est: ["ceguera", 2, 1] }, ysolde: { est: ["ceguera", 2, 1] },
    morwen: { est: ["maldicion", 3, 1] }, azrak: { est: ["maldicion", 3, 1] }, tanido: { est: ["sueno", 2, 0.5] },
    ilda:   { franco: 1, txt: "Atraviesa escudos y corazas, rompe al instante cualquier carga y deja al enemigo con la defensa baja dos turnos." },
    nacar:  { apoyo: 1, rebato: 1, bb: 20, bufos: [["ataque", 3]], txt: "Toca a rebato: los compañeros que ya habían actuado vuelven a actuar este turno, con 20 de ráfaga y el ataque subido." },
    sabina: { injerto: 1, bufos: [["regeneracion", 3]], txt: "Además levanta a un compañero caído con media vida y deja regeneración larga." },
    orfeo:  { corta: 1, txt: "Corta la corriente: aturde a los enemigos comunes y rompe al instante las cargas de los jefes." },
    clara:  { apoyo: 1, limpia: 1, cura: 0.3, egida: 1, bufos: [["defensa", 3]], txt: "Cura un 30 % a todo el grupo, quita los estados alterados, sube la defensa y anula el siguiente golpe que reciba cada uno." },
    nadie:  { ecoeco: 1, txt: "Cada golpe de la ráfaga se repite solo, a media fuerza. Atraviesa escudos." },
    tam:    { roba: 20, est: ["paralisis", 1, 0.5], txt: "Además roba 20 de ráfaga y puede paralizar." },
    hollis: { apoyo: 1, bufos: [["defensa", 3], ["ataque", 2]], limpia: ["sueno", "paralisis"], txt: "Cierra filas: sube la defensa y el ataque del grupo y espabila a dormidos y paralizados." },
    llum:   { limpia: 1, bufos: [["rafaga", 2]], txt: "Además quita los estados alterados y acelera las ráfagas del grupo." },
    ulric:  { est: ["debilidad", 3, 1], txt: "Deja al enemigo debilitado tres turnos." },
    eren:   { bbGrupo: 15, txt: "Al acertar, da 15 de ráfaga a cada compañero: no le hace falta una razón para ayudar." },
    polilla:{ roba: 30, txt: "Además roba 30 de ráfaga para sí misma." }
  };
  Object.keys(EF).forEach(function (id) { var h = D.HEROES[id]; if (!h) return; h.bb.ef = EF[id]; if (EF[id].apoyo) h.bb.tipo = "apoyo"; });
  // Explica en una frase qué hace la ráfaga de un eco.
  M.textoRafaga = function (id) {
    var b = D.HEROES[id].bb, ef = b.ef || {};
    var base = { uno: "Golpea a un enemigo con mucha fuerza.", todos: "Golpea a todos los enemigos.", cura: "Cura a todo el grupo.", apoyo: "" }[b.tipo];
    var extra = ef.txt || "";
    if (ef.est) { var E = M.ESTADOS[ef.est[0]]; extra = (ef.est[2] < 1 ? "A veces deja " : "Deja ") + E.n.toLowerCase() + ": " + E.d.charAt(0).toLowerCase() + E.d.slice(1); }
    return (base + " " + extra).trim();
  };
  function aplicarApoyo(st, ev, a, ai, plan) {
    var ef = a.bbdef.ef || {}, ma = a.m || {}, mas = (a.rg.Temple ? 1 : 0) + (plan.sup ? 2 : 0) + (ma.largo || 0);
    if (ma.autoCura) sanar(st, ev, ai, Math.round(a.max * ma.autoCura));
    var peligro = null; st.enemigos.forEach(function (e) { if (e.vivo && (!peligro || e.atk > peligro.atk)) peligro = e; });
    st.aliados.forEach(function (x, j) {
      if (!x.vivo) return;
      (ef.bufos || []).forEach(function (b) { poner(st, ev, "a", j, b[0], b[1] + mas); });
      if (ef.barrera && peligro) poner(st, ev, "a", j, "barrera", ef.barrera + mas, peligro.el);
      if (ef.limpia || a.rg.Despertar) limpiar(st, ev, "a", j, ef.limpia === 1 || a.rg.Despertar ? null : ef.limpia);
      if (ef.bb && j !== ai) subirBB(x, ef.bb);
      if (ef.rebato && j !== ai && x.actuo && !inmovil(x)) { x.actuo = false; x.guardia = false; ev.push({ t: "rebato", i: j }); }
      if (ef.cura) sanar(st, ev, j, Math.round(x.max * ef.cura * (plan.sup ? 1.6 : 1)));
      if (ef.egida && !x.egida) { x.egida = true; ev.push({ t: "estado", lado: "a", i: j, n: "barrera", v: 1, egida: true }); }
      if (ma.arenga) poner(st, ev, "a", j, "ataque", ma.arenga + 1);
      if (ma.egida && !x.egida) { x.egida = true; ev.push({ t: "estado", lado: "a", i: j, n: "barrera", v: 1, egida: true }); }
      if (a.rg.Aliento && j !== ai) subirBB(x, 15);
      if (a.rg.Despertar) sanar(st, ev, j, Math.round(x.max * 0.15));
    });
  }

  function romper(st, ev, e, ei) {
    e.carga = false; e.dCarga = 0; e.aturdido = 1;
    if (e.patron[e.paso % e.patron.length] === "es") e.paso++;
    st.aliados.forEach(function (x) { subirBB(x, 15); });
    ev.push({ t: "ruptura", i: ei });
  }
  function unGolpe(st, ev, a, ai, ei, d0, el, t, rng, opc) {
    var e = st.enemigos[ei]; if (!e || !e.vivo) return;
    var d = d0, chispa = false;
    if (tiene(a, "ceguera") && rng() < 0.33) { ev.push({ t: "fallo", lado: "a", de: ai, a: ei }); return; }
    var m = a.m || {}, raf = opc && opc.tipo && opc.tipo !== "atacar", eco = opc && opc.eco;
    if (!st.autoOn && e.ultT != null && e.ultDe !== ai && !eco && !raf && Math.abs(t - e.ultT) < 1000) { var cq = st.cmp = st.cmp || { n: 0, ok: 0, casi: 0, lejos: 0 }, dq = Math.abs(t - e.ultT), vq = M.VENTANA_CHISPA * (tiene(e, "enraizado") ? 2 : 1) * (1 + (m.oido || 0)); cq.n++; if (dq <= vq) cq.ok++; else if (dq <= vq * 2) cq.casi++; else cq.lejos++; }
    if (e.ultT != null && e.ultDe !== ai && Math.abs(t - e.ultT) <= M.VENTANA_CHISPA * (tiene(e, "enraizado") ? 2 : 1) * (1 + (m.oido || 0))) chispa = true;
    if (!chispa && m.metronomo && a.metT !== st.turno && !eco) chispa = true;
    if (!chispa && m.todoChispa && !eco) chispa = true;
    a.metT = st.turno;
    if (chispa) { d = Math.round(d * (M.BONO_CHISPA + (m.pulso || 0))); a.chs = (a.chs || 0) + 1; }
    e.ultT = t; e.ultDe = ai;
    if (!eco) {
      if (m.cadencia) d = Math.round(d * (1 + Math.min(m.cadencia, 0.02 * (a.chs || 0))));
      if (m.doble && rng() < m.doble) d = Math.round(d * 1.5);
      if (!raf) { if (m.normal) d = Math.round(d * (1 + m.normal)); }
      else {
        if (m.ejecutor && e.hp < e.max * 0.5) d = Math.round(d * (1 + m.ejecutor));
        if (m.barrida) d = Math.round(d * (1 + m.barrida * Math.max(0, vivos(st.enemigos).length - 1)));
        if (m.replica && rng() < m.replica) d = Math.round(d * 1.4);
      }
      if (m.lleno && e.hp >= e.max * 0.95) d = Math.round(d * (1 + m.lleno));
      if (m.vsEst && tiene(e, EST_TAL[a.el])) d = Math.round(d * (1 + m.vsEst));
      if (m.verdugo && e.hp < e.max * 0.3) d = Math.round(d * (1 + m.verdugo));
      if (m.eclipse && M.estadosDe(e).some(function (k) { return M.ESTADOS[k].malo; })) d = Math.round(d * (1 + m.eclipse));
    }
    if (e.escudo && !(opc && opc.atraviesa)) d = Math.max(1, Math.round(d * 0.5));
    if (e.brecha > 0) d = Math.round(d * 1.2);
    if (e.aturdido > 0) d = Math.round(d * 1.25);
    if (e.coraza && !a.arma && !(opc && opc.atraviesa)) d = Math.round(d * 0.6);
    if (e.presencia > a.estr) d = Math.round(d * Math.pow(0.75, e.presencia - a.estr));
    if (tiene(a, "ataque")) d = Math.round(d * 1.3);
    if (tiene(a, "quemadura")) d = Math.round(d * 0.9);
    if (tiene(e, "debilidad")) d = Math.round(d * 1.3);
    if (tiene(e, "tachado")) d = Math.round(d * 1.25);
    if (tiene(e, "sueno")) { d = Math.round(d * 1.5); delete e.es.sueno; ev.push({ t: "estado-fin", lado: "e", i: ei, n: "sueno" }); }
    if (a.rg.Remate && e.hp < e.max * 0.5) d = Math.round(d * 1.25);
    d = Math.max(1, d); e.hp = Math.max(0, e.hp - d);
    if (chispa) { st.chispas++; st.chispasTurno++; if (st.chispasTurno > st.mejorChispas) st.mejorChispas = st.chispasTurno; }
    ev.push({ t: "golpe", lado: "a", de: ai, a: ei, d: d, el: el, escudo: e.escudo, aturdido: e.aturdido > 0, chispa: chispa, nChispa: st.chispasTurno });
    subirBB(a, M.CFG.bbGolpe);
    if (!eco) {
      if (m.robo) { var rb = Math.round(d * m.robo); if (rb > 0) { sanar(st, ev, ai, rb); if (m.roboGrupo) st.aliados.forEach(function (x, j) { if (j !== ai && x.vivo && x.hp < x.max) sanar(st, ev, j, Math.round(rb / 2)); }); } }
      if (e.hp > 0) {
        if (m.proc && rng() < m.proc) poner(st, ev, "e", ei, EST_TAL[a.el], 2 + (a.el === "Brasa" ? (m.durEst || 0) : 0) - (EST_TAL[a.el] === "paralisis" ? 1 : 0));
        if (m.proc2 && rng() < m.proc2) poner(st, ev, "e", ei, "enraizado", 2);
        if (m.debilita && rng() < m.debilita) poner(st, ev, "e", ei, "debilidad", 2);
        if (m.tacha && !tiene(e, "tachado")) poner(st, ev, "e", ei, "tachado", 2);
      }
      if (m.arco && rng() < m.arco) { var otros = []; st.enemigos.forEach(function (x, j) { if (x.vivo && j !== ei) otros.push(j); }); if (otros.length) unGolpe(st, ev, a, ai, otros[Math.floor(rng() * otros.length)], Math.max(1, Math.round(d / 2)), el, t, rng, { eco: true, tipo: opc && opc.tipo }); }
      if (opc && opc.k === 0 && !raf) {
        if (m.bbGolpe) subirBB(a, m.bbGolpe);
        if (m.estrofa) {
          st.aliados.forEach(function (x, j) { if (x.vivo && x.hp < x.max) sanar(st, ev, j, Math.round(x.max * m.estrofa)); });
          for (var je = 0; je < st.aliados.length; je++) { var xe = st.aliados[je]; if (xe.vivo && M.estadosDe(xe).some(function (q) { return M.ESTADOS[q].malo; })) { limpiar(st, ev, "a", je, null); break; } }
        }
        if (m.curaGolpe) { var ph = null; st.aliados.forEach(function (x) { if (x.vivo && x.hp < x.max && (!ph || x.hp / x.max < ph.hp / ph.max)) ph = x; }); if (ph) sanar(st, ev, st.aliados.indexOf(ph), Math.round(ph.max * m.curaGolpe)); }
      }
    }
    if (chispa || rng() < (el > 1 ? 0.6 : 0.4)) { var va = vivos(st.aliados), cx = va[Math.floor(rng() * va.length)], vc = chispa ? M.CFG.bbChispa : 6; subirBB(cx, vc); ev.push({ t: "cristal", de: ei, i: st.aliados.indexOf(cx), v: vc }); }
    if (rng() < 0.12) {
      var her = st.aliados.filter(function (x) { return x.vivo && x.hp < x.max; });
      if (her.length) { var hx = her[Math.floor(rng() * her.length)]; sanar(st, ev, st.aliados.indexOf(hx), Math.round(hx.max * 0.06), { corazon: ei }); }
    }
    if (e.carga && e.hp > 0) {
      e.dCarga += d * (a.rg.Rompedor ? 2 : 1) * (1 + (m.rompe || 0)) * (chispa ? 2 : 1);   // a compás, las cargas se rompen el doble de rápido
      if (e.dCarga >= M.umbralRuptura(e)) romper(st, ev, e, ei);
    }
    if (e.hp <= 0) {
      e.vivo = false; e.carga = false; e.es = {}; ev.push({ t: "cae", lado: "e", i: ei });
      st.aliados.forEach(function (x) { subirBB(x, 5); });
      if (m.alMatar) subirBB(a, m.alMatar);
      if (raf && m.remateBB) subirBB(a, m.remateBB);
    } else if (e.jefe && !e.sub && !e.variante && !e.fase2 && e.trucos >= 1 && e.hp <= e.max * 0.5) {
      // Segunda fase de los grandes jefes: a media vida se tambalean un turno, pierden la coraza y vuelven más agresivos.
      e.fase2 = true; e.carga = false; e.dCarga = 0; e.aturdido = 1; e.es = {}; e.coraza = false; e.marca = -1;
      e.atk = Math.round(e.atk * 1.2); e.patron = ["b", "ca", "es", "d", "m", "r"]; e.paso = 0;
      ev.push({ t: "fase2", i: ei, frase: M.FRASE_FASE2[e.id] || "" });
    } else if (e.jefe && !e.sub && !e.rabia && e.trucos >= 2 && e.hp < e.max * 0.3) {
      e.rabia = true; e.atk = Math.round(e.atk * 1.2); ev.push({ t: "rabia", i: ei });
    }
  }
  M.FRASE_FASE2 = {};
  ["El roble arranca sus raíces. Ya no espera: camina.", "El wyrm se traga el horno entero.", "La galerna entera gira alrededor de su ojo.", "Las bobinas se sueltan. El rayo empieza a bajar.",
   "«¡Y ahora, el número final!»", "La campana se raja y por la grieta sale toda la lluvia.", "El Recaudador vuelca la balanza.", "El Arconte abre la otra mitad del sol."].forEach(function (t, r) { M.FRASE_FASE2[D.ZONAS[r].jefe] = t; });
  function trasAccion(st, ev) {
    if (!vivos(st.enemigos).length && !st.fin) {
      if (st.ola + 1 < st.fase.olas.length) {
        st.ola++; st.enemigos = st.fase.olas[st.ola].map(crearEnemigo); st.objetivo = 0;
        st.aliados.forEach(function (x) { if (x.vivo) x.hp = Math.min(x.max, x.hp + Math.round(x.max * M.CFG.respiro)); });
        ev.push({ t: "ola", n: st.ola + 1 });
      } else { st.fin = "victoria"; ev.push({ t: "victoria" }); }
    }
    return ev;
  }
  function puede(st, i) { var a = st.aliados[i]; return !st.fin && a && a.vivo && !a.actuo && !inmovil(a); }

  // Ráfaga: gasta 100 de barra. Súper ráfaga: gasta 200 y pega bastante más del doble.
  // Cadena: cada ráfaga lanzada justo después de otra en el mismo turno pega un 20 % más que la anterior (tope +100 %).
  M.SUPER = 2.3;
  M.bonoCadena = function (n) { return 1 + 0.2 * Math.min(5, n); };

  // Empieza una acción de ataque. No hace daño todavía: devuelve el plan con el instante de cada golpe.
  // tipo: "atacar" | "rafaga" | "super". La pantalla (o el simulador) llama luego a M.golpe para cada uno.
  M.iniciar = function (st, i, tipo, rng) {
    var ev = [], a = st.aliados[i]; if (!puede(st, i)) return null;
    var sup = tipo === "super", raf = sup || tipo === "rafaga", b = a.bbdef, plan = { i: i, tipo: tipo, sup: sup, golpes: [], hechos: 0, ev: ev };
    if (raf) st.rafagas = (st.rafagas || 0) + 1;
    if (!raf) {
      var ei = idxObjetivo(st); if (ei < 0) return null;
      a.actuo = true; st.cadena = 0; plan.obj = ei; plan.mult = 1;
      var rp = (a.m && a.m.rapido) || 0;
      plan.golpes = M.ritmo(a.id, a.hits).map(function (x) { return Math.round(x * (1 - rp)); });
      return plan;
    }
    var coste = sup ? 200 : 100; if (a.bb < coste || tiene(a, "enraizado")) return null;
    var bono = M.bonoCadena(st.cadena); a.actuo = true;
    if (!sup && a.m && a.m.gratis && !a.usoGratis) { a.usoGratis = true; ev.push({ t: "gratis", i: i }); } else a.bb -= coste;
    plan.mult = b.pot * (sup ? M.SUPER : 1) * (a.raf || 1) * bono; plan.clase = b.tipo; plan.atraviesa = (!!a.rg.Despertar || !!(b.ef && (b.ef.franco || b.ef.ecoeco))) && b.tipo === "uno";
    ev.push({ t: "rafaga", i: i, n: b.n, el: a.el, tipo: b.tipo, sup: sup, cadena: st.cadena + 1, bono: bono });
    st.cadena += sup ? 2 : 1; if (st.cadena > st.mejorCadena) st.mejorCadena = st.cadena;
    var retraso = sup ? 900 : 620;   // lo que dura la franja de la ráfaga antes de que empiecen a caer los golpes
    if (b.tipo === "cura" || b.tipo === "apoyo") { plan.golpes = [retraso]; plan.bono = bono; }
    else if (b.tipo === "todos") { var n = sup ? 4 : 2; for (var k = 0; k < n; k++) plan.golpes.push(retraso + k * 170); plan.obj = "todos"; }
    else { plan.obj = idxObjetivo(st); var r0 = M.ritmo(a.id, a.hits + (sup ? 5 : 2)); plan.golpes = r0.map(function (x, k) { return retraso + k * Math.max(70, (r0[1] || 200) - r0[0]); }); }
    var mi = a.m || {};
    if (mi.impetu) subirBB(a, mi.impetu);
    if (mi.estela || mi.consuelo) st.aliados.forEach(function (x, j) { if (j !== i) subirBB(x, (mi.estela || 0) + (mi.consuelo || 0)); });
    if (a.rg.Onda && b.tipo === "todos") st.aliados.forEach(function (x, j) { if (j !== i) subirBB(x, 10); });
    if (a.rg.Aliento && b.tipo === "cura") st.aliados.forEach(function (x) { subirBB(x, 15); });
    return plan;
  };
  // Aplica el golpe número k de un plan en el instante t. Devuelve lo que ha pasado.
  M.golpe = function (st, plan, k, t, rng) {
    var ev = [], a = st.aliados[plan.i]; if (st.fin || !a) return ev;
    var n = plan.golpes.length, b = a.bbdef, mg = a.m || {};
    var ef = b.ef || {}; st._r = rng; plan.k = k;
    function levantar(frac) { for (var j = 0; j < st.aliados.length; j++) { var x = st.aliados[j]; if (!x.vivo) { x.vivo = true; x.hp = Math.round(x.max * frac); x.actuo = true; x.es = {}; ev.push({ t: "revive", i: j }); return true; } } return false; }
    if (plan.clase === "apoyo") { aplicarApoyo(st, ev, a, plan.i, plan); return ev; }
    if (plan.clase === "cura") {
      st.aliados.forEach(function (x, j) {
        if (!x.vivo) return;
        if (ef.limpia || a.rg.Despertar) limpiar(st, ev, "a", j, ef.limpia === 1 || a.rg.Despertar ? null : ef.limpia);
        sanar(st, ev, j, Math.round(x.max * Math.min(1, b.pot * (plan.sup ? 1.9 : 1) * (1 + (plan.bono - 1) / 2) * (1 + (mg.rafMas || 0)))));
        (ef.bufos || []).forEach(function (bf) { poner(st, ev, "a", j, bf[0], bf[1] + (plan.sup ? 1 : 0)); });
        if (mg.rocio) poner(st, ev, "a", j, "regeneracion", mg.rocio + 1);
      });
      if (a.rg.Alivio) { var peor = null; st.aliados.forEach(function (x) { if (x.vivo && (!peor || x.hp / x.max < peor.hp / peor.max)) peor = x; }); if (peor) sanar(st, ev, st.aliados.indexOf(peor), Math.round(peor.max * 0.15)); }
      if (ef.injerto) levantar(0.5);
      if (mg.milagro || (plan.sup && a.rg.Despertar)) levantar(0.3);
      return ev;
    }
    function uno(ei) {
      var e = st.enemigos[ei]; if (!e || !e.vivo) return;
      var perf = plan.tipo === "atacar" ? (mg.perf || 0) : (mg.rafPerf || 0);
      var el = M.multElemento(a.el, e.el), d = Math.max(1, Math.round(dano(a.atk, plan.mult, el, e.def * (1 - perf), rng) / n));
      if (ef.franco && plan.tipo !== "atacar" && k === 0 && e.carga) romper(st, ev, e, ei);
      unGolpe(st, ev, a, plan.i, ei, d, el, t, rng, plan);
      if (ef.ecoeco && plan.tipo !== "atacar" && e.vivo) unGolpe(st, ev, a, plan.i, ei, Math.max(1, Math.round(d / 2)), el, t, rng, { eco: true, tipo: plan.tipo, atraviesa: true });
      if (ef.franco && plan.tipo !== "atacar" && k === n - 1 && e.vivo) e.brecha = 2;
      // en el último golpe de la ráfaga se contagia su estado
      if (plan.tipo !== "atacar" && k === n - 1 && e.vivo) {
        if (ef.est && (plan.sup || mg.tormenta || rng() < ef.est[2])) poner(st, ev, "e", ei, ef.est[0], ef.est[1] + (plan.sup ? 1 : 0) + (mg.tormenta ? 1 : 0));
        if (ef.roba) subirBB(a, ef.roba);
      }
    }
    if (plan.obj === "todos") {
      st.enemigos.forEach(function (e, ei) { if (e.vivo) uno(ei); });
      if (k === n - 1) {
        if (a.rg.Brecha) st.enemigos.forEach(function (e) { if (e.vivo) e.brecha = 2; });
        if (ef.bbGrupo) st.aliados.forEach(function (x, j) { if (x.vivo && j !== plan.i) subirBB(x, ef.bbGrupo); });
        if (ef.corta) st.enemigos.forEach(function (e, ei) { if (!e.vivo) return; if (e.carga) romper(st, ev, e, ei); else if (!e.jefe) { e.aturdido = 1; ev.push({ t: "aturde", i: ei }); } });
        if (plan.sup && a.rg.Despertar) st.enemigos.forEach(function (e, ei) { if (e.vivo && !e.jefe) { e.aturdido = 1; ev.push({ t: "aturde", i: ei }); } });
      }
    } else {
      var ei = (st.enemigos[plan.obj] && st.enemigos[plan.obj].vivo) ? plan.obj : idxObjetivo(st);   // si el objetivo cae, el resto de golpes van al siguiente
      if (ei >= 0) uno(ei);
    }
    return trasAccion(st, ev);
  };
  // Versiones de un tirón, sin tiempo real: las usan el simulador y el modo automático. Aquí no hay chispas salvo que se pidan.
  function deUnTiron(st, plan, rng, t0) {
    if (!plan) return [];
    var ev = plan.ev.slice(), olaAntes = st.ola;
    for (var k = 0; k < plan.golpes.length && !st.fin && st.ola === olaAntes; k++) ev = ev.concat(M.golpe(st, plan, k, t0 + plan.golpes[k], rng));
    return ev;
  }
  M.atacar = function (st, i, rng) { st.reloj += 5000; return deUnTiron(st, M.iniciar(st, i, "atacar", rng), rng, st.reloj); };
  M.rafaga = function (st, i, rng, sup) { st.reloj += 5000; return deUnTiron(st, M.iniciar(st, i, sup ? "super" : "rafaga", rng), rng, st.reloj); };
  M.guardia = function (st, i) {
    var ev = []; if (!puede(st, i) || tiene(st.aliados[i], "enraizado")) return ev;
    var a = st.aliados[i]; a.actuo = true; a.guardia = true; st.cadena = 0; subirBB(a, 15); ev.push({ t: "guardia", i: i }); return ev;
  };
  // Objetos de la bolsa. Uno por turno.
  M.OBJETOS = {
    pocion:  { n: "Poción", ico: "ico_pocion", d: "Cura un 40 % de vida a un eco.", sobre: "vivo" },
    remedio: { n: "Remedio", ico: "ico_tonico", d: "Quita todos los estados alterados a un eco.", sobre: "vivo" },
    ascua:   { n: "Ascua", ico: "ico_ascua", d: "Levanta a un eco caído con media vida.", sobre: "caido" },
    pocionM: { n: "Poción mayor", ico: "ico_pocion_mayor", d: "Cura un 60 % de vida a todo el grupo.", sobre: "grupo", raro: 1 },
    ascuaM:  { n: "Ascua mayor", ico: "ico_ascua_mayor", d: "Levanta a un eco caído con toda la vida.", sobre: "caido", raro: 1 },
    elixir:  { n: "Elixir", ico: "ico_elixir", d: "Llena 100 de ráfaga a un eco.", sobre: "vivo", raro: 1 }
  };
  M.cuantos = function (save, tipo) { return tipo === "pocion" ? save.pociones : (tipo === "ascua" ? save.ascuas : ((save.bolsa || {})[tipo] || 0)); };
  M.darObjeto = function (save, tipo, n) {
    if (tipo === "pocion") save.pociones += n; else if (tipo === "ascua") save.ascuas += n; else { save.bolsa = save.bolsa || {}; save.bolsa[tipo] = (save.bolsa[tipo] || 0) + n; }
  };
  M.objeto = function (st, save, tipo, i) {
    var ev = [], a = st.aliados[i], O = M.OBJETOS[tipo]; if (st.fin || st.objetoUsado || !a || !O || M.cuantos(save, tipo) < 1) return ev;
    if (O.sobre === "caido" ? a.vivo : !a.vivo) return ev;
    if (tipo === "pocion") { if (a.hp >= a.max || !sanar(st, ev, i, Math.round(a.max * 0.4))) return ev; }
    else if (tipo === "remedio") { if (!limpiar(st, ev, "a", i)) return []; }
    else if (tipo === "pocionM") { st.aliados.forEach(function (x, j) { if (x.vivo) sanar(st, ev, j, Math.round(x.max * 0.6)); }); }
    else if (tipo === "elixir") { if (a.bb >= 200) return ev; a.bb = Math.min(200, a.bb + 100); ev.push({ t: "elixir", i: i }); }
    else { a.vivo = true; a.hp = Math.round(a.max * (tipo === "ascuaM" ? 1 : 0.5)); a.actuo = true; a.es = {}; ev.push({ t: "revive", i: i }); }
    M.darObjeto(save, tipo, -1); st.objetoUsado = true;
    return ev;
  };
  // Para pruebas: saltar directamente a una oleada.
  M._ola = function (st, n) { st.ola = n; st.enemigos = st.fase.olas[n].map(crearEnemigo); st.objetivo = 0; };
  M.todosActuaron = function (st) { return st.aliados.every(function (a) { return !a.vivo || a.actuo || inmovil(a); }); };

  M.finTurno = function (st, rng) {
    var ev = []; if (st.fin) return ev;
    st.cadena = 0; st.chispasTurno = 0;
    pasoEstados(st, ev, "a");
    if (!vivos(st.aliados).length) { st.fin = "derrota"; ev.push({ t: "derrota" }); return ev; }
    st.aliados.forEach(function (x) { x.sano = x.vivo && x.hp >= x.max * 0.9 ? st.turno : -1; });
    ev.push({ t: "fase-enemiga" });
    st.enemigos.forEach(function (e, ei) {
      if (!e.vivo || st.fin) return;
      var va = vivos(st.aliados); if (!va.length) return;
      e.escudo = false;
      if (e.aturdido > 0) { e.aturdido--; ev.push({ t: "aturdido", i: ei }); return; }
      if (inmovil(e)) { ev.push({ t: "inmovil", i: ei, n: tiene(e, "sueno") ? "sueno" : "paralisis" }); return; }
      var act = e.patron[e.paso % e.patron.length]; e.paso++;
      if (act === "es" && !e.carga) act = "g";
      if (act === "r" && !(e.marca >= 0 && st.aliados[e.marca] && st.aliados[e.marca].vivo)) { act = "g"; e.marca = -1; }
      var m = e.furia > 0 ? 1.3 : 1;
      function azar() { return va[Math.floor(rng() * va.length)]; }
      var contagio = M.estadoDeEnemigo(st, e), probEst = act === "es" || act === "r" ? 1 : ((e.jefe || e.variante) ? 0.3 : 0.12), tope = act === "es" && contagio && (contagio[0] === "paralisis" || contagio[0] === "sueno") ? 2 : 3;   // un mismo ataque nunca contagia a todo el grupo
      function pegar(a, mult, avisado, tope) {
        if (!a || !a.vivo) return; var ai = st.aliados.indexOf(a);
        var dio = recibir(st, ev, e, ei, a, ai, mult * m, rng, avisado, tope);
        // cubrirse evita el contagio
        if (dio && contagio && a.vivo && !a.guardia && tope > 0 && rng() < probEst) { poner(st, ev, "a", ai, contagio[0], contagio[1]); tope--; }
      }
      if (act === "G" && tiene(e, "enraizado")) act = "g";
      if (act === "c" && tiene(e, "maldicion")) act = "g";
      if (act === "g") pegar(azar(), M.CFG.pG);
      else if (act === "d") { pegar(azar(), M.CFG.pD); va = vivos(st.aliados); if (va.length) pegar(azar(), M.CFG.pD); }
      else if (act === "b") { ev.push({ t: "barrido", i: ei }); st.aliados.forEach(function (a) { pegar(a, M.CFG.pB); }); }
      else if (act === "ca") { e.carga = true; e.dCarga = 0; ev.push({ t: "aviso", i: ei, n: M.ESPECIAL[e.id] || "su ataque especial" }); }
      else if (act === "es") { e.carga = false; ev.push({ t: "especial", i: ei, n: M.ESPECIAL[e.id] || "Ataque especial" }); st.aliados.forEach(function (a) { pegar(a, M.CFG.pEs, true, M.CFG.topeEs); }); }
      else if (act === "m") { var obj = azar(); e.marca = st.aliados.indexOf(obj); ev.push({ t: "marca", i: ei, a: e.marca }); }
      else if (act === "r") { var mk = st.aliados[e.marca]; ev.push({ t: "remate", i: ei, a: e.marca }); e.marca = -1; pegar(mk, M.CFG.pR, true); }
      else if (act === "G") { e.escudo = true; ev.push({ t: "cubre", i: ei }); }
      else if (act === "c") {
        var peor = null; st.enemigos.forEach(function (x) { if (x.vivo && x.hp < x.max && (!peor || x.hp / x.max < peor.hp / peor.max)) peor = x; });
        if (peor) { var c = Math.round(peor.max * (peor.jefe ? 0.06 : 0.18)); peor.hp = Math.min(peor.max, peor.hp + c); ev.push({ t: "cura-e", i: ei, a: st.enemigos.indexOf(peor), v: c }); } else pegar(azar(), M.CFG.pG);
      }
      else if (act === "gr") { st.enemigos.forEach(function (x) { if (x.vivo) x.furia = 3; }); ev.push({ t: "grito", i: ei }); }
      else if (act === "dr") { var dx = azar(); pegar(dx, 0.8 * M.CFG.pG); if (dx.vivo && dx.bb > 0) { var q = Math.min(40, dx.bb); dx.bb -= q; ev.push({ t: "drena", i: ei, a: st.aliados.indexOf(dx), v: q }); } }
      if (e.furia > 0) e.furia--;
      if (e.brecha > 0) e.brecha--;
      if (!vivos(st.aliados).length) { st.fin = "derrota"; ev.push({ t: "derrota" }); }
    });
    if (!st.fin && st.fase.limite && st.turno >= st.fase.limite) {   // se acabó el tiempo de la incursión
      ev.push({ t: "limite" }); st.aliados.forEach(function (a, ai) { if (a.vivo) { a.hp = 0; a.vivo = false; ev.push({ t: "cae", lado: "a", i: ai }); } });
      st.fin = "derrota"; ev.push({ t: "derrota" });
    }
    if (!st.fin) { pasoEstados(st, ev, "e"); var olaAntes = st.ola; trasAccion(st, ev); if (st.ola !== olaAntes) st.aliados.forEach(function (a) { a.actuo = false; }); }
    if (!st.fin) { st.turno++; st.objetoUsado = false; st.aliados.forEach(function (a) { a.actuo = false; a.guardia = false; }); ev.push({ t: "turno", n: st.turno }); }
    return ev;
  };
  // avisado: el golpe se veía venir (especial o remate). Cubrirse justo ahí es una parada perfecta.
  function recibir(st, ev, e, ei, a, ai, mult, rng, avisado, tope) {
    var m = a.m || {}; st._r = rng;
    if (tiene(e, "ceguera") && rng() < 0.33) { ev.push({ t: "fallo", lado: "e", de: ei, a: ai }); return false; }
    if (m.esquiva && !inmovil(a) && rng() < m.esquiva) { ev.push({ t: "fallo", lado: "e", de: ei, a: ai, esquiva: true }); return false; }
    if (a.cerrado === st.turno) { ev.push({ t: "fallo", lado: "e", de: ei, a: ai, esquiva: true }); return false; }
    if (a.egida) { a.egida = false; ev.push({ t: "egida", i: ai, de: ei }); return false; }
    var el = M.multElemento(e.el, a.el), d = dano(e.atk, mult, el, a.def, rng), parada = false;
    if (a.res && a.res[e.el]) d = Math.max(1, Math.round(d * (1 - a.res[e.el])));
    if (tiene(e, "quemadura")) d = Math.round(d * 0.9);
    if (e.presencia > a.estr) d = Math.round(d * Math.pow(1.25, e.presencia - a.estr));
    if (tiene(a, "debilidad")) d = Math.round(d * 1.3);
    if (tiene(a, "defensa")) d = Math.round(d * 0.7);
    if (tiene(a, "barrera") && a.barreraEl === e.el) d = Math.round(d * 0.4);
    if (tiene(a, "sueno")) { d = Math.round(d * 1.5); delete a.es.sueno; ev.push({ t: "estado-fin", lado: "a", i: ai, n: "sueno" }); }
    if (a.guardia) { parada = !!avisado; d = Math.round(d * (parada ? M.CFG.parada : M.CFG.guardia)); }
    if (m.prot) d = Math.round(d * (1 - m.prot));
    if (tope) d = Math.min(d, Math.round(a.max * tope * (a.guardia ? M.CFG.parada : 1)));   // el especial de un jefe castiga a todo el grupo, pero no borra de un golpe a un eco entero
    d = Math.max(1, d);
    // Juego limpio: un eco que empezó el turno enemigo casi entero no cae por golpes que no se veían venir. Se queda en las últimas.
    if (M.CFG.justo && !avisado && a.sano === st.turno && d >= a.hp) d = Math.max(0, a.hp - Math.max(1, Math.round(a.max * 0.05)));
    a.hp = Math.max(0, a.hp - d); subirBB(a, parada ? 30 : 5);
    ev.push({ t: "golpe", lado: "e", de: ei, a: ai, d: d, el: el, guardia: a.guardia, parada: parada, fuerte: !!avisado });
    if (a.hp <= 0 && m.cerrojo && !a.usoCerrojo) { a.usoCerrojo = true; a.hp = 1; a.cerrado = st.turno; ev.push({ t: "aguanta", i: ai, n: "Cerrojo de Dentro", hp: 1 }); }
    if (a.hp <= 0 && m.ultima && !a.usoUltima) { a.usoUltima = true; a.hp = Math.max(1, Math.round(a.max * 0.01)); ev.push({ t: "aguanta", i: ai, n: "Última luz", hp: a.hp }); }
    if (a.hp <= 0 && m.brote && !a.usoBrote) { a.usoBrote = true; a.hp = Math.round(a.max * 0.3); a.es = {}; ev.push({ t: "aguanta", i: ai, n: "Rebrote", hp: a.hp }); }
    if (a.hp > 0 && a.hp < a.max * 0.3 && m.aliento2 && !a.usoAliento) { a.usoAliento = true; sanar(st, ev, ai, Math.round(a.max * m.aliento2)); }
    if (a.hp > 0 && a.hp < a.max * 0.25) st.aliados.forEach(function (x) { if (a.hp < a.max * 0.25 && x !== a && x.vivo && x.m && x.m.vigilia && rng() < x.m.vigilia) sanar(st, ev, ai, Math.round(a.max * 0.15)); });
    if (a.hp <= 0) {
      a.vivo = false; a.bb = 0; a.es = {}; ev.push({ t: "cae", lado: "a", i: ai });
      var gr = st.aliados.filter(function (x) { return x.vivo && x.m && x.m.gracia && !x.usoGracia; })[0];
      if (gr) { gr.usoGracia = true; a.vivo = true; a.hp = Math.round(a.max * 0.25); a.actuo = true; ev.push({ t: "revive", i: ai }); }
    }
    return true;
  }

  // Decide por el jugador cuando está en automático.
  // opc.fijo: enemigo elegido por el jugador (se respeta mientras siga en pie).
  // opc.raf: "rafaga" lanza la ráfaga en cuanto puede, "super" espera a la súper, "no" solo ataca.
  M.auto = function (st, opc) {
    opc = opc || {}; var modoRaf = opc.raf || "rafaga";
    var fijo = opc.fijo != null && st.enemigos[opc.fijo] && st.enemigos[opc.fijo].vivo ? opc.fijo : -1;
    function lanzar(a, i) { return { tipo: modoRaf === "super" ? "super" : "rafaga", i: i }; }
    var cargando = -1, marcados = {};
    st.enemigos.forEach(function (e, k) { if (e.vivo && e.carga) cargando = k; if (e.vivo && e.marca >= 0 && e.patron[e.paso % e.patron.length] === "r") marcados[e.marca] = 1; });
    for (var i = 0; i < st.aliados.length; i++) {
      var a = st.aliados[i]; if (!a.vivo || a.actuo || inmovil(a)) continue;
      // quien toca a rebato espera a que los demás hayan actuado: así los hace actuar dos veces
      if (a.bbdef.ef && a.bbdef.ef.rebato && a.bb >= 100 && modoRaf !== "no" && st.aliados.some(function (x, j) { return j !== i && x.vivo && !x.actuo && !inmovil(x); })) continue;
      var raiz = tiene(a, "enraizado"), puedeRaf = modoRaf !== "no" && a.bb >= (modoRaf === "super" ? 200 : 100) && !raiz;
      if (marcados[i] && !raiz) return { tipo: "guardia", i: i };
      if (puedeRaf && a.bbdef.tipo === "apoyo" && (cargando >= 0 || !tiene(a, "defensa") && !tiene(a, "barrera") && !tiene(a, "rafaga"))) return lanzar(a, i);
      if (cargando >= 0) {
        // los últimos en actuar y los heridos se cubren; el resto intenta romper la carga
        var quedan = st.aliados.filter(function (x) { return x.vivo && !x.actuo; }).length;
        if ((a.hp < a.max * 0.75 || quedan <= 2) && !raiz) return { tipo: "guardia", i: i };
        st.objetivo = fijo >= 0 ? fijo : cargando;
        if (puedeRaf && a.bbdef.tipo !== "cura" && a.bbdef.tipo !== "apoyo") return lanzar(a, i);
        return { tipo: "atacar", i: i };
      }
      if (puedeRaf && a.bbdef.tipo !== "apoyo") {
        if (a.bbdef.tipo !== "cura") { if (fijo >= 0) st.objetivo = fijo; return lanzar(a, i); }
        var heridos = st.aliados.filter(function (x) { return x.vivo && (x.hp < x.max * 0.65 || M.estadosDe(x).some(function (k) { return M.ESTADOS[k].malo; }) && (a.bbdef.ef || {}).limpia); }).length;
        if (heridos) return lanzar(a, i);
      }
      if (fijo >= 0) { st.objetivo = fijo; return { tipo: "atacar", i: i }; }
      var mejor = -1, punt = -Infinity;
      st.enemigos.forEach(function (e, k) {
        if (!e.vivo) return; var p = -e.hp / e.max;
        var act = e.patron[e.paso % e.patron.length]; if (act === "c" || act === "gr") p += 0.6; if (e.escudo) p -= 2; if (e.aturdido > 0) p += 0.5;
        if (p > punt) { punt = p; mejor = k; }
      });
      st.objetivo = mejor; return { tipo: "atacar", i: i };
    }
    return { tipo: "fin" };
  };

  M.recompensas = function (save, st, rng) {
    var F = st.fase, g = F.ge, clave = F.secreta ? "S:" + F.secreta : M.clave(F.r, F.a, F.f, F.t), primera = !save.hechas[clave] && !F.arena;
    var r = { oro: Math.round(90 + g * 12), xp: Math.round(M.CFG.xpBase + g * M.CFG.xpPorFase), gemas: 0, fragmentos: 0, pocion: 0, ascua: 0, subidas: [], seUne: null, primera: primera };
    var pg = M.PREMIO_GRADO[F.t || 0];
    r.oro = Math.round(r.oro * pg.oro); r.xp = Math.round(r.xp * pg.xp);
    if (primera) r.gemas = Math.round((F.granJefe ? 30 : (F.jefe ? 12 : 3)) * pg.gemas); else if (rng() < 0.2) r.gemas = 1;
    if (primera && F.t && F.jefe && !F.secreta) { save.medallas = (save.medallas || 0) + F.t; r.medallas = (r.medallas || 0) + F.t; }
    if (F.jefe) r.fragmentos = primera ? (F.granJefe ? 6 : 4) : 1; else if (rng() < 0.25) r.fragmentos = 1;
    if (rng() < 0.35) r.pocion = 1;
    if (F.jefe && primera) r.ascua = 1;
    r.bono = r.xp; save.xpBanco = (save.xpBanco || 0) + r.bono;
    save.oro += r.oro; save.gemas += r.gemas; save.fragmentos += r.fragmentos; save.pociones += r.pocion; save.ascuas += r.ascua;
    save.escuadron.forEach(function (id) { var n = M.darXp(save.unidades[id], save.unidades[id].lv < F.lvl ? r.xp * 2 : r.xp, id); if (n) r.subidas.push({ id: id, lv: save.unidades[id].lv }); });
    // los ecos que se quedan en la plaza aprenden la mitad
    Object.keys(save.unidades).forEach(function (id) { if (save.escuadron.indexOf(id) < 0) M.darXp(save.unidades[id], Math.round(r.xp * 0.5), id); });
    if (primera) { save.hechas[clave] = 1; var id = (F.t || F.secreta) ? null : D.SE_UNE[clave]; if (id) { r.seUne = id; r.seUneNuevo = M.unir(save, id); } }
    r.mats = M.botin(save, F, primera, rng); anotarBestias(save, F);
    function dar(idm, n) { r.mats[idm] = (r.mats[idm] || 0) + n; save.mats[idm] = (save.mats[idm] || 0) + n; }
    if (F.secreta) {
      var sc = M.secreta(F.secreta);
      if (sc.tipo === "evento") { if (primera) {
          save.gemas += sc.f === 4 ? 20 : 5; r.gemas += sc.f === 4 ? 20 : 5;
          if (sc.f === 4) { var ecoEv = M.EVENTO.zonas[sc.z].eco; save.medallas = (save.medallas || 0) + 2; r.medallas = (r.medallas || 0) + 2; if (M.unir(save, ecoEv)) { r.seUne = ecoEv; r.seUneNuevo = true; var un = save.unidades[ecoEv]; un.lv = Math.min(M.maxNivel(un, ecoEv), Math.max(1, M.EVENTO.zonas[sc.z].lvl - 2)); } } } }
      else if (sc.tipo === "recuerdo") { if (primera) { var ur = save.unidades[sc.eco]; if (ur) ur.res = Math.max(ur.res || 0, 1); save.gemas += 10; r.gemas += 10; save.medallas = (save.medallas || 0) + 1; r.medallas = (r.medallas || 0) + 1; r.recuerdo = sc.eco; } }
      else if (sc.tipo === "vecino") { if (primera) { save.medallas = (save.medallas || 0) + 2; r.medallas = (r.medallas || 0) + 2; save.gemas += 15; r.gemas += 15; } }
      else if (sc.tipo === "torre") {
        if (primera) { save.torre = Math.max(save.torre || 0, F.torre); r.torre = F.torre; if (F.torre % 5 === 0) dar("sello_incursion", 1); if (F.torre % 10 === 0) { save.medallas = (save.medallas || 0) + 2; r.medallas = (r.medallas || 0) + 2; } }
      } else if (sc.tipo === "arena") {
        cuenta(save); var antes = M.rangoArena(save).i; save.arena.v++; var ahora = M.rangoArena(save);
        r.arena = { v: save.arena.v, rango: ahora.n, sube: ahora.i > antes, gemas: ahora.i > antes ? M.RANGOS[ahora.i].gemas : 0 };
        if (r.arena.gemas) { save.gemas += r.arena.gemas; r.gemas += r.arena.gemas; }
      } else if (sc.tipo === "eco") { if (primera) { r.seUne = sc.heroe; r.seUneNuevo = M.unir(save, sc.heroe); } else if (rng() < 0.3) { save.medallas = (save.medallas || 0) + 1; r.medallas = 1; } }
      else { dar("sello_incursion", primera ? 3 : 1); M.elementosDeFase(F).forEach(function (E) { if (rng() < 0.25) dar("leg_" + E.toLowerCase() + "_" + (1 + Math.floor(rng() * 3)), 1); }); if (rng() < 0.5) dar("trofeo_" + F.r, 1); }
    }
    if (primera && F.jefe && !F.secreta && F.exigencia !== undefined && (F.a === 4 || F.a === 1 || F.a === 3)) { var md = F.granJefe ? 3 : 1; save.medallas = (save.medallas || 0) + md; r.medallas = (r.medallas || 0) + md; }
    if (primera && !F.secreta && !F.t) {
      r.llaves = M.LLAVES_GRANJA.filter(function (x) { return x.fase === clave; }).map(function (x) { save.granja.llaves[x.id] = (save.granja.llaves[x.id] || 0) + 1; return x.id; });
    }
    if (st.cmp) { save.stats = save.stats || {}; var cmp = save.stats.cmp = save.stats.cmp || { n: 0, ok: 0, casi: 0, lejos: 0 }; ["n", "ok", "casi", "lejos"].forEach(function (k) { cmp[k] += st.cmp[k] || 0; }); }
    inc(save, "victorias", 1); inc(save, "chispas", st.chispas || 0); inc(save, "rafagas", st.rafagas || 0);
    var nEn = 0; F.olas.forEach(function (o) { nEn += o.length; }); inc(save, "criaturas", nEn);
    if (st.aliados.every(function (x) { return x.vivo; })) inc(save, "limpias", 1);
    if (F.torre && r.torre) inc(save, "torre", 1); if (F.arena) inc(save, "arena", 1);
    // ¿se ha abierto alguna misión secreta con esta victoria?
    if (primera && !F.secreta && !F.t) r.secretas = M.SECRETAS.filter(function (s) { return s.req === clave; });
    return r;
  };
  // ---------- huerto ----------
  // Una cosecha cada 20 minutos de reloj, juegues o no. Cada cosecha trae de todo: pociones, un ascua y remedios.
  // El abono sube el nivel: más cantidad y más posibilidades de que salga además un objeto raro.
  M.GRANJA = { ciclo: 20 * 60 * 1000, maxNivel: 9, llaves: { abono: "Saco de abono" } };
  // Qué fase entrega abono la primera vez que se supera (solo en Normal).
  M.LLAVES_GRANJA = [{ id: "abono", fase: "0-1-4" }, { id: "abono", fase: "0-3-4" }];
  for (var rg = 1; rg < 8; rg++) M.LLAVES_GRANJA.push({ id: "abono", fase: rg + "-4-4" });
  M.dondeLlave = function (id) {
    return M.LLAVES_GRANJA.filter(function (x) { return x.id === id; }).map(function (x) { var p = x.fase.split("-"); return { fase: x.fase, texto: D.ZONAS[+p[0]].n + ", " + D.ZONAS[+p[0]].areas[+p[1]] }; });
  };
  M.cosechaDe = function (nivel) {   // lo que trae una cosecha a ese nivel
    var k = nivel - 1, m = Math.floor(k / 3);
    return { pocion: 5 + k, ascua: 1 + m, remedio: [2 + m, 3 + m], raro: 0.06 * k };
  };
  M.capGranja = function (nivel) { return 2 + Math.ceil(nivel / 3); };
  M.huerto = function (save, ahora) {
    var g = save.granja, cap = M.capGranja(g.nivel), listas = Math.min(cap, Math.floor((ahora - g.t) / M.GRANJA.ciclo));
    return { listas: listas, cap: cap, falta: listas >= cap ? 0 : M.GRANJA.ciclo - ((ahora - g.t) % M.GRANJA.ciclo) };
  };
  M.cosechar = function (save, ahora, rng) {
    var g = save.granja, e = M.huerto(save, ahora); if (e.listas < 1) return null;
    var q = M.cosechaDe(g.nivel), r = { cosechas: e.listas, objetos: {} }; inc(save, "cosechas", e.listas);
    function dar(t, n) { if (n > 0) { r.objetos[t] = (r.objetos[t] || 0) + n; M.darObjeto(save, t, n); } }
    for (var k = 0; k < e.listas; k++) {
      dar("pocion", q.pocion); dar("ascua", q.ascua); dar("remedio", q.remedio[0] + Math.floor(rng() * (q.remedio[1] - q.remedio[0] + 1)));
      if (rng() < q.raro) dar(["pocionM", "ascuaM", "elixir"][Math.floor(rng() * 3)], 1);
    }
    // si estaba lleno, el reloj arranca ahora; si no, conserva lo que llevaba recorrido
    g.t = e.listas >= e.cap ? ahora : g.t + e.listas * M.GRANJA.ciclo;
    return r;
  };
  M.mejorarGranja = function (save) {
    var g = save.granja; if (g.nivel >= M.GRANJA.maxNivel || !(g.llaves.abono > 0)) return false;
    g.llaves.abono--; g.nivel++; return true;
  };

  // Materiales: cada elemento suelta los suyos. Para conseguir piezas de Brasa hay que vencer a monstruos de Brasa.
  M.elementosDeFase = function (F) {
    var s = {}; F.olas.forEach(function (o) { o.forEach(function (e) { s[baseEnemigo(e.id).el] = 1; }); }); return Object.keys(s);
  };
  M.PROB_LEG = function (F) { return [0.03, 0.04, 0.05][F.t || 0]; };   // 3 % en Normal, 4 % en Difícil, 5 % en Eclipse
  // Veta del lugar: además de lo que sueltan sus monstruos, cada lugar da materiales de un elemento fijo que va rotando.
  // Así los seis elementos se consiguen desde las dos primeras regiones, y ninguno queda reservado para el final.
  M.vetaDe = function (F) {
    if (F.arena) return null;
    if (F.torre) return D.ELEMENTOS[F.torre % 6];
    return D.ELEMENTOS[(F.r * 5 + F.a) % 6];
  };
  M.vetas = function (E) {   // en qué lugares está la veta de un elemento
    var L = []; D.ZONAS.forEach(function (z, r) { z.areas.forEach(function (n, a) { if (D.ELEMENTOS[(r * 5 + a) % 6] === E) L.push({ r: r, a: a, n: n, region: z.n }); }); }); return L;
  };
  M.botin = function (save, F, primera, rng) {
    var out = {}; save.mats = save.mats || {};
    function dar(id, n) { out[id] = (out[id] || 0) + n; save.mats[id] = (save.mats[id] || 0) + n; }
    var veta = M.vetaDe(F), els = M.elementosDeFase(F);
    if (veta) els = els.filter(function (x) { return x !== veta; }).concat([veta]);
    els.forEach(function (E) {
      var e = E.toLowerCase(), esVeta = E === veta;
      if (rng() < (esVeta ? 0.7 : 0.45)) dar("mat_" + e + "_1", F.jefe || esVeta ? 2 : 1);
      if ((F.ge >= 25) && rng() < (F.t ? 0.28 : 0.18)) dar("mat_" + e + "_2", 1);
      if ((F.jefe && rng() < (F.granJefe ? 0.6 : 0.25)) || (F.t === 2 && !F.jefe && rng() < 0.08)) dar("mat_" + e + "_3", 1);
      if (rng() < M.PROB_LEG(F)) dar("leg_" + e + "_" + (1 + Math.floor(rng() * 3)), 1);
    });
    if (F.granJefe && (primera || rng() < 0.15)) dar("trofeo_" + F.r, 1);
    return out;
  };
  // ---------- forja ----------
  M.tiene = function (save, itemId) { return (save.items && save.items[itemId]) || 0; };
  M.puestos = function (save, itemId) {
    var n = 0; Object.keys(save.unidades).forEach(function (id) { var u = save.unidades[id]; if (u.arma === itemId) n++; if (u.equipo === itemId) n++; }); return n;
  };
  M.libres = function (save, itemId) { return M.tiene(save, itemId) - M.puestos(save, itemId); };
  M.faltaPara = function (save, itemId) {
    var it = D.ITEMS[itemId], f = []; save.mats = save.mats || {};
    if (it.leyenda) return [M.tiene(save, itemId) ? "Solo puede existir una" : "Solo sale del arcón del altar"];
    if (it.unico && M.tiene(save, itemId)) return ["Solo puede existir una"];
    if (save.oro < it.receta.oro) f.push("oro");
    for (var m in it.receta.mats) if ((save.mats[m] || 0) < it.receta.mats[m]) f.push(D.MATS[m].n);
    return f;
  };
  M.forjar = function (save, itemId) {
    var it = D.ITEMS[itemId]; if (!it || M.faltaPara(save, itemId).length) return false;
    save.oro -= it.receta.oro; for (var m in it.receta.mats) save.mats[m] -= it.receta.mats[m];
    save.items = save.items || {}; save.items[itemId] = (save.items[itemId] || 0) + 1; inc(save, "forjas", 1); return true;
  };
  // Las armas solo las empuña un eco de su mismo elemento. El equipo lo lleva cualquiera.
  M.puedeLlevar = function (heroeId, itemId) { var it = D.ITEMS[itemId]; return !!it && (it.tipo !== "arma" || !it.el || it.el === D.HEROES[heroeId].el); };
  M.equipar = function (save, heroeId, hueco, itemId) {
    var u = save.unidades[heroeId]; if (!u) return false;
    if (!itemId) { delete u[hueco]; return true; }
    var it = D.ITEMS[itemId]; if (!it || it.tipo !== hueco || !M.puedeLlevar(heroeId, itemId)) return false;
    if (u[hueco] === itemId) return true;
    if (M.libres(save, itemId) < 1) return false;
    u[hueco] = itemId; return true;
  };
  // Árbol de elementos: a quién vence cada uno, quién lo vence y en qué regiones viven sus monstruos.
  M.arbol = function () {
    return D.ELEMENTOS.map(function (E) {
      var debil = D.ELEMENTOS.filter(function (x) { return D.FUERTE[x] === E; })[0];
      var regiones = []; D.ZONAS.forEach(function (z, r) {
        var n = z.comunes.concat(z.subjefes, [z.jefe]).filter(function (id) { return D.ENEMIGOS[id].el === E; }).length; if (n) regiones.push({ r: r, n: z.n, cuantos: n });
      });
      regiones.sort(function (a, b) { return b.cuantos - a.cuantos; });
      return { el: E, vence: D.FUERTE[E], cae: debil, regiones: regiones };
    });
  };
  M.PRECIOS = { pocion: 120, remedio: 200, ascua: 600, fragmento: 1500 };
  M.comprar = function (save, tipo) {
    var p = M.PRECIOS[tipo]; if (!p || save.oro < p) return false;
    save.oro -= p; if (tipo === "fragmento") save.fragmentos++; else M.darObjeto(save, tipo, 1); return true;
  };
  // ---------- tienda ----------
  // Cuatro escaparates: la oferta de hoy, objetos, materiales y lo que se paga con gemas. Lo caro se abre según avanzas.
  M.catalogo = function (save) {
    cuenta(save); var reg = M.regionesHechas(save), esc = 1 + reg, comp = save.diario.compras = save.diario.compras || {};
    function art(id, clase, ref, precio, moneda, extra) { var a = { id: id, clase: clase, ref: ref, precio: precio, moneda: moneda || "oro" }; for (var k in extra) a[k] = extra[k]; return a; }
    var objetos = [art("o:pocion", "objeto", "pocion", 120), art("o:remedio", "objeto", "remedio", 200), art("o:ascua", "objeto", "ascua", 600),
      art("o:pocionM", "objeto", "pocionM", 900, "oro", { pide: 2 }), art("o:elixir", "objeto", "elixir", 1500, "oro", { pide: 2 }), art("o:ascuaM", "objeto", "ascuaM", 1800, "oro", { pide: 3 }),
      art("x:fragmento", "fragmento", null, 1500)];
    var mats = [];
    [1, 2, 3].forEach(function (n) { D.ELEMENTOS.forEach(function (E) { mats.push(art("m:mat_" + E.toLowerCase() + "_" + n, "mat", "mat_" + E.toLowerCase() + "_" + n, [150, 600, 2200][n - 1], "oro", { pide: [0, 2, 5][n - 1] })); }); });
    var gemas = [art("x:medalla", "medalla", null, 25, "gemas"), art("x:oro", "oro", null, 10, "gemas", { cant: 2500 * esc }), art("x:bono", "bono", null, 10, "gemas", { cant: 400 * esc }),
      art("m:sello_incursion", "mat", "sello_incursion", 15, "gemas", { pide: 1 }), art("x:abono", "abono", null, 40, "gemas", { agotado: save.granja.nivel + (save.granja.llaves.abono || 0) >= M.GRANJA.maxNivel })];
    // oferta de hoy: tres cosas rebajadas, una vez cada una
    var h = 7; for (var i = 0; i < HOY.length; i++) h = (h * 33 + HOY.charCodeAt(i)) >>> 0;
    // Mezcla bien los bits antes de elegir: con la cuenta sencilla de antes, dos días seguidos caían en la misma casilla y la oferta no cambiaba nunca.
    function rnd(n) { h = (h + 0x6D2B79F5) >>> 0; var t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return Math.floor(((t ^ (t >>> 14)) >>> 0) / 4294967296 * n); }
    function reb() { return [0.2, 0.25, 0.3, 0.35, 0.4, 0.5][rnd(6)]; }   // la rebaja también cambia cada día: del 20 al 50 %
    var armas = Object.keys(D.ITEMS).filter(function (k) { var it = D.ITEMS[k]; return it.oficio && it.nivel <= (reg >= 3 ? 2 : 1); }), w = armas[rnd(armas.length)];
    var o2 = objetos.filter(function (a) { return a.clase === "objeto" && (a.pide || 0) <= reg; }), ob = o2[rnd(o2.length)];
    var m2 = mats.filter(function (a) { return (a.pide || 0) <= reg; }), mt = m2[rnd(m2.length)];
    var r1 = reb(), r2 = reb(), r3 = reb(), nL = [3, 5, 8][rnd(3)], nM = [4, 6, 10][rnd(3)], pA = D.ITEMS[w].nivel === 1 ? 1300 : 4000;
    var hoy = [art("h:arma", "item", w, Math.round(pA * (1 - r1) / 10) * 10, "oro", { rebaja: r1 }),
      art("h:lote", "objeto", ob.ref, Math.round(ob.precio * nL * (1 - r2) / 10) * 10, "oro", { cant: nL, rebaja: r2 }), art("h:mats", "mat", mt.ref, Math.round(mt.precio * nM * (1 - r3) / 10) * 10, "oro", { cant: nM, rebaja: r3 })];
    hoy.forEach(function (a) { a.unaVez = true; a.agotado = !!comp[a.id]; });
    [objetos, mats, gemas].forEach(function (L) { L.forEach(function (a) { a.cerrado = (a.pide || 0) > reg; }); });
    return { hoy: hoy, objetos: objetos, mats: mats, gemas: gemas };
  };
  M.comprarArt = function (save, id, veces) {
    var C = M.catalogo(save), a = null; ["hoy", "objetos", "mats", "gemas"].forEach(function (s) { C[s].forEach(function (x) { if (x.id === id) a = x; }); });
    if (!a || a.cerrado || a.agotado) return 0; veces = a.unaVez ? 1 : Math.max(1, veces || 1);
    var puede = Math.min(veces, Math.floor((a.moneda === "gemas" ? save.gemas : save.oro) / a.precio)); if (puede < 1) return 0;
    if (a.moneda === "gemas") save.gemas -= a.precio * puede; else save.oro -= a.precio * puede;
    var n = (a.cant || 1) * puede;
    if (a.clase === "objeto") M.darObjeto(save, a.ref, n);
    else if (a.clase === "mat") save.mats[a.ref] = (save.mats[a.ref] || 0) + n;
    else if (a.clase === "item") { save.items = save.items || {}; save.items[a.ref] = (save.items[a.ref] || 0) + 1; }
    else if (a.clase === "fragmento") save.fragmentos += n;
    else if (a.clase === "medalla") save.medallas = (save.medallas || 0) + n;
    else if (a.clase === "oro") save.oro += n;
    else if (a.clase === "bono") save.xpBanco = (save.xpBanco || 0) + n;
    else if (a.clase === "abono") save.granja.llaves.abono = (save.granja.llaves.abono || 0) + n;
    if (a.unaVez) save.diario.compras[a.id] = 1;
    return puede;
  };
  M.poder = function (id, u) { var s = M.stats(id, u); return s.hp + s.atk * 3 + s.def; };
  M.mejorEscuadron = function (save) {
    var orden = Object.keys(save.unidades).sort(function (a, b) { return M.poder(b, save.unidades[b]) - M.poder(a, save.unidades[a]); }), eq = orden.slice(0, 6);
    // un escuadrón sin nadie que cure se queda sin aire en los combates largos: si tienes un sanador, entra
    function es(id, t) { return D.HEROES[id].bb.tipo === t; }
    ["cura", "apoyo"].forEach(function (t) {
      if (eq.length < 6 || eq.some(function (id) { return es(id, t); })) return;
      var c = orden.filter(function (id) { return es(id, t); })[0]; if (!c) return;
      for (var k = eq.length - 1; k >= 0; k--) if (!es(eq[k], "cura") && !es(eq[k], "apoyo")) { eq[k] = c; break; }
    });
    return eq;
  };

  root.AURIA_MOTOR = M;
  if (typeof module !== "undefined") module.exports = M;
})(typeof window !== "undefined" ? window : globalThis);
