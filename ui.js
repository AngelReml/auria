/* Auria: pantalla. Dibuja el juego y coloca el arte que haya en assets/. Lo que falte se ve con un marcador provisional. */
(function () {
  var D = window.AURIA_DATOS, M = window.AURIA_MOTOR;
  var app = document.getElementById("app");
  var CLAVE = "auria-partida-2";
  var ARTE = {};          // manifiesto de assets/: nombre -> { pix: 0|1 }
  var S = null;           // partida
  var V = { n: "plaza", region: 0, eco: null, forja: "equipar", grado: 0, zona: null, secreta: null, altar: "ecos" };
  var rng = Math.random;

  // ---------- utilidades ----------
  function h(tag, attrs, kids) {
    var e = document.createElement(tag), k;
    if (attrs) for (k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else if (k === "on") e.addEventListener("click", attrs[k]);
      else if (k === "style") e.style.cssText = attrs[k];
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c != null && c !== false) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function url(n) { return "assets/" + n + ".webp"; }
  function hay(n) { return !!ARTE[n]; }
  // Estilo de fondo para una imagen por su nombre, esté suelta o dentro de una lámina (los iconos van juntos en láminas).
  function bg(n) {
    var A = ARTE[n]; if (!A || !A.atl) return "background-image:url(" + url(n) + ")";
    return "background-image:url(" + url(A.atl) + ");background-size:" + (A.cols * 100) + "% " + (A.rows * 100) + "%;background-position:" + (A.c / (A.cols - 1) * 100) + "% " + (A.r / (A.rows - 1) * 100) + "%;background-repeat:no-repeat";
  }
  // Además de la partida, se guarda una copia de seguridad al día. Si la partida se estropea, se arranca desde la copia.
  function guardar() {
    try {
      var txt = JSON.stringify(S); localStorage.setItem(CLAVE, txt);
      var d = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem(CLAVE + "-copia-dia") !== d) { localStorage.setItem(CLAVE + "-copia", txt); localStorage.setItem(CLAVE + "-copia-dia", d); }
    } catch (e) {}
  }
  function leer(k) { try { var s = JSON.parse(localStorage.getItem(k) || "null"); if (s && s.v === 2 && s.unidades) return M.migrar(s); } catch (e) {} return null; }
  function cargar() { return leer(CLAVE) || leer(CLAVE + "-copia"); }
  function textoPartida() { return btoa(unescape(encodeURIComponent(JSON.stringify(S)))); }
  function partidaDeTexto(t) { var s = JSON.parse(decodeURIComponent(escape(atob(String(t).trim())))); if (s.v !== 2 || !s.unidades) throw 0; return M.migrar(s); }
  function hash(str) { var x = 2166136261; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }

  // Marcador provisional: una criatura de píxeles simétrica, distinta para cada nombre.
  var cacheMarca = {};
  function marcador(id, color, grande) {
    var key = id + color; if (cacheMarca[key]) return cacheMarca[key];
    var n = 12, c = document.createElement("canvas"); c.width = c.height = n;
    var g = c.getContext("2d"), s = hash(id);
    function r() { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }
    for (var y = 1; y < n; y++) for (var x = 0; x < n / 2; x++) {
      var dentro = Math.abs(x - n / 2 + 0.5) < (grande ? 5.5 : 4.5) * Math.sin((y / n) * Math.PI * 0.95 + 0.25) + 1;
      if (dentro && r() < 0.78) {
        var t = r();
        g.fillStyle = t < 0.25 ? "#1b1622" : color; g.fillRect(x, y, 1, 1); g.fillRect(n - 1 - x, y, 1, 1);
        if (t > 0.75) { g.fillStyle = "rgba(255,255,255,.3)"; g.fillRect(x, y, 1, 1); g.fillRect(n - 1 - x, y, 1, 1); }
      }
    }
    g.fillStyle = "#fff"; g.fillRect(4, 4, 1, 1); g.fillRect(7, 4, 1, 1);
    return (cacheMarca[key] = c.toDataURL());
  }
  // Sprite de combate. pose: 0 reposo, 1 prepara, 2 ataca, 3 golpeado, 4 especial, 5 derrotado.
  // Aspecto despierto: los ecos normales lo estrenan con la quinta estrella. Los de leyenda ya llegan con cinco, así que lo estrenan al recuperar su recuerdo.
  function despierta(id) { var u = S && S.unidades[id]; if (!u) return false; return M.esLeyenda(id) ? (u.res || 0) >= 1 : M.estrellas(id, u) >= 5; }
  function sprite(id, el, pose, despierto, grande) {
    if (D.ENEMIGOS[id] && D.ENEMIGOS[id].arte) id = D.ENEMIGOS[id].arte;   // criaturas que comparten dibujo con otra
    var hoja = (despierto && hay("bat_" + id + "_2")) ? "bat_" + id + "_2" : "bat_" + id;
    var d = h("div", { class: "arte" });
    if (hay(hoja)) {
      d.style.backgroundImage = "url(" + url(hoja) + ")"; d.style.backgroundSize = "300% 200%";
      d.style.backgroundPosition = ((pose % 3) * 50) + "% " + (pose < 3 ? 0 : 100) + "%";
      if (ARTE[hoja].pix) d.classList.add("pix");
      d.dataset.hoja = "1";
    } else if (hay("ilu_" + id)) {
      d.style.backgroundImage = "url(" + url("ilu_" + id) + ")"; d.dataset.ilu = "1";
    } else {
      d.style.backgroundImage = "url(" + marcador(id, D.COLOR[el] || "#999", grande) + ")"; d.classList.add("pix");
    }
    return d;
  }
  function ilustracion(id, el, despierto) {
    var n = (despierto && hay("ilu_" + id + "_2")) ? "ilu_" + id + "_2" : "ilu_" + id;
    if (hay(n)) return h("div", { class: "arte", style: "background-image:url(" + url(n) + ")" });
    return sprite(id, el, 0, despierto);
  }
  var EXPR = { neutral: 0, alegre: 1, enfadado: 2, triste: 3, sorprendido: 4, decidido: 5 };
  function retrato(id, expr) {
    if (id.indexOf("e:") === 0 && !hay("exp_" + id.slice(2)) && hay("ret_" + id.slice(2))) {   // jefes y subjefes con retrato propio para los diálogos
      var dr = h("div", { class: "arte ret" }); dr.style.backgroundImage = "url(" + url("ret_" + id.slice(2)) + ")"; dr.style.backgroundSize = "contain"; dr.style.backgroundPosition = "center bottom"; dr.style.backgroundRepeat = "no-repeat"; return dr;
    }
    if (id.indexOf("e:") === 0 && !hay("exp_" + id.slice(2))) { var en = D.ENEMIGOS[id.slice(2)]; return sprite(id.slice(2), en.el, 0, false, en.jefe); }
    if (id.indexOf("e:") === 0) id = id.slice(2);   // un rival con cara propia (expresiones) habla como cualquier personaje
    var el = D.HEROES[id] ? D.HEROES[id].el : null, d;
    if (hay("exp_" + id)) {
      var c = EXPR[expr] || 0; d = h("div", { class: "arte" });
      d.style.backgroundImage = "url(" + url("exp_" + id) + ")"; d.style.backgroundSize = "300% 200%";
      d.style.backgroundPosition = ((c % 3) * 50) + "% " + (c < 3 ? 0 : 100) + "%"; return d;
    }
    if (hay("ilu_" + id)) { d = h("div", { class: "arte busto", style: "background-image:url(" + url("ilu_" + id) + ");background-size:300%;background-position:" + ((ARTE["ilu_" + id].cara || [55, 0])[0]) + "% " + ((ARTE["ilu_" + id].cara || [55, 0])[1]) + "%" }); return d; }
    var nombre = D.HEROES[id] ? D.HEROES[id].n : (D.NOMBRES[id] || "?");
    var col = D.COLOR[el] || "#b3a8c2";
    d = h("div", { class: "arte pix prov", style: "background-color:" + col + ";background-image:url(" + marcador(id, "#17131f") + ");background-size:70%;background-position:center 60%" });
    return d;
  }
  function fondo(nombre, cielo) {
    var f = h("div", { class: "fondo" });
    if (hay(nombre)) { f.style.backgroundImage = "url(" + url(nombre) + ")"; if (ARTE[nombre].pix) f.style.imageRendering = "pixelated"; }
    else if (cielo) f.style.background = "linear-gradient(180deg," + cielo[0] + " 0%," + cielo[1] + " 58%," + cielo[2] + " 58%," + cielo[2] + " 100%)";
    return f;
  }
  function icono(nombre, letra, color) {
    var i = h("span", { class: "ico" });
    var A = ARTE[nombre];
    if (A && A.atl) {   // pieza de una lámina: se enseña solo su casilla
      i.style.backgroundImage = "url(" + url(A.atl) + ")"; i.style.backgroundSize = (A.cols * 100) + "% " + (A.rows * 100) + "%";
      i.style.backgroundPosition = (A.c / (A.cols - 1) * 100) + "% " + (A.r / (A.rows - 1) * 100) + "%"; i.style.imageRendering = A.pix ? "pixelated" : "auto";
    }
    else if (A) i.style.backgroundImage = "url(" + url(nombre) + ")"; else { i.style.background = color; i.textContent = letra; }
    return i;
  }
  function estrellas(n) {
    if (!hay("ico_estrella")) return h("span", { class: "estrellas", text: "★★★★★★★".slice(0, n) });
    var s = h("span", { class: "estrellas estr", "aria-label": n + " estrellas" }); for (var i = 0; i < n; i++) s.appendChild(h("i", { style: "background-image:url(" + url("ico_estrella") + ")" })); return s;
  }
  function punto(el) {
    var n = "ico_emblema_" + String(el).toLowerCase();
    if (hay(n)) return h("span", { class: "punto emb", style: bg(n), title: el });
    return h("span", { class: "punto", style: "background:" + D.COLOR[el], title: el });
  }
  function fondoDe(caja, nombre, velo) { // pone una pantalla ilustrada detrás de una vista, oscurecida para que se lea
    if (hay(nombre)) caja.style.background = "linear-gradient(rgba(23,19,31," + (velo == null ? 0.78 : velo) + "),rgba(23,19,31," + (velo == null ? 0.9 : Math.min(1, velo + 0.12)) + ")),url(" + url(nombre) + ") center/cover";
  }
  function marcoCarta(n, id) { var k = id && M.esLeyenda(id) && hay("ui_marco_carta_leyenda") ? "ui_marco_carta_leyenda" : "ui_marco_carta_" + Math.max(2, Math.min(5, n)); return hay(k) ? h("div", { class: "marco", style: "background-image:url(" + url(k) + ")" }) : null; }
  function medidor(v, max, cls) { var m = h("div", { class: "medidor " + (cls || "") }, [h("i")]); m.firstChild.style.width = Math.max(0, Math.min(100, 100 * v / max)) + "%"; return m; }

  // ---------- armazón ----------
  function barra(titulo) {
    return h("div", { class: "barra" }, [h("div", { class: "tit", text: titulo }),
      h("div", { class: "rec" }, [icono("ico_oro", "O", "#f0c24a"), h("span", { text: String(S.oro) })]),
      h("div", { class: "rec" }, [icono("ico_gema", "G", "#8f8cf0"), h("span", { text: String(S.gemas) })]),
      h("div", { class: "rec" }, [icono(hay("ico_medalla_eco") ? "ico_medalla_eco" : "ico_recuerdo_completo", "M", "#e6c46a"), h("span", { text: String(S.medallas || 0) })])]);
  }
  var PEST = [["plaza", "Plaza", "ico_sello_gremio"], ["mapa", "Mapa", "ico_menu_misiones"], ["ecos", "Ecos", "ico_menu_ecos"], ["altar", "Altar", "ico_menu_altar"], ["forja", "Forja", "ico_menu_forja"], ["granja", "Huerto", "ico_mat_bosque_1"], ["tienda", "Tienda", "ico_menu_tienda"]];
  function nav() {
    return h("nav", { class: "nav" }, PEST.map(function (p) {
      return h("button", { type: "button", "aria-current": V.n === p[0] ? "page" : null, on: function () { ir(p[0]); } },
        [hay(p[2]) ? h("i", { class: "nico", style: bg(p[2]) }) : null, h("span", { text: p[1] }),
         p[0] === "granja" && cosechasListas() ? h("b", { class: "globo", text: String(cosechasListas()) }) : null]);
    }));
  }
  var SON = window.AURIA_SON || { ini: function () {}, fx: function () {}, vibra: function () {}, musica: function () {}, ajustar: function () {}, ajustes: function () { return {}; } };
  // Telón: al entrar o salir de un combate dos hojas oscuras se abren sobre la pantalla nueva. No retrasa nada: solo se ve.
  function telon() {
    var t = h("div", { class: "telon" }, [h("i"), h("i")]); document.body.appendChild(t); SON.fx("telon"); setTimeout(function () { t.remove(); }, 620);
  }
  function ir(n, extra) {
    var antes = V.n, cruza = (antes === "combate") !== (n === "combate") && antes !== "titulo";
    V.n = n; if (extra) for (var k in extra) V[k] = extra[k]; pintar();
    if (cruza) telon();
    else if (antes !== n) { var cu = app.querySelector(".cuerpo"); if (cu) cu.classList.add("llega"); }
  }
  function musicaDeVista() { SON.musica(V.n === "titulo" ? null : (V.n === "combate" && C ? (C.st.fase.jefe || C.st.fase.arena ? "jefe" : "combate") : "plaza")); }
  // sonido de cada suceso del combate
  function sonar(e) {
    if (e.t === "golpe") {
      if (e.lado === "a") { SON.fx(e.chispa ? "chispa" : (e.el > 1 ? "fuerte" : ((e.el < 1 || e.escudo) ? "flojo" : "golpe"))); if (e.chispa) SON.vibra(12); }
      else { SON.fx(e.guardia ? "guardia" : "dano"); SON.vibra(e.guardia ? 15 : 35); }
    }
    else if (e.t === "cura" || e.t === "revive" || e.t === "limpia") SON.fx("cura");
    else if (e.t === "cae") { SON.fx("cae"); if (e.lado === "a") SON.vibra(80); }
    else if (e.t === "ruptura") { SON.fx("ruptura"); SON.vibra([20, 30, 40]); }
    else if (e.t === "fase2" || e.t === "rabia") { SON.fx("fase2"); SON.vibra([60, 50, 120]); }
    else if (e.t === "estado") SON.fx(M.ESTADOS[e.n] && M.ESTADOS[e.n].malo ? "estado" : "mejora");
    else if (e.t === "guardia" || e.t === "egida" || e.t === "aguanta") SON.fx("guardia");
    else if (e.t === "fallo") SON.fx("flojo");
  }
  function pintar() {
    app.textContent = "";
    var f = { titulo: vTitulo, plaza: vPlaza, mapa: vMapa, ecos: vEcos, eco: vEco, talentos: vTalentos, diario: vDiario, bestiario: vBestiario, torre: vTorre, arena: vArena, encargos: vEncargos, logros: vLogros, evento: vEvento, altar: vAltar, forja: vForja, tienda: vTienda, granja: vGranja, combate: vCombate }[V.n];
    // Si una pantalla falla al pintarse, no se queda en blanco: se dice qué ha pasado y se ofrece una salida, con la partida a salvo.
    try { f(); } catch (e) { pantallaRota(V.n, e); return; }
    if (V.n === "combate") { pintarConsejo(); marcarPrimero(); } musicaDeVista(); recordarSitio();
    var atras = { eco: "ecos", talentos: "eco", diario: "plaza", bestiario: "plaza", torre: "plaza", arena: "plaza", encargos: "plaza", logros: "plaza", evento: "plaza" }[V.n];
    if (atras) { var p0 = app.querySelector(".cuerpo .pad"); if (p0) p0.style.paddingTop = "58px"; }
    if (atras) app.appendChild(h("button", { class: "volver-fijo", type: "button", "aria-label": "Volver", on: function () { ir(atras); } }, [h("span", { text: "‹" })]));
  }
  // Si la pantalla se recarga sola (el móvil recupera memoria, llega una versión nueva...), el juego vuelve a donde estabas en vez de al título.
  // Se apunta la pantalla en la que estás y, en combate, cómo va la pelea cada vez que te toca a ti.
  var SITIO = CLAVE + "-sitio", PELEA = CLAVE + "-pelea", MIN_SITIO = 30 * 60000;
  function recordarSitio() {
    try {
      if (V.n === "titulo") return;
      localStorage.setItem(SITIO, JSON.stringify({ t: Date.now(), V: V }));
      if (V.n !== "combate") localStorage.removeItem(PELEA);
    } catch (e) {}
  }
  function recordarPelea() {
    try {
      if (V.n !== "combate" || !C || C.st.fin) { if (V.n !== "combate") localStorage.removeItem(PELEA); return; }
      if (C.ocupado || C.enCurso) return;
      localStorage.setItem(PELEA, JSON.stringify({ t: Date.now(), st: C.st, auto: !!C.auto })); localStorage.setItem(SITIO, JSON.stringify({ t: Date.now(), V: V }));
    } catch (e) {}
  }
  setInterval(recordarPelea, 1500);
  function reanudar() {
    try {
      var s = JSON.parse(localStorage.getItem(SITIO) || "null"); if (!s || !s.V || Date.now() - s.t > MIN_SITIO) return false;
      var vistas = { plaza: 1, mapa: 1, ecos: 1, eco: 1, altar: 1, forja: 1, granja: 1, tienda: 1, torre: 1, arena: 1, encargos: 1, logros: 1, diario: 1, bestiario: 1, evento: 1, ajustes: 1 };
      for (var k in s.V) V[k] = s.V[k];
      if (V.eco && !S.unidades[V.eco]) V.eco = null;
      if (s.V.n === "combate") {
        var p = JSON.parse(localStorage.getItem(PELEA) || "null");
        if (p && p.st && !p.st.fin && Date.now() - p.t < MIN_SITIO) {
          C = { st: p.st, modo: null, ocupado: false, auto: false, rapido: PREF.rapido, vis: null, timers: [], enCurso: 0, pedirFin: false, t0: performance.now() };
          sincronizar(); V.n = "combate"; pintar(); if (V.n === "combate" && C) { rotulo("Sigues donde estabas", "bien"); return true; }
          C = null;
        }
        V.n = "mapa";
      } else V.n = vistas[s.V.n] && (s.V.n !== "eco" || V.eco) ? s.V.n : "plaza";
      pintar(); return true;
    } catch (e) { C = null; return false; }
  }
  function pantallaRota(vista, e) {
    try { if (window.console) console.error("Auria: fallo al pintar " + vista, e); } catch (x) {}
    window.AURIA_UI_ERROR = (vista || "?") + ": " + (e && e.message ? e.message : e);
    app.textContent = "";
    var ta = h("textarea", { "aria-label": "Texto de la partida", style: "width:100%;min-height:70px" });
    app.appendChild(h("div", { class: "capa centro" }, [h("div", { class: "caja" }, [
      h("h2", { text: "Esta pantalla ha fallado" }),
      h("p", { class: "tenue", text: "Tu partida está guardada y no se ha perdido nada. Vuelve a la plaza; si falla otra vez, copia la partida y enséñale a Claude el texto de abajo." }),
      h("p", { class: "tenue", style: "font-family:monospace;font-size:12px;word-break:break-word", text: window.AURIA_UI_ERROR }),
      ta,
      h("div", { class: "fila" }, [
        h("button", { class: "btn sec", type: "button", text: "Copiar la partida", on: function (ev) { try { ta.value = textoPartida(); ta.select(); navigator.clipboard.writeText(ta.value); ev.currentTarget.textContent = "Copiada"; } catch (x) { ev.currentTarget.textContent = "Cópiala a mano"; } } }),
        h("button", { class: "btn", type: "button", text: "Volver a la plaza", on: function () { C = null; V.n = vista === "plaza" ? "mapa" : "plaza"; pintar(); } })])])]));
  }
  function marco(titulo, cuerpo) { app.appendChild(barra(titulo)); app.appendChild(cuerpo); app.appendChild(nav()); }

  function siguienteFase() {
    for (var r = 0; r < 8; r++) for (var a = 0; a < 5; a++) for (var f = 0; f < 5; f++) if (!S.hechas[M.clave(r, a, f)]) return [r, a, f];
    return null;
  }

  // ---------- portada ----------
  function vTitulo() {
    var p = h("button", { class: "portada", type: "button", "aria-label": "Empezar", on: function () { ir("plaza"); } });
    p.appendChild(fondo("pan_titulo", ["#4a3a6a", "#d08a4a", "#3a2f3f"]));
    p.appendChild(h("div", { class: "portada-velo" }));
    p.appendChild(h("div", { class: "sobre portada-txt" }, [
      hay("ui_emblema_juego") ? h("div", { class: "emblema", style: "background-image:url(" + url("ui_emblema_juego") + ")" }) : null,
      h("h1", { text: "Auria" }), h("p", { text: "Toca para empezar" })]));
    app.appendChild(p);
  }

  // ---------- plaza ----------
  // La plaza es la pantalla principal: desde aquí se llega a todo. Arriba, por dónde vas; en medio, lo de hoy y los edificios; abajo, los vecinos.
  function capaVecino(v) {
    var nombre = D.NOMBRES[v.id] || v.id, g = v.regalo;
    function icoRegalo() { return g[0] === "oro" ? icono("ico_oro", "O", "#f0c24a") : (g[0] === "gemas" ? icono("ico_gema", "G", "#8f8cf0") : (g[0] === "bono" ? icono(pref("ico_bono_experiencia", "ei_xx_07"), "B", "#63c7c0") : (g[0] === "fragmento" ? icono("ico_fragmento_recuerdo", "F", "#e6c46a") : icoObj(g[0])))); }
    var capa = h("div", { class: "capa centro info", on: function () { capa.remove(); pintar(); } }, [h("div", { class: "caja vec-ficha", on: function (ev) { ev.stopPropagation(); } }, [
      h("div", { class: "fila" }, [caraPeq(hay("pla_" + v.id) ? h("div", { class: "arte", style: "background-image:url(" + url("pla_" + v.id) + ");background-size:cover" }) : retrato(v.id, "neutral"), 64, true),
        h("div", { style: "flex:1" }, [h("h2", { text: nombre }), v.nota ? h("small", { class: "tenue", text: v.nota }) : null])]),
      h("p", { class: "vec-dice", text: "«" + v.texto + "»" }),
      g ? h("div", { class: "vec-fila2" + (v.regalado ? " hecho" : "") }, [h("div", { class: "meta-ico" }, [icoRegalo()]),
        h("div", { class: "meta-txt" }, [h("b", { text: "Regalo de hoy" }), h("small", { text: g[2] })]),
        v.regalado ? h("span", { class: "hecho", text: "✓" }) : h("button", { class: "btn peq", type: "button", text: "Coger", on: function () { var r = M.regaloVecino(S, v.id); if (r) { SON.fx("premio"); guardar(); capa.remove(); capaVecino(M.vecinos(S).filter(function (x) { return x.id === v.id; })[0]); } } })]) : null,
      v.mis ? h("div", { class: "vec-fila2" + (v.mis.hecha ? " hecho" : "") }, [h("div", { class: "meta-ico" }, [icono("ico_menu_misiones", "M", "#d8c8a0")]),
        h("div", { class: "meta-txt" }, [h("b", { text: "Su encargo: " + v.mis.n }), h("small", { text: v.mis.abierta ? v.mis.d : "Te lo pedirá cuando hayas soltado " + v.mis.pide + (v.mis.pide === 1 ? " región." : " regiones.") })]),
        v.mis.hecha ? h("span", { class: "hecho", text: "✓" }) : h("button", { class: "btn peq", type: "button", disabled: !v.mis.abierta, text: "Ir", on: function () { capa.remove(); empezarSecreta("vec:" + v.id); } })]) : null,
      h("button", { class: "btn sec", type: "button", text: "Cerrar", on: function () { capa.remove(); pintar(); } })])]);
    app.appendChild(capa);
  }
  function vPlaza() {
    M.usarDia(hoy());
    var c = h("div", { class: "cuerpo" }), p = h("div", { class: "plaza hub" });
    p.appendChild(fondo("pan_plaza_gremio", ["#4a3a6a", "#d08a4a", "#3a2f3f"]));
    if (!hay("pan_plaza_gremio")) p.appendChild(h("div", { class: "sol" }));
    p.appendChild(h("div", { class: "velo" }));
    var sig = siguienteFase(), cont = h("div", { class: "sobre", style: "display:flex;flex-direction:column;gap:12px" }), reg = M.regionesHechas(S);
    // cabecera: por dónde vas
    var cab = h("div", { class: "hub-cab" }, [h("div", { class: "fila" }, [hay("ui_emblema_juego") ? h("div", { class: "emblema peq", style: "background-image:url(" + url("ui_emblema_juego") + ")" }) : null,
      h("div", { style: "flex:1" }, [h("h1", { text: "Auria" }), h("div", { class: "hub-cap", text: S.final ? "Final: " + D.FINALES[S.final].n : (sig ? "Capítulo " + (sig[0] + 1) + " · " + D.ZONAS[sig[0]].n : "Historia completa") })])]),
      h("div", { class: "hub-prog" }, D.ZONAS.map(function (z, r) { return h("i", { class: r < reg ? "on" : (sig && r === sig[0] ? "ahora" : ""), title: z.n }); }))]);
    if (sig) { var F = M.fase(sig[0], sig[1], sig[2]); cab.appendChild(h("button", { class: "btn hub-seguir", type: "button", on: function () { empezarFase(sig[0], sig[1], sig[2], 0); } }, [h("small", { text: "Continuar la historia" }), h("b", { text: F.nombre })])); }
    cont.appendChild(cab);
    // lo de hoy
    var pen = M.pendientes(S), enc = M.encargos(S), nEnc = enc.filter(function (e) { return e.cobrado; }).length, cos = cosechasListas(), L = consejos();
    function hoyTarj(ico, letra, titulo, sub, aviso, fn) { return h("button", { class: "hoy" + (aviso ? " pide" : ""), type: "button", on: fn }, [icono(ico, letra, "#d8c8a0"), h("b", { text: titulo }), h("small", { text: sub })]); }
    cont.appendChild(h("div", { class: "hoy-fila" }, [
      hoyTarj(pref("ico_encargos", "ico_menu_correo"), "E", "Encargos", nEnc + " de 3", pen.encargos, function () { ir("encargos"); }),
      hoyTarj(pref("ico_cosecha", "ico_mat_bosque_1"), "H", "Huerto", cos ? cos + (cos > 1 ? " cosechas" : " cosecha") : "Creciendo", cos, function () { ir("granja"); }),
      hoyTarj("ico_menu_tienda", "T", "Oferta", "Cambia hoy", M.catalogo(S).hoy.some(function (a) { return !a.agotado; }), function () { ir("tienda", { tienda: "hoy" }); }),
      hoyTarj("ico_menu_objetivo", "!", "Mejorar", L.length ? L.length + (L.length > 1 ? " ideas" : " idea") : "Al día", L.length, function () { var cj = cajaConsejos("Qué puedes mejorar ahora", 6); if (!cj) return; var cp = h("div", { class: "capa centro", on: function () { cp.remove(); } }, [cj]); app.appendChild(cp); })]));
    // edificios: todo lo que hay, con su icono
    var evA = M.eventoAbierto(S), evR = M.eventoResumen(S);
    var tA = M.torreAbierta(S), aA = M.arenaAbierta(S), bt = M.bestiario(S), bv = bt.reduce(function (s, z) { return s + z.vistos; }, 0);
    function edif(vista, ico, letra, nombre, sub, abierto, aviso, extra) {
      return h("button", { class: "edif" + (abierto ? "" : " cerrado"), type: "button", "aria-disabled": abierto ? null : "true", on: function () { if (!abierto) return; if (typeof vista === "function") vista(); else ir(vista, extra); } },
        [h("div", { class: "edif-ico" }, [icono(ico, letra, "#d8c8a0")]), h("b", { text: nombre }), h("small", { text: sub }), aviso ? h("i", { class: "globo", text: String(aviso) }) : null]);
    }
    var conPuntos = S.escuadron.filter(function (id) { return M.puntosTalento(id, S.unidades[id]).libres > 0; }).length;
    cont.appendChild(h("div", { class: "edificios" }, [
      edif("mapa", "ico_menu_misiones", "M", "Mapa", "Historia", true, 0),
      edif("ecos", "ico_menu_ecos", "E", "Ecos", Object.keys(S.unidades).filter(function (k) { return !M.esLeyenda(k) && !M.esSecreto(k); }).length + " de " + Object.keys(D.HEROES).filter(function (k) { return !M.esLeyenda(k) && !M.esSecreto(k); }).length, true, conPuntos),
      edif("altar", "ico_menu_altar", "A", "Altar", S.gemas >= M.COSTE_INVOCAR ? Math.floor(S.gemas / M.COSTE_INVOCAR) + " llamadas" : "Faltan gemas", true, S.gemas >= M.COSTE_INVOCAR ? Math.floor(S.gemas / M.COSTE_INVOCAR) : 0),
      edif("forja", "ico_menu_forja", "F", "Forja", "Armas y equipo", true, 0),
      edif("torre", pref("ico_torre", "ico_menu_arena"), "T", "Torre", tA ? "Piso " + M.pisoTorre(S) : "Tras las Colinas", tA, 0),
      edif("arena", "ico_ficha_arena", "A", "Arena", aA ? M.rangoArena(S).n : "Tras las Minas", aA, 0),
      edif("logros", pref("ico_logros", "ico_cofre_dorado"), "L", "Logros", "Metas", true, pen.logros),
      edif("evento", "ico_fragmento_recuerdo", "O", "Otro mundo", evA ? evR.ecos + " de 5 ecos" : "Tras las Colinas", evA, evA && evR.hechas < 25 && !S.vistas.evento ? 1 : 0),
      edif("diario", "ico_menu_archivo", "D", "Diario", "La historia", true, 0),
      edif("bestiario", "ico_menu_logros", "B", "Bestiario", bv + " criaturas", true, 0),
      edif("granja", "ico_mat_bosque_1", "H", "Huerto", "Cada 20 min", true, cos),
      edif("tienda", "ico_menu_tienda", "T", "Tienda", "Cuatro puestos", true, 0),
      edif(capaPartida, "ico_menu_ajustes", "P", "Ajustes", "Sonido y partida", true, 0)]));
    // vecinos
    var vec = M.vecinos(S);
    cont.appendChild(h("div", { class: "caja vecinos" }, [h("h2", { text: "Vecinos" }),
      h("div", { class: "vec-fila" }, vec.map(function (v) {
        var nuevo = !S.vistas[v.clave] || v.aviso;
        return h("button", { class: "vecino" + (nuevo ? " nuevo" : ""), type: "button", "aria-label": (D.NOMBRES[v.id] || v.id) + (nuevo ? ", tiene algo para ti" : ""), on: function () { S.vistas[v.clave] = 1; guardar(); capaVecino(v); } },
          [caraPeq(hay("pla_" + v.id) ? h("div", { class: "arte", style: "background-image:url(" + url("pla_" + v.id) + ");background-size:cover;background-position:center" }) : retrato(v.id, "neutral"), 54, true), h("span", { text: (D.NOMBRES[v.id] || v.id).replace(/^(Maestra|Capataz|Contramaestre|Ingeniera|Don|Abad|Escribano) /, "") })]);
      })),
      vec.length < 3 ? h("p", { class: "tenue", text: "Cada región que sueltas trae a alguien nuevo. Cada vecino te da algo al día y, con el tiempo, un encargo suyo." }) : null]));
    p.appendChild(cont); c.appendChild(p);
    marco("Plaza del gremio", c); FX.montar(p, 0);
    if (!S.vistas.intro) { S.vistas.intro = 1; guardar(); dialogo("intro", function () {}); }
  }
  // ---------- versión y actualizaciones ----------
  // En la aplicación de Android hay un puente (AuriaApp) que busca versiones nuevas, las baja y las aplica. En el navegador solo se enseña la versión.
  var VER = { v: 0, fecha: "" }, ACT = { fase: "", hechos: 0, total: 0, v: 0, msg: "" }, APP = window.AuriaApp || null;
  function appInfo() { try { return APP ? JSON.parse(APP.info()) : null; } catch (e) { return null; } }
  function textoAct() {
    if (ACT.fase === "buscando") return "Buscando…";
    if (ACT.fase === "bajando") return "Bajando la versión " + ACT.v + ": " + ACT.hechos + " de " + ACT.total;
    if (ACT.fase === "lista") return "Versión " + ACT.v + " lista";
    if (ACT.fase === "aldia") return "Tienes la última versión";
    if (ACT.fase === "sinurl") return "Aún no hay dirección de actualizaciones";
    if (ACT.fase === "error") return "No se pudo: " + (ACT.msg || "sin conexión");
    return "";
  }
  function avisoVersion() {
    var v = app.querySelector(".aviso-version"); if (v) v.remove();
    if (ACT.fase !== "lista" || (V.n === "combate" && C && !C.st.fin)) return;
    app.appendChild(h("div", { class: "aviso-version" }, [h("span", { text: "Hay versión nueva (" + ACT.v + ")" }),
      h("button", { class: "btn peq", type: "button", text: "Actualizar", on: function () { guardar(); try { APP.aplicar(); } catch (e) {} } }),
      h("button", { class: "chip", type: "button", text: "Luego", on: function (ev) { ev.currentTarget.parentNode.remove(); } })]));
  }
  window.AURIA_ACT = function (txt) {
    try { var o = typeof txt === "string" ? JSON.parse(txt) : txt; for (var k in o) ACT[k] = o[k]; } catch (e) { return; }
    var n = document.getElementById("act-estado"); if (n) n.textContent = textoAct();
    var b = document.getElementById("act-aplicar"); if (b) b.style.display = ACT.fase === "lista" ? "" : "none";
    if (ACT.fase === "lista") avisoVersion();
  };
  // El botón de atrás del móvil: cierra lo que haya abierto encima; si no, vuelve a la pantalla anterior. Devuelve false cuando ya no hay adónde volver.
  window.AURIA_ATRAS = function () {
    var capas = app.querySelectorAll(".capa"), c = capas[capas.length - 1];
    if (c && !c.classList.contains("resultado")) { c.remove(); return true; }
    if (V.n === "combate" || V.n === "titulo") return V.n === "combate";
    var atras = { eco: "ecos", talentos: "eco", diario: "plaza", bestiario: "plaza", torre: "plaza", arena: "plaza", encargos: "plaza", logros: "plaza", evento: "plaza" }[V.n];
    if (atras) { ir(atras); return true; }
    if (V.n !== "plaza") { ir("plaza"); return true; }
    return false;
  };
  // Tu compás: de los golpes que tocaste a mano y pudieron ser chispa, cuántos lo fueron y cuántos se quedaron cerca.
  function cajaCompas() {
    var c = (S.stats || {}).cmp; if (!c || !c.n) return h("div", {}, [h("h2", { text: "Tu compás" }), h("p", { class: "tenue", text: "Aún no hay datos. Juega algún combate a mano y aquí verás cuántas chispas clavas." })]);
    var p = function (x) { return Math.round(100 * x / c.n) + " %"; };
    return h("div", {}, [h("h2", { text: "Tu compás" }),
      h("p", { class: "tenue", text: "De " + c.n + " golpes tocados a mano que podían ser chispa: " + p(c.ok) + " lo fueron, " + p(c.casi) + " se quedaron cerca y " + p(c.lejos) + " lejos." })]);
  }
  function cajaVersion() {
    var I = appInfo(), fila = [h("p", { class: "tenue", text: "Versión " + (I ? I.version : VER.v) + (VER.fecha && !I ? " · " + VER.fecha : "") + (I ? " · aplicación " + I.app : "") })];
    if (!APP) return h("div", {}, [h("h2", { text: "Versión" })].concat(fila));
    fila.push(h("p", { class: "tenue", id: "act-estado", text: textoAct() }));
    fila.push(h("div", { class: "fila" }, [
      h("button", { class: "btn sec", type: "button", text: "Buscar actualización", on: function () { try { APP.buscar(); } catch (e) {} } }),
      h("button", { class: "btn", type: "button", id: "act-aplicar", style: ACT.fase === "lista" ? "" : "display:none", text: "Actualizar ahora", on: function () { guardar(); try { APP.aplicar(); } catch (e) {} } })]));
    var inp = h("input", { type: "url", class: "campo-url", "aria-label": "Dirección de actualizaciones", placeholder: "https://…", value: I ? I.url : "" });
    fila.push(h("details", { class: "act-url" }, [h("summary", { text: "Dirección de actualizaciones" }), inp,
      h("button", { class: "chip", type: "button", text: "Guardar dirección", on: function (ev) { try { APP.ponerUrl(inp.value.trim()); ev.currentTarget.textContent = "Guardada"; APP.buscar(); } catch (e) {} } })]));
    return h("div", {}, [h("h2", { text: "Versión" })].concat(fila));
  }
  function capaPartida() {
    var ta = h("textarea", { id: "txt-partida", "aria-label": "Texto de la partida" });
    var capa = h("div", { class: "capa centro" }, [h("div", { class: "caja" }, [
      h("h2", { text: "Sonido" }),
      h("div", { class: "chips sueltas envuelve" }, [["musica", "Música"], ["efectos", "Efectos"], ["vibra", "Vibración"]].map(function (x) {
        return h("button", { class: "chip", type: "button", "aria-pressed": String(SON.ajustes()[x[0]] !== false), text: x[1], on: function (ev) {
          var v = SON.ajustes()[x[0]] === false; SON.ajustar(x[0], v); ev.currentTarget.setAttribute("aria-pressed", String(v)); if (v) { SON.fx("premio"); if (x[0] === "vibra") SON.vibra(40); } musicaDeVista(); } });
      })),
      cajaCompas(),
      cajaVersion(),
      h("h2", { text: "Tu partida" }),
      h("p", { class: "tenue", text: "Se guarda sola en este navegador, con una copia de seguridad al día. Para llevarla a otro sitio o no perderla, guárdala en un archivo o copia el texto." }),
      ta,
      h("div", { class: "fila" }, [
        h("button", { class: "btn sec", type: "button", text: "Mostrar y copiar", on: function (ev) {
          ta.value = textoPartida(); ta.select();
          var b = ev.currentTarget;
          try { navigator.clipboard.writeText(ta.value).then(function () { b.textContent = "Copiada"; }, function () { b.textContent = "Cópiala a mano"; }); } catch (e) { b.textContent = "Cópiala a mano"; }
        } }),
        h("button", { class: "btn sec", type: "button", text: "Cargar la pegada", on: function (ev) {
          try { S = partidaDeTexto(ta.value); guardar(); capa.remove(); pintar(); }
          catch (e) { ev.currentTarget.textContent = "Ese texto no es una partida"; }
        } })]),
      h("div", { class: "fila" }, [
        h("button", { class: "btn sec", type: "button", text: "Guardar en archivo", on: function (ev) {
          var b = ev.currentTarget;
          if (APP && APP.compartir) { try { APP.compartir("auria-partida-" + new Date().toISOString().slice(0, 10) + ".txt", textoPartida()); } catch (e) { b.textContent = "No se pudo"; } return; }
          try {
            var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([textoPartida()], { type: "text/plain" }));
            a.download = "auria-partida-" + new Date().toISOString().slice(0, 10) + ".txt"; document.body.appendChild(a); a.click(); a.remove(); b.textContent = "Archivo guardado";
          } catch (e) { b.textContent = "Aquí no se puede: usa copiar"; }
        } }),
        (function () {
          var inp = h("input", { type: "file", accept: ".txt,text/plain", style: "display:none" }), lab = h("label", { class: "btn sec", text: "Cargar archivo" }, [inp]);
          inp.addEventListener("change", function () {
            var f = inp.files && inp.files[0]; if (!f) return;
            var fr = new FileReader(); fr.onload = function () { try { S = partidaDeTexto(fr.result); guardar(); capa.remove(); pintar(); } catch (e) { lab.firstChild.textContent = "Ese archivo no es una partida"; } }; fr.readAsText(f);
          });
          return lab;
        })()]),
      h("div", { class: "fila" }, [
        h("button", { class: "btn sec", type: "button", text: "Borrar y empezar de cero", on: function (ev) {
          var b = ev.currentTarget; if (b.dataset.ok) { S = M.nuevaPartida(); guardar(); capa.remove(); ir("plaza"); } else { b.dataset.ok = "1"; b.textContent = "Pulsa otra vez para borrar"; }
        } }),
        h("button", { class: "btn", type: "button", text: "Cerrar", on: function () { capa.remove(); } })])
    ])]);
    app.appendChild(capa);
  }

  // ---------- mapa ----------
  // La región se ve como un mapa: cinco lugares sobre el camino, y las misiones secretas cuando se descubren.
  var LUGARES = [[30, 86], [66, 70], [34, 52], [68, 34], [42, 14]];
  function zonaActual(r, t) {   // la primera zona con algo por hacer
    for (var a = 0; a < 5; a++) for (var f = 0; f < 5; f++) if (!S.hechas[M.clave(r, a, f, t)]) return a;
    return 4;
  }
  function vMapa() {
    var chips = h("div", { class: "chips", role: "group", "aria-label": "Regiones" }, D.ZONAS.map(function (z, r) {
      return h("button", { class: "chip", type: "button", "aria-pressed": String(V.region === r), disabled: !M.desbloqueada(S, r, 0, 0, 0), text: (r + 1) + ". " + z.n, on: function () { V.region = r; V.zona = null; if (!M.gradoAbierto(S, r, V.grado)) V.grado = 0; pintar(); } });
    }));
    if (!M.gradoAbierto(S, V.region, V.grado)) V.grado = 0;
    var t = V.grado, r = V.region, z = D.ZONAS[r];
    if (V.zona == null || V.zonaDe !== r + "@" + t) { V.zona = zonaActual(r, t); V.zonaDe = r + "@" + t; }
    var grados = h("div", { class: "chips grados", role: "group", "aria-label": "Dificultad" }, M.GRADOS.map(function (g, k) {
      return h("button", { class: "chip g" + k, type: "button", "aria-pressed": String(t === k), disabled: !M.gradoAbierto(S, r, k), text: g.n, on: function () { V.grado = k; V.zona = null; pintar(); } });
    }));
    var img = hay("reg_" + z.id) ? "reg_" + z.id : (hay("map_" + z.id + "_exterior") ? "map_" + z.id + "_exterior" : null);
    var lienzo = h("div", { class: "lienzo" + (img ? "" : " sin") });
    if (img) lienzo.style.backgroundImage = "url(" + url(img) + ")"; else lienzo.style.background = "linear-gradient(180deg," + z.cielo[0] + "," + z.cielo[1] + " 55%," + z.cielo[2] + ")";
    lienzo.appendChild(h("div", { class: "lienzo-velo" }));
    var zonaMapa = h("div", { class: "lienzo-mapa" }); lienzo.appendChild(zonaMapa);
    // el camino entre lugares
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("viewBox", "0 0 100 100"); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("class", "camino");
    var pl = document.createElementNS("http://www.w3.org/2000/svg", "polyline"); pl.setAttribute("points", LUGARES.map(function (p) { return p[0] + "," + p[1]; }).join(" ")); svg.appendChild(pl); zonaMapa.appendChild(svg);
    z.areas.forEach(function (nombre, a) {
      var hechas = 0; for (var f = 0; f < 5; f++) if (S.hechas[M.clave(r, a, f, t)]) hechas++;
      var abierta = M.desbloqueada(S, r, a, 0, t), sel = V.zona === a;
      zonaMapa.appendChild(h("button", { class: "lugar" + (sel ? " sel" : "") + (hechas === 5 ? " hecha" : "") + (a === 4 ? " jefe" : ""), type: "button", disabled: !abierta,
        style: "left:" + LUGARES[a][0] + "%;top:" + LUGARES[a][1] + "%", "aria-label": nombre + ", " + hechas + " de 5", on: function () { V.zona = a; pintar(); } },
        [h("span", { class: "pin", text: !abierta ? "" : (hechas === 5 ? "✓" : String(a + 1)) }), h("span", { class: "rot", text: abierta ? nombre : "???" })]));
    });
    // misiones secretas de esta región (solo en Normal y solo las descubiertas)
    if (!t) M.SECRETAS.filter(function (s) { return s.r === r && M.secretaAbierta(S, s.id); }).forEach(function (s) {
      var hecha = !!S.hechas["S:" + s.id], pos = s.tipo === "raid" ? [82, 10] : [84, 54];
      zonaMapa.appendChild(h("button", { class: "lugar secreta " + s.tipo + (hecha ? " hecha" : ""), type: "button", style: "left:" + pos[0] + "%;top:" + pos[1] + "%", "aria-label": s.n,
        on: function () { V.secreta = s.id; pintar(); } }, [h("span", { class: "pin", text: s.tipo === "raid" ? "☠" : "?" }), h("span", { class: "rot", text: s.tipo === "raid" ? "Incursión" : "Eco perdido" })]));
    });
    // rótulo del lugar elegido, escrito sobre el mapa, con sus cinco fases
    var a = V.zona, pie = h("div", { class: "lugar-pie" });
    if (V.secreta && M.secreta(V.secreta) && M.secreta(V.secreta).r === r && !t) {
      var s = M.secreta(V.secreta), F = M.faseSecreta(s.id);
      pie.appendChild(h("div", { class: "lugar-tit" }, [h("small", { text: z.n + " · misión secreta" }), h("h1", { text: s.n })]));
      pie.appendChild(h("p", { class: "lugar-txt", text: s.d + " Nivel " + F.lvl + "." + (S.hechas["S:" + s.id] ? " Ya la has superado." : "") }));
      pie.appendChild(h("div", { class: "fila" }, [h("button", { class: "btn sec", type: "button", text: "Volver", on: function () { V.secreta = null; pintar(); } }),
        h("button", { class: "btn", type: "button", text: "Entrar", on: function () { empezarSecreta(s.id); } })]));
    } else {
      V.secreta = null;
      var nodos = h("div", { class: "nodos" });
      for (var f = 0; f < 5; f++) (function (f) {
        var hecha = !!S.hechas[M.clave(r, a, f, t)], abierta = M.desbloqueada(S, r, a, f, t), F = M.fase(r, a, f, t);
        nodos.appendChild(h("button", { class: "nodo" + (hecha ? " hecha" : (abierta ? " abierta" : "")) + (f === 4 ? " jefe" : ""), type: "button", disabled: !abierta,
          "aria-label": z.areas[a] + " " + (f + 1) + (hecha ? ", hecha" : ""), on: function () { empezarFase(r, a, f, t); } },
          [f === 4 ? (a === 4 ? "Jefe" : "!") : String(f + 1), h("small", { text: "Nv " + F.lvl })]));
      })(f);
      pie.appendChild(h("div", { class: "lugar-tit" }, [h("small", { text: z.n + (t ? " · " + M.GRADOS[t].n : "") }), h("h1", { text: z.areas[a] })]));
      pie.appendChild(nodos);
      var pgr = M.PREMIO_GRADO[t];
      pie.appendChild(h("p", { class: "lugar-txt", text: t ? M.GRADOS[t].n + ": oro ×" + String(pgr.oro).replace(".", ",") + ", experiencia ×" + String(pgr.xp).replace(".", ",") + ", gemas ×" + String(pgr.gemas).replace(".", ",") + " la primera vez, medallas al vencer jefes y mejores materiales."
        : (M.lugarAbierto(S, r, a, 1) ? "Este lugar ya tiene versión Difícil: cámbiala arriba. Da más oro, experiencia, gemas y medallas." : "Completa las 5 fases de este lugar para abrir su versión Difícil, con mejores recompensas.") }));
    }
    lienzo.appendChild(pie);
    app.appendChild(barra("Mapa")); app.appendChild(chips); app.appendChild(grados); app.appendChild(lienzo); app.appendChild(nav());
    FX.montar(lienzo, r);
  }

  // ---------- ecos ----------
  // Ecos: arriba el escuadrón en seis huecos, abajo todos los ecos. Tocar mete o saca; "Ficha" abre el detalle.
  function fichaEco(id) {
    var u = S.unidades[id], b = D.HEROES[id], pos = S.escuadron.indexOf(id), en = pos >= 0, e = M.estrellas(id, u), Rc = M.recuerdo(S, id), recListo = Rc && Rc.abierto && !Rc.hecho;
    var card = h("div", { class: "ficha eleg" + (hay("ui_marco_carta_" + Math.max(2, Math.min(5, e))) ? " conmarco" : "") + (en ? " en" : "") + (V.cambio === id ? " elegida" : "") + (M.puedeAscender(S, id) ? " sube" : "") + (b.leyenda ? " leyenda" : ""), role: "button", tabindex: "0", "aria-pressed": String(en), style: "--c:" + D.COLOR[b.el],
      "aria-label": b.n + ". Toca para ver su ficha", on: function () { ir("eco", { eco: id }); } }, [
      h("div", { class: "img" }, [h("div", { class: "aura" }), ilustracion(id, b.el, despierta(id)), h("div", { class: "pie-velo" }), marcoCarta(e, id), b.leyenda ? h("i", { class: "sello-leyenda", text: "Leyenda" }) : null, recListo ? h("i", { class: "rec-aviso", "aria-label": "Tiene un recuerdo que revivir", text: "✦" }) : null]),
      h("button", { class: "puesto" + (en ? "" : " fuera"), type: "button", "aria-label": en ? "Sacar a " + b.n + " del escuadrón" : "Meter a " + b.n + " en el escuadrón", text: en ? String(pos + 1) : "+", on: function (ev) { ev.stopPropagation(); tocarEco(id); } }),
      h("div", { class: "nom" }, [b.n]), h("div", { class: "sub" }, [h("span", {}, [punto(b.el), " Nv " + u.lv]), estrellas(e)]),]);
    // en la rejilla el eco se ve un poco más de cerca, centrado en su cabeza; en la ficha sigue entero
    var ilu = (despierta(id) && hay("ilu_" + id + "_2")) ? "ilu_" + id + "_2" : "ilu_" + id, cab = ARTE[ilu] && ARTE[ilu].cab, ar = card.querySelector(".img .arte");
    if (cab && ar && card.className.indexOf("conmarco") >= 0) {
      var Z = 1.32, px = Math.max(0, Math.min(1, (Z * cab[0] - 0.5) / (Z - 1))), py = Math.max(0, Math.min(1, (cab[1] * Z * 1.5 - 0.1) / (Z * 1.5 - 1.3)));
      ar.style.backgroundSize = (Z * 100) + "% auto"; ar.style.backgroundPosition = (px * 100).toFixed(1) + "% " + (py * 100).toFixed(1) + "%";
    }
    card.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ir("eco", { eco: id }); } });
    return card;
  }
  function tocarEco(id) {
    var pos = S.escuadron.indexOf(id);
    if (pos >= 0) { if (S.escuadron.length > 1) S.escuadron.splice(pos, 1); V.cambio = null; }
    else if (S.escuadron.length < 6) { S.escuadron.push(id); V.cambio = null; }
    else V.cambio = V.cambio === id ? null : id;   // escuadrón lleno: queda elegido hasta que toques a quién sustituye
    guardar(); pintar();
  }
  function vEcos() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad" });
    if (V.cambio && (!S.unidades[V.cambio] || S.escuadron.indexOf(V.cambio) >= 0)) V.cambio = null;
    var huecos = h("div", { class: "equipo6" + (V.cambio ? " cambiando" : "") });
    for (var k = 0; k < 6; k++) (function (k) {
      var id = S.escuadron[k], b = id && D.HEROES[id];
      huecos.appendChild(h("button", { class: "eq-hueco" + (id ? " lleno" : ""), type: "button", disabled: !id && !V.cambio, "aria-label": id ? b.n + (V.cambio ? ". Toca para sustituirlo" : ". Toca para sacarlo") : "Hueco libre",
        on: function () {
          if (V.cambio) { if (id) S.escuadron[k] = V.cambio; else S.escuadron.push(V.cambio); V.cambio = null; }
          else if (id && S.escuadron.length > 1) S.escuadron.splice(k, 1);
          guardar(); pintar(); } },
        id ? [h("div", { class: "tc" }, [retrato(id, "neutral")]), h("span", {}, [punto(b.el), " " + b.n]), h("small", { text: "Nv " + S.unidades[id].lv })] : [h("div", { class: "tc vacio", text: "+" }), h("span", { text: "Libre" })]));
    })(k);
    var cuenta = {}; S.escuadron.forEach(function (id) { cuenta[D.HEROES[id].el] = (cuenta[D.HEROES[id].el] || 0) + 1; });
    var tipos = { cura: 0, apoyo: 0 }; S.escuadron.forEach(function (id) { var t = D.HEROES[id].bb.tipo; if (tipos[t] != null) tipos[t]++; });
    pad.appendChild(h("div", { class: "caja" }, [
      h("div", { class: "fila" }, [h("h2", { text: "Escuadrón " + S.escuadron.length + " de 6", style: "flex:1" }),
        h("button", { class: "chip", type: "button", text: "Los más fuertes", on: function () { S.escuadron = M.mejorEscuadron(S); V.cambio = null; guardar(); pintar(); } })]),
      huecos,
      h("div", { class: "fila tenue resumen" }, D.ELEMENTOS.filter(function (E) { return cuenta[E]; }).map(function (E) { return h("span", {}, [punto(E), " " + cuenta[E]]); }).concat([
        h("span", { class: tipos.cura ? "" : "falta", text: tipos.cura ? "Cura: " + tipos.cura : "Sin nadie que cure" }), h("span", { text: tipos.apoyo ? "Apoyo: " + tipos.apoyo : "" })])),
      V.cambio ? h("p", { class: "aviso-cambio", text: "¿A quién sustituye " + D.HEROES[V.cambio].n + "? Tócalo arriba." }) : null]));
    var filtro = V.filtroEl || null;
    pad.appendChild(h("div", { class: "chips sueltas", role: "group", "aria-label": "Filtrar por elemento" }, [h("button", { class: "chip", type: "button", "aria-pressed": String(!filtro), text: "Todos", on: function () { V.filtroEl = null; pintar(); } })].concat(
      D.ELEMENTOS.map(function (E) { return h("button", { class: "chip", type: "button", "aria-pressed": String(filtro === E), "aria-label": E, on: function () { V.filtroEl = filtro === E ? null : E; pintar(); } }, [punto(E), " " + E]); }))));
    var ids = Object.keys(S.unidades).filter(function (id) { return !filtro || D.HEROES[id].el === filtro; }).sort(function (a, b) {
      var ea = S.escuadron.indexOf(a) >= 0, eb = S.escuadron.indexOf(b) >= 0; if (ea !== eb) return ea ? -1 : 1;
      return M.poder(b, S.unidades[b]) - M.poder(a, S.unidades[a]);
    });
    pad.appendChild(ids.length ? h("div", { class: "rejilla" }, ids.map(fichaEco)) : h("p", { class: "tenue", text: "No tienes ecos de " + filtro + " todavía." }));
    pad.appendChild(h("p", { class: "tenue", text: "Tienes " + Object.keys(S.unidades).filter(function (k) { return !M.esLeyenda(k) && !M.esSecreto(k); }).length + " de " + Object.keys(D.HEROES).filter(function (k) { return !M.esLeyenda(k) && !M.esSecreto(k); }).length + " ecos, " + Object.keys(S.unidades).filter(M.esSecreto).length + " de 5 secretos, " + Object.keys(S.unidades).filter(M.esLeyenda).length + " de 6 leyendas y " + (S.medallas || 0) + " medallas de eco." }));
    c.appendChild(pad); fondoDe(c, "pan_escuadron"); marco("Ecos", c);
  }
  function vEco() {
    var id = V.eco, u = S.unidades[id], b = D.HEROES[id], st = M.stats(id, u), en = S.escuadron.indexOf(id) >= 0, e = M.estrellas(id, u);
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad detalle" });
    pad.appendChild(h("div", { class: "grande e" + e }, [h("div", { class: "halo", style: "--c:" + D.COLOR[b.el] }), ilustracion(id, b.el, despierta(id))]));
    pad.appendChild(h("div", {}, [h("h2", { text: b.n + ", " + b.t.charAt(0).toLowerCase() + b.t.slice(1) }),
      h("div", { class: "fila tenue" }, [punto(b.el), h("span", { text: b.el }), estrellas(e)])]));
    var cap = M.maxNivel(u, id);
    pad.appendChild(h("div", {}, [h("div", { class: "fila tenue", style: "justify-content:space-between" }, [h("span", { text: "Nivel " + u.lv + " de " + cap }), h("span", { text: u.lv >= cap ? "Al máximo" : u.xp + " / " + M.xpPara(u.lv) })]),
      medidor(u.lv >= cap ? 1 : u.xp, u.lv >= cap ? 1 : M.xpPara(u.lv), "xp")]));
    pad.appendChild(h("div", { class: "stats" }, [["Vida", st.hp], ["Ataque", st.atk], ["Defensa", st.def]].map(function (x) { return h("div", {}, [h("b", { text: String(x[1]) }), h("span", { text: x[0] })]); })));
    var pt = M.puntosTalento(id, u);
    pad.appendChild(h("button", { class: "btn" + (pt.libres > 0 ? " late" : " sec"), type: "button", text: pt.libres > 0 ? "Habilidades · " + pt.libres + (pt.libres === 1 ? " punto por gastar" : " puntos por gastar") : "Habilidades (" + pt.usados + " puntos puestos)", on: function () { ir("talentos"); } }));
    // bono de experiencia: lo guardado en los combates, para gastar en quien haga falta
    var banco = S.xpBanco || 0, mejor = 1; S.escuadron.forEach(function (k) { mejor = Math.max(mejor, S.unidades[k].lv); });
    function botonBono(texto, objetivo) {
      var llega = M.nivelConBono(S, id, objetivo), coste = llega > u.lv ? M.xpHastaNivel(u, id, llega) : 0;
      return h("button", { class: "btn sec", type: "button", disabled: llega <= u.lv, text: llega > u.lv ? texto + " → Nv " + llega + " (" + coste + ")" : texto, on: function () { if (M.usarBono(S, id, objetivo)) { guardar(); pintar(); } } });
    }
    pad.appendChild(h("div", { class: "caja" }, [h("div", { class: "fila" }, [h("h2", { text: "Bono de experiencia", style: "flex:1" }), h("b", { class: "bono-n", text: String(banco) })]),
      h("p", { class: "tenue", text: u.lv >= cap ? b.n + " ya está en su nivel máximo. Para seguir subiendo necesita otra estrella." : "Cada victoria guarda aquí tanta experiencia como gana un eco. Gástala en quien quieras: sirve para poner al día a un eco nuevo." + (u.lv < cap && M.xpHastaNivel(u, id, u.lv + 1) > banco ? " Para el siguiente nivel faltan " + (M.xpHastaNivel(u, id, u.lv + 1) - banco) + "." : "") }),
      u.lv >= cap ? null : h("div", { class: "fila" }, [botonBono("+1 nivel", u.lv + 1), botonBono("+5 niveles", u.lv + 5)]),
      u.lv >= cap || mejor <= u.lv ? null : botonBono("Igualar a tu mejor eco (Nv " + mejor + ")", mejor)]));
    var tipo = M.textoRafaga(id);
    var hits = b.hits + (e >= 5 ? 1 : 0), rit = M.ritmo(id, hits);
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Ráfaga: " + b.bb.n }), h("p", { class: "tenue", text: tipo }),
      h("h2", { text: "Su compás: " + hits + (hits === 1 ? " golpe" : " golpes") }),
      h("div", { class: "compas grande" }, rit.map(function (ms) { return h("i", { style: "left:" + Math.min(98, ms / 8) + "%" }); })),
      h("p", { class: "tenue", text: "Cada punto es un golpe desde que lo tocas: el primero cae a los " + (rit[0] / 1000).toFixed(2).replace(".", ",") + " s. Si un golpe suyo coincide con el de otro eco sobre el mismo enemigo, salta una chispa y ese golpe pega el doble." })]));
    // lo que gana en cada estrella
    var filas = [3, 4, 5].map(function (n) {
      var rg = M.RASGOS[b.bb.tipo][n], tiene = e >= n;
      return h("div", { class: "rasgo" + (tiene ? " on" : "") }, [h("b", {}, [estrellas(n), " " + rg.n]), h("span", { text: rg.d })]);
    });
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Qué gana con cada estrella" })].concat(filas).concat([h("p", { class: "tenue", text: "Cada estrella sube además su tope de nivel 20 niveles y su fuerza un 25 %. Con 5 estrellas cambia de aspecto." })])));
    pad.appendChild(huecosEquipo(id));
    var R = M.recuerdo(S, id);
    if (R) pad.appendChild(h("div", { class: "caja recuerdo-caja" + (R.hecho ? " hecho" : (R.abierto ? " listo" : "")) }, [
      h("div", { class: "fila" }, [h("h2", { text: "Recuerdo", style: "flex:1" }), R.hecho ? h("span", { class: "hecho", text: "✓ +5 %" }) : null]),
      h("p", { class: "recuerdo-tit", text: R.abierto || R.hecho ? "«" + R.n + "»" : "«…»" }),
      R.hecho ? h("button", { class: "btn sec", type: "button", text: "Volver a leerlo", on: function () { conversar(R.apertura.concat(R.cierre), { sobre: true, cuadros: {} }, function () {}); } })
        : (R.abierto ? h("div", {}, [h("p", { class: "tenue", text: "Un combate a su nivel, con " + b.n + " en el escuadrón. Al recuperarlo gana un 5 % de vida, ataque y defensa para siempre" + (b.leyenda ? " y cambia de aspecto" : "") + ", y tú 10 gemas y una medalla." }),
            h("button", { class: "btn", type: "button", text: "Revivir el recuerdo", on: function () {
              if (S.escuadron.indexOf(id) < 0) { if (S.escuadron.length >= 6) S.escuadron[S.escuadron.length - 1] = id; else S.escuadron.push(id); guardar(); }
              empezarSecreta("rec:" + id); } })])
          : h("p", { class: "tenue", text: R.falta }))]));
    if (e < 5) {
      var co = M.costeAscender(u, id), puede = M.puedeAscender(S, id);
      pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Subir a " + (e + 1) + " estrellas" }),
        (function () {
          var L = [{ ico: pref("ico_nivel", "ei_es_07"), letra: "N", color: "#f0c24a", cant: "Nv " + u.lv + "/" + co.nivel, n: "Nivel necesario", d: b.n + " tiene que llegar al nivel " + co.nivel + ". Sube combatiendo o con el bono de experiencia.", falta: u.lv < co.nivel },
            PREMIO.medallas((S.medallas || 0) + "/" + co.medallas), PREMIO.oro(co.oro)];
          L[1].falta = (S.medallas || 0) < co.medallas; L[1].r = 0; L[1].d += " Salen de los ecos repetidos del Altar, de fundir 4 fragmentos y de vencer jefes por primera vez."; L[2].falta = S.oro < co.oro;
          L.forEach(function (o) { o.mini = 1; }); return rejilla(L, "fila-mini");
        })(),
        h("button", { class: "btn", type: "button", disabled: !puede, text: puede ? "Subir estrella" : (u.lv < co.nivel ? "Le falta llegar al nivel " + co.nivel : ((S.medallas || 0) < co.medallas ? "Te faltan medallas" : "Te falta oro")), on: function () { if (M.ascender(S, id)) { guardar(); pintar(); } } })]));
    }
    var solo = en && S.escuadron.length === 1, lleno = !en && S.escuadron.length >= 6;
    pad.appendChild(h("div", { class: "fila" }, [
      h("button", { class: "btn", type: "button", disabled: solo || lleno, text: en ? (solo ? "Es el único del escuadrón" : "Sacar del escuadrón") : (lleno ? "Escuadrón lleno" : "Meter en el escuadrón"),
        on: function () { if (en) S.escuadron.splice(S.escuadron.indexOf(id), 1); else S.escuadron.push(id); guardar(); pintar(); } })]));
    c.appendChild(pad); fondoDe(c, "pan_escuadron", 0.84); marco(b.n, c);
  }

  // ---------- habilidades ----------
  // Cuatro ramas por eco. Tocar un nodo gasta un punto. La maestra de cada rama pide 6 puntos en ella y cuesta 2.
  function vTalentos() {
    var id = V.eco, u = S.unidades[id], b = D.HEROES[id], p = M.puntosTalento(id, u), olvidar = M.costeOlvidar(id, u);
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad talentos" });
    function valor(n, r) { var v = n.v[r - 1]; return v < 1 ? pct(v) : String(v); }
    pad.appendChild(h("div", { class: "caja tal-cab" }, [
      h("div", { class: "fila" }, [caraPeq(retrato(id, "neutral"), 56, false),
        h("div", { style: "flex:1" }, [h("h2", { text: "Habilidades de " + b.n }), h("p", { class: "tenue", text: "Un punto cada 5 niveles y 3 por cada estrella ganada. Lleva " + p.usados + " de " + p.total + "." })]),
        h("div", { class: "tal-libres" + (p.libres > 0 ? " on" : "") }, [h("b", { text: String(p.libres) }), h("span", { text: p.libres === 1 ? "libre" : "libres" })])]),
      h("div", { class: "fila" }, [
        h("button", { class: "btn sec", type: "button", disabled: p.libres < 1, text: "Repartir por mí", on: function () { if (M.autoTalentos(S, id)) { guardar(); pintar(); } } }),
        h("button", { class: "btn sec", type: "button", disabled: !olvidar || S.oro < olvidar, text: olvidar ? "Olvidar todo · " + olvidar + " de oro" : "Olvidar todo", on: function () { if (M.olvidarTalentos(S, id)) { guardar(); pintar(); } } })])]));
    M.ramas(id).forEach(function (R) {
      var en = M.puntosEnRama(u, R), col = R.el ? D.COLOR[R.el] : (R.id === "cuerpo" ? "#e2574c" : (R.id === "compas" ? "#f0c24a" : "#b79cf0"));
      var caja = h("div", { class: "caja rama", style: "--r:" + col }, [
        h("div", { class: "fila" }, [hay("ico_rama_" + (R.el ? R.el.toLowerCase() : (R.id === "rafaga" ? { Filo: "filo", Tormenta: "tormenta", Alivio: "alivio", Baluarte: "baluarte" }[R.n] : R.id))) ? icono("ico_rama_" + (R.el ? R.el.toLowerCase() : (R.id === "rafaga" ? { Filo: "filo", Tormenta: "tormenta", Alivio: "alivio", Baluarte: "baluarte" }[R.n] : R.id)), "", "") : null,
          h("h2", { text: R.n, style: "flex:1" }), h("span", { class: "tenue", text: en + " puntos" })]),
        h("p", { class: "lema", text: R.lema })]);
      function nodo(n, esCap) {
        var r = M.rangoTalento(u, R, n, esCap), max = esCap ? 1 : n.max, puede = M.puedeTalento(id, u, R, n, esCap);
        var pie = r >= max ? "Completa" : (esCap ? (en < 6 ? "Pide 6 puntos en esta rama (llevas " + en + ") · cuesta 2" : "Cuesta 2 puntos") : (r ? "Siguiente rango: " + valor(n, r + 1) : "Sin aprender"));
        return h("button", { class: "tnodo" + (r ? " on" : "") + (r >= max ? " lleno" : "") + (puede ? " puede" : "") + (esCap ? " maestra" : ""), type: "button", "aria-disabled": puede ? null : "true",
          on: function () { if (M.subirTalento(S, id, R.id, esCap ? "cap" : n.k)) { guardar(); pintar(); } } }, [
          h("div", { class: "tnodo-ico" }, [icono(n.ico, n.n.charAt(0), col)]),
          h("div", { class: "tnodo-txt" }, [h("b", { text: (esCap ? "★ " : "") + n.n }), h("span", { text: M.textoNodo(n, Math.max(1, r)) }), h("small", { text: pie })]),
          h("div", { class: "pips" }, Array.apply(null, Array(max)).map(function (_, i) { return h("i", { class: i < r ? "on" : "" }); }))]);
      }
      R.nodos.forEach(function (n) { caja.appendChild(nodo(n, false)); });
      caja.appendChild(nodo(R.cap, true));
      pad.appendChild(caja);
    });
    c.appendChild(pad); fondoDe(c, pref("pan_habilidades", "pan_escuadron"), 0.86); marco("Habilidades", c);
  }

  // ---------- torre ----------
  function tiraEnemigos(F) {
    var vistos = {}, L = []; F.olas.forEach(function (o) { o.forEach(function (e) { if (!vistos[e.id]) { vistos[e.id] = 1; L.push(e); } }); });
    return h("div", { class: "tira-en" }, L.map(function (e) { var b = M.baseEnemigo(e.id), heroe = e.id.indexOf("eco:") === 0;
      return h("div", { class: "en-mini" + (b.jefe && !heroe ? " jefe" : ""), style: "--c:" + D.COLOR[b.el] }, [h("div", { class: "bestia-img" }, [heroe ? sprite(e.id.slice(4), b.el, 0) : sprite(e.id, b.el, 0)]), punto(b.el)]); }));
  }
  // ---------- evento: El libro de otro mundo ----------
  function vEvento() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad evento" }), E = M.EVENTO, R = M.eventoResumen(S);
    if (!S.vistas.evento) { S.vistas.evento = 1; guardar(); }
    var abiertas = R.zonas.filter(function (x) { return x.abierta; }), zSel = V.zona != null ? V.zona : (abiertas.filter(function (x) { return !x.completa; })[0] || abiertas[abiertas.length - 1] || R.zonas[0]).z;
    pad.appendChild(h("div", { class: "ev-portada", style: hay("esc_ev_portada") ? "background-image:url(" + url("esc_ev_portada") + ")" : "" }, [h("div", { class: "ev-velo" }),
      h("small", { text: E.sub }), h("h1", { text: E.n }), h("p", { text: E.d }),
      h("div", { class: "ev-progreso" }, [medidor(R.hechas, 25, "xp"), h("span", { text: R.hechas + " de 25 · " + R.ecos + " de 5 ecos secretos" })])]));
    pad.appendChild(h("div", { class: "ev-ecos" }, R.zonas.map(function (x) {
      var b = D.HEROES[x.eco], tengo = !!S.unidades[x.eco];
      return h("button", { class: "ev-eco" + (tengo ? " mio" : "") + (x.z === zSel ? " sel" : "") + (x.abierta ? "" : " cerrada"), type: "button", style: "--c:" + D.COLOR[b.el], "aria-label": x.n,
        on: function () { ir("evento", { zona: x.z }); } }, [h("div", { class: "ev-cara" + (tengo ? "" : " sombra") }, [retrato(x.eco, tengo ? "alegre" : "neutral")]), h("b", { text: tengo ? b.n : "???" }), h("small", { text: x.hechas + "/5" })]);
    })));
    var Z = R.zonas[zSel], b = D.HEROES[Z.eco], tengo = !!S.unidades[Z.eco], med = Math.round(S.escuadron.reduce(function (s, id) { return s + S.unidades[id].lv; }, 0) / S.escuadron.length);
    var caja = h("div", { class: "caja ev-zona" }, [
      h("div", { class: "ev-zona-cab", style: hay(Z.fondo) ? "background-image:url(" + url(Z.fondo) + ")" : "" }, [h("div", { class: "ev-velo" }), h("h2", { text: (zSel + 1) + ". " + Z.n }),
        h("div", { class: "fila tenue" }, [h("span", { text: "Nivel " + Z.lvl + " a " + (Z.lvl + 6) }), h("span", { class: med >= Z.lvl ? "" : "falta", text: "· tu escuadrón: " + med })])])]);
    if (!Z.abierta) caja.appendChild(h("p", { class: "tenue", text: M.eventoAbierto(S) ? "Se abre al completar «" + R.zonas[zSel - 1].n + "»." : "El libro se abre cuando sueltes las Colinas de Brezo." }));
    else {
      caja.appendChild(h("div", { class: "ev-fases" }, Z.fases.map(function (nom, f) {
        var hecha = M.eventoHecha(S, zSel, f), puede = f <= Z.hechas;
        return h("button", { class: "ev-fase" + (hecha ? " hecha" : "") + (f === Z.hechas ? " ahora" : ""), type: "button", disabled: !puede, on: function () { empezarSecreta("ev:" + zSel + ":" + f); } },
          [h("i", { text: hecha ? "✓" : String(f + 1) }), h("span", { text: nom }), f === 4 ? h("small", { text: zSel === 4 ? "Gran jefe" : "Jefe" }) : null]);
      })));
      caja.appendChild(h("div", { class: "ev-premio" }, [h("div", { class: "ev-cara" + (tengo ? "" : " sombra") }, [retrato(Z.eco, "decidido")]),
        h("div", {}, [h("b", { text: tengo ? b.n + " ya está contigo" : "Al completar los cinco combates" }), h("small", { text: tengo ? b.t + " · " + b.el : "Se une un eco secreto. No sale del altar." })])]));
    }
    pad.appendChild(caja);
    pad.appendChild(h("p", { class: "tenue", style: "text-align:center", text: "Esto pasa en otro libro: nada de aquí cambia la historia del sol parado. La primera vez, cada combate da 5 gemas y el último de cada zona, 20 y dos medallas." }));
    c.appendChild(pad); fondoDe(c, "pan_diario", 0.86); marco("Otro mundo", c);
  }
  function vTorre() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad torre" }), n = M.pisoTorre(S), F = M.faseTorre(n), med = Math.round(S.escuadron.reduce(function (s, id) { return s + S.unidades[id].lv; }, 0) / S.escuadron.length);
    var premios = [PREMIO.gemas("+" + (F.granJefe ? 30 : (F.jefe ? 12 : 3)))];
    if (n % 5 === 0) premios.push(deMat("sello_incursion", "+1")); if (n % 10 === 0) premios.push(PREMIO.medallas("+2"));
    premios.push(PREMIO.oro("+" + Math.round(90 + F.ge * 12)));
    pad.appendChild(h("div", { class: "caja torre-cab" }, [h("div", { class: "piso-n" }, [h("small", { text: "Piso" }), h("b", { text: String(n) })]),
      h("div", { style: "flex:1" }, [h("h2", { text: F.granJefe ? "Un gran jefe guarda este piso" : (F.jefe ? "Un jefe guarda este piso" : "Piso de paso") }),
        h("div", { class: "fila tenue" }, [h("span", { text: "Nivel " + F.lvl }), h("span", { class: med >= F.lvl ? "" : "falta", text: "· tu escuadrón: " + med })])])]));
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Quién te espera" }), tiraEnemigos(F), h("h2", { text: "La primera vez da" }), rejilla(premios, "fila-mini"),
      h("button", { class: "btn", type: "button", text: "Subir al piso " + n, on: function () { empezarSecreta("torre:" + n); } }),
      n > 1 ? h("button", { class: "btn sec", type: "button", text: "Repetir el piso " + (n - 1), on: function () { empezarSecreta("torre:" + (n - 1)); } }) : null]));
    var hitos = [5, 10, 20, 30, 40, 50].map(function (k) { return h("div", { class: "hito" + ((S.torre || 0) >= k ? " on" : "") }, [h("b", { text: String(k) }), h("small", { text: k % 10 === 0 ? "Gran jefe" : "Jefe" })]); });
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Tu marca: piso " + (S.torre || 0) }), h("div", { class: "hitos" }, hitos),
      h("p", { class: "tenue", text: "Cada piso sube dos niveles. Cada 5 hay un jefe y cada 10 un gran jefe. Desde el piso 10 aprieta un 5 % más por piso." })]));
    c.appendChild(pad); fondoDe(c, pref("pan_torre", "pan_arena"), 0.84); marco("La Torre", c);
  }
  // ---------- arena ----------
  function vArena() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad torre" }), R = M.rangoArena(S), rv = M.rivalArena(S);
    pad.appendChild(h("div", { class: "caja torre-cab" }, [h("div", { class: "piso-n rango r" + R.i }, [h("small", { text: "Rango" }), h("b", { text: R.n })]),
      h("div", { style: "flex:1" }, [h("h2", { text: R.v + (R.v === 1 ? " duelo ganado" : " duelos ganados") }),
        R.sig ? medidor(R.v - M.RANGOS[R.i].v, R.sig.v - M.RANGOS[R.i].v, "xp") : null,
        h("div", { class: "tenue", text: R.sig ? "Faltan " + (R.sig.v - R.v) + " para " + R.sig.n : "Has llegado al rango más alto." })])]));
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Rival: " + rv.n }),
      h("div", { class: "tira-en" }, rv.ecos.map(function (id) { var b = D.HEROES[id]; return h("div", { class: "en-mini", style: "--c:" + D.COLOR[b.el] }, [h("div", { class: "bestia-img" }, [retrato(id, "decidido")]), punto(b.el), h("small", { text: b.n })]); })),
      h("p", { class: "tenue", text: "Sus ecos son de nivel " + rv.lvl + ". Pegan fuerte y aguantan poco: gana quien golpee mejor a compás." }),
      R.sig ? rejilla([PREMIO.gemas("+" + R.sig.gemas)].map(function (o) { o.n = "Al llegar a " + R.sig.n; o.mini = 1; return o; }), "fila-mini") : null,
      h("button", { class: "btn", type: "button", text: "Desafiar", on: function () { empezarSecreta("arena:" + rv.v); } })]));
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Rangos" }), h("div", { class: "hitos" }, M.RANGOS.map(function (X, i) {
      return h("div", { class: "hito" + (R.i >= i ? " on" : "") }, [h("b", { text: X.n }), h("small", { text: X.v + " duelos" })]); }))]));
    c.appendChild(pad); fondoDe(c, "pan_arena", 0.84); marco("La Arena", c);
  }
  // ---------- encargos y logros ----------
  function vEncargos() {
    M.usarDia(hoy());
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad torre" }), L = M.encargos(S), dia = M.diaCompleto(S);
    L.forEach(function (e) {
      pad.appendChild(h("div", { class: "caja meta" + (e.cobrado ? " cobrada" : (e.hecho ? " lista" : "")) }, [h("div", { class: "meta-ico" }, [icono(e.ico, "E", "#d8c8a0")]),
        h("div", { class: "meta-txt" }, [h("b", { text: e.t }), medidor(e.prog, e.n, "xp"), h("small", { text: e.prog + " / " + e.n })]),
        e.cobrado ? h("span", { class: "hecho", text: "✓" }) : h("button", { class: "btn peq", type: "button", disabled: !e.hecho, on: function () { if (M.cobrarEncargo(S, e.k)) { guardar(); pintar(); } } }, [icono("ico_gema", "G", "#8f8cf0"), " " + e.premio.gemas])]));
    });
    pad.appendChild(h("div", { class: "caja meta" + (dia.cobrado ? " cobrada" : (dia.listo ? " lista" : "")) }, [h("div", { class: "meta-ico" }, [icono("ico_cofre_dorado", "C", "#ffd76a")]),
      h("div", { class: "meta-txt" }, [h("b", { text: "Los tres de hoy" }), rejilla([PREMIO.medallas("+1"), deObjeto("elixir", "+1")].map(function (o) { o.mini = 1; return o; }), "fila-mini")]),
      dia.cobrado ? h("span", { class: "hecho", text: "✓" }) : h("button", { class: "btn peq", type: "button", disabled: !dia.listo, text: "Cobrar", on: function () { if (M.cobrarDia(S)) { guardar(); pintar(); } } })]));
    pad.appendChild(h("p", { class: "tenue", text: "Cada encargo da además " + L[0].premio.oro + " de oro. Mañana habrá tres distintos." }));
    c.appendChild(pad); fondoDe(c, pref("pan_encargos", "pan_plaza_gremio"), 0.86); marco("Encargos de hoy", c);
  }
  function vLogros() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad torre" }), L = M.logros(S);
    L.sort(function (x, y) { return (y.cobrable ? 1 : 0) - (x.cobrable ? 1 : 0); });
    L.forEach(function (g) {
      var meta = g.sig ? g.sig.meta : g.niveles[g.niveles.length - 1].meta;
      pad.appendChild(h("div", { class: "caja meta" + (!g.sig ? " cobrada" : (g.cobrable ? " lista" : "")) }, [h("div", { class: "meta-ico" }, [icono(g.ico, g.n.charAt(0), "#d8c8a0")]),
        h("div", { class: "meta-txt" }, [h("b", { text: g.n }), h("small", { text: g.d + ": " + Math.min(g.valor, meta) + " / " + meta }), medidor(Math.min(g.valor, meta), meta, "xp"),
          h("div", { class: "pips fila" }, g.niveles.map(function (x) { return h("i", { class: x.cobrado ? "on" : "" }); }))]),
        !g.sig ? h("span", { class: "hecho", text: "✓" }) : h("button", { class: "btn peq", type: "button", disabled: !g.cobrable, on: function () { if (M.cobrarLogro(S, g.id)) { guardar(); pintar(); } } }, [icono("ico_gema", "G", "#8f8cf0"), " " + g.sig.gemas])]));
    });
    c.appendChild(pad); fondoDe(c, "pan_plaza_gremio", 0.86); marco("Logros", c);
  }

  // ---------- diario ----------
  // Toda la historia que ya has vivido, por región y lugar, para volver a leerla cuando quieras.
  function vDiario() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad diario" });
    var abiertas = []; for (var r = 0; r < 8; r++) if (M.desbloqueada(S, r, 0, 0, 0)) abiertas.push(r);
    if (V.diarioR == null || abiertas.indexOf(V.diarioR) < 0) V.diarioR = abiertas[abiertas.length - 1] || 0;
    var R = V.diarioR, z = D.ZONAS[R];
    function entrada(titulo, lineas, abierta, pista, ver) {
      var quien = null; (lineas || []).some(function (l) { if (l.q && l.q !== "narrador") { quien = l.q; return true; } return false; });
      return h("button", { class: "dia" + (abierta ? "" : " cerrada"), type: "button", "aria-disabled": abierta ? null : "true", on: function () { if (abierta) ver(); } }, [
        caraPeq(abierta && quien ? retrato(quien, "neutral") : h("span", { text: abierta ? "…" : "?" }), 42, true),
        h("div", { class: "dia-txt" }, [h("b", { text: titulo }), h("span", { text: abierta ? "«" + lineas[0].t.slice(0, 64) + (lineas[0].t.length > 64 ? "…" : "") + "»" : pista })])]);
    }
    function volver() { pintar(); }
    function escena(clave, titulo, hecha, pista) { return D.ESCENAS[clave] ? entrada(titulo, D.ESCENAS[clave], hecha, pista, function () { dialogo(clave, volver); }) : null; }
    var leidas = 0, total = 0;
    pad.appendChild(h("div", { class: "chips sueltas envuelve", role: "group", "aria-label": "Región" }, abiertas.map(function (r) {
      return h("button", { class: "chip", type: "button", "aria-pressed": String(r === R), text: D.ZONAS[r].n, on: function () { V.diarioR = r; pintar(); } });
    })));
    if (R === 0) pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "El gremio" }), escena("intro", "El turno de tarde", true, "")]));
    z.areas.forEach(function (nombre, a) {
      if (!M.desbloqueada(S, R, a, 0, 0)) { pad.appendChild(h("div", { class: "caja cerrada-area" }, [h("h2", { text: "???" }), h("p", { class: "tenue", text: "Aún no has llegado aquí." })])); return; }
      var caja = h("div", { class: "caja" }, [h("h2", { text: nombre })]);
      for (var f = 0; f < 5; f++) (function (f) {
        var k = R + "-" + a + "-" + f, hecha = !!S.hechas[M.clave(R, a, f)], nomF = M.fase(R, a, f, 0).nombre, pista = "Supera " + nomF + ".";
        var lin = f === 0 ? D.ENTRADAS[R + "-" + a] : D.PASOS[k];
        [escena("pre-" + k, "Antes de " + nomF, hecha || !!S.vistas["pre-" + k], pista),
         lin ? entrada(f === 0 ? "Llegada" : nomF, lin, hecha, pista, function () { conversar(lin, { fondo: fondoEscena(k), cuadros: {} }, volver); }) : null,
         D.CIERRES && D.CIERRES[k] ? entrada("Tras " + nomF, D.CIERRES[k], hecha, pista, function () { conversar(D.CIERRES[k], { fondo: fondoEscena(k), cuadros: {} }, volver); }) : null,
         escena("post-" + k, "Después de " + nomF, hecha, pista)].forEach(function (n) { if (n) { total++; if (!n.classList.contains("cerrada")) leidas++; caja.appendChild(n); } });
      })(f);
      pad.appendChild(caja);
    });
    pad.insertBefore(h("p", { class: "tenue", text: z.idea + " Escenas recuperadas aquí: " + leidas + " de " + total + "." }), pad.children[1] || null);
    if (S.final && R === 7) pad.appendChild(h("div", { class: "caja final" }, [h("h2", { text: "Final: " + D.FINALES[S.final].n }), h("p", { text: D.FINALES[S.final].texto })]));
    c.appendChild(pad); fondoDe(c, pref("pan_diario", "pan_plaza_gremio"), 0.86); marco("Diario", c);
  }
  // ---------- bestiario ----------
  function vBestiario() {
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad bestiario" }), B = M.bestiario(S);
    var tv = B.reduce(function (s, z) { return s + z.vistos; }, 0), tt = B.reduce(function (s, z) { return s + z.total; }, 0);
    pad.appendChild(h("div", { class: "caja" }, [h("div", { class: "fila" }, [h("h2", { text: "Criaturas vencidas", style: "flex:1" }), h("b", { class: "bono-n", text: tv + " / " + tt })]), medidor(tv, tt, "xp"),
      h("p", { class: "tenue", text: "Toca una criatura para ver su elemento, a qué es débil, dónde vive y qué suelta. Nadie aquí es un monstruo: vence tres veces a una criatura y recordarás quién era. Llevas " + B.reduce(function (s, z) { return s + z.lista.filter(function (e) { return e.quien; }).length; }, 0) + " recordadas." })]));
    B.forEach(function (Z) {
      if (!M.desbloqueada(S, Z.r, 0, 0, 0)) return;
      pad.appendChild(h("div", { class: "caja" }, [h("div", { class: "fila" }, [h("h2", { text: Z.n, style: "flex:1" }), h("span", { class: "tenue", text: Z.vistos + " de " + Z.total })]),
        h("div", { class: "bestias" }, Z.lista.map(function (e) {
          var visto = e.veces > 0, debil = M.debilA(e.el);
          return h("button", { class: "bestia" + (visto ? "" : " sombra") + (e.clase !== "Común" ? " jefe" : ""), type: "button", style: "--c:" + D.COLOR[e.el], "aria-label": visto ? e.n : "Criatura sin vencer", on: function () {
            info(visto ? { nodo: function () { return h("div", { class: "info-sprite" }, [sprite(e.id, e.el, 0)]); }, n: e.n, r: e.clase === "Gran jefe" ? 3 : (e.clase === "Jefe" ? 2 : 0),
              d: e.clase + " de " + e.el + ". Vive en " + Z.n + ". Débil a " + debil + ": los ecos de " + debil + " le pegan un 50 % más. Suelta materiales de " + e.el + ". Vencido " + e.veces + (e.veces === 1 ? " vez." : " veces."),
              extra: h("div", { class: "quien-era" + (e.quien ? "" : " sin") }, [h("b", { text: "Quién era" }), h("p", { text: e.quien || "Véncelo " + (e.pide - e.veces) + (e.pide - e.veces === 1 ? " vez más" : " veces más") + " y lo recordarás." })]) }
              : { ico: "", letra: "?", color: "#3a3148", n: "Sin vencer", d: "Una criatura de " + Z.n + " que todavía no has vencido" + (e.clase !== "Común" ? ". Es un jefe." : ".") });
          } }, [h("div", { class: "bestia-img" }, [sprite(e.id, e.el, 0)]), visto ? punto(e.el) : null, e.quien ? h("i", { class: "bestia-rec", "aria-label": "Recordado" }) : null, h("small", { text: visto ? e.n : "???" })]);
        }))]));
    });
    c.appendChild(pad); fondoDe(c, pref("pan_bestiario", "pan_plaza_gremio"), 0.86); marco("Bestiario", c);
  }

  // ---------- altar ----------
  // Dos llamadas: ecos (personajes) o equipo. Tú decides en qué gastas las gemas.
  function vAltar(res) {
    var c = h("div", { class: "cuerpo" }), p = h("div", { class: "plaza altar" });
    p.appendChild(fondo("pan_altar_ecos", ["#1b1736", "#3d2f7a", "#221c34"])); p.appendChild(h("div", { class: "velo" }));
    var modo = V.altar || "ecos", cont = h("div", { class: "sobre", style: "display:flex;flex-direction:column;gap:12px" });
    cont.appendChild(h("div", { class: "chips sueltas", role: "group", "aria-label": "Qué llamar" }, [["ecos", "Llamar ecos"], ["equipo", "Llamar equipo"]].map(function (x) {
      return h("button", { class: "chip", type: "button", "aria-pressed": String(modo === x[0]), text: x[1], on: function () { V.altar = x[0]; app.textContent = ""; vAltar(); } });
    })));
    cont.appendChild(h("h2", { text: modo === "ecos" ? "Altar de los ecos" : "Arcón del gremio" }));
    cont.appendChild(h("p", { class: "tenue", text: modo === "ecos"
      ? "Llamas a un eco al azar. Si ya lo tienes, te llevas medallas de eco, que sirven para subirle estrellas a cualquiera. Tienes " + (S.medallas || 0) + "."
      : "Sale un arma, una pieza de equipo o un lote de materiales, de un elemento al azar. Las armas finales y los trofeos no salen aquí: esos se ganan." }));
    var nLey = modo === "ecos" ? Object.keys(S.unidades).filter(M.esLeyenda).length : Object.keys(D.ITEMS).filter(function (k) { return D.ITEMS[k].leyenda && M.tiene(S, k); }).length;
    var sin = modo === "ecos" ? (S.sinLeyenda || 0) : (S.sinArmaLeyenda || 0);
    cont.appendChild(h("div", { class: "leyenda-aviso" }, [hay("ico_leyenda") ? icono("ico_leyenda", "", "") : h("span", { class: "ley-sol" }),
      h("div", {}, [h("b", { text: (modo === "ecos" ? "Ecos de leyenda: " : "Armas de leyenda: ") + nLey + " de 6" }),
        h("small", { text: nLey >= 6 && modo !== "ecos" ? "Ya tienes las seis." : "Solo salen aquí. 1 de cada 100 llamadas, y segura como mucho en " + Math.max(1, M.SEGURO_LEYENDA - sin) + "." })])]));
    if (res && res.length) cont.appendChild(h("div", { class: "rejilla" }, res.map(function (x) {
      if (x.id) { var b = D.HEROES[x.id];
        return h("div", { class: "ficha en" + (hay("ui_marco_carta_" + Math.max(2, Math.min(5, b.rar))) ? " conmarco" : "") + (b.leyenda ? " leyenda" : "") }, [h("div", { class: "img" }, [ilustracion(x.id, b.el), marcoCarta(b.rar, x.id), b.leyenda ? h("i", { class: "sello-leyenda", text: "Leyenda" }) : null]), h("div", { class: "nom", text: b.n }),
          h("div", { class: "sub" }, [h("span", { text: x.nuevo ? "Nuevo" : "+" + x.medallas + (x.medallas === 1 ? " medalla" : " medallas") }), estrellas(b.rar)])]); }
      if (x.item) { var it = D.ITEMS[x.item];
        return h("div", { class: "ficha en" + (x.raro ? " raro" : "") + (x.leyenda ? " leyenda" : "") }, [h("div", { class: "img objeto" }, [icono(it.ico, it.tipo === "arma" ? "A" : "E", it.el ? D.COLOR[it.el] : "#d8c8a0")]), h("div", { class: "nom", text: it.n }),
          h("div", { class: "sub" }, [h("span", { text: x.leyenda ? "Arma de leyenda" : (it.tipo === "arma" ? "Arma" : "Equipo") }), it.el ? punto(it.el) : null])]); }
      var ks = Object.keys(x.mats), m0 = D.MATS[ks[0]];
      return h("div", { class: "ficha" }, [h("div", { class: "img objeto" }, [icoMat(ks[0])]), h("div", { class: "nom", text: m0.n }),
        h("div", { class: "sub" }, [h("span", { text: "×" + x.mats[ks[0]] + (ks.length > 1 ? " y " + x.mats[ks[1]] + " más" : "") }), punto(m0.el)])]);
    })));
    function llamar(n) {
      var out = []; for (var i = 0; i < n; i++) { var x = modo === "ecos" ? M.invocar(S, rng) : M.invocarEquipo(S, rng); if (!x) break; out.push(x); }
      guardar(); app.textContent = ""; vAltar(out);
      var ley = out.filter(function (o) { return o.id && o.leyenda; })[0];
      if (ley) aparicion(ley); else if (out.length === 1 && out[0].id) aparicion(out[0]);
    }
    cont.appendChild(h("div", { class: "fila" }, [
      h("button", { class: "btn", type: "button", disabled: S.gemas < M.COSTE_INVOCAR, text: "Una llamada (" + M.COSTE_INVOCAR + ")", on: function () { llamar(1); } }),
      h("button", { class: "btn", type: "button", disabled: S.gemas < M.COSTE_INVOCAR * 10, text: "Diez llamadas (" + M.COSTE_INVOCAR * 10 + ")", on: function () { llamar(10); } })]));
    p.appendChild(cont); c.appendChild(p); marco("Altar", c);
    FX.montar(p, 7);
  }
  // Un eco responde a la llamada: círculo en el suelo, columna de luz según su rareza y la ilustración.
  function aparicion(x) {
    SON.fx("aparece");
    var b = D.HEROES[x.id], haz = b.leyenda && hay("fx_eco_leyenda") ? "fx_eco_leyenda" : b.rar >= 4 ? "fx_eco_legendario" : (b.rar === 3 ? "fx_eco_raro" : "fx_eco_comun");
    var capa = h("button", { class: "aparicion r" + Math.min(4, b.rar) + (b.leyenda ? " leyenda" : ""), type: "button", "aria-label": b.n + ". Toca para seguir", on: function () { capa.remove(); } }, [
      fondo(b.leyenda && hay("pan_altar_leyenda") ? "pan_altar_leyenda" : "pan_altar_ecos", ["#1b1736", "#3d2f7a", "#221c34"]), h("div", { class: "ap-velo" }),
      h("div", { class: "ap-circulo" + (hay("fx_circulo_eco") ? "" : " css"), style: hay("fx_circulo_eco") ? "background-image:url(" + url("fx_circulo_eco") + ")" : "" }),
      h("div", { class: "ap-haz" + (hay(haz) ? "" : " css"), style: hay(haz) ? "background-image:url(" + url(haz) + ")" : "" }),
      h("div", { class: "ap-eco" }, [ilustracion(x.id, b.el)]),
      h("div", { class: "ap-txt" }, [h("div", { class: "tenue", text: x.nuevo ? (b.leyenda ? "Responde una leyenda" : "Un eco responde") : "Ya estaba contigo: +" + x.medallas + " medallas de eco" }), h("h1", { text: b.n }), h("div", {}, [punto(b.el), " " + b.t + " "]), estrellas(b.rar)])]);
    app.appendChild(capa);
  }

  // ---------- granja ----------
  var relojGranja = null;
  function tiempo(ms) { var s = Math.ceil(ms / 1000), m = Math.floor(s / 60); return m + ":" + ("0" + (s % 60)).slice(-2); }
  function icoObj(tipo) { var O = M.OBJETOS[tipo]; return icono(O.ico, O.n.charAt(0), O.raro ? "#ffd76a" : "#9be3b5"); }
  function vGranja(recogido) {
    var g = S.granja, e = M.huerto(S, Date.now()), q = M.cosechaDe(g.nivel), c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad" });
    function linea(tipo, n) { var O = M.OBJETOS[tipo]; return h("div", { class: "cos-fila" }, [icoObj(tipo), h("b", { text: n }), h("span", { text: O.n }), h("small", { text: "tienes " + M.cuantos(S, tipo) })]); }
    var caja = h("div", { class: "caja parcela" + (e.listas ? " lista" : "") }, [
      h("div", { class: "fila" }, [h("h2", { text: "Huerto del gremio · nivel " + g.nivel, style: "flex:1" })]),
      h("p", { class: "tenue", text: "Cada 20 minutos hay una cosecha, juegues o no. Cada cosecha te da todo esto:" }),
      linea("pocion", "×" + q.pocion), linea("ascua", "×" + q.ascua), linea("remedio", "×" + q.remedio[0] + " o " + q.remedio[1]),
      q.raro > 0 ? h("p", { class: "tenue", text: "Y un " + Math.round(q.raro * 100) + " % de las veces, además, un objeto raro: poción mayor, ascua mayor o elixir." }) : null]);
    var barra2 = h("div", { class: "medidor xp crece" }, [h("i")]); barra2.firstChild.style.width = (e.listas >= e.cap ? 100 : 100 * (1 - e.falta / M.GRANJA.ciclo)) + "%";
    caja.appendChild(barra2);
    caja.appendChild(h("div", { class: "tenue cuenta", text: e.listas >= e.cap ? "Lleno: recoge para que siga creciendo." : "Siguiente cosecha en " + tiempo(e.falta) }));
    caja.appendChild(h("button", { class: "btn", type: "button", disabled: !e.listas, text: e.listas > 1 ? "Recoger " + e.listas + " cosechas" : (e.listas ? "Recoger la cosecha" : "Creciendo…"), on: function () {
      var r = M.cosechar(S, Date.now(), rng); if (!r) return; guardar(); app.textContent = ""; vGranja(r); } }));
    caja.appendChild(h("p", { class: "tenue", text: "Si no entras, te guarda hasta " + e.cap + " cosechas (" + e.cap * 20 + " minutos). A partir de ahí espera a que recojas." }));
    pad.appendChild(caja);
    if (recogido) pad.appendChild(h("div", { class: "caja aviso-granja" }, [h("h2", { text: recogido.cosechas > 1 ? "Has recogido " + recogido.cosechas + " cosechas" : "Has recogido la cosecha" })].concat(
      [rejilla(Object.keys(recogido.objetos).map(function (k) { return deObjeto(k, "+" + recogido.objetos[k]); }).sort(function (x, y) { return (y.r || 0) - (x.r || 0); }))])));
    var ab = g.llaves.abono || 0, tope = g.nivel >= M.GRANJA.maxNivel, sig = M.dondeLlave("abono").filter(function (x) { return !S.hechas[x.fase]; })[0];
    var qn = tope ? null : M.cosechaDe(g.nivel + 1);
    pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: tope ? "Huerto al máximo" : "Subir el huerto a nivel " + (g.nivel + 1) }),
      h("p", { class: "tenue", text: tope ? "Ya no puede dar más." : "Cuesta un saco de abono (tienes " + ab + "). Cada cosecha pasará a dar " + qn.pocion + " pociones, " + qn.ascua + (qn.ascua > 1 ? " ascuas" : " ascua") + " y " + qn.remedio[0] + " o " + qn.remedio[1] + " remedios, con un " + Math.round(qn.raro * 100) + " % de objeto raro." + (sig ? " El siguiente saco lo entrega el jefe de " + sig.texto + "." : "") }),
      tope ? null : h("button", { class: "btn", type: "button", disabled: !ab, text: ab ? "Abonar" : "Te falta abono", on: function () { if (M.mejorarGranja(S)) { guardar(); pintar(); } } })]));
    c.appendChild(pad); fondoDe(c, "map_colinas_brezo_exterior", 0.8); marco("Huerto", c);
    clearInterval(relojGranja);
    relojGranja = setInterval(function () {
      if (V.n !== "granja") { clearInterval(relojGranja); return; }
      var x = M.huerto(S, Date.now()), n = document.querySelector(".cuenta"); if (x.listas !== e.listas) { pintar(); return; }
      if (n) n.textContent = x.listas >= x.cap ? "Lleno: recoge para que siga creciendo." : "Siguiente cosecha en " + tiempo(x.falta);
    }, 1000);
  }
  function cosechasListas() { return M.huerto(S, Date.now()).listas; }

  // ---------- forja ----------
  function textoBonus(b) {
    var t = []; if (b.atk) t.push("Ataque +" + Math.round(b.atk * 100) + " %"); if (b.hp) t.push("Vida +" + Math.round(b.hp * 100) + " %"); if (b.def) t.push("Defensa +" + Math.round(b.def * 100) + " %");
    if (b.raf) t.push("Ráfagas +" + Math.round(b.raf * 100) + " %"); if (b.bbIni) t.push("Empieza con " + b.bbIni + " de ráfaga");
    if (b.res) for (var e in b.res) t.push("Recibe " + Math.round(b.res[e] * 100) + " % menos de " + e);
    return t.join(" · ");
  }
  function pct(v) { return Math.round(v * 100) + " %"; }
  function nombrePieza(k) { var t = M.temple(k); return D.ITEMS[k].n + (t ? " +" + t : ""); }
  function bonusDe(k) { var it = D.ITEMS[k], tp = 1 + 0.1 * M.temple(k), b = {}; for (var x in it.bonus) b[x] = (x === "atk" || x === "hp" || x === "def" || x === "raf") ? it.bonus[x] * tp : it.bonus[x]; return b; }
  function textoPieza(k) { var ef = M.efectoArma(k), t = textoBonus(bonusDe(k)); var rs = M.rasgoArma(k); return t + (ef ? (t ? " · " : "") + ef.fam + ": " + ef.texto.replace(/\.$/, "") : "") + (rs ? " · Propio: " + rs.texto.replace(/\.$/, "") : ""); }
  // ---------- casillas con icono ----------
  // Todo lo que se gana o se paga se enseña igual: un icono, una cifra y, al tocarlo, para qué sirve. Lo raro brilla.
  var RAREZA = ["", "Poco común", "Raro", "Legendario"], CASILLA = ["ui_casilla_comun", "ui_casilla_poco_comun", "ui_casilla_rara", "ui_casilla_legendaria"];
  function pref(a, b) { return hay(a) ? a : b; }   // usa el dibujo propio si ya está montado; si no, el prestado
  function info(o) {
    var capa = h("div", { class: "capa centro info", on: function () { capa.remove(); } }, [h("div", { class: "caja info-caja r" + (o.r || 0) }, [
      h("div", { class: "info-ico" }, [o.nodo ? o.nodo() : icono(o.ico, o.letra || "?", o.color || "#d8c8a0")]),
      o.r ? h("div", { class: "info-rareza", text: RAREZA[o.r] }) : null,
      h("h2", { text: o.n }), h("p", { text: o.d }), o.extra || null, o.tengo != null ? h("p", { class: "tenue", text: "Tienes " + o.tengo + "." }) : null,
      h("button", { class: "btn sec", type: "button", text: "Cerrar" })])]);
    app.appendChild(capa);
  }
  function casilla(o, i) {
    return h("button", { class: "premio r" + (o.r || 0) + (o.falta ? " falta" : "") + (o.mini ? " mini" : ""), type: "button", style: i != null ? "animation-delay:" + (i * 55) + "ms" : null,
      "aria-label": o.n + " " + o.cant, on: function (ev) { ev.stopPropagation(); info(o); } }, [
      !o.mini && hay(CASILLA[o.r || 0]) ? h("div", { class: "premio-marco", style: "background-image:url(" + url(CASILLA[o.r || 0]) + ")" }) : null,
      h("div", { class: "premio-ico" }, [o.nodo ? o.nodo() : icono(o.ico, o.letra || "?", o.color || "#d8c8a0")]), h("b", { text: String(o.cant) })]);
  }
  // Los premios, con jerarquía: lo más raro primero y a la vista; el resto, recogido tras un toque.
  function cajaPremios(lista) {
    var ord = lista.map(function (o, i) { return [o, i]; }).sort(function (x, y) { return ((y[0].r || 0) - (x[0].r || 0)) || (x[1] - y[1]); }).map(function (x) { return x[0]; });
    if (ord.length <= 5) return h("div", { class: "premios-caja" + ((ord[0] && ord[0].r >= 2) ? " con-estrella" : "") }, [rejilla(ord)]);
    var arriba = ord.slice(0, 4), resto = ord.slice(4), caja = h("div", { class: "premios-caja" + (arriba[0].r >= 2 ? " con-estrella" : "") }, [rejilla(arriba)]);
    var mas = h("button", { class: "chip premios-mas", type: "button", text: "y " + resto.length + " cosas más", on: function () { mas.replaceWith(rejilla(resto)); } });
    caja.appendChild(mas); return caja;
  }
  function rejilla(lista, clase) { return h("div", { class: "premios" + (clase ? " " + clase : "") }, lista.map(function (o, i) { return casilla(o, clase ? null : i); })); }
  function usosDe(m) {
    var us = Object.keys(D.ITEMS).filter(function (k) { return D.ITEMS[k].receta && D.ITEMS[k].receta.mats[m]; }).map(function (k) { return D.ITEMS[k].n; });
    return us.length ? " Sirve para forjar: " + us.slice(0, 3).join(", ") + (us.length > 3 ? " y " + (us.length - 3) + " más" : "") + "." : "";
  }
  function deMat(m, cant) {
    var x = D.MATS[m], r = m === "sello_incursion" ? 2 : [0, 0, 1, 2, 3, 3][x.nivel] || 0, donde = "";
    if (x.el && x.nivel <= 3) { var a = M.arbol().filter(function (t) { return t.el === x.el; })[0]; if (a) donde = " Lo sueltan los monstruos de " + x.el + " (" + a.regiones.slice(0, 2).map(function (g) { return g.n; }).join(", ") + ") y los lugares con veta de " + x.el + ": " + M.vetas(x.el).slice(0, 3).map(function (v) { return v.n; }).join(", ") + "…"; }
    var d = x.nivel === 4 ? "Pieza de arma final. Hacen falta 5 de cada una de las 3 piezas de su elemento." : (x.nivel === 5 ? "Trofeo de jefe: solo cae del jefe final de su región." : (m === "sello_incursion" ? "Sello de incursión: sale de las misiones secretas." : "Material de " + x.el + " de calidad " + x.nivel + ".") + donde);
    return { nodo: function () { return icoMat(m); }, cant: cant, n: x.n, d: d + usosDe(m) + (x.nivel <= 3 ? " También sirve para templar." : ""), r: r, tengo: S.mats[m] || 0 };
  }
  function deObjeto(k, cant) { var O = M.OBJETOS[k]; return { ico: O.ico, letra: O.n.charAt(0), color: "#9be3b5", cant: cant, n: O.n, d: O.d + " Se usa en combate, desde Objetos: uno por turno.", r: O.raro ? 2 : 0, tengo: M.cuantos(S, k) }; }
  var PREMIO = {
    oro: function (c) { return { ico: "ico_oro", letra: "O", color: "#f0c24a", cant: c, n: "Oro", d: "Con oro se forja, se templa, se sube de estrella y se compra en la tienda.", tengo: S.oro }; },
    xp: function (c) { return { ico: pref("ico_experiencia", "ei_es_07"), letra: "X", color: "#f0c24a", cant: c, n: "Experiencia", d: "La gana cada eco del escuadrón. Los que van por debajo del nivel de la fase aprenden el doble." }; },
    gemas: function (c) { return { ico: "ico_gema", letra: "G", color: "#8f8cf0", cant: c, n: "Gemas", d: "Para llamar ecos o equipo en el Altar. Cada llamada cuesta " + M.COSTE_INVOCAR + ".", r: 1, tengo: S.gemas }; },
    fragmentos: function (c) { return { ico: "ico_fragmento_recuerdo", letra: "F", color: "#e6c46a", cant: c, n: "Fragmentos de recuerdo", d: "Cuatro fragmentos se funden en una medalla de eco.", r: 1, tengo: S.fragmentos }; },
    medallas: function (c) { return { ico: hay("ico_medalla_eco") ? "ico_medalla_eco" : "ico_recuerdo_completo", letra: "M", color: "#e6c46a", cant: c, n: "Medallas de eco", d: "Sirven para subir de estrella a un eco: es la mejora más grande que hay.", r: 2, tengo: S.medallas || 0 }; },
    bono: function (c) { return { ico: pref("ico_bono_experiencia", "ei_xx_07"), letra: "B", color: "#63c7c0", cant: c, n: "Bono de experiencia", d: "Experiencia guardada para gastar en quien tú quieras, desde la ficha de cualquier eco.", tengo: S.xpBanco || 0 }; },
    abono: function (c) { return { ico: pref("ico_abono", "ico_mat_bosque_1"), letra: "A", color: "#8fd14f", cant: c, n: "Abono para el huerto", d: "Con él se mejora el huerto: cada cosecha da más.", r: 2 }; }
  };
  // lo que da una pieza, en fichas pequeñas
  function chipsBonus(k) {
    var b = bonusDe(k), L = [];
    function ch(ico, letra, txt, n, d) { L.push({ ico: ico, letra: letra, color: "#d8c8a0", cant: txt, n: n, d: d, mini: 1 }); }
    if (b.atk) ch("ei_es_01", "A", "+" + pct(b.atk), "Ataque", "Sube el ataque del eco que la lleve.");
    if (b.hp) ch("ei_es_09", "V", "+" + pct(b.hp), "Vida", "Sube la vida máxima del eco que la lleve.");
    if (b.def) ch("ei_es_03", "D", "+" + pct(b.def), "Defensa", "Sube la defensa del eco que la lleve.");
    if (b.raf) ch("ei_es_07", "R", "+" + pct(b.raf), "Ráfagas", "Sus ráfagas pegan o curan más.");
    if (b.bbIni) ch("ico_cristal_rafaga", "R", "+" + b.bbIni, "Ráfaga inicial", "Empieza cada combate con esa ráfaga ya cargada.");
    if (b.res) Object.keys(b.res).forEach(function (e) { ch("ico_emblema_" + e.toLowerCase(), e.charAt(0), "−" + pct(b.res[e]), "Resistencia a " + e, "Recibe menos daño de ataques de " + e + "."); });
    return rejilla(L, "fila-mini");
  }
  function caraPeq(nodo, px, redonda) { return h("div", { class: "tc", style: "position:relative;overflow:hidden;flex:none;width:" + px + "px;height:" + px + "px;border-radius:" + (redonda ? "50%" : "12px") }, [nodo]); }
  function ventaja(elEnemigo) { // cuántos del escuadrón le pegan fuerte
    if (!C) return ""; var n = C.st.aliados.filter(function (a) { return a.vivo && D.FUERTE[a.el] === elEnemigo; }).length;
    return n ? "débil a " + D.ELEMENTOS.filter(function (x) { return D.FUERTE[x] === elEnemigo; })[0] : elEnemigo;
  }
  function icoMat(m) { var x = D.MATS[m]; return icono(m === "sello_incursion" && hay("ico_sello_incursion") ? "ico_sello_incursion" : x.ico, x.nivel === 5 ? "T" : (x.nivel === 4 ? "L" : String(x.nivel)), x.el ? D.COLOR[x.el] : "#d8c8a0"); }
  function fichaItem(id) {
    var it = D.ITEMS[id], falta = M.faltaPara(S, id), tengo = M.tiene(S, id), ct = M.costeTemple(id);
    function coste(c) {
      var L = [PREMIO.oro(c.oro)]; L[0].falta = S.oro < c.oro;
      Object.keys(c.mats).forEach(function (m) { var n = S.mats[m] || 0, o = deMat(m, n + "/" + c.mats[m]); o.falta = n < c.mats[m]; o.r = 0; L.push(o); });
      L.forEach(function (o) { o.mini = 1; }); return rejilla(L, "fila-mini");
    }
    var receta = it.leyenda ? null : coste(it.receta);
    return h("div", { class: "caja" + (it.unico ? " final" : "") + (it.leyenda ? " leyenda" : "") }, [
      it.leyenda && hay("arm_" + id) ? h("div", { class: "arma-leyenda-arte", style: "background-image:url(" + url("arm_" + id) + ")" }) : null,
      h("div", { class: "fila" }, [icono(it.ico, it.tipo === "arma" ? "A" : "E", it.el ? D.COLOR[it.el] : "#d8c8a0"), h("h2", { text: nombrePieza(id), style: "flex:1" }),
        h("span", { class: "tenue", text: tengo ? "Tienes " + tengo : "" })]),
      chipsBonus(id),
      M.efectoArma(id) ? h("p", { class: "efecto-arma" }, [h("b", { text: M.efectoArma(id).fam + " · " }), M.efectoArma(id).texto]) : null,
      M.rasgoArma(id) ? h("p", { class: "efecto-arma propio" }, [h("b", { text: "Solo esta · " }), M.rasgoArma(id).texto]) : null,
      h("p", { class: "tenue", text: (it.tipo === "arma" ? (it.el ? "Solo para ecos de " + it.el + "." : "La lleva cualquier eco.") : "") + (it.leyenda ? " Arma de leyenda: no se forja, solo sale del arcón del Altar." : it.unico ? " Arma final: solo puede existir una." : "") }),
      receta,
      it.leyenda ? null : h("button", { class: "btn", type: "button", disabled: falta.length > 0, text: falta.length ? (falta[0] === "Solo puede existir una" ? "Ya la tienes" : "Te falta: " + falta.slice(0, 2).join(", ") + (falta.length > 2 ? "..." : "")) : "Forjar",
        on: function () { if (M.forjar(S, id)) { guardar(); pintar(); } } }),
      tengo && ct ? coste(ct) : null,
      !tengo ? null : (ct ? h("button", { class: "btn sec", type: "button", disabled: !M.puedeTemplar(S, id),
        text: "Templar a +" + (M.temple(id) + 1),
        on: function () { if (M.templar(S, id)) { guardar(); pintar(); } } }) : h("p", { class: "tenue", text: "Templada al máximo: +5." })),
      null]);
  }
  // ---------- equipar ----------
  // Un eco, dos huecos. Tocas un hueco y salen tus piezas: encendidas las que le valen, apagadas las que no.
  function porQueNo(id, k) {
    var it = D.ITEMS[k], u = S.unidades[id];
    if (u[it.tipo] === k) return null;
    if (!M.puedeLlevar(id, k)) return "Solo para ecos de " + it.el;
    if (M.libres(S, k) < 1) return "La llevan otros ecos";
    return null;
  }
  function detalleItem(k, id) {
    var it = D.ITEMS[k], no = id ? porQueNo(id, k) : null;
    var capa = h("div", { class: "capa centro", on: function () { capa.remove(); } }, [h("div", { class: "caja" }, [
      h("div", { class: "fila" }, [icono(it.ico, it.tipo === "arma" ? "A" : "E", it.el ? D.COLOR[it.el] : "#d8c8a0"), h("h2", { text: nombrePieza(k), style: "flex:1" }), it.el ? punto(it.el) : null]),
      chipsBonus(k), M.efectoArma(k) ? h("p", { class: "efecto-arma" }, [h("b", { text: M.efectoArma(k).fam + " · " }), M.efectoArma(k).texto]) : null,
      M.rasgoArma(k) ? h("p", { class: "efecto-arma propio" }, [h("b", { text: "Solo esta · " }), M.rasgoArma(k).texto]) : null,
      h("p", { class: "tenue", text: (it.tipo === "arma" ? (it.el ? "Arma de " + it.el + ": solo la pueden llevar ecos de " + it.el + "." : "Arma de oficio: la puede llevar cualquier eco.") : "Equipo: lo puede llevar cualquier eco.") + " Tienes " + M.tiene(S, k) + ", libres " + M.libres(S, k) + "." }),
      no ? h("p", { class: "falta", text: no + "." }) : null,
      h("button", { class: "btn sec", type: "button", text: "Cerrar" })])]);
    app.appendChild(capa);
  }
  function vEquipar(pad) {
    var ids = S.escuadron.concat(Object.keys(S.unidades).filter(function (k) { return S.escuadron.indexOf(k) < 0; }).sort(function (a, b) { return M.poder(b, S.unidades[b]) - M.poder(a, S.unidades[a]); }));
    if (!V.equipa || !S.unidades[V.equipa]) V.equipa = ids[0];
    var id = V.equipa, u = S.unidades[id], b = D.HEROES[id], st = M.stats(id, u), e = M.estrellas(id, u);
    pad.appendChild(h("div", { class: "tira", role: "group", "aria-label": "Elige eco" }, ids.map(function (k) {
      var uu = S.unidades[k], vacios = (uu.arma ? 0 : 1) + (uu.equipo ? 0 : 1);
      return h("button", { class: "tira-eco" + (k === id ? " sel" : "") + (S.escuadron.indexOf(k) >= 0 ? " en" : ""), type: "button", "aria-pressed": String(k === id), "aria-label": D.HEROES[k].n, on: function () { V.equipa = k; V.hueco = null; pintar(); } },
        [h("div", { class: "tc" }, [retrato(k, "neutral")]), h("span", { text: D.HEROES[k].n }), h("i", { class: "huecos" }, [h("b", { class: uu.arma ? "on" : "" }), h("b", { class: uu.equipo ? "on" : "" })])]);
    })));
    var maniqui = h("div", { class: "maniqui" }, [h("div", { class: "halo", style: "--c:" + D.COLOR[b.el] }), h("div", { class: "man-img" }, [ilustracion(id, b.el, despierta(id))])]);
    ["arma", "equipo"].forEach(function (hueco) {
      var k = u[hueco], it = k && D.ITEMS[k];
      maniqui.appendChild(h("button", { class: "hueco " + hueco + (V.hueco === hueco ? " sel" : "") + (it ? " lleno" : ""), type: "button", on: function () { V.hueco = V.hueco === hueco ? null : hueco; pintar(); } }, [
        h("div", { class: "hueco-ico" }, [it ? icono(it.ico, hueco === "arma" ? "A" : "E", it.el ? D.COLOR[it.el] : "#d8c8a0") : h("span", { text: "+" })]),
        h("small", { text: hueco === "arma" ? "Arma" : "Equipo" }), h("b", { text: it ? nombrePieza(k) : "Vacío" })]));
    });
    pad.appendChild(maniqui);
    pad.appendChild(h("div", { class: "fila", style: "justify-content:space-between" }, [h("h2", {}, [punto(b.el), " " + b.n + " · Nv " + u.lv + " "]), estrellas(e)]));
    pad.appendChild(h("div", { class: "stats" }, [["Vida", st.hp], ["Ataque", st.atk], ["Defensa", st.def]].map(function (x) { return h("div", {}, [h("b", { text: String(x[1]) }), h("span", { text: x[0] })]); })));
    if (!V.hueco) { pad.appendChild(h("p", { class: "tenue", text: "Toca un hueco para ver qué puedes ponerle. Las armas de elemento solo valen para ecos de ese elemento; las de oficio y el equipo valen para todos. Cada familia de arma hace una cosa distinta." })); return; }
    var hueco = V.hueco, mios = Object.keys(S.items || {}).filter(function (k) { return S.items[k] > 0 && D.ITEMS[k].tipo === hueco; });
    mios.sort(function (x, y) { return (porQueNo(id, x) ? 1 : 0) - (porQueNo(id, y) ? 1 : 0) || D.ITEMS[y].nivel - D.ITEMS[x].nivel; });
    var caja = h("div", { class: "caja" }, [h("div", { class: "fila" }, [h("h2", { text: hueco === "arma" ? "Tus armas" : "Tu equipo", style: "flex:1" }),
      u[hueco] ? h("button", { class: "chip", type: "button", text: "Quitar", on: function () { M.equipar(S, id, hueco, null); guardar(); pintar(); } }) : null])]);
    if (!mios.length) {
      caja.appendChild(h("p", { class: "tenue", text: hueco === "arma" ? "Aún no tienes ninguna arma. Se forjan en la pestaña Armas con materiales que sueltan los monstruos, o salen en el Altar llamando equipo." : "Aún no tienes equipo. Se forja en la pestaña Equipo o sale en el Altar llamando equipo." }));
      caja.appendChild(h("div", { class: "fila" }, [h("button", { class: "btn sec", type: "button", text: "Ir a forjar", on: function () { V.forja = hueco === "arma" ? "armas" : "equipo"; pintar(); } }),
        h("button", { class: "btn sec", type: "button", text: "Ir al Altar", on: function () { V.altar = "equipo"; ir("altar"); } })]));
    } else {
      caja.appendChild(h("div", { class: "piezas" }, mios.map(function (k) {
        var it = D.ITEMS[k], no = porQueNo(id, k), puesta = u[hueco] === k, largo = null, fue = false;
        var bt = h("button", { class: "pieza" + (no ? " apagada" : " encendida") + (puesta ? " puesta" : ""), type: "button", "aria-disabled": no ? "true" : null }, [
          h("div", { class: "pieza-ico" }, [icono(it.ico, hueco === "arma" ? "A" : "E", it.el ? D.COLOR[it.el] : "#d8c8a0")]),
          h("b", { text: nombrePieza(k) }), h("small", { text: puesta ? "Puesta" : (no || textoPieza(k)) })]);
        bt.addEventListener("pointerdown", function () { fue = false; largo = setTimeout(function () { fue = true; detalleItem(k, id); }, 450); });
        ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { bt.addEventListener(ev, function () { clearTimeout(largo); }); });
        bt.addEventListener("contextmenu", function (ev) { ev.preventDefault(); });
        bt.addEventListener("click", function () { if (fue) return; if (no || puesta) { detalleItem(k, id); return; } M.equipar(S, id, hueco, k); guardar(); V.hueco = null; pintar(); });
        return bt;
      })));
      caja.appendChild(h("p", { class: "tenue", text: "Toca para ponerla. Mantén pulsado para ver lo que da. Las apagadas no le valen a " + b.n + "." }));
    }
    pad.appendChild(caja);
  }
  // Lista corta de cosas que el jugador puede hacer ahora mismo para ser más fuerte.
  function consejos() {
    var L = [], sig = siguienteFase(), fuera = Object.keys(S.unidades).length - S.escuadron.length;
    if (S.escuadron.length < 6 && fuera > 0) L.push({ t: "Tu escuadrón lleva " + S.escuadron.length + " de 6 y tienes " + fuera + " eco" + (fuera > 1 ? "s" : "") + " esperando. Mételos.", b: "Ecos", f: function () { ir("ecos"); } });
    if (S.gemas >= M.COSTE_INVOCAR) L.push({ t: "Tienes " + S.gemas + " gemas: te dan para " + Math.floor(S.gemas / M.COSTE_INVOCAR) + " llamada" + (S.gemas >= 2 * M.COSTE_INVOCAR ? "s" : "") + " en el Altar.", b: "Altar", f: function () { ir("altar"); } });
    var sube = S.escuadron.filter(function (id) { return M.puedeAscender(S, id); })[0];
    if (sube) L.push({ t: D.HEROES[sube].n + " puede subir de estrella: es la mejora más grande que hay.", b: "Subir", f: function () { ir("eco", { eco: sube }); } });
    var pen0 = M.pendientes(S);
    if (pen0.encargos) L.push({ t: "Tienes " + pen0.encargos + " encargo" + (pen0.encargos > 1 ? "s" : "") + " de hoy por cobrar: gemas gratis.", b: "Encargos", f: function () { ir("encargos"); } });
    if (pen0.logros) L.push({ t: "Hay " + pen0.logros + " logro" + (pen0.logros > 1 ? "s" : "") + " por cobrar.", b: "Logros", f: function () { ir("logros"); } });
    var conPuntos = S.escuadron.filter(function (id) { return M.puntosTalento(id, S.unidades[id]).libres > 0; });
    if (conPuntos.length) L.push({ t: (conPuntos.length === 1 ? D.HEROES[conPuntos[0]].n + " tiene" : conPuntos.length + " ecos de tu escuadrón tienen") + " puntos de habilidad sin gastar. Es fuerza gratis.", b: "Habilidades", f: function () { ir("talentos", { eco: conPuntos[0] }); } });
    var sinPoner = null; S.escuadron.forEach(function (id) { var u = S.unidades[id]; ["arma", "equipo"].forEach(function (hc) { if (sinPoner || u[hc]) return;
      if (Object.keys(S.items || {}).some(function (k) { return D.ITEMS[k].tipo === hc && M.puedeLlevar(id, k) && M.libres(S, k) > 0; })) sinPoner = id; }); });
    if (sinPoner) L.push({ t: "Tienes piezas guardadas que " + D.HEROES[sinPoner].n + " podría llevar puestas.", b: "Equipar", f: function () { V.equipa = sinPoner; V.hueco = null; ir("forja", { forja: "equipar" }); } });
    var els = {}; S.escuadron.forEach(function (id) { els[D.HEROES[id].el] = 1; });
    var forjable = Object.keys(D.ITEMS).filter(function (k) { var it = D.ITEMS[k]; return !M.faltaPara(S, k).length && (it.tipo !== "arma" || els[it.el]) && M.libres(S, k) < 1; })[0];
    if (forjable) L.push({ t: "Ya puedes forjar: " + D.ITEMS[forjable].n + ".", b: "Forja", f: function () { ir("forja", { forja: D.ITEMS[forjable].tipo === "arma" ? "armas" : "equipo" }); } });
    if (sig) {
      var F = M.fase(sig[0], sig[1], sig[2]), med = Math.round(S.escuadron.reduce(function (s, id) { return s + S.unidades[id].lv; }, 0) / S.escuadron.length);
      if (med < F.lvl) L.push({ t: "Tu escuadrón va por el nivel " + med + " y la siguiente fase es de nivel " + F.lvl + ". Repite fases ya superadas con Auto: los ecos por debajo del nivel de la fase aprenden el doble.", b: "Mapa", f: function () { ir("mapa"); } });
    }
    var flojo = S.escuadron.slice().sort(function (x, y) { return S.unidades[x].lv - S.unidades[y].lv; })[0];
    if (flojo && sig && S.unidades[flojo].lv < M.fase(sig[0], sig[1], sig[2]).lvl && M.nivelConBono(S, flojo, S.unidades[flojo].lv + 1) > S.unidades[flojo].lv)
      L.splice(Math.min(L.length, 2), 0, { t: "Tienes " + (S.xpBanco || 0) + " de bono de experiencia guardado y " + D.HEROES[flojo].n + " va por detrás (nivel " + S.unidades[flojo].lv + ").", b: "Subir", f: function () { ir("eco", { eco: flojo }); } });
    if (cosechasListas()) L.push({ t: "Hay " + cosechasListas() + " cosecha" + (cosechasListas() > 1 ? "s" : "") + " esperando en el huerto: pociones gratis.", b: "Huerto", f: function () { ir("granja"); } });
    return L;
  }
  function cajaConsejos(titulo, max) {
    var L = consejos().slice(0, max || 4); if (!L.length) return null;
    return h("div", { class: "caja consejos" }, [h("h2", { text: titulo })].concat(L.map(function (x) {
      return h("div", { class: "consejo" }, [h("span", { text: x.t }), h("button", { class: "chip", type: "button", text: x.b, on: function (ev) { var c = ev.currentTarget.closest(".capa"); if (c) c.remove(); if (C && C.st.fin) C = null; x.f(); } })]);
    })));
  }

  // Forja en mosaico: cada pieza es una casilla con su dibujo. Brilla la que ya puedes forjar. Tocar abre su ficha con todo.
  function estadoItem(k) {
    var tengo = M.tiene(S, k), puede = !M.faltaPara(S, k).length, tp = M.temple(k);
    return { tengo: tengo, puede: puede, temple: tp, templable: tengo && M.puedeTemplar(S, k) };
  }
  function teselaItem(k, i) {
    var it = D.ITEMS[k], e = estadoItem(k), r = it.unico ? 3 : Math.min(3, it.nivel);
    return h("button", { class: "tesela item r" + r + (e.puede ? " lista" : "") + (e.tengo ? " mia" : "") + (it.leyenda ? " leyenda" : ""), type: "button", style: "animation-delay:" + (i * 25) + "ms", "aria-label": it.n + (e.puede ? ", lista para forjar" : ""),
      on: function () { V.itemAbierto = k; capaItem(k); } }, [
      e.puede ? h("i", { class: "rebaja lista-forja", text: "Lista" }) : null,
      h("div", { class: "tesela-ico" }, [icono(it.ico, it.tipo === "arma" ? "A" : "E", it.el ? D.COLOR[it.el] : "#d8c8a0")]),
      it.el ? h("i", { class: "tesela-el" }, [punto(it.el)]) : null,
      e.tengo ? h("b", { class: "cuantos", text: (e.tengo > 1 ? "×" + e.tengo + " " : "✓") + (e.temple ? " +" + e.temple : "") }) : null,
      h("small", { text: it.n }),
      h("span", { class: "precio" }, [h("span", { class: "calidad", text: it.leyenda ? "Leyenda" : it.unico ? "Final" : ["", "I", "II", "III"][it.nivel] }), e.templable ? " · templar" : ""])]);
  }
  function capaItem(k) {
    var viejo = app.querySelector(".capa.forja-item"); if (viejo) viejo.remove();
    var capa = h("div", { class: "capa centro info forja-item", on: function () { V.itemAbierto = null; capa.remove(); } }, [
      h("div", { class: "forja-ficha", on: function (ev) { ev.stopPropagation(); } }, [fichaItem(k),
        h("button", { class: "btn sec", type: "button", text: "Cerrar", on: function () { V.itemAbierto = null; capa.remove(); } })])]);
    app.appendChild(capa);
  }
  function mosaicoItems(ids) { return h("div", { class: "mosaico" }, ids.map(teselaItem)); }
  function ordenForja(ids) {
    return ids.slice().sort(function (x, y) { var a = estadoItem(x), b = estadoItem(y); return (b.puede ? 1 : 0) - (a.puede ? 1 : 0) || D.ITEMS[x].nivel - D.ITEMS[y].nivel; });
  }
  function vForja() {
    var chips = h("div", { class: "chips", role: "group", "aria-label": "Secciones de la forja" }, [["equipar", "Equipar"], ["armas", "Armas"], ["equipo", "Equipo"], ["mats", "Materiales"], ["elementos", "Elementos"]].map(function (x) {
      return h("button", { class: "chip", type: "button", "aria-pressed": String(V.forja === x[0]), text: x[1], on: function () { V.forja = x[0]; V.itemAbierto = null; pintar(); } });
    }));
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad tienda" });
    if (V.forja === "equipar") vEquipar(pad);
    else if (V.forja === "armas") {
      var fams = Object.keys(M.FAMILIAS), fsel = V.fam || "todas";
      if (fsel !== "todas" && fsel !== "listas" && fams.indexOf(fsel) < 0) fsel = "todas";
      var armas = Object.keys(D.ITEMS).filter(function (k) { return D.ITEMS[k].tipo === "arma" && (!D.ITEMS[k].leyenda || M.tiene(S, k)); }), listas = armas.filter(function (k) { return estadoItem(k).puede; });
      pad.appendChild(h("div", { class: "chips sueltas envuelve", role: "group", "aria-label": "Familias de arma" }, [["todas", "Todas"], ["listas", "Puedo forjar (" + listas.length + ")"]].concat(fams.map(function (f) { return [f, M.FAMILIAS[f].n]; })).map(function (x) {
        return h("button", { class: "chip", type: "button", "aria-pressed": String(fsel === x[0]), on: function () { V.fam = x[0]; pintar(); } }, [hay("ico_fam_" + x[0]) ? icono("ico_fam_" + x[0], "", "") : null, x[1]]);
      })));
      if (fsel === "listas") pad.appendChild(listas.length ? mosaicoItems(ordenForja(listas)) : h("p", { class: "tenue", text: "Ahora mismo no te llega para ninguna. Toca cualquier arma para ver qué le falta." }));
      else (fsel === "todas" ? fams : [fsel]).forEach(function (f) {
        var FF = M.FAMILIAS[f], ids = armas.filter(function (k) { return D.ITEMS[k].fam === f; }); if (!ids.length) return;
        pad.appendChild(h("div", { class: "fam-cab" }, [h("h2", { text: FF.n }), h("span", { class: "tenue", text: FF.clase + " · " + FF.d.replace("{v}", FF.v.map(function (v) { return FF.v[0] < 1 ? Math.round(v * 100) : v; }).join("/") + (FF.v[0] < 1 ? " %" : "")) })]));
        pad.appendChild(mosaicoItems(ordenForja(ids)));
      });
    } else if (V.forja === "equipo") {
      pad.appendChild(mosaicoItems(ordenForja(Object.keys(D.ITEMS).filter(function (k) { return D.ITEMS[k].tipo === "equipo"; }))));
    } else if (V.forja === "mats") {
      D.ELEMENTOS.forEach(function (E) {
        var ids = Object.keys(D.MATS).filter(function (m) { return D.MATS[m].el === E; });
        pad.appendChild(h("div", { class: "fam-cab" }, [h("h2", {}, [punto(E), " " + E]), h("span", { class: "tenue", text: "Veta en: " + M.vetas(E).filter(function (v) { return M.desbloqueada(S, v.r, v.a, 0, 0); }).slice(-2).map(function (v) { return v.n; }).join(", ") })]));
        pad.appendChild(rejilla(ids.map(function (m) { var o = deMat(m, S.mats[m] || 0); if (!S.mats[m]) o.falta = true; return o; }), "mats-forja"));
      });
      var tro = Object.keys(D.MATS).filter(function (m) { return !D.MATS[m].el; });
      pad.appendChild(h("div", { class: "fam-cab" }, [h("h2", { text: "Trofeos y sellos" })]));
      pad.appendChild(rejilla(tro.map(function (m) { var o = deMat(m, S.mats[m] || 0); if (!S.mats[m]) o.falta = true; return o; }), "mats-forja"));
    } else {
      pad.appendChild(h("div", { class: "caja" }, [h("h2", { text: "Quién vence a quién" }),
        h("p", { text: "Brasa → Bosque → Rayo → Marea → Brasa" }), h("p", { text: "Alba ⇄ Ocaso: se hacen daño de más la una a la otra." }),
        h("p", { class: "tenue", text: "Pegar con ventaja hace un 50 % más de daño. Pegar en desventaja, un 25 % menos." })]));
      M.arbol().forEach(function (a) {
        pad.appendChild(h("div", { class: "caja" }, [h("h2", {}, [punto(a.el), " " + a.el]),
          h("p", {}, ["Vence a ", punto(a.vence), " " + a.vence + ". Cae ante ", punto(a.cae), " " + a.cae + "."]),
          h("p", { class: "tenue", text: "Sus monstruos están en: " + a.regiones.map(function (r) { return r.n + " (" + r.cuantos + ")"; }).join(", ") + "." }),
          h("p", { class: "tenue", text: "Vetas de " + a.el + " (materiales sin depender de los monstruos): " + M.vetas(a.el).map(function (v) { return v.n + (S.hechas[M.clave(v.r, v.a, 0)] || M.desbloqueada(S, v.r, v.a, 0, 0) ? "" : " (cerrado)"); }).slice(0, 7).join(", ") + "." }),
          h("div", { class: "fila" }, a.regiones.slice(0, 2).map(function (r) {
            return h("button", { class: "btn sec", type: "button", disabled: !M.desbloqueada(S, r.r, 0, 0), text: "Ir a " + r.n, on: function () { ir("mapa", { region: r.r }); } });
          }))]));
      });
    }
    c.appendChild(pad); fondoDe(c, "pan_forja_recuerdos");
    app.appendChild(barra("Forja")); app.appendChild(chips); app.appendChild(c); app.appendChild(nav());
    if (V.itemAbierto && D.ITEMS[V.itemAbierto] && (V.forja === "armas" || V.forja === "equipo")) capaItem(V.itemAbierto);
  }
  function huecosEquipo(id) {
    var u = S.unidades[id], caja = h("div", { class: "caja" }, [h("h2", { text: "Arma y equipo" })]);
    ["arma", "equipo"].forEach(function (hueco) {
      var puesto = u[hueco] && D.ITEMS[u[hueco]];
      caja.appendChild(h("div", { class: "fila" }, [h("b", { text: hueco === "arma" ? "Arma: " : "Equipo: " }),
        h("span", { style: "flex:1", class: puesto ? "" : "tenue", text: puesto ? nombrePieza(u[hueco]) + " (" + textoPieza(u[hueco]) + ")" : "nada" }),
        puesto ? h("button", { class: "chip", type: "button", text: "Quitar", on: function () { M.equipar(S, id, hueco, null); guardar(); pintar(); } }) : null]));
      var ops = Object.keys(S.items || {}).filter(function (k) { return D.ITEMS[k].tipo === hueco && M.puedeLlevar(id, k) && M.libres(S, k) > 0 && u[hueco] !== k; });
      if (ops.length) caja.appendChild(h("div", { class: "fila" }, ops.map(function (k) {
        return h("button", { class: "chip", type: "button", text: "Poner " + D.ITEMS[k].n, on: function () { M.equipar(S, id, hueco, k); guardar(); pintar(); } });
      })));
    });
    caja.appendChild(h("button", { class: "btn sec", type: "button", text: "Equipar en la forja", on: function () { V.equipa = id; V.hueco = null; ir("forja", { forja: "equipar" }); } }));
    return caja;
  }

  // ---------- tienda ----------
  // Tienda en mosaico: cuatro escaparates, todo con icono. Tocar una casilla abre su ficha con para qué sirve y los botones de compra.
  function fichaArt(a) {
    var o;
    if (a.clase === "objeto") o = deObjeto(a.ref, "");
    else if (a.clase === "mat") o = deMat(a.ref, "");
    else if (a.clase === "item") { var it = D.ITEMS[a.ref]; o = { nodo: function () { return icono(it.ico, "A", "#d8c8a0"); }, n: it.n, d: textoPieza(a.ref) + ". Arma de oficio: la lleva cualquier eco.", r: it.nivel, tengo: M.tiene(S, a.ref) }; }
    else if (a.clase === "fragmento") o = PREMIO.fragmentos("");
    else if (a.clase === "medalla") o = PREMIO.medallas("");
    else if (a.clase === "oro") { o = PREMIO.oro(""); o.n = "Saco de oro"; o.d = "Cambia gemas por " + a.cant + " de oro. Da más cuantas más regiones hayas soltado."; }
    else if (a.clase === "bono") { o = PREMIO.bono(""); o.d = "Añade " + a.cant + " de experiencia al bono, para gastar en el eco que quieras."; }
    else { o = PREMIO.abono(""); o.d = "Un saco de abono para subir un nivel el huerto: cada cosecha da más."; o.tengo = S.granja.llaves.abono || 0; }
    if (a.cant && a.cant > 1 && a.clase !== "oro" && a.clase !== "bono") o.n = a.cant + " × " + o.n;
    return o;
  }
  function monedaIco(m) { return m === "gemas" ? icono("ico_gema", "G", "#8f8cf0") : icono("ico_oro", "O", "#f0c24a"); }
  function capaCompra(a) {
    var o = fichaArt(a), tengoM = a.moneda === "gemas" ? S.gemas : S.oro, max = Math.floor(tengoM / a.precio);
    function comprar(n) { return function (ev) { ev.stopPropagation(); if (M.comprarArt(S, a.id, n)) { SON.fx("premio"); guardar(); capa.remove(); pintar(); } }; }
    var capa = h("div", { class: "capa centro info", on: function () { capa.remove(); } }, [h("div", { class: "caja info-caja r" + (o.r || 0), on: function (ev) { ev.stopPropagation(); } }, [
      h("div", { class: "info-ico" }, [o.nodo ? o.nodo() : icono(o.ico, o.letra || "?", o.color || "#d8c8a0")]),
      o.r ? h("div", { class: "info-rareza", text: RAREZA[Math.min(3, o.r)] }) : null,
      h("h2", { text: o.n }), h("p", { text: o.d }), o.tengo != null ? h("p", { class: "tenue", text: "Tienes " + o.tengo + "." }) : null,
      a.rebaja ? h("div", { class: "aviso-raro", text: "Hoy, un " + Math.round(a.rebaja * 100) + " % más barato" }) : null,
      h("div", { class: "fila" }, [
        h("button", { class: "btn", type: "button", disabled: max < 1, on: comprar(1) }, ["Comprar · ", monedaIco(a.moneda), " " + a.precio]),
        !a.unaVez && max >= 5 ? h("button", { class: "btn sec", type: "button", on: comprar(5) }, ["× 5 · ", monedaIco(a.moneda), " " + a.precio * 5]) : null]),
      max < 1 ? h("p", { class: "falta", text: a.moneda === "gemas" ? "Te faltan gemas." : "Te falta oro." }) : null,
      h("button", { class: "btn sec", type: "button", text: "Cerrar", on: function () { capa.remove(); } })])]);
    app.appendChild(capa);
  }
  function vTienda() {
    M.usarDia(hoy());
    var c = h("div", { class: "cuerpo" }), pad = h("div", { class: "pad tienda" }), CAT = M.catalogo(S), sec = V.tienda || "hoy", reg = M.regionesHechas(S);
    var chips = h("div", { class: "chips", role: "group", "aria-label": "Escaparates" }, [["hoy", "Oferta de hoy"], ["objetos", "Objetos"], ["mats", "Materiales"], ["gemas", "Con gemas"]].map(function (x) {
      return h("button", { class: "chip", type: "button", "aria-pressed": String(sec === x[0]), text: x[1], on: function () { V.tienda = x[0]; pintar(); } }); }));
    var cab = { hoy: "Tres cosas rebajadas. Cambian cada día y se compran una vez.", objetos: "Para usar en combate. El huerto te da lo básico gratis cada 20 minutos.",
      mats: "Para forjar y templar. Los buenos se abren al soltar más regiones.", gemas: "Lo que el oro no compra." }[sec];
    pad.appendChild(h("p", { class: "tenue", text: cab }));
    pad.appendChild(h("div", { class: "mosaico" }, CAT[sec].map(function (a, i) {
      var o = fichaArt(a), no = a.cerrado || a.agotado, caro = (a.moneda === "gemas" ? S.gemas : S.oro) < a.precio;
      return h("button", { class: "tesela r" + Math.min(3, o.r || 0) + (no ? " no" : "") + (caro && !no ? " caro" : ""), type: "button", style: "animation-delay:" + (i * 30) + "ms", "aria-label": o.n + ", " + a.precio + " de " + a.moneda,
        on: function () { if (a.cerrado) { info({ ico: "ico_candado", letra: "×", color: "#3a3148", n: o.n, d: "Se abre cuando sueltes " + a.pide + (a.pide === 1 ? " región." : " regiones.") + " Llevas " + reg + "." }); return; } if (a.agotado) return; capaCompra(a); } }, [
        a.rebaja ? h("i", { class: "rebaja", text: "−" + Math.round(a.rebaja * 100) + " %" }) : null,
        h("div", { class: "tesela-ico" }, [a.cerrado ? icono("ico_candado", "×", "#3a3148") : (o.nodo ? o.nodo() : icono(o.ico, o.letra || "?", o.color || "#d8c8a0"))]),
        a.cant > 1 && a.clase !== "oro" && a.clase !== "bono" ? h("b", { class: "cuantos", text: "×" + a.cant }) : null,
        h("small", { text: o.n.replace(/^\d+ × /, "") }),
        h("span", { class: "precio" }, a.agotado ? ["Agotado"] : (a.cerrado ? ["Cerrado"] : [monedaIco(a.moneda), " " + a.precio]))]);
    })));
    if (sec === "gemas") pad.appendChild(h("div", { class: "caja" }, [h("div", { class: "fila" }, [icono(hay("ico_medalla_eco") ? "ico_medalla_eco" : "ico_recuerdo_completo", "M", "#e6c46a"), h("h2", { text: "Fundir fragmentos", style: "flex:1" }), h("span", { class: "tenue", text: S.fragmentos + " / " + M.FRAG_POR_MEDALLA })]),
      h("button", { class: "btn", type: "button", disabled: S.fragmentos < M.FRAG_POR_MEDALLA, text: "Fundir " + M.FRAG_POR_MEDALLA + " fragmentos en una medalla", on: function () { if (M.fundir(S)) { SON.fx("premio"); guardar(); pintar(); } } })]));
    c.appendChild(pad); fondoDe(c, "pan_tienda");
    app.appendChild(barra("Tienda")); app.appendChild(chips); app.appendChild(c); app.appendChild(nav());
  }

  // ---------- diálogo ----------
  // Conversación sobre el fondo del lugar: una cara a cada lado, la que habla iluminada. Las caras se miran.
  function fondoEscena(clave) {
    var m = /(\d)-(\d)-(\d)$/.exec(clave);
    if (!m) { var f0 = fondo("pan_plaza_gremio", ["#4a3a6a", "#d08a4a", "#3a2f3f"]); if (!hay("pan_plaza_gremio")) f0.appendChild(h("div", { class: "sol" })); return f0; }
    var z = D.ZONAS[+m[1]], tipo = (+m[2] === 4 && +m[3] === 4) ? "jefe" : (+m[2] >= 2 ? "interior" : "exterior");
    return fondo("map_" + z.id + "_" + tipo, z.cielo);
  }
  // Escenas ilustradas: en qué frase de cada conversación entra cada una ("" vuelve al fondo del lugar).
  var CUADROS = {
    "intro": { 0: "esc_prologo_eclipse", 1: "", 3: "esc_prologo_emblema", 4: "" },
    "post-0-0-0": { 1: "esc_r1_dalia_vecinos" }, "pre-0-4-4": { 0: "esc_r1_fenn_roble" }, "post-0-4-4": { 0: "esc_r1_despedida_roble", 3: "" },
    "pre-1-0-0": { 1: "esc_r2_turno_eterno" }, "post-1-2-4": { 1: "esc_r2_kael_compuerta", 2: "" }, "post-1-4-4": { 0: "esc_r2_horno_apagado", 2: "" },
    "pre-2-0-0": { 1: "esc_r3_barco_parado" }, "post-2-4-4": { 0: "esc_r3_sirel_tripulacion", 2: "esc_r3_vesper_aparece" },
    "pre-3-0-0": { 1: "esc_r4_rayo_inmovil", 3: "" }, "post-3-0-4": { 0: "esc_r4_taller" }, "post-3-4-4": { 0: "esc_r4_rayo_cae" },
    "pre-4-0-0": { 1: "esc_r5_funcion_vacia" }, "post-4-4-4": { 0: "esc_r5_telon" },
    "pre-5-0-0": { 0: "esc_r6_lluvia_colgada" }, "post-5-4-4": { 0: "esc_r6_llueve" },
    "pre-6-0-0": { 0: "esc_r7_montones" }, "post-6-4-4": { 0: "esc_r7_nombres_vuelven", 2: "" },
    "pre-7-0-0": { 0: "esc_r8_seren_edrin" }, "pre-7-4-4": { 0: "esc_r8_seren_trono" }, "post-7-4-4": { 0: "esc_r8_eleccion" }
  };
  function nombreDe(q) { return q.indexOf("e:") === 0 ? D.ENEMIGOS[q.slice(2)].n : (D.HEROES[q] ? D.HEROES[q].n : (D.NOMBRES[q] || "")); }
  function dialogo(clave, luego) {
    var lineas = D.ESCENAS[clave]; if (!lineas) { luego(); return; }
    conversar(lineas, { fondo: fondoEscena(clave), cuadros: CUADROS[clave] || {} }, luego);
  }
  // Conversación: una cara a cada lado, la que habla iluminada. Con opc.sobre se pinta encima de lo que haya (el combate).
  function conversar(lineas, opc, luego) {
    var cuadros = opc.cuadros || {}, cuadro = h("div", { class: "cuadro" });
    var i = 0, lados = { izq: null, der: null }, ultimo = null;
    var capa = h("div", { class: "escena" + (opc.sobre ? " sobre" : ""), role: "dialog", "aria-label": "Escena" });
    if (opc.fondo) capa.appendChild(opc.fondo);
    capa.appendChild(cuadro); capa.appendChild(h("div", { class: "esc-velo" }));
    if (opc.cabecera) capa.appendChild(opc.cabecera);
    var cIzq = h("div", { class: "cara izq" }), cDer = h("div", { class: "cara der" });
    var nom = h("div", { class: "dlg-nom" }), txt = h("div", { class: "dlg-txt" }), cuenta = h("span");
    function fin() { capa.classList.add("sale"); setTimeout(function () { capa.remove(); }, 220); luego(); }
    function poner(caja, id, expr, habla) {
      caja.textContent = ""; caja.className = caja.className.replace(/ habla| vacia| enmarcada/g, "");
      if (!id) { caja.className += " vacia"; return; }
      caja.appendChild(h("div", { class: "mira" + (id.indexOf("e:") === 0 ? " enemigo" : "") }, [retrato(id, expr)]));
      if (hay("ui_marco_retrato")) { caja.appendChild(h("div", { class: "marco", style: "background-image:url(" + url("ui_marco_retrato") + ")" })); caja.className += " enmarcada"; }
      if (habla) caja.className += " habla";
    }
    function ver() {
      var l = lineas[i], q = l.q === "narrador" ? null : l.q;
      if (cuadros[i] != null) { var cn = cuadros[i]; if (cn && hay(cn)) { cuadro.style.backgroundImage = "url(" + url(cn) + ")"; cuadro.className = "cuadro on"; } else cuadro.className = "cuadro"; }
      if (q) {
        if (lados.izq !== q && lados.der !== q) {
          // los enemigos hablan desde la izquierda, que es su lado del campo
          if (q.indexOf("e:") === 0) lados.izq = q;
          else if (!lados.der && lados.izq && lados.izq.indexOf("e:") === 0) lados.der = q;
          else if (!lados.izq) lados.izq = q; else if (!lados.der) lados.der = q;
          else if (lados.izq === ultimo) lados.der = q; else lados.izq = q;
        }
        lados["e_" + q] = l.e; ultimo = q;
      }
      poner(cIzq, lados.izq, lados["e_" + lados.izq], q && lados.izq === q);
      poner(cDer, lados.der, lados["e_" + lados.der], q && lados.der === q);
      nom.textContent = q ? nombreDe(q) : "";
      nom.style.textAlign = (q && lados.der === q) ? "right" : "left";
      txt.textContent = l.t; txt.className = "dlg-txt" + (q ? "" : " narr"); txt.classList.remove("entra"); void txt.offsetWidth; txt.classList.add("entra");
      var ultima = i === lineas.length - 1;
      cuenta.textContent = ultima && opc.boton ? "Toca para: " + opc.boton : (i + 1) + " de " + lineas.length + " · toca para seguir";
    }
    var saltar = h("button", { type: "button", text: opc.boton || "Saltar", style: "text-decoration:underline", on: function (ev) { ev.stopPropagation(); fin(); } });
    capa.appendChild(h("div", { class: "caras" }, [cIzq, cDer]));
    var caja = h("div", { class: "dlg-caja" + (hay("ui_caja_dialogo") ? " papel" : "") }, [nom, txt, h("div", { class: "dlg-pie" }, [cuenta, saltar])]);
    if (hay("ui_caja_dialogo")) caja.style.backgroundImage = "url(" + url("ui_caja_dialogo") + ")";
    capa.appendChild(caja);
    capa.addEventListener("click", function () { i++; if (i >= lineas.length) fin(); else ver(); });
    ver(); app.appendChild(capa);
  }
  function escenaUnaVez(clave, luego) {
    if (D.ESCENAS[clave] && !S.vistas[clave]) { S.vistas[clave] = 1; guardar(); dialogo(clave, luego); } else luego();
  }

  // ---------- partículas ----------
  // Un lienzo a media resolución sobre el campo: todo lo que brilla, vuela, llueve o se deshace se dibuja aquí.
  var FX = (function () {
    var cv = document.createElement("canvas"), cx = cv.getContext("2d"), P = [], rayos = [], anillos = [], haces = [];
    var W = 0, H = 0, amb = -1, vivo = false, campo = null, E = 2;
    cv.className = "fxcanvas";
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function montar(c, ambiente) {
      campo = c; c.appendChild(cv); var r = c.getBoundingClientRect(); W = Math.max(1, Math.round(r.width / E)); H = Math.max(1, Math.round(r.height / E));
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      amb = ambiente; if (!vivo) { vivo = true; requestAnimationFrame(paso); }
    }
    function pos(id) {
      var n = document.getElementById(id); if (!n || !campo) return { x: W / 2, y: H / 2 };
      var a = n.getBoundingClientRect(), b = campo.getBoundingClientRect();
      return { x: (a.left - b.left + a.width / 2) / E, y: (a.top - b.top + a.height / 2) / E, w: a.width / E, h: a.height / E };
    }
    function p(o) { if (P.length < 900) P.push(o); }
    function mota(x, y, vx, vy, vida, c, s, g, tipo) { p({ x: x, y: y, vx: vx, vy: vy, v: vida, m: vida, c: c, s: s || 1, g: g || 0, t: tipo || 0, f: Math.random() * 6 }); }
    function estallido(x, y, c, n, fuerza, g) { for (var i = 0; i < n; i++) { var a = rnd(0, 6.283), v = rnd(0.3, 1) * fuerza; mota(x, y, Math.cos(a) * v, Math.sin(a) * v, rnd(14, 30), c, rnd(1, 2.4), g == null ? 0.05 : g); } }
    function anillo(x, y, c, rmax, vida, grosor) { anillos.push({ x: x, y: y, c: c, r: 2, rm: rmax, v: vida, m: vida, g: grosor || 1.5 }); }
    function rayo(x, y, c) {
      var pts = [[x + rnd(-12, 12), -2]], yy = 0; while (yy < y) { yy += rnd(5, 11); pts.push([x + rnd(-9, 9) * (1 - yy / (y + 1)) * 1.6, Math.min(yy, y)]); }
      rayos.push({ pts: pts, c: c, v: 9, m: 9 });
    }
    function haz(x, y, c, n, largo) { for (var i = 0; i < n; i++) haces.push({ x: x, y: y, a: (i / n) * 6.283 + rnd(-0.1, 0.1), c: c, l: largo, v: 20, m: 20 }); }
    var PAL = { Brasa: ["#ffd76a", "#ff8a2a", "#e0562f", "#fff2c0"], Marea: ["#bfe6ff", "#5fb6ee", "#3a8fd6", "#ffffff"], Bosque: ["#9fe08a", "#4fa35a", "#f3a6c8", "#e9f7c0"],
      Rayo: ["#fff7a0", "#ffe14a", "#b79bff", "#ffffff"], Alba: ["#ffffff", "#ffeeb0", "#ffd76a", "#cfe8ff"], Ocaso: ["#c9a8ff", "#8a63c9", "#5a3fa0", "#e8dcff"] };
    function col(el) { var a = PAL[el] || ["#fff"]; return a[Math.floor(Math.random() * a.length)]; }
    // Golpe normal: chispas del color del elemento.
    function golpe(id, el, fuerte) { var o = pos(id); estallido(o.x, o.y, col(el), fuerte ? 16 : 8, fuerte ? 2.6 : 1.8); if (fuerte) anillo(o.x, o.y, col(el), 16, 12); }
    // Ráfaga: cada elemento tiene su propia manera de estallar.
    function rafaga(id, el, sup) {
      var o = pos(id), k = sup ? 2.2 : 1, i;
      if (el === "Brasa") { for (i = 0; i < 46 * k; i++) mota(o.x + rnd(-7, 7) * k, o.y + rnd(0, 10), rnd(-0.25, 0.25), rnd(-2.6, -0.8), rnd(18, 40), col(el), rnd(1, 3), -0.01); anillo(o.x, o.y + 6, "#ff8a2a", 18 * k, 16, 2); }
      else if (el === "Marea") { for (i = 0; i < 40 * k; i++) mota(o.x, o.y + 6, rnd(-1.6, 1.6) * k, rnd(-3, -1), rnd(20, 38), col(el), rnd(1, 2.2), 0.13); anillo(o.x, o.y + 8, "#bfe6ff", 22 * k, 18, 2); anillo(o.x, o.y + 8, "#5fb6ee", 14 * k, 14, 1); }
      else if (el === "Bosque") { for (i = 0; i < 36 * k; i++) { var a = rnd(0, 6.283); mota(o.x + Math.cos(a) * 4, o.y + Math.sin(a) * 4, Math.cos(a) * rnd(0.6, 1.8), Math.sin(a) * rnd(0.6, 1.8) - 0.4, rnd(26, 50), col(el), rnd(1.4, 2.6), 0.015, 1); } anillo(o.x, o.y, "#9fe08a", 16 * k, 16); }
      else if (el === "Rayo") { for (i = 0; i < (sup ? 5 : 2); i++) rayo(o.x + rnd(-6, 6) * k, o.y + 6, i % 2 ? "#b79bff" : "#fff7a0"); estallido(o.x, o.y + 4, "#ffe14a", 18 * k, 2.4, 0.02); }
      else if (el === "Alba") { haz(o.x, o.y, "#ffeeb0", sup ? 14 : 8, sup ? 40 : 24); for (i = 0; i < 26 * k; i++) mota(o.x + rnd(-10, 10) * k, o.y + rnd(-6, 8), 0, rnd(-1.2, -0.3), rnd(22, 44), col(el), rnd(1, 2), 0, 2); anillo(o.x, o.y, "#ffffff", 20 * k, 20, 2); }
      else { for (i = 0; i < 40 * k; i++) { var b = rnd(0, 6.283), R = rnd(16, 26) * k; mota(o.x + Math.cos(b) * R, o.y + Math.sin(b) * R, -Math.cos(b) * R / 16, -Math.sin(b) * R / 16, 16, col(el), rnd(1, 2.4), 0); } setTimeout(function () { estallido(o.x, o.y, "#c9a8ff", 22 * k, 2.6, 0); anillo(o.x, o.y, "#8a63c9", 22 * k, 16, 2.5); }, 260); }
      if (sup) { anillo(o.x, o.y, "#ffffff", Math.max(W, H), 26, 3); }
    }
    function curar(id) { var o = pos(id); for (var i = 0; i < 12; i++) mota(o.x + rnd(-6, 6), o.y + rnd(0, 8), 0, rnd(-1, -0.4), rnd(20, 34), i % 3 ? "#63c784" : "#e9f7c0", rnd(1, 2), 0, 2); }
    function escudo(id, perfecta) { var o = pos(id); anillo(o.x, o.y, perfecta ? "#ffffff" : "#5fb6ee", perfecta ? 20 : 12, perfecta ? 18 : 12, perfecta ? 3 : 2); if (perfecta) { estallido(o.x, o.y, "#bfe6ff", 20, 2.4, 0); haz(o.x, o.y, "#bfe6ff", 6, 18); } }
    function romper(id) { var o = pos(id); for (var i = 0; i < 34; i++) mota(o.x + rnd(-4, 4), o.y + rnd(-6, 6), rnd(-2.6, 2.6), rnd(-3, 0.5), rnd(20, 40), i % 2 ? "#ffffff" : "#ffd76a", rnd(1.5, 3), 0.16); anillo(o.x, o.y, "#ffffff", 26, 16, 3); }
    // Un eco que se va: motas de luz que suben despacio.
    function disolver(id, el) { var o = pos(id), w = (o.w || 16) / 2; for (var i = 0; i < 34; i++) mota(o.x + rnd(-w, w), o.y + rnd(-w, w), rnd(-0.15, 0.15), rnd(-0.9, -0.3), rnd(40, 80), i % 4 ? col(el) : "#ffffff", rnd(1, 2), 0, 2); }
    function aura(id, c, n) { var o = pos(id), w = (o.w || 16) / 2; for (var i = 0; i < (n || 8); i++) mota(o.x + rnd(-w, w), o.y + w, 0, rnd(-1.4, -0.5), rnd(14, 26), c, rnd(1, 2), 0); }
    function celebrar() { for (var i = 0; i < 90; i++) mota(rnd(0, W), rnd(-H * 0.6, 0), rnd(-0.3, 0.3), rnd(0.5, 1.5), rnd(70, 130), ["#ffd76a", "#fff2c0", "#f0a23c", "#ffffff", "#c9a8ff"][i % 5], rnd(1, 2.4), 0.003, 1); }
    function ambiente() {
      var r = Math.random();
      if (amb === 0 && r < 0.10) mota(rnd(0, W + 20), -2, rnd(-0.5, -0.2), rnd(0.2, 0.5), 220, r < 0.05 ? "#c79be0" : "#f3a6c8", 1.4, 0, 1);
      else if (amb === 1 && r < 0.22) mota(rnd(0, W), H + 2, rnd(-0.1, 0.1), rnd(-0.9, -0.3), rnd(60, 120), r < 0.1 ? "#ff8a2a" : "#ffd76a", rnd(1, 1.6), 0, 2);
      else if (amb === 2 && r < 0.5) mota(rnd(-10, W), -2, -0.7, 3.4, 40, "#9fb8e0", 1, 0, 3);
      else if (amb === 3 && r < 0.10) mota(rnd(0, W), rnd(0, H * 0.6), 0, 0, rnd(8, 16), r < 0.05 ? "#fff7a0" : "#b79bff", rnd(1, 2), 0);
      else if (amb === 4 && r < 0.12) mota(rnd(0, W), -2, rnd(-0.2, 0.2), rnd(0.25, 0.6), 220, ["#ff8a6a", "#ffd76a", "#8fd0ff", "#c9a8ff"][Math.floor(r * 400) % 4], 1.4, 0, 1);
      else if (amb === 5 && r < 0.14) mota(rnd(0, W), rnd(0, H), 0, 0, rnd(50, 110), "#cfe8ff", 1, 0, 2);
      else if (amb === 6 && r < 0.2) mota(-2, rnd(H * 0.3, H), rnd(0.6, 1.4), rnd(-0.1, 0.1), 160, "#f3ece8", 1, 0, 2);
      else if (amb === 7 && r < 0.14) mota(rnd(0, W), H + 2, 0, rnd(-0.5, -0.2), rnd(100, 180), r < 0.07 ? "#ffd76a" : "#b79bff", rnd(1, 1.6), 0, 2);
    }
    function paso() {
      if (!cv.isConnected && !P.length && !anillos.length) { vivo = false; return; }
      requestAnimationFrame(paso);
      if (cv.isConnected && amb >= 0) ambiente();
      cx.clearRect(0, 0, W, H); cx.globalCompositeOperation = "lighter";
      var i, o, k;
      for (i = P.length - 1; i >= 0; i--) {
        o = P[i]; o.v--; if (o.v <= 0) { P.splice(i, 1); continue; }
        o.vy += o.g; o.x += o.vx; o.y += o.vy; o.f += 0.12;
        if (o.t === 1) o.x += Math.sin(o.f) * 0.5;             // hoja o pétalo: se mece
        k = o.v / o.m; cx.globalAlpha = o.t === 2 ? Math.sin(k * 3.1416) : Math.min(1, k * 1.6);
        cx.fillStyle = o.c;
        if (o.t === 3) cx.fillRect(Math.round(o.x), Math.round(o.y), 1, 4);
        else { var s = Math.max(1, Math.round(o.s * (o.t === 2 ? 1 : 0.5 + k * 0.5))); cx.fillRect(Math.round(o.x), Math.round(o.y), s, s); }
      }
      for (i = anillos.length - 1; i >= 0; i--) {
        o = anillos[i]; o.v--; if (o.v <= 0) { anillos.splice(i, 1); continue; }
        k = 1 - o.v / o.m; cx.globalAlpha = 1 - k; cx.strokeStyle = o.c; cx.lineWidth = o.g; cx.beginPath(); cx.arc(o.x, o.y, 2 + (o.rm - 2) * (1 - Math.pow(1 - k, 3)), 0, 6.283); cx.stroke();
      }
      for (i = rayos.length - 1; i >= 0; i--) {
        o = rayos[i]; o.v--; if (o.v <= 0) { rayos.splice(i, 1); continue; }
        cx.globalAlpha = o.v % 3 === 0 ? 0.3 : 1; cx.strokeStyle = o.c; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(o.pts[0][0], o.pts[0][1]);
        for (k = 1; k < o.pts.length; k++) cx.lineTo(o.pts[k][0], o.pts[k][1]); cx.stroke(); cx.strokeStyle = "#fff"; cx.lineWidth = 0.7; cx.stroke();
      }
      for (i = haces.length - 1; i >= 0; i--) {
        o = haces[i]; o.v--; if (o.v <= 0) { haces.splice(i, 1); continue; }
        k = 1 - o.v / o.m; cx.globalAlpha = (1 - k) * 0.9; cx.strokeStyle = o.c; cx.lineWidth = 1.5; var a = o.a + k * 0.5, r0 = 3 + k * o.l * 0.4, r1 = 3 + k * o.l;
        cx.beginPath(); cx.moveTo(o.x + Math.cos(a) * r0, o.y + Math.sin(a) * r0); cx.lineTo(o.x + Math.cos(a) * r1, o.y + Math.sin(a) * r1); cx.stroke();
      }
      cx.globalAlpha = 1;
    }
    return { montar: montar, golpe: golpe, rafaga: rafaga, curar: curar, escudo: escudo, romper: romper, disolver: disolver, aura: aura, celebrar: celebrar, anilloEn: function (id, c, r) { var o = pos(id); anillo(o.x, o.y, c, r, 16, 2); } };
  })();

  // ---------- combate ----------
  var C = null; // estado de pantalla del combate
  var PREF = { rapido: false };
  function empezarFase(r, a, f, t) {
    t = t || 0; if (!M.desbloqueada(S, r, a, f, t)) return;
    V.region = r; V.grado = t; V.zona = a; abrirCombate(M.crearCombate(S, r, a, f, t));
  }
  function empezarSecreta(id) {
    if (!M.secretaAbierta(S, id)) return;
    abrirCombate(M.crearCombate(S, 0, 0, 0, 0, id));
  }
  // En la esquina del retrato: qué clase de ráfaga tiene el eco (se enciende cuando puede lanzarla) y, si lleva arma, cuál.
  var LETRA_RAF = { uno: "1", todos: "T", cura: "+", apoyo: "A" }, TIT_RAF = { uno: "Ráfaga a un enemigo", todos: "Ráfaga a todos", cura: "Ráfaga que cura", apoyo: "Ráfaga de apoyo" };
  function icoRafaga(a) {
    var R = M.ramas(a.id), rama = R[R.length - 1], t = a.bbdef.tipo, n = h("i", { class: "carta-raf t-" + t, title: TIT_RAF[t] + ": " + a.bbdef.n }, [icono(rama.nodos[0].ico, LETRA_RAF[t], D.COLOR[a.el])]);
    return n;
  }
  function icoArmaCarta(a) {
    var u = S.unidades[a.id], it = u && u.arma && D.ITEMS[u.arma]; if (!it) return null;
    return h("i", { class: "carta-arma" + (it.leyenda ? " leyenda" : ""), title: it.n }, [icono(it.ico, "A", "#d8c8a0")]);
  }
  function abrirCombate(st) {
    C = { st: st, modo: null, ocupado: true, auto: false, rapido: PREF.rapido, vis: null, timers: [], enCurso: 0, pedirFin: false, t0: performance.now() };
    sincronizar(); ir("combate");
    entrada(st.fase, function () { if (!C || C.st !== st) return; C.ocupado = false; C.t0 = performance.now(); rotulo("Tu turno", "bien"); });
  }
  // Entrada a la misión: el combate ya está detrás, sale el rótulo de la zona y, si toca, una conversación corta.
  function entrada(F, luego) {
    var z = D.ZONAS[F.r], lineas = null, clave = null;
    if (!F.t && !F.secreta) {
      clave = "pre-" + M.clave(F.r, F.a, F.f);
      if (D.ESCENAS[clave] && !S.vistas[clave]) lineas = D.ESCENAS[clave];
      else if (F.f === 0) { clave = "ent-" + F.r + "-" + F.a; if (D.ENTRADAS[F.r + "-" + F.a] && !S.hechas[M.clave(F.r, F.a, F.f)]) lineas = D.ENTRADAS[F.r + "-" + F.a]; else clave = null; }
      else { var kp = F.r + "-" + F.a + "-" + F.f; clave = "paso-" + kp; if (D.PASOS && D.PASOS[kp] && !S.hechas[M.clave(F.r, F.a, F.f)]) lineas = D.PASOS[kp]; else clave = null; }
    }
    if ((F.vecino || F.recuerdo || F.evento) && F.apertura && !S.hechas["S:" + F.secreta]) lineas = F.apertura;
    if (lineas && clave) { S.vistas[clave] = 1; guardar(); }
    // Repetir un combate ya ganado no pide leer nada: sale el nombre y se pelea. La ficha completa queda para la primera vez.
    var yaHecha = !lineas && !F.torre && !F.arena && !!S.hechas[F.secreta ? "S:" + F.secreta : M.clave(F.r, F.a, F.f, F.t)];
    if (yaHecha) { if (F.jefe) { setTimeout(function () { rotulo(F.nombre, "jefe"); }, 60); setTimeout(luego, 1200); } else setTimeout(luego, 150); return; }
    var els = M.elementosDeFase(F), cuenta = {}; F.olas.forEach(function (o) { o.forEach(function (e) { var el = M.baseEnemigo(e.id).el; cuenta[el] = (cuenta[el] || 0) + 1; }); });
    var mas = els.slice().sort(function (x, y) { return cuenta[y] - cuenta[x]; })[0], contra = D.ELEMENTOS.filter(function (x) { return D.FUERTE[x] === mas; })[0];
    var rum = D.RUMORES[F.r], rumor = rum[Math.floor(Math.random() * rum.length)];
    var cab = h("div", { class: "ent-cab" }, [
      h("div", { class: "ent-reg", text: (F.evento ? M.EVENTO.n : z.n) + (F.t ? " · " + M.GRADOS[F.t].n : "") + (F.evento ? "" : F.recuerdo ? " · Recuerdo de " + D.HEROES[F.recuerdo].n : (F.vecino ? " · Encargo de " + (D.NOMBRES[F.vecino] || "un vecino") : (F.secreta ? " · Misión secreta" : ""))) }),
      h("h1", { text: F.nombre }),
      h("div", { class: "ent-els" }, [h("span", { text: "Enemigos: " })].concat(els.map(function (el) { return h("span", { class: "ent-el" }, [punto(el), " " + el]); }))),
      M.vetaDe(F) ? h("div", { class: "ent-els" }, [h("span", { text: "Veta del lugar: " }), h("span", { class: "ent-el" }, [punto(M.vetaDe(F)), " " + M.vetaDe(F)]), h("span", { text: " (materiales)" })]) : null,
      contra ? h("div", { class: "ent-con" }, ["Lleva ecos de ", punto(contra), " " + contra + (F.limite ? ". Tienes " + F.limite + " turnos." : ".")]) : null]);
    var cont = {}; F.olas.forEach(function (o) { o.forEach(function (e) { var b = M.baseEnemigo(e.id), x = M.estadoDeEnemigo({ fase: F }, { id: e.id, el: b.el }); if (x) cont[x[0]] = 1; }); });
    var ks = Object.keys(cont);
    if (ks.length) cab.appendChild(h("div", { class: "ent-est" }, [h("span", { text: "Contagian: " })].concat(ks.map(function (k) { var E = M.ESTADOS[k]; return h("span", { class: "ent-el" }, [icono(E.ico, E.n.charAt(0), "#ef5a4c"), " " + E.n]); })).concat([h("span", { text: "· cubrirse lo evita" })])));
    var ex = F.exigencia || (F.raid ? M.exigencia(F.r, 4, 0) : null);
    if (ex && ex.coraza) cab.appendChild(h("div", { class: "ent-exi", text: "Coraza: los ecos sin arma forjada le hacen un 40 % menos de daño." }));
    if (ex && ex.presencia) cab.appendChild(h("div", { class: "ent-exi", text: "Presencia: pide ecos de " + ex.presencia + "★. Cada estrella que falte, 25 % menos de daño y 25 % más recibido." }));
    conversar(lineas || [{ q: "narrador", t: F.secreta ? M.secreta(F.secreta).d : rumor }], { sobre: true, cabecera: cab, cuadros: CUADROS[clave] || {}, boton: "A luchar" }, luego);
  }
  function sincronizar() {
    var st = C.st;
    C.vis = { a: st.aliados.map(function (x) { return { hp: x.hp, bb: x.bb, vivo: x.vivo, pose: x.vivo ? 0 : 5 }; }),
              e: st.enemigos.map(function (x) { return { hp: x.hp, max: x.max, vivo: x.vivo, pose: x.vivo ? (x.carga ? 1 : 0) : 5 }; }) };
    C.marcados = {}; st.enemigos.forEach(function (e, k) { var it = M.intencion(st, k); if (it && it.tipo === "r") C.marcados[e.marca] = e.n; });
  }
  var POS_E = [[5, 70], [24, 84], [3, 97]], POS_A = [[53, 68], [76, 68], [60, 83], [82, 83], [51, 97], [74, 97]];
  // Iguala el tamaño de los héroes (cada hoja llega dibujada a una escala distinta) y apoya los pies en el suelo.
  function asentar(nodo, id, lado, jefe) {
    var a = nodo.querySelector(".arte"); if (!a || !a.dataset.hoja) return;
    var m = ARTE["bat_" + id] || {}, k = lado === "a" ? 1.3 : (jefe ? 1.25 : 1.35);
    if (lado === "a" && m.c) k *= Math.max(0.85, Math.min(1.6, 0.68 / m.c));
    a.style.transformOrigin = "50% 100%";
    a.style.transform = "translateY(" + ((m.p || 0) * k * 100).toFixed(1) + "%) scale(" + k.toFixed(3) + ")";
  }
  function insignias(u) {
    return h("div", { class: "ests" }, M.estadosDe(u).map(function (k) {
      var E = M.ESTADOS[k], n = icono(E.ico, E.n.charAt(0), E.malo ? "#ef5a4c" : "#9be3b5"); n.title = E.n + ": " + E.d; n.classList.add(E.malo ? "malo" : "bueno");
      if (k === "barrera" && u.barreraEl) n.style.boxShadow = "0 0 0 2px " + D.COLOR[u.barreraEl];
      return n; }).concat(u.fase2 ? [(function () { var n = icono("ei_es_01", "2", "#ffd76a"); n.title = "Segunda fase: pega un 20 % más y ya no tiene coraza"; n.classList.add("malo"); return n; })()] : []).concat(u.egida ? [(function () { var n = icono("ei_es_10", "É", "#9be3b5"); n.title = "Égida: bloquea el siguiente golpe"; n.classList.add("bueno"); return n; })()] : []));
  }
  function pintarEstados(lado, i) {
    if (!C) return; var u = (lado === "a" ? C.st.aliados : C.st.enemigos)[i];
    [lado + i, lado === "a" ? "c" + i : null].forEach(function (id) {
      var n = id && document.getElementById(id); if (!n) return; var v = n.querySelector(".ests"); if (v) v.replaceWith(insignias(u)); else n.appendChild(insignias(u));
    });
    var c = lado === "a" && document.getElementById("c" + i); if (c) c.classList.toggle("inmovil", M.inmovil(u));
  }
  function barraRafaga(bb) {
    var m = h("div", { class: "medidor bb" }, [h("i"), h("b")]);
    m.firstChild.style.width = Math.min(100, bb) + "%"; m.lastChild.style.width = Math.max(0, bb - 100) + "%"; return m;
  }
  function vCombate() {
    var st = C.st, z = D.ZONAS[st.fase.r];
    app.appendChild(h("div", { class: "barra" }, [h("div", { class: "tit", text: st.fase.nombre + (st.fase.t ? " · " + M.GRADOS[st.fase.t].n : "") }),
      h("span", { class: "tenue", text: "Oleada " + (st.ola + 1) + " de " + st.fase.olas.length + " · Turno " + st.turno })]));
    var tipoFondo = st.fase.granJefe ? "jefe" : (st.fase.a >= 2 ? "interior" : "exterior");
    var campo = h("div", { class: "campo", id: "campo" }); campo.appendChild(fondo(st.fase.fondo || ("map_" + z.id + "_" + tipoFondo), z.cielo));
    campo.appendChild(h("div", { class: "suelo" }));
    campo.appendChild(h("button", { class: "vel" + (C.rapido ? " on" : ""), type: "button", "aria-label": "Velocidad del combate", text: C.rapido ? "×2" : "×1",
      on: function (ev) { ev.stopPropagation(); if (C.enCurso) return; C.rapido = !C.rapido; PREF.rapido = C.rapido; C.t0 = performance.now() - ahora() / (C.rapido ? 2 : 1); repintar(); } }));
    if (!st.fase.fondo && hay("amb_" + z.id)) campo.appendChild(h("div", { class: "amb", style: "background-image:url(" + url("amb_" + z.id) + ")" }));   // primer plano del terreno, delante de los luchadores
    campo.appendChild(h("div", { class: "aviso", id: "aviso" }));
    campo.appendChild(h("div", { class: "chispas", id: "chispas" }));
    if (st.fase.limite) campo.appendChild(h("div", { class: "limite", text: "Turno " + st.turno + " de " + st.fase.limite }));
    campo.appendChild(h("div", { class: "cadena" + (st.cadena > 0 ? " on" : ""), id: "cadena", text: st.cadena > 0 ? "Cadena ×" + st.cadena + " · siguiente +" + Math.round((M.bonoCadena(st.cadena) - 1) * 100) + " %" : "" }));
    var capas = [];
    st.enemigos.forEach(function (e, i) {
      var conJefe = st.enemigos.some(function (x) { return x.jefe; });
      var v = C.vis.e[i], pos = e.jefe ? [1, 96] : (conJefe ? [[34, 72], [34, 72], [32, 97]][i % 3] : POS_E[i % 3]), obj = v.vivo && objetivoActual() === i;
      var it = v.vivo ? M.intencion(st, i) : null;
      var d = h("button", { class: "lucha e" + (e.jefe ? " jefe" : "") + (v.vivo ? "" : " caido") + (obj ? " obj" : "") + (e.carga && v.vivo ? " carga" : "") + (e.variante ? " feroz" : "") + (e.escudo && v.vivo ? " cubierto" : "") + (e.aturdido > 0 && v.vivo ? " aturdido" : "") + (e.furia > 0 && v.vivo ? " furia" : ""), type: "button", id: "e" + i,
        "aria-label": e.n + (v.vivo ? ", vida " + v.hp + " de " + e.max : ", derrotado"), style: "left:" + pos[0] + "%;bottom:" + (100 - pos[1]) + "%" + (conJefe && !e.jefe ? ";width:17%" : ""),
        on: function () { if (C.st.enemigos[i].vivo && !C.ocupado) { C.fijo = i; if (C.enCurso || C.auto) marcarObjetivo(i); else { C.st.objetivo = i; repintar(); } } } },
        [h("div", { class: "vol" + (e.id.indexOf("eco:") === 0 ? " gira" : "") }, [sprite(e.raid && hay("bat_" + e.id + "_furia") ? e.id + "_furia" : e.id.replace("eco:", ""), e.el, v.pose, false, e.jefe)]), h("div", { class: "hp" }, [medidor(v.hp, e.max)]),
         h("div", { class: "nombre-e" }, [punto(e.el), " " + e.n + " · " + ventaja(e.el) + (e.coraza ? " · coraza" : "") + (e.presencia ? " · pide " + e.presencia + "★" : "")]), insignias(e)]);
      asentar(d, e.id.replace("eco:", ""), "e", e.jefe);
      if (it) d.appendChild(h("div", { class: "intento p" + it.peligro + " t-" + it.tipo, text: it.txt }));
      if (obj && hay("ui_cursor_objetivo")) { d.appendChild(h("div", { class: "mira-obj", style: "background-image:url(" + url("ui_cursor_objetivo") + ")" })); d.classList.add("con-mira"); }
      if (e.carga && v.vivo) { var um = M.umbralRuptura(e), rm = h("div", { class: "ruptura", id: "rup" + i, title: "Hazle daño para romper la carga" }, [h("i")]); rm.firstChild.style.width = Math.min(100, 100 * e.dCarga / um) + "%"; d.appendChild(rm); }
      capas.push([pos[1], d]);
    });
    st.aliados.forEach(function (a, i) {
      var v = C.vis.a[i], pos = POS_A[i];
      var d = h("div", { class: "lucha a" + (v.vivo ? "" : " caido") + (a.guardia ? " guardia" : "") + (C.marcados[i] && v.vivo ? " marcado" : ""), id: "a" + i, style: "left:" + pos[0] + "%;bottom:" + (100 - pos[1]) + "%;width:19%" },
        [h("div", { class: "vol" }, [sprite(a.id, a.el, v.pose, despierta(a.id))]), insignias(a)]);
      // Marcadores e ilustraciones miran a la derecha: se voltean para encarar al enemigo. Las hojas de héroe ya miran a la izquierda.
      if (!hay("bat_" + a.id)) d.querySelector(".vol").style.transform = "scaleX(-1)";
      asentar(d, a.id, "a");
      capas.push([pos[1], d]);
    });
    // los de más abajo se pintan los últimos, para que tapen a los de detrás
    capas.sort(function (x, y) { return x[0] - y[0]; }).forEach(function (x) { campo.appendChild(x[1]); });
    app.appendChild(campo);
    FX.montar(campo, st.fase.r);

    var mandos = h("div", { class: "mandos" }), cartas = h("div", { class: "cartas" });
    var pista0 = null;
    st.aliados.forEach(function (a, i) {
      pista0 = null;
      var v = C.vis.a[i], quieto = v.vivo && M.inmovil(a), lista = v.vivo && !a.actuo && !st.fin && !quieto, bb = v.bb;
      if (quieto) pista0 = M.tieneEstado(a, "sueno") ? "Dormido" : "Paralizado";
      var pista = !lista ? "" : (bb >= 200 ? "↑ Súper" : (bb >= 100 ? "→ Ráfaga" : ""));
      var carta = h("div", { class: "carta" + (lista ? " lista" : "") + (!v.vivo ? " ko" : (a.actuo ? " hecha" : "")) + (lista && bb >= 200 ? " super" : (lista && bb >= 100 ? " carga" : "")) + (C.marcados[i] && v.vivo ? " marcada" : "") + (quieto ? " inmovil" : ""),
        id: "c" + i, role: "button", tabindex: "0", "aria-label": a.n + ", vida " + v.hp + " de " + a.max + ", ráfaga " + bb + " de 200" }, [
        h("div", { class: "cn" }, [punto(a.el), h("span", { class: "n", text: a.n }), h("span", { class: "pista", text: pista0 || (a.guardia ? "Guardia" : (C.marcados[i] && v.vivo ? "↓ ¡Cúbrete!" : pista)) }), insignias(a)]),
        h("div", { class: "cc" }, [
          h("div", { class: "ci" }, [retrato(a.id, !v.vivo ? "triste" : (v.hp < a.max * 0.35 ? "enfadado" : (bb >= 100 ? "decidido" : "neutral"))), icoRafaga(a), icoArmaCarta(a)]),
          h("div", { class: "cb" }, [h("div", { class: "l2", id: "lh" + i, text: v.vivo ? v.hp + " / " + a.max : "Caído" }), medidor(v.hp, a.max), h("div", { class: "l2", id: "lb" + i, text: "Ráfaga " + bb }), barraRafaga(bb),
            h("div", { class: "compas", title: "Cuándo cae cada golpe" }, M.ritmo(a.id, a.hits).map(function (ms) { return h("i", { style: "left:" + Math.min(98, ms / 8) + "%" }); }))])])]);
      gestos(carta, i);
      cartas.appendChild(carta);
    });
    mandos.appendChild(cartas);
    function boton(texto, ico, opc) {
      opc = opc || {};
      return h("button", { type: "button", class: (opc.cls || ""), "aria-pressed": opc.on == null ? null : String(!!opc.on), disabled: !!opc.dis, on: opc.fn },
        [ico && hay(ico) ? h("i", { class: "mico", style: bg(ico) }) : null, h("span", { text: texto })]);
    }
    var nObj = Object.keys(M.OBJETOS).reduce(function (s, k) { return s + M.cuantos(S, k); }, 0);
    mandos.appendChild(h("div", { class: "modos" }, [
      boton("Objetos " + nObj, "ico_pocion", { on: C.cajon === "obj", dis: C.auto, fn: function () { if (C.enCurso) return; C.cajon = C.cajon === "obj" ? null : "obj"; C.modo = null; repintar(); } }),
      boton("Auto", "ico_menu_auto", { on: C.auto, fn: function () { C.auto = !C.auto; C.cajon = null; if (!C.enCurso) repintar(); if (C.auto) pasoAuto(); } }),
      boton("Pasar turno", "ico_menu_fin_turno", { dis: C.auto, fn: function () { accion("fin"); } }),
      boton("Más", "ico_menu_ajustes", { on: C.cajon === "mas", fn: function () { if (C.enCurso) return; C.cajon = C.cajon === "mas" ? null : "mas"; repintar(); } })]));
    if (C.cajon === "obj") {
      mandos.appendChild(h("div", { class: "cajon" }, Object.keys(M.OBJETOS).map(function (k) {
        var O = M.OBJETOS[k], n = M.cuantos(S, k);
        return h("button", { type: "button", class: "obj" + (O.raro ? " raro" : ""), "aria-pressed": String(C.modo === k), disabled: n < 1 || st.objetoUsado, title: O.d, on: function () {
          if (O.sobre === "grupo") { C.cajon = null; accion(k, 0); if (C && !C.enCurso) repintar(); return; }
          C.modo = C.modo === k ? null : k; repintar(); } }, [icoObj(k), h("b", { text: String(n) }), h("span", { text: O.n })]);
      })));
      var Om = C.modo && M.OBJETOS[C.modo];
      mandos.appendChild(h("div", { class: "ayuda", text: st.objetoUsado ? "Ya has usado un objeto este turno." : (Om ? Om.d + " Toca la carta del eco." : "Un objeto por turno. Elige uno y toca la carta del eco.") }));
    } else if (C.cajon === "mas") {
      var modos3 = [["rafaga", "Auto: lanza ráfagas"], ["super", "Auto: guarda para la súper"], ["no", "Auto: solo ataques"]], act3 = PREF.autoRaf || "rafaga";
      mandos.appendChild(h("div", { class: "cajon tres" }, modos3.map(function (m) {
        return boton(m[1], null, { on: act3 === m[0], fn: function () { PREF.autoRaf = m[0]; repintar(); } }); })));
      mandos.appendChild(h("div", { class: "ayuda", text: "En automático todos atacan al enemigo que toques. Si no tocas ninguno, eligen ellos." }));
      mandos.appendChild(h("div", { class: "cajon dos" }, [
        boton(PREF.guia === false ? "Aro de compás: no" : "Aro de compás: sí", null, { on: PREF.guia !== false, fn: function () { PREF.guia = PREF.guia === false; repintar(); } }),
        boton(C.rapido ? "Velocidad: rápida" : "Velocidad: normal", null, { on: C.rapido, fn: function () { if (C.enCurso) return; C.rapido = !C.rapido; PREF.rapido = C.rapido; C.t0 = performance.now() - ahora() / (C.rapido ? 2 : 1); repintar(); } }),
        boton("Huir del combate", "ico_menu_volver", { fn: function () { limpiarTimers(); C.auto = false; C = null; ir("mapa"); } })]));
    }
    app.appendChild(mandos);
  }
  // Gestos sobre la carta: tocar ataca, derecha ráfaga, arriba súper ráfaga, abajo guardia.
  function gestos(carta, i) {
    var x0 = null, y0 = 0, largo = null;
    function soltar() { x0 = null; clearTimeout(largo); carta.classList.remove("pulsada"); }
    carta.addEventListener("pointerdown", function (ev) {
      x0 = ev.clientX; y0 = ev.clientY; try { carta.setPointerCapture(ev.pointerId); } catch (e) {}
      carta.classList.add("pulsada");
      // mantener pulsado medio segundo también pone en guardia, por si el móvil se queda con el deslizamiento
      largo = setTimeout(function () { if (x0 !== null) { soltar(); gesto(i, "abajo"); } }, 450);
    });
    carta.addEventListener("pointermove", function (ev) { if (x0 !== null && (Math.abs(ev.clientX - x0) > 12 || Math.abs(ev.clientY - y0) > 12)) clearTimeout(largo); });
    carta.addEventListener("pointercancel", function (ev) {
      // si el sistema nos quita el gesto a medias, se decide con lo recorrido hasta ese momento
      if (x0 !== null && ev.clientY - y0 > 26 && Math.abs(ev.clientY - y0) > Math.abs(ev.clientX - x0)) { soltar(); gesto(i, "abajo"); } else soltar();
    });
    carta.addEventListener("pointerup", function (ev) {
      if (x0 === null) return; var dx = ev.clientX - x0, dy = ev.clientY - y0; soltar();
      var U = 26, g = "toque";
      if (Math.abs(dx) > U || Math.abs(dy) > U) g = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "derecha" : "izquierda") : (dy < 0 ? "arriba" : "abajo");
      gesto(i, g);
    });
    carta.addEventListener("contextmenu", function (ev) { ev.preventDefault(); });
    carta.addEventListener("keydown", function (ev) {
      var k = { Enter: "toque", " ": "toque", ArrowRight: "derecha", ArrowUp: "arriba", ArrowDown: "abajo" }[ev.key]; if (k) { ev.preventDefault(); gesto(i, k); }
    });
  }
  function gesto(i, g) {
    if (!C || C.ocupado || C.auto || C.st.fin) return;
    var a = C.st.aliados[i];
    if (C.modo) { var m = C.modo; C.modo = null; C.cajon = null; accion(m, i); if (C && !C.enCurso) repintar(); return; }
    if (!a.vivo || a.actuo) { quizaFin(); return; }
    if (M.inmovil(a)) { flotarCarta(i, M.tieneEstado(a, "sueno") ? "Está dormido" : "Está paralizado"); return; }
    if (g !== "toque" && M.tieneEstado(a, "enraizado")) { flotarCarta(i, "Enraizado: solo puede atacar"); return; }
    if (g === "toque") accion("atacar", i);
    else if (g === "abajo") accion("guardia", i);
    else if (g === "derecha") { if (a.bb >= 100) accion("rafaga", i); else flotarCarta(i, "Falta ráfaga"); }
    else if (g === "arriba") { if (a.bb >= 200) accion("super", i); else flotarCarta(i, a.bb >= 100 ? "Aún no: llena la barra dorada" : "Falta ráfaga"); }
  }
  function flotarCarta(i, t) { var c = document.getElementById("c" + i); if (!c) return; var s = h("span", { class: "num flojo", style: "font-size:13px;top:30%", text: t }); c.appendChild(s); setTimeout(function () { s.remove(); }, 700); }
  function objetivoActual() {
    var st = C.st; if (st.enemigos[st.objetivo] && st.enemigos[st.objetivo].vivo) return st.objetivo;
    for (var i = 0; i < st.enemigos.length; i++) if (st.enemigos[i].vivo) return i; return -1;
  }
  function repintar() { if (V.n === "combate" && C) { app.textContent = ""; vCombate(); pintarConsejo(); marcarPrimero(); } }
  function ahora() { return (performance.now() - C.t0) * (C.rapido ? 2 : 1); }
  function limpiarTimers() { if (C && C.timers) { C.timers.forEach(clearTimeout); C.timers = []; } if (C) C.enCurso = 0; }
  function marcarCarta(i) { var c = document.getElementById("c" + i); if (c) { c.classList.remove("lista", "carga", "super"); c.classList.add("hecha"); var p = c.querySelector(".pista"); if (p) p.textContent = ""; } }
  function marcarObjetivo(i) {
    C.st.objetivo = i;
    Array.prototype.forEach.call(document.querySelectorAll(".lucha.e"), function (n) { n.classList.toggle("obj", n.id === "e" + i); });
  }
  // Pone al día barras y cifras sin redibujar la pantalla, para no cortar las animaciones en marcha.
  function refrescar() {
    if (!C) return; var st = C.st; pintarConsejo(); marcarPrimero();
    st.aliados.forEach(function (a, j) {
      var v = C.vis.a[j]; if (!v) return; v.hp = a.hp; v.bb = a.bb;
      barraVida("c" + j, a.hp, a.max); barraBB(j, a.bb);
      var lh = document.getElementById("lh" + j), lb = document.getElementById("lb" + j), c = document.getElementById("c" + j);
      if (lh) lh.textContent = a.vivo ? a.hp + " / " + a.max : "Caído"; if (lb) lb.textContent = "Ráfaga " + a.bb;
      if (c && a.vivo && !a.actuo) { c.classList.toggle("super", a.bb >= 200); c.classList.toggle("carga", a.bb >= 100 && a.bb < 200); var p = c.querySelector(".pista"); if (p && !C.marcados[j]) p.textContent = a.bb >= 200 ? "↑ Súper" : (a.bb >= 100 ? "→ Ráfaga" : ""); }
    });
    st.enemigos.forEach(function (e, j) { var v = C.vis.e[j]; if (v) { v.hp = e.hp; barraVida("e" + j, e.hp, e.max); } });
  }
  // Si ya han actuado todos (o lo pides) y no queda ningún ataque en el aire, pasa el turno al enemigo.
  function quizaFin() {
    if (!C || C.ocupado || C.st.fin || C.enCurso > 0) return;
    if (!(M.todosActuaron(C.st) || C.pedirFin)) return;
    C.pedirFin = false; C.ocupado = true; var st = C.st;
    setTimeout(function () { if (C && C.st === st) reproducir(M.finTurno(st, rng)); }, C.rapido ? 180 : 380);
  }
  function accion(tipo, i) {
    if (!C || C.st.fin || C.ocupado) return;
    var st = C.st, ev;
    if (tipo === "fin") { C.pedirFin = true; quizaFin(); return; }
    if (tipo === "guardia" || M.OBJETOS[tipo]) {
      ev = tipo === "guardia" ? M.guardia(st, i) : M.objeto(st, S, tipo, i);
      if (!ev.length) { if (tipo !== "guardia") flotarCarta(i, st.objetoUsado ? "Ya has usado un objeto este turno" : "Aquí no hace falta"); if (!C.enCurso) repintar(); return; }
      if (tipo !== "guardia") guardar();
      ev.forEach(procesar);
      if (tipo === "guardia") marcarCarta(i); else if (!C.enCurso) { sincronizar(); repintar(); }
      refrescar(); quizaFin(); return;
    }
    st.autoOn = !!C.auto;   // el registro de compás solo cuenta lo que tocas tú
    var plan = M.iniciar(st, i, tipo, rng); if (!plan) return;
    C.enCurso++; marcarCarta(i);
    plan.ev.forEach(procesar); refrescar();
    if (!plan.golpes.length) { C.enCurso--; quizaFin(); return; }
    var vel = C.rapido ? 2 : 1, ola = st.ola, ultimo = plan.golpes.length - 1;
    if (tipo !== "atacar") { S.vistas.t_rafaga = 1; SON.fx(tipo === "super" ? "super" : "rafaga"); SON.vibra(tipo === "super" ? [30, 40, 90] : 40); }
    guiaCompas(plan, i, vel);
    plan.golpes.forEach(function (ms, k) {
      C.timers.push(setTimeout(function () {
        if (!C || C.st !== st || st.fin || st.ola !== ola) return;
        RAF.en = plan.tipo === "atacar" ? null : (plan.sup ? "sup" : "si");
        var evs = M.golpe(st, plan, k, ahora(), rng), cambio = null;
        evs.forEach(function (e) { if (e.t === "ola" || e.t === "victoria") cambio = e; else procesar(e); });
        RAF.en = null; refrescar();
        if (cambio) {   // cayó el último enemigo: se cancela lo que quedaba en el aire
          limpiarTimers(); C.ocupado = true;
          setTimeout(function () {
            if (!C || C.st !== st) return;
            if (cambio.t === "victoria") { terminar(); return; }
            C.ocupado = false; sincronizar(); repintar(); rotulo("Oleada " + cambio.n, "bien"); if (C.auto) setTimeout(pasoAuto, 400); else quizaFin();
          }, C.rapido ? 450 : 850);
          return;
        }
        if (k === ultimo) { C.enCurso = Math.max(0, C.enCurso - 1); quizaFin(); }
      }, ms / vel));
    });
  }
  // Guía de compás: en las cartas que aún no han actuado crece un aro; cuando llega al borde es el momento de tocar para sacar chispa.
  function guiaCompas(plan, i, vel) {
    if (!C || C.auto || PREF.guia === false) return;
    var st = C.st, t = performance.now();
    C.aire = (C.aire || []).filter(function (L) { return L > t; });
    plan.golpes.forEach(function (ms) { C.aire.push(t + ms / vel); });
    st.aliados.forEach(function (a, j) {
      if (j === i || !a.vivo || a.actuo || M.inmovil(a)) return;
      var c = document.getElementById("c" + j); if (!c) return;
      var rp = 1 - ((a.m && a.m.rapido) || 0), mejor = null, comodo = null;
      M.ritmo(a.id, a.hits).forEach(function (r) { C.aire.forEach(function (L) { var d = (L - t) - r * rp / vel; if (d >= 300 && (comodo === null || d < comodo)) comodo = d; if (d >= 150 && (mejor === null || d < mejor)) mejor = d; }); });
      if (comodo !== null) mejor = comodo;   // si hay un hueco con tiempo para reaccionar, mejor ese
      var viejo = c.querySelector(".aro"); if (viejo) viejo.remove();
      if (mejor === null) return;
      var aro = h("div", { class: "aro", style: "animation-duration:" + Math.round(mejor) + "ms" }); c.appendChild(aro);
      C.timers.push(setTimeout(function () { aro.classList.add("ya"); }, mejor));
      C.timers.push(setTimeout(function () { aro.remove(); }, mejor + 260));
    });
    marcarPrimero();
  }
  // Antes de que nadie actúe, señala con «1.º» al eco más lento: empezar por él es lo que deja sitio a los demás para sacar chispa.
  function marcarPrimero() {
    if (!C) return; var st = C.st, lento = -1, r = -1, libres = 0, alguien = st.aliados.some(function (a) { return a.vivo && a.actuo; });
    st.aliados.forEach(function (a, j) { if (!a.vivo || a.actuo || M.inmovil(a)) return; libres++; var r0 = M.ritmo(a.id, a.hits)[0] * (1 - ((a.m && a.m.rapido) || 0)); if (r0 > r) { r = r0; lento = j; } });
    st.aliados.forEach(function (a, j) {
      var c = document.getElementById("c" + j); if (!c) return; var o = c.querySelector(".orden");
      var toca = !C.auto && PREF.guia !== false && !alguien && libres >= 2 && j === lento && !st.fin;
      if (toca && !o) c.appendChild(h("b", { class: "orden", text: "1.º" })); else if (!toca && o) o.remove();
    });
  }
  // Consejos de primera vez: una frase arriba del campo, solo hasta que haces lo que explica.
  function consejoCombate() {
    if (!C || C.st.fin) return null; var st = C.st, V0 = S.vistas, vivosA = st.aliados.filter(function (a) { return a.vivo; });
    if (!V0.t_atacar) { if (st.turno > 1 || st.aliados.some(function (a) { return a.actuo; })) V0.t_atacar = 1; else return ["t_atacar", "Toca la carta de un eco para que ataque."]; }
    if (!V0.t_rafaga && st.aliados.some(function (a) { return a.vivo && !a.actuo && a.bb >= 100; })) return ["t_rafaga", "Barra azul llena: desliza esa carta hacia la derecha para lanzar su ráfaga."];
    if (!V0.t_guardia && st.turno >= 2) { if (st.aliados.some(function (a) { return a.guardia; }) || st.turno >= 5) V0.t_guardia = 1; else return ["t_guardia", "Desliza una carta hacia abajo, o mantenla pulsada, para cubrirte: recibe la mitad de daño."]; }
    if (!V0.t_objetivo && st.enemigos.filter(function (e) { return e.vivo; }).length >= 2 && st.turno >= 2) { if (st.turno >= 4) V0.t_objetivo = 1; else return ["t_objetivo", "Toca a un enemigo para elegir a quién pegan tus ecos."]; }
    if (!V0.t_chispa && vivosA.length >= 2) { if (st.chispas > 0 || st.turno >= 6) V0.t_chispa = 1; else return ["t_chispa", "Chispa: empieza por el eco marcado «1.º» y toca a los demás cuando su aro llegue al borde. Si golpean a la vez, el golpe pega el doble. En automático casi no salen."]; }
    return null;
  }
  function pintarConsejo() {
    var campo = document.getElementById("campo"); if (!campo) return; var viejo = document.getElementById("coach"), cj = C && !C.auto ? consejoCombate() : null;
    if (!cj) { if (viejo) viejo.remove(); return; }
    if (viejo && viejo.getAttribute("data-k") === cj[0]) return; if (viejo) viejo.remove();
    campo.appendChild(h("div", { class: "coach", id: "coach", "data-k": cj[0] }, [h("span", { text: cj[1] }),
      h("button", { type: "button", "aria-label": "Entendido", text: "✓", on: function (ev) { ev.stopPropagation(); S.vistas[cj[0]] = 1; guardar(); pintarConsejo(); } })]));
  }
  // Automático: va tocando ecos de uno en uno con un pequeño desfase. No busca chispas: eso es cosa tuya.
  function pasoAuto() {
    if (!C || !C.auto || C.ocupado || C.st.fin) return;
    var x = M.auto(C.st, { fijo: C.fijo, raf: PREF.autoRaf || "rafaga" });
    if (x.tipo === "fin") { C.pedirFin = true; quizaFin(); return; }
    if (x.tipo === "atacar") marcarObjetivo(C.st.objetivo);
    accion(x.tipo, x.i);
    setTimeout(pasoAuto, C.rapido ? 210 : 420);   // el automático toca sin buscar el compás: saca pocas chispas
  }

  // ----- efectos -----
  function flotar(id, texto, cls) {
    var n = document.getElementById(id); if (!n) return;
    var s = h("span", { class: "num " + (cls || ""), text: texto }); s.style.left = (35 + Math.random() * 30) + "%";
    n.appendChild(s); setTimeout(function () { s.remove(); }, 800);
  }
  // Efecto animado de seis cuadros (lámina de 3 x 2) sobre un luchador.
  function fxAnim(id, nombre, ms) {
    var n = document.getElementById(id); if (!n || !hay(nombre)) return;
    var f = h("div", { class: "fxa" }), k = 0, paso = Math.max(30, Math.round((ms || 360) / 6 / (C && C.rapido ? 1.6 : 1)));
    f.style.backgroundImage = "url(" + url(nombre) + ")"; n.appendChild(f);
    var t = setInterval(function () { k++; if (k >= 6 || !f.isConnected) { clearInterval(t); f.remove(); return; } f.style.backgroundPosition = ((k % 3) * 50) + "% " + (k < 3 ? 0 : 100) + "%"; }, paso);
  }
  function efecto(id, nombre, color, cls, ms) {
    var n = document.getElementById(id); if (!n) return;
    var f = h("div", { class: "fx " + (hay(nombre) ? "" : "css ") + (cls || "") });
    var enLamina = hay(nombre) && ARTE[nombre].atl;
    if (hay(nombre) && !enLamina) f.style.backgroundImage = "url(" + url(nombre) + ")"; else if (!hay(nombre)) f.style.setProperty("--c", color || "#f0a23c");
    n.appendChild(f);
    if (enLamina) {   // el efecto vive en una lámina: se pinta en un cuadrado centrado, del tamaño que tendría solo
      var r = f.getBoundingClientRect(), lado = Math.max(8, Math.min(r.width, r.height)), q = h("i", { style: "position:absolute;left:50%;top:50%;width:" + lado + "px;height:" + lado + "px;margin:-" + (lado / 2) + "px 0 0 -" + (lado / 2) + "px;image-rendering:pixelated;" + bg(nombre) });
      f.appendChild(q);
    }
    setTimeout(function () { f.remove(); }, ms || 380);
  }
  function tajo(id, color) {
    var n = document.getElementById(id); if (!n) return;
    if (hay("fx_tajo")) { var f = h("div", { class: "fx tajo-img", style: "background-image:url(" + url("fx_tajo") + ")" }); f.style.setProperty("--g", (Math.random() * 80 - 40) + "deg"); n.appendChild(f); setTimeout(function () { f.remove(); }, 300); return; }
    var t = h("div", { class: "tajo" }); t.style.setProperty("--c", color || "#fff"); t.style.setProperty("--g", (Math.random() * 70 - 35) + "deg");
    n.appendChild(t); setTimeout(function () { t.remove(); }, 260);
  }
  function temblar(fuerte) {
    var c = document.getElementById("campo"); if (!c) return;
    c.classList.remove("tiembla", "tiembla2"); void c.offsetWidth; c.classList.add(fuerte ? "tiembla2" : "tiembla");
  }
  function destello(color, largo) {
    var c = document.getElementById("campo"); if (!c) return;
    var d = h("div", { class: "destello" + (largo ? " largo" : "") }); d.style.setProperty("--c", color); c.appendChild(d); setTimeout(function () { d.remove(); }, largo ? 900 : 420);
  }
  // Una chispa que viaja de un sitio a otro (cristales de ráfaga, corazones de cura).
  function chispa(deId, aId, cls) {
    var de = document.getElementById(deId), a = document.getElementById(aId); if (!de || !a) return;
    var R = app.getBoundingClientRect(), r1 = de.getBoundingClientRect(), r2 = a.getBoundingClientRect();
    var p = h("div", { class: "chispa " + cls }), ic = cls === "cristal" ? "ico_cristal_rafaga" : (cls === "corazon" ? "ico_corazon" : null);
    if (ic && hay(ic)) { p.className += " img"; p.style.cssText += ";" + bg(ic); }
    p.style.left = (r1.left - R.left + r1.width / 2) + "px"; p.style.top = (r1.top - R.top + r1.height / 2) + "px";
    app.appendChild(p); void p.offsetWidth;
    p.style.transform = "translate(" + (r2.left + r2.width / 2 - r1.left - r1.width / 2) + "px," + (r2.top + r2.height / 2 - r1.top - r1.height / 2) + "px) scale(.6)";
    setTimeout(function () { p.remove(); }, 460);
  }
  // Franja que cruza el campo al lanzar una ráfaga, con la cara de quien la lanza.
  function corte(a, nombre, sup) {
    var c = document.getElementById("campo"); if (!c) return;
    var arte = hay("cor_" + a.id);
    var f = h("div", { class: "corte" + (sup ? " sup" : "") + (arte ? " con-arte" : "") }, [arte ? null : h("div", { class: "corte-cara" }, [retrato(a.id, "decidido")]),
      h("div", { class: "corte-txt" }, [h("small", { text: sup ? "Súper ráfaga" : "Ráfaga" }), h("b", { text: nombre })])]);
    if (arte) f.style.backgroundImage = "linear-gradient(90deg,rgba(23,19,31,.85),rgba(23,19,31,0) 55%),url(" + url("cor_" + a.id) + ")";
    f.style.setProperty("--c", D.COLOR[a.el]); c.appendChild(f); setTimeout(function () { f.remove(); }, sup ? 1100 : 800);
  }
  // Si el eco tiene su hoja de ráfaga (raf_<id>: seis cuadros en rejilla de 3 x 2), se anima encima de su figura mientras dura.
  function animRafaga(i, id, ms) {
    if (!hay("raf_" + id)) return; var n = document.getElementById("a" + i), a = n && n.querySelector(".arte"); if (!a) return;
    var antes = { img: a.style.backgroundImage, size: a.style.backgroundSize, pos: a.style.backgroundPosition }, k = 0, paso = Math.max(50, Math.round(ms / 6));
    a.style.backgroundImage = "url(" + url("raf_" + id) + ")"; a.style.backgroundSize = "300% 200%"; a.classList.add("pix");
    function cuadro() { if (!a.isConnected) return; if (k >= 6) { a.style.backgroundImage = antes.img; a.style.backgroundSize = antes.size; a.style.backgroundPosition = "0% 0%"; return; } a.style.backgroundPosition = ((k % 3) * 50) + "% " + (k < 3 ? 0 : 100) + "%"; k++; setTimeout(cuadro, paso); }
    cuadro();
  }
  function pose(lado, i, p, ms) {
    var v = C.vis[lado][i]; if (!v || !v.vivo) return; v.pose = p;
    var n = document.getElementById(lado + i); if (!n) return;
    var a = n.querySelector(".arte"); if (a && a.dataset.hoja) a.style.backgroundPosition = ((p % 3) * 50) + "% " + (p < 3 ? 0 : 100) + "%";
    if (p === 2 || p === 4) n.style.transform = "translateX(" + (lado === "a" ? "-" : "") + (p === 4 ? 30 : 18) + "%) scale(" + (p === 4 ? 1.15 : 1.05) + ")";
    if (ms) setTimeout(function () { if (!C || !C.vis[lado][i]) return; var w = C.vis[lado][i]; if (w.vivo && w.pose === p) { w.pose = 0; if (a && a.dataset.hoja && a.isConnected) a.style.backgroundPosition = "0% 0%"; } if (n.isConnected) n.style.transform = ""; }, ms);
  }
  function barraVida(id, v, max) { var n = document.getElementById(id); if (!n) return; var m = n.querySelector(".medidor i"); if (m) m.style.width = Math.max(0, 100 * v / max) + "%"; }
  function barraBB(i, bb) {
    var n = document.getElementById("c" + i); if (!n) return; var m = n.querySelector(".medidor.bb"); if (!m) return;
    m.firstChild.style.width = Math.min(100, bb) + "%"; m.lastChild.style.width = Math.max(0, bb - 100) + "%";
  }
  var RAF = { en: null };
  // Enseña en pantalla un suceso del combate. Devuelve cuánto conviene esperar antes del siguiente.
  function procesar(e) {
    if (!C) return 0; sonar(e);
    var st = C.st, base = C.rapido ? 70 : 150, espera = base, enRafaga = RAF.en;
      if (e.t === "golpe") {
        var at = e.lado === "a" ? "a" : "e", df = e.lado === "a" ? "e" : "a", vd = C.vis[df][e.a];
        pose(at, e.de, enRafaga ? 4 : 2, base * 1.6);
        var tgt = df === "e" ? st.enemigos[e.a] : st.aliados[e.a];
        var maxT = (df === "e" && vd && vd.max) || (tgt && tgt.max) || 1;   // el último golpe de una oleada llega cuando el motor ya va por la siguiente
        if (vd) { vd.hp = Math.max(0, vd.hp - e.d); barraVida(df + e.a, vd.hp, maxT); if (df === "a") barraVida("c" + e.a, vd.hp, maxT); }
        var n = document.getElementById(df + e.a); if (n) { n.classList.remove("golpe"); void n.offsetWidth; n.classList.add("golpe"); }
        var atacante = e.lado === "a" ? st.aliados[e.de] : st.enemigos[e.de], col = D.COLOR[atacante.el];
        tajo(df + e.a, col);
        efecto(df + e.a, e.lado === "a" ? "fx_golpe_" + atacante.el.toLowerCase() : "fx_impacto", col);
        FX.golpe(df + e.a, atacante.el, e.el > 1 || e.fuerte || !!enRafaga);
        if (e.parada) { FX.escudo("a" + e.a, true); fxAnim("a" + e.a, "fxa_parada", 420); flotar("a" + e.a, "¡Parada perfecta!", "parada"); var vp = C.vis.a[e.a]; if (vp) { vp.bb = Math.min(200, vp.bb + 30); barraBB(e.a, vp.bb); } }
        else if (e.guardia) FX.escudo("a" + e.a, false);
        if (e.lado === "a" && tgt && tgt.carga) { var rb = document.getElementById("rup" + e.a); if (rb) rb.firstChild.style.width = Math.min(100, 100 * tgt.dCarga / M.umbralRuptura(tgt)) + "%"; }
        var gordo = e.d > maxT * 0.18;
        if (gordo || enRafaga) temblar(enRafaga === "sup" || (gordo && df === "a"));
        if (df === "a") { var cc = document.getElementById("c" + e.a); if (cc) { cc.classList.remove("herida"); void cc.offsetWidth; cc.classList.add("herida"); } }
        flotar(df + e.a, e.d + (e.el > 1 ? "!" : ""), e.chispa ? "chispa" : (e.el > 1 ? "fuerte" : ((e.el < 1 || e.guardia || e.escudo) ? "flojo" : "")));
        if (e.chispa) {
          if (hay("fxa_chispa")) fxAnim(df + e.a, e.nChispa >= 5 && hay("fxa_chispa_grande") ? "fxa_chispa_grande" : "fxa_chispa", 300); else { FX.golpe(df + e.a, "Rayo", true); FX.anilloEn(df + e.a, "#fff7a0", 18); }
          var ch = document.getElementById("chispas"); if (ch) { ch.textContent = "Chispa ×" + e.nChispa + " · golpe doble"; ch.className = "chispas on" + (e.nChispa >= 5 ? " alta" : ""); void ch.offsetWidth; ch.classList.add("salta"); }
        }
        if (e.lado === "a") { var va0 = C.vis.a[e.de]; if (va0) { va0.bb = Math.min(200, va0.bb + M.CFG.bbGolpe); barraBB(e.de, va0.bb); } }
        if (enRafaga) espera = base * 0.7;
      } else if (e.t === "cristal") { chispa("e" + e.de, "c" + e.i, "cristal"); var vb = C.vis.a[e.i]; if (vb) { vb.bb = Math.min(200, vb.bb + (e.v || 6)); setTimeout(function () { barraBB(e.i, vb.bb); }, 380); } espera = 0; }
      else if (e.t === "cae") { enRafaga = enRafaga; var v = C.vis[e.lado][e.i]; if (v) { v.vivo = false; v.pose = 5; } var nn = document.getElementById(e.lado + e.i);
        if (nn) { var ar = nn.querySelector(".arte"); if (ar && ar.dataset.hoja) ar.style.backgroundPosition = "100% 100%"; nn.classList.add("cayendo"); setTimeout(function () { nn.classList.add("caido"); }, 380); }
        if (e.lado === "e") { fxAnim("e" + e.i, "fxa_caida", 480); efecto("e" + e.i, "fx_critico", "#ffffff", "grande", 500); FX.disolver("e" + e.i, st.enemigos[e.i] ? st.enemigos[e.i].el : "Alba"); }
        else temblar(true);
        espera = base * 2; }
      else if (e.t === "cura") { var va = C.vis.a[e.i]; if (va) { va.hp = Math.min(st.aliados[e.i].max, va.hp + e.v); barraVida("c" + e.i, va.hp, st.aliados[e.i].max); } flotar("a" + e.i, "+" + e.v, "cura"); efecto("a" + e.i, "fx_curacion", "#63c784", "sube", 600); FX.curar("a" + e.i); if (e.corazon != null) chispa("e" + e.corazon, "c" + e.i, "corazon"); espera = base * 0.5; }
      else if (e.t === "revive") { sincronizar(); repintar(); efecto("a" + e.i, "fx_revivir", "#f0c24a", "sube", 700); espera = base * 3; }
      else if (e.t === "rafaga") {
        var a = st.aliados[e.i]; enRafaga = e.sup ? "sup" : "si";
        var vr = C.vis.a[e.i]; if (vr && C.gratis !== e.i) { vr.bb = Math.max(0, vr.bb - (e.sup ? 200 : 100)); barraBB(e.i, vr.bb); }   // la del Reloj Tumbado no gasta la barra
        C.gratis = null;
        corte(a, e.n, e.sup); destello(D.COLOR[e.el], e.sup); pose("a", e.i, 4, base * (e.sup ? 9 : 6));
        animRafaga(e.i, a.id, base * (e.sup ? 9 : 6));
        FX.aura("a" + e.i, D.COLOR[e.el], e.sup ? 30 : 14);
        var objs = (e.tipo === "cura" || e.tipo === "apoyo") ? st.aliados.map(function (x, j) { return x.vivo ? "a" + j : null; }) : (e.tipo === "todos" ? C.vis.e.map(function (x, j) { return x.vivo ? "e" + j : null; }) : ["e" + objetivoActual()]);
        setTimeout(function () { objs.forEach(function (id) { if (id) FX.rafaga(id, e.el, e.sup); }); }, C.rapido ? 120 : 300);
        var cd = document.getElementById("cadena");
        if (cd) { var n = e.cadena + (e.sup ? 1 : 0); cd.textContent = n > 1 || e.bono > 1 ? "Cadena ×" + n + (e.bono > 1 ? " · +" + Math.round((e.bono - 1) * 100) + " % de daño" : "") : "Ráfaga: lanza otra seguida para encadenar"; cd.className = "cadena on" + (n >= 3 ? " alta" : ""); void cd.offsetWidth; cd.classList.add("salta"); }
        efecto("a" + e.i, (e.sup ? "fx_gran_rafaga_" : "fx_rafaga_") + e.el.toLowerCase(), D.COLOR[e.el], "grande", 700);
        espera = (C.rapido ? 320 : 620) * (e.sup ? 1.5 : 1);
      }
      else if (e.t === "guardia") { flotar("a" + e.i, "Guardia · −50 % de daño", "parada"); efecto("a" + e.i, "fx_guardia", "#5fb6ee", "escudo", 600); var ng = document.getElementById("a" + e.i); if (ng) ng.classList.add("guardia"); }
      else if (e.t === "fase-enemiga") { enRafaga = null; rotulo("Turno enemigo", "enemigo"); espera = base * 2.5; }
      else if (e.t === "aviso") { var ve = C.vis.e[e.i]; if (ve) ve.pose = 1; var ne = document.getElementById("e" + e.i); if (ne) ne.classList.add("carga"); avisar(st.enemigos[e.i].n + " carga " + e.n + ". Rómpele la carga a golpes o cúbrete."); efecto("e" + e.i, "fx_aviso_jefe", "#ef5a4c", "grande", 700); FX.aura("e" + e.i, "#ef5a4c", 26); espera = base * 5; }
      else if (e.t === "especial") { pose("e", e.i, 4, base * 5); rotulo(e.n, "peligro"); destello(D.COLOR[st.enemigos[e.i].el], true); temblar(true); FX.rafaga("e" + e.i, st.enemigos[e.i].el, true); enRafaga = "sup"; espera = base * 4; }
      else if (e.t === "barrido") { pose("e", e.i, 2, base * 3); destello(D.COLOR[st.enemigos[e.i].el], false); enRafaga = "si"; espera = base * 1.5; }
      else if (e.t === "marca") { flotar("a" + e.a, "¡En el punto de mira!", "marca"); var nm = document.getElementById("a" + e.a); if (nm) nm.classList.add("marcado"); var cm = document.getElementById("c" + e.a); if (cm) cm.classList.add("marcada"); FX.anilloEn("a" + e.a, "#ef5a4c", 14); avisar(st.enemigos[e.i].n + " apunta a " + st.aliados[e.a].n + ". Cúbrelo el turno que viene."); espera = base * 4; }
      else if (e.t === "remate") { pose("e", e.i, 4, base * 4); rotulo("Remate", "peligro"); enRafaga = "sup"; espera = base * 3; }
      else if (e.t === "cubre") { flotar("e" + e.i, "Se cubre", "flojo"); FX.escudo("e" + e.i, false); var nc = document.getElementById("e" + e.i); if (nc) nc.classList.add("cubierto"); espera = base * 2; }
      else if (e.t === "cura-e") { flotar("e" + e.a, "+" + e.v, "cura"); FX.curar("e" + e.a); var vc = C.vis.e[e.a]; if (vc) { vc.hp = Math.min(st.enemigos[e.a].max, vc.hp + e.v); barraVida("e" + e.a, vc.hp, st.enemigos[e.a].max); } espera = base * 2.5; }
      else if (e.t === "grito") { C.vis.e.forEach(function (x, j) { if (x.vivo) efecto("e" + j, "fx_mejora", "#ef5a4c", "sube", 700); }); flotar("e" + e.i, "¡Grito!", "marca"); FX.anilloEn("e" + e.i, "#ef5a4c", 40); temblar(false); avisar("Los enemigos pegan más fuerte durante dos turnos."); espera = base * 3; }
      else if (e.t === "drena") { efecto("a" + e.a, "fx_empeora", "#8a63c9", "sube", 700); flotar("a" + e.a, "−" + e.v + " ráfaga", "flojo"); chispa("c" + e.a, "e" + e.i, "cristal"); var vd2 = C.vis.a[e.a]; if (vd2) { vd2.bb = Math.max(0, vd2.bb - e.v); barraBB(e.a, vd2.bb); } espera = base * 2; }
      else if (e.t === "aturdido") { flotar("e" + e.i, "Aturdido", "flojo"); espera = base * 2; }
      else if (e.t === "ruptura") { rotulo("¡Carga rota!", "bien"); FX.romper("e" + e.i); fxAnim("e" + e.i, "fxa_ruptura", 480); temblar(true); destello("#ffffff", false); var nr = document.getElementById("e" + e.i); if (nr) { nr.classList.remove("carga"); nr.classList.add("aturdido"); var rr = nr.querySelector(".ruptura"); if (rr) rr.remove(); var ii = nr.querySelector(".intento"); if (ii) { ii.textContent = "Aturdido"; ii.className = "intento p0"; } }
        C.vis.a.forEach(function (x, j) { if (x.vivo) { x.bb = Math.min(200, x.bb + 15); barraBB(j, x.bb); } }); espera = base * 4; }
      else if (e.t === "fase2") {
        rotulo("Segunda fase", "peligro"); if (e.frase) avisar(e.frase); FX.aura("e" + e.i, "#ffd76a", 60); temblar(true); pintarEstados("e", e.i);
        flotar("e" + e.i, "Sin coraza · +20 % ataque", "marca"); espera = base * 6;
      }
      else if (e.t === "rabia") { rotulo(st.enemigos[e.i].n + " enfurece", "peligro"); FX.aura("e" + e.i, "#ef5a4c", 40); temblar(true); espera = base * 4; }
      else if (e.t === "ola") { enRafaga = null; sincronizar(); repintar(); avisar("Oleada " + e.n); espera = base * 3; }
      else if (e.t === "estado") {
        var E = M.ESTADOS[e.n]; pintarEstados(e.lado, e.i); flotar(e.lado + e.i, E.n, E.malo ? "marca" : "parada");
        efecto(e.lado + e.i, e.n === "veneno" ? "fx_veneno" : (e.n === "paralisis" ? "fx_paralisis" : (E.malo ? "fx_empeora" : "fx_mejora")), E.malo ? "#8a63c9" : "#f0c24a", "sube", 600);
        if (e.lado === "a" && E.malo && C.ocupado) avisar(st.aliados[e.i].n + ": " + E.n.toLowerCase() + ". " + E.d);
        espera = e.lado === "a" && E.malo ? base * 3 : 30;
      }
      else if (e.t === "resiste") { flotar(e.lado + e.i, "Resiste", "parada"); espera = 30; }
      else if (e.t === "estado-fin") { pintarEstados(e.lado, e.i); espera = 0; }
      else if (e.t === "limpia") { pintarEstados(e.lado, e.i); flotar(e.lado + e.i, "Limpio", "cura"); efecto(e.lado + e.i, "fx_curacion", "#63c784", "sube", 600); espera = 30; }
      else if (e.t === "estado-dano") {
        var vx = C.vis[e.lado][e.i], ux = (e.lado === "a" ? st.aliados : st.enemigos)[e.i];
        if (vx) { vx.hp = Math.max(0, vx.hp - e.d); barraVida(e.lado + e.i, vx.hp, ux.max); if (e.lado === "a") barraVida("c" + e.i, vx.hp, ux.max); }
        flotar(e.lado + e.i, "−" + e.d, e.n === "veneno" ? "veneno" : "fuerte"); efecto(e.lado + e.i, e.n === "veneno" ? "fx_veneno" : "fx_golpe_brasa", "#8fd14f", "sube", 500); espera = base * 1.5;
      }
      else if (e.t === "aguanta") { var va = C.vis.a[e.i]; if (va) { va.hp = e.hp; barraVida("a" + e.i, va.hp, st.aliados[e.i].max); barraVida("c" + e.i, va.hp, st.aliados[e.i].max); } flotar("a" + e.i, e.n, "parada"); efecto("a" + e.i, "fx_revivir", "#f0c24a", "sube", 600); espera = base * 2; }
      else if (e.t === "egida") { flotar("a" + e.i, "Égida", "parada"); pintarEstados("a", e.i); espera = base; }
      else if (e.t === "fallo") { flotar((e.lado === "a" ? "e" : "a") + e.a, e.esquiva ? "Esquiva" : "Falla", e.esquiva ? "parada" : "flojo"); pose(e.lado === "a" ? "a" : "e", e.de, 2, base * 1.6); espera = base; }
      else if (e.t === "inmovil") { flotar("e" + e.i, e.n === "sueno" ? "Dormido" : "Paralizado", "flojo"); espera = base * 2; }
      else if (e.t === "sin-cura") { flotar("a" + e.i, "Maldito: no se cura", "marca"); espera = 30; }
      else if (e.t === "elixir") { flotar("a" + e.i, "+100 ráfaga", "parada"); efecto("a" + e.i, "fx_mejora", "#5fb6ee", "sube", 600); espera = base; }
      else if (e.t === "rebato") { flotar("a" + e.i, "¡Otra vez!", "parada"); var cr = document.getElementById("c" + e.i); if (cr) { cr.classList.remove("hecha"); cr.classList.add("lista"); } espera = 60; }
      else if (e.t === "gratis") { flotar("a" + e.i, "Ráfaga gratis", "parada"); C.gratis = e.i; espera = 0; }
      else if (e.t === "aturde") { fxAnim("e" + e.i, "fxa_aturdido", 600); flotar("e" + e.i, "Aturdido", "flojo"); var na = document.getElementById("e" + e.i); if (na) na.classList.add("aturdido"); espera = 0; }
      else if (e.t === "limite") { rotulo("Se acabó el tiempo", "peligro"); destello("#ef5a4c", true); temblar(true); espera = base * 6; }
      else if (e.t === "turno") { enRafaga = null; sincronizar(); repintar(); espera = base * 0.5; }
      else if (e.t === "pausa") { enRafaga = null; sincronizar(); repintar(); espera = base * 2; }
      else if (e.t === "victoria" || e.t === "derrota") espera = base * 3;
    RAF.en = enRafaga; return espera;
  }
  // Reproduce en orden una lista de sucesos (el turno del enemigo). Mientras dura no se puede tocar nada.
  function reproducir(ev) {
    C.ocupado = true; var k = 0, st = C.st; RAF.en = null;
    function sig() {
      if (!C || C.st !== st) return;
      if (k >= ev.length) { C.ocupado = false; RAF.en = null; sincronizar(); if (st.fin) { terminar(); return; } repintar(); rotulo("Tu turno", "bien"); if (C.auto) setTimeout(pasoAuto, 300); return; }
      setTimeout(sig, procesar(ev[k++]));
    }
    sig();
  }
  function rotulo(t, cls) { var c = document.getElementById("campo"); if (!c) return; var r = h("div", { class: "rotulo " + (cls || ""), text: t }); c.appendChild(r); setTimeout(function () { r.remove(); }, 1100); }
  function avisar(t) { var a = document.getElementById("aviso"); if (a) { a.textContent = t; a.classList.remove("sale"); void a.offsetWidth; a.classList.add("sale"); } }

  function terminar() {
    var st = C.st, F = st.fase, clave = M.clave(F.r, F.a, F.f); C.auto = false; limpiarTimers();
    var cadenaMax = st.mejorCadena, chispasMax = st.mejorChispas, chispasTot = st.chispas;
    function repetir() { C = null; if (F.secreta) empezarSecreta(F.secreta); else empezarFase(F.r, F.a, F.f, F.t); }
    if (st.fin === "derrota") { SON.musica(null); SON.fx("derrota");
      var cd = h("div", { class: "capa centro resultado" }, [h("div", { class: "caja" }, [cinta("ui_cinta_derrota", "Derrota"), h("h2", { text: "El escuadrón ha caído" }),
        h("p", { class: "tenue", text: "No pierdes nada. Cúbrete cuando el enemigo avise de un golpe fuerte y lleva ecos del elemento que le vence." }),
        cajaConsejos("Antes de volver a intentarlo", 4),
        h("div", { class: "fila" }, [h("button", { class: "btn sec", type: "button", text: F.torre ? "Volver a la Torre" : (F.arena ? "Volver a la Arena" : "Volver al mapa"), on: function () { C = null; ir(F.torre ? "torre" : (F.arena ? "arena" : "mapa")); } }),
          h("button", { class: "btn", type: "button", text: "Reintentar", on: repetir })])])]);
      fondoDe(cd, "pan_derrota", 0.45); app.appendChild(cd);
      return;
    }
    var r = M.recompensas(S, st, rng); guardar();
    var premios = [PREMIO.oro("+" + r.oro), PREMIO.xp("+" + r.xp)];
    if (r.gemas) premios.push(PREMIO.gemas("+" + r.gemas)); if (r.fragmentos) premios.push(PREMIO.fragmentos("+" + r.fragmentos));
    if (r.medallas) premios.push(PREMIO.medallas("+" + r.medallas));
    if (r.pocion) premios.push(deObjeto("pocion", "+1")); if (r.ascua) premios.push(deObjeto("ascua", "+1"));
    Object.keys(r.mats || {}).forEach(function (m) { premios.push(deMat(m, "+" + r.mats[m])); });
    (r.llaves || []).forEach(function () { premios.push(PREMIO.abono("+1")); });
    if (r.bono) premios.push(PREMIO.bono("+" + r.bono));
    premios.forEach(function (o, k) { o.k = k; }); premios.sort(function (x, y) { return (y.r || 0) - (x.r || 0) || x.k - y.k; });
    var marcas = [];
    if (chispasTot) marcas.push({ ico: pref("ico_chispa", "ei_hb_058"), letra: "✦", color: "#f0c24a", cant: chispasTot, n: "Chispas", d: "Golpes de dos ecos que cayeron a la vez sobre el mismo enemigo: cada chispa pega el doble y rompe las cargas el doble de rápido. Tu mejor racha seguida: ×" + chispasMax + ".", mini: 1 });
    if (chispasMax >= 2) marcas.push({ ico: pref("ico_racha", "ei_hb_014"), letra: "R", color: "#f0c24a", cant: "×" + chispasMax, n: "Mejor racha de chispas", d: "Las chispas seguidas que encadenaste sin fallar el compás.", mini: 1 });
    function seguir() {
      C = null;
      ((F.t || F.secreta) ? function (k, fn) { fn(); } : escenaUnaVez)("post-" + clave, function () {
        var fin0 = function () { if (!F.t && !F.secreta && F.r === 7 && F.granJefe && !S.final) elegirFinal(); else if (F.recuerdo) ir("eco", { eco: F.recuerdo }); else if (F.evento) ir("evento", { zona: F.evento.z }); else ir(F.torre ? "torre" : (F.arena ? "arena" : (F.vecino ? "plaza" : "mapa"))); };
        var luego = function () {
          if (!r.secretas || !r.secretas.length) { fin0(); return; }
          var sc = r.secretas[0];
          app.appendChild(h("div", { class: "capa centro secreto" }, [h("div", { class: "caja" }, [h("div", { class: "tenue", text: "Misión secreta descubierta" }), h("h2", { text: sc.n }), h("p", { class: "tenue", text: sc.d }),
            h("button", { class: "btn", type: "button", text: "Verla en el mapa", on: function (ev) { ev.currentTarget.closest(".capa").remove(); fin0(); } })])]));
        };
        if (r.seUne) {
          var b = D.HEROES[r.seUne];
          app.appendChild(h("div", { class: "capa centro" }, [h("div", { class: "caja" }, [
            h("div", { style: "height:200px;position:relative" }, [ilustracion(r.seUne, b.el)]),
            h("h2", { text: r.seUneNuevo ? b.n + " se une al gremio" : b.n + " ya estaba contigo" }), h("p", { class: "tenue", text: r.seUneNuevo ? b.t + ". " + b.el + "." : "A cambio recibes " + M.MEDALLAS_POR_REPETIDO[b.rar] + " medallas de eco." }),
            h("button", { class: "btn", type: "button", text: "Seguir", on: function (ev) { ev.currentTarget.closest(".capa").remove(); luego(); } })])]));
        } else luego();
      });
    }
    if (cadenaMax >= 2) marcas.push({ ico: pref("ico_cadena", "ico_cristal_rafaga"), letra: "C", color: "#8f8cf0", cant: "×" + cadenaMax, n: "Mejor cadena de ráfagas", d: "Ráfagas lanzadas seguidas en el mismo turno. Cada una de la cadena pega más que la anterior.", mini: 1 });
    if (r.arena) marcas.unshift({ ico: "ico_ficha_arena", letra: "A", color: "#f0c24a", cant: r.arena.v, n: "Duelos ganados", d: "Rango actual: " + r.arena.rango + ".", mini: 1 });
    var abre = r.arena && r.arena.sube ? "¡Subes a rango " + r.arena.rango + "! +" + r.arena.gemas + " gemas" : (r.torre ? "Piso " + r.torre + " superado: se abre el " + (r.torre + 1) : null);
    if (r.recuerdo) abre = D.HEROES[r.recuerdo].n + " ha recuperado un recuerdo: +5 % de vida, ataque y defensa para siempre";
    abre = abre || (F.jefe && r.primera && F.a === 4 && F.t < 2 && !F.secreta ? D.ZONAS[F.r].n + " en " + M.GRADOS[F.t + 1].n + ": abierta" : null);
    var raros = premios.filter(function (o) { return (o.r || 0) >= 2; }).length;
    SON.musica(null);
    function fiesta() { FX.celebrar(); SON.fx("victoria"); SON.vibra([40, 60, 40, 60, 120]); setTimeout(function () { SON.fx(raros ? "raro" : "premio"); }, 1100); }
    var cierre = r.primera && !F.t && !F.secreta && D.CIERRES && D.CIERRES[clave];
    if (r.primera && (F.vecino || F.recuerdo || F.evento) && F.cierre) cierre = F.cierre;
    var cv = h("div", { class: "capa centro victoria resultado" }, [h("div", { class: "caja" }, [cinta("ui_cinta_victoria", "Victoria"), h("h2", { text: r.primera ? "Fase superada" : "Otra vez tuya" }),
      raros ? h("div", { class: "aviso-raro", text: raros > 1 ? "¡" + raros + " hallazgos raros!" : "¡Hallazgo raro!" }) : null,
      cajaPremios(premios),
      r.subidas.length ? h("div", { class: "subidas" }, r.subidas.map(function (s) { return h("div", { class: "subida" }, [caraPeq(retrato(s.id, "neutral"), 34, true), h("b", { text: "Nv " + s.lv }), h("i", { text: "▲" })]); })) : null,
      marcas.length ? rejilla(marcas, "fila-mini centro") : null,
      abre ? h("div", { class: "abre", text: abre }) : null,
      h("p", { class: "tenue pista-toca", text: "Toca cualquier icono para ver para qué sirve." }),
      h("div", { class: "fila" }, [h("button", { class: "btn sec", type: "button", text: "Repetir", on: repetir }),
        h("button", { class: "btn", type: "button", text: "Seguir", on: function (ev) { ev.currentTarget.closest(".capa").remove(); seguir(); } })])])]);
    fondoDe(cv, "pan_victoria", 0.35);
    // lo que se dicen al acabar el combate va antes del botín: primero la historia, luego el premio
    if (cierre) conversar(cierre, { sobre: true, cuadros: {} }, function () { app.appendChild(cv); fiesta(); });
    else { app.appendChild(cv); fiesta(); }
  }
  function cinta(nombre, texto) { return hay(nombre) ? h("div", { class: "cinta", style: "background-image:url(" + url(nombre) + ")" }, [h("span", { text: texto })]) : null; }
  function elegirFinal() {
    var capa = h("div", { class: "capa centro" }), caja = h("div", { class: "caja" }, [h("h2", { text: "El sol está en tus manos" }),
      h("p", { class: "tenue", text: "No hay respuesta buena. Elige." })]);
    Object.keys(D.FINALES).forEach(function (k) {
      var f = D.FINALES[k];
      caja.appendChild(h("button", { class: "btn sec", type: "button", style: "text-align:left", on: function () {
        S.final = k; guardar(); caja.textContent = "";
        caja.appendChild(h("h2", { text: f.n })); caja.appendChild(h("p", { text: f.texto }));
        caja.appendChild(h("button", { class: "btn", type: "button", text: "Volver a la plaza", on: function () { capa.remove(); ir("plaza"); } }));
      } }, [h("b", { text: f.n }), h("div", { class: "tenue", text: f.d })]));
    });
    capa.appendChild(caja); app.appendChild(capa);
  }

  // ---------- arranque ----------
  function hoy() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  // el primer toque despierta el sonido (los navegadores no dejan sonar antes); cada botón hace un clic suave
  document.addEventListener("pointerdown", function () { SON.ini(); musicaDeVista(); }, { once: true });
  document.addEventListener("click", function (ev) { var b = ev.target.closest && ev.target.closest("button,[role=button]"); if (b && !b.closest(".carta")) SON.fx("toque"); }, true);
  try { fetch("version.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { if (j) { VER.v = j.v || 0; VER.fecha = j.fecha || ""; } }, function () {}); } catch (e) {}
  function arrancar() { M.usarDia(hoy()); S = cargar() || M.nuevaPartida(); M.usarPartida(S); guardar(); if (reanudar()) return; V.n = hay("pan_titulo") ? "titulo" : "plaza"; pintar(); }
  window.AURIA_UI = { _combate: function () { return C; }, _repintar: function () { sincronizar(); repintar(); }, estado: function () { return { vista: V.n, combate: C ? { fin: C.st.fin, ola: C.st.ola, turno: C.st.turno, ocupado: C.ocupado } : null, partida: S }; }, arte: function () { return ARTE; } };
  fetch("assets/manifest.json").then(function (r) { return r.ok ? r.json() : {}; }).then(function (m) { ARTE = m || {}; }, function () { ARTE = {}; }).then(function () {
    Object.keys(D.ITEMS).forEach(function (k) { var it = D.ITEMS[k]; if (it.arte && ARTE[it.arte]) it.ico = it.arte; });   // las armas de leyenda estrenan dibujo cuando llegue
  }).then(arrancar);
})();
