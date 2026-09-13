/* =========================================================
   miperfumeria — comportamiento del maquetado
   Todo vive en el navegador (localStorage). No hay backend:
   el objetivo es mostrar cómo se siente el sitio terminado.
   ========================================================= */

/* ---------- montaje del layout ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = buildHeader();
  if (f) f.innerHTML = buildFooter();
  initUI();
  renderCart();
  if (typeof pageInit === "function") pageInit();
});

/* ---------- utilidades ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const byId = id => PRODUCTOS.find(p => p.id === id);
const params = () => new URLSearchParams(location.search);

function toast(msg){
  const t = $("#toast"); if(!t) return;
  t.textContent = msg; t.classList.add("is-on");
  clearTimeout(t._t); t._t = setTimeout(()=>t.classList.remove("is-on"), 2400);
}
function stars(r){
  const full = Math.round(r);
  return "★".repeat(full) + "☆".repeat(5-full);
}
function goSearch(e){
  e.preventDefault();
  const v = (e.target.querySelector("input").value || "").trim();
  location.href = "catalogo.html?q=" + encodeURIComponent(v);
  return false;
}

/* ---------- interfaz general ---------- */
function initUI(){
  // barra de avisos rotativa
  const items = $$(".announce-item");
  let ai = 0;
  const show = i => { items.forEach(x=>x.classList.remove("is-on")); items[(i+items.length)%items.length].classList.add("is-on"); };
  if(items.length){
    const timer = setInterval(()=>show(++ai), 4200);
    $$("[data-ann]").forEach(b=>b.addEventListener("click",()=>{ clearInterval(timer); show(ai += +b.dataset.ann); }));
  }

  // apertura de paneles
  const ov = $("#overlay");
  const open = what => {
    if(what==="cart") $("#cartDrawer").classList.add("is-on");
    if(what==="menu") $("#mobileMenu").classList.add("is-on");
    ov.classList.add("is-on");
  };
  const closeAll = () => {
    $("#cartDrawer")?.classList.remove("is-on");
    $("#mobileMenu")?.classList.remove("is-on");
    $(".filters")?.classList.remove("is-on");
    ov.classList.remove("is-on");
  };
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"); if(o) open(o.dataset.open);
    if(e.target.closest("[data-close]")) closeAll();
  });
  ov?.addEventListener("click", closeAll);
  document.addEventListener("keydown", e => { if(e.key==="Escape") closeAll(); });

  // acordeones (footer, ayuda, ficha de producto)
  document.addEventListener("click", e => {
    const fa = e.target.closest("[data-facc]");
    if(fa) fa.parentElement.classList.toggle("is-on");
    const ab = e.target.closest(".acc-btn");
    if(ab) ab.parentElement.classList.toggle("is-on");
  });

  // carruseles horizontales
  $$(".rail-wrap").forEach(w => {
    const rail = $(".rail", w);
    $(".rail-btn.prev", w)?.addEventListener("click", ()=>rail.scrollBy({left:-rail.clientWidth*.8, behavior:"smooth"}));
    $(".rail-btn.next", w)?.addEventListener("click", ()=>rail.scrollBy({left: rail.clientWidth*.8, behavior:"smooth"}));
  });

  // añadir a la bolsa desde cualquier tarjeta
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add]");
    if(b){ e.preventDefault(); addToCart(b.dataset.add, +(b.dataset.qty||1)); }
    const fv = e.target.closest(".card-fav");
    if(fv){ e.preventDefault(); fv.classList.toggle("is-on"); toast("Guardado en favoritos"); }
  });
}

/* ---------- tarjeta de producto ---------- */
function cardHTML(p){
  const off = p.lista ? Math.round((1 - p.precio/p.lista)*100) : 0;
  const badges = [];
  if(p.best)   badges.push('<span class="badge">Más vendido</span>');
  if(p.nuevo)  badges.push('<span class="badge soft">Nuevo</span>');
  if(off >= 15) badges.push(`<span class="badge sale">-${off}%</span>`);
  return `
<article class="card">
  <a class="card-media" href="producto.html?id=${p.id}">
    <div class="card-badges">${badges.join("")}</div>
    ${cardArt(p)}
    <span class="card-quick" data-add="${p.id}">Agregar a la bolsa</span>
  </a>
  <button class="card-fav" aria-label="Guardar en favoritos">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20.5s-7.5-4.7-7.5-10A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.9c0 5.3-7.5 10-7.5 10z"/></svg>
  </button>
  <div class="card-body">
    <a href="producto.html?id=${p.id}" class="card-brand">${p.marca}</a>
    <a href="producto.html?id=${p.id}" class="card-name">${p.nombre}</a>
    <span class="card-meta">${p.ml} · ${p.familia}</span>
    <div class="card-price">
      <span class="price-now">${MONEDA(p.precio)}</span>
      ${p.lista ? `<span class="price-was">${MONEDA(p.lista)}</span><span class="price-off">-${off}%</span>` : ""}
    </div>
    <div class="card-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews})</div>
  </div>
</article>`;
}
const renderCards = (arr, sel) => { const n = $(sel); if(n) n.innerHTML = arr.map(cardHTML).join(""); };

/* ---------- bolsa de compra ---------- */
const CART_KEY = "mp_cart";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e){ return []; } };
const setCart = c => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch(e){} renderCart(); };

function addToCart(id, qty=1){
  const c = getCart();
  const hit = c.find(i => i.id === id);
  hit ? hit.q += qty : c.push({id, q:qty});
  setCart(c);
  toast(byId(id).marca + " agregado a tu bolsa");
  $("#cartDrawer")?.classList.add("is-on");
  $("#overlay")?.classList.add("is-on");
}
const cartCount = () => getCart().reduce((s,i)=>s+i.q, 0);
const cartTotal = () => getCart().reduce((s,i)=>s + byId(i.id).precio*i.q, 0);

function renderCart(){
  const c = getCart();
  const cc = $("#cartCount"); if(cc) cc.textContent = cartCount();
  const body = $("#cartBody"), foot = $("#cartFoot");
  if(!body) return;

  if(!c.length){
    body.innerHTML = `<div class="empty-state"><p>Tu bolsa está vacía.</p>
      <a class="btn btn-ghost btn-sm" href="catalogo.html">Ver catálogo</a></div>`;
    foot.innerHTML = "";
  } else {
    const piezas = cartCount();
    const faltan = Math.max(0, TIENDA.envioGratisPiezas - piezas);
    body.innerHTML = `
      <div class="ship-bar">
        ${faltan ? `Agrega <b>${faltan}</b> pieza${faltan>1?"s":""} más y tu envío es <b>gratis</b>.`
                 : `<b>¡Listo!</b> Tu envío es gratis.`}
        <div class="track"><div class="fill" style="width:${Math.min(100, piezas/TIENDA.envioGratisPiezas*100)}%"></div></div>
      </div>` + c.map(i=>{
      const p = byId(i.id);
      return `<div class="mini-item">
        <div class="thumb">${cardArt(p)}</div>
        <div>
          <h5>${p.marca}</h5>
          <p>${p.nombre}</p>
          <p style="color:var(--muted-2);font-size:11px">${p.ml}</p>
          <div class="qty">
            <button onclick="changeQty('${p.id}',-1)" aria-label="Quitar uno">−</button>
            <span>${i.q}</span>
            <button onclick="changeQty('${p.id}',1)" aria-label="Agregar uno">+</button>
          </div>
          <br><a class="rm" onclick="removeItem('${p.id}')">Eliminar</a>
        </div>
        <strong style="font-family:var(--f-brand);font-size:13px">${MONEDA(p.precio*i.q)}</strong>
      </div>`;
    }).join("");

    const sub = cartTotal();
    const envio = piezas >= TIENDA.envioGratisPiezas ? 0 : 199;
    foot.innerHTML = `
      <div class="sum-row"><span>Subtotal (${piezas} pza)</span><span>${MONEDA(sub)}</span></div>
      <div class="sum-row"><span>Envío</span><span>${envio? MONEDA(envio) : "Gratis"}</span></div>
      ${sub >= TIENDA.mayoreoMonto ? `<div class="sum-row" style="color:var(--ok)"><span>Precio mayoreo aplicado</span><span>✓</span></div>` : ""}
      <div class="sum-row total"><span>Total</span><span>${MONEDA(sub+envio)}</span></div>
      <a class="btn btn-block" href="checkout.html" style="margin-top:14px">Finalizar compra</a>
      <a class="btn btn-block btn-ghost" href="carrito.html" style="margin-top:8px">Ver la bolsa</a>`;
  }
  if(typeof onCartChange === "function") onCartChange();
}
function changeQty(id, d){
  const c = getCart(); const i = c.find(x=>x.id===id); if(!i) return;
  i.q += d; if(i.q < 1) return removeItem(id);
  setCart(c);
}
function removeItem(id){ setCart(getCart().filter(i=>i.id!==id)); }

/* ---------- catálogo (PLP) ---------- */
function filtrar(){
  const q  = params();
  const f  = q.get("f"), m = q.get("m"), fam = q.get("fam"), max = +q.get("max") || 0;
  const txt = (q.get("q") || "").toLowerCase().trim();

  let arr = PRODUCTOS.slice();
  if(f === "best")   arr = arr.filter(p=>p.best);
  else if(f === "nuevo")  arr = arr.filter(p=>p.nuevo);
  else if(f === "oferta") arr = arr.filter(p=>p.oferta || (p.lista && p.lista > p.precio));
  else if(["hombre","mujer","unisex"].includes(f)) arr = arr.filter(p=>p.genero===f);
  else if(["arabe","disenador"].includes(f)) arr = arr.filter(p=>p.cat===f);
  if(m)   arr = arr.filter(p=>p.marca===m);
  if(fam) arr = arr.filter(p=>p.familia===fam);
  if(max) arr = arr.filter(p=>p.precio<=max);
  if(txt) arr = arr.filter(p => (p.marca+" "+p.nombre+" "+p.familia+" "+JSON.stringify(p.notas)).toLowerCase().includes(txt));

  // filtros marcados en la barra lateral
  const sel = k => $$(`input[data-k="${k}"]:checked`).map(i=>i.value);
  const sg = sel("genero"), sm = sel("marca"), sf = sel("familia"), sp = sel("precio");
  if(sg.length) arr = arr.filter(p=>sg.includes(p.genero));
  if(sm.length) arr = arr.filter(p=>sm.includes(p.marca));
  if(sf.length) arr = arr.filter(p=>sf.includes(p.familia));
  if(sp.length) arr = arr.filter(p=>sp.some(r=>{
    const [a,b] = r.split("-").map(Number);
    return p.precio >= a && p.precio <= (b||1e9);
  }));

  const orden = $("#orden")?.value;
  if(orden === "precio-asc")  arr.sort((a,b)=>a.precio-b.precio);
  if(orden === "precio-desc") arr.sort((a,b)=>b.precio-a.precio);
  if(orden === "rating")      arr.sort((a,b)=>b.rating-a.rating);
  if(orden === "nuevo")       arr.sort((a,b)=>(b.nuevo||0)-(a.nuevo||0));
  return arr;
}

/* ---------- fondos decorativos ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $$("[data-bg]").forEach((n,i) => n.innerHTML = artBg(n.dataset.bg, i));
  $$("[data-tile]").forEach((n,i) => n.innerHTML = artTile(n.dataset.tile, i));
});
