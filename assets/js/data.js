/* =========================================================
   miperfumeria — catálogo de demostración
   ---------------------------------------------------------
   NOTA PARA EL CLIENTE: los precios, existencias y textos
   son de ejemplo para el maquetado. Se sustituyen por los
   datos reales antes de publicar.
   ========================================================= */

const MONEDA = n => "$" + n.toLocaleString("es-MX", {minimumFractionDigits:0});

/* ---------------------------------------------------------
   Ilustraciones de producto
   Mientras llegan las fotografías reales, cada producto se
   dibuja con un frasco vectorial generado en el navegador.
   Basta con reemplazar cardArt() por una etiqueta <img>.
--------------------------------------------------------- */
const FRASCOS = {
  1:'M132 352 L132 168 Q132 160 140 160 L260 160 Q268 160 268 168 L268 352 Z',
  2:'M128 352 L128 238 Q128 190 164 172 L164 152 L236 152 L236 172 Q272 190 272 238 L272 352 Z',
  3:'M118 352 L118 212 Q118 204 126 204 L274 204 Q282 204 282 212 L282 352 Z',
  4:'M146 352 L146 212 Q146 156 200 156 Q254 156 254 212 L254 352 Z',
  5:'M200 148 L278 198 L278 318 L200 362 L122 318 L122 198 Z',
  6:'M134 352 Q124 268 160 226 Q176 208 176 180 L224 180 Q224 208 240 226 Q276 268 266 352 Z'
};

function cardArt(p, h){
  const a = p.art || {};
  const uid = "g" + p.id.replace(/[^a-z0-9]/gi,"");
  const shape = FRASCOS[a.shape || 1];
  const c1 = a.c1 || "#3C5AA6", c2 = a.c2 || "#101C3A", cap = a.cap || "#0A0F1C";
  const ini = (p.marca || "").slice(0,2).toUpperCase();
  const capY = a.shape === 3 ? 152 : (a.shape === 5 ? 100 : 112);
  const capH = a.shape === 3 ? 52 : 48;
  return `
<svg viewBox="0 0 400 430" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${p.marca} ${p.nombre}">
  <defs>
    <linearGradient id="${uid}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#EFEFEC"/>
    </linearGradient>
    <linearGradient id="${uid}f" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/>
    </linearGradient>
    <linearGradient id="${uid}s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".42"/>
      <stop offset=".35" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="430" fill="url(#${uid}b)"/>
  <circle cx="200" cy="215" r="132" fill="#ffffff" opacity=".75"/>
  <ellipse cx="200" cy="366" rx="104" ry="13" fill="#0A0F1C" opacity=".08"/>
  <rect x="184" y="${capY}" width="32" height="58" fill="${cap}" opacity=".9"/>
  <rect x="170" y="${capY}" width="60" height="${capH}" rx="3" fill="${cap}"/>
  <rect x="170" y="${capY}" width="60" height="${capH}" rx="3" fill="url(#${uid}s)"/>
  <path d="${shape}" fill="url(#${uid}f)"/>
  <path d="${shape}" fill="url(#${uid}s)"/>
  <rect x="158" y="250" width="84" height="56" rx="2" fill="#ffffff" opacity=".9"/>
  <text x="200" y="278" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="19"
        font-weight="800" letter-spacing="2" fill="${c2}">${ini}</text>
  <text x="200" y="295" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="7"
        letter-spacing="3" fill="#6B7280">${(p.ml||"")}</text>
</svg>`;
}

/* fondos decorativos (hero, banners, mosaicos) */
function artBg(kind, id){
  const u = "bg" + id;
  const sets = {
    navy:   ["#16264C","#0A0F1C","#2B4A8F"],
    azul:   ["#1F3566","#101C3A","#3C5AA6"],
    noche:  ["#0A0F1C","#16264C","#1F3566"],
    humo:   ["#E9E9E6","#F6F6F4","#D9DCE3"]
  };
  const c = sets[kind] || sets.navy;
  return `
<svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="${u}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c[0]}"/><stop offset=".6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/>
    </linearGradient>
    <radialGradient id="${u}r" cx=".72" cy=".35" r=".55">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="600" fill="url(#${u})"/>
  <rect width="1200" height="600" fill="url(#${u}r)"/>
  <g opacity=".16" fill="none" stroke="#ffffff" stroke-width="1">
    <circle cx="930" cy="280" r="150"/><circle cx="930" cy="280" r="210"/><circle cx="930" cy="280" r="268"/>
  </g>
  <g opacity=".9" transform="translate(830,150) scale(1.1)">
    <rect x="76" y="102" width="48" height="42" rx="3" fill="#ffffff" opacity=".26"/>
    <path d="M60 320 L60 150 Q60 142 68 142 L132 142 Q140 142 140 150 L140 320 Z" fill="#ffffff" opacity=".16"/>
  </g>
</svg>`;
}


/* mosaicos de categoría — alternan claro y oscuro para dar ritmo a la fila */
function artTile(v, id){
  const u = "tl" + id;
  const P = {
    dark:  {a:"#1B2C55", b:"#0A0F1C", f:"#FFFFFF", o:".18"},
    mid:   {a:"#31518F", b:"#14254A", f:"#FFFFFF", o:".20"},
    black: {a:"#141821", b:"#05070B", f:"#FFFFFF", o:".16"},
    light: {a:"#F3F3F0", b:"#D8DCE4", f:"#101C3A", o:".85"}
  }[v] || {a:"#1B2C55", b:"#0A0F1C", f:"#FFFFFF", o:".18"};
  return `
<svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="${u}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${P.a}"/><stop offset="1" stop-color="${P.b}"/></linearGradient></defs>
  <rect width="600" height="750" fill="url(#${u})"/>
  <g opacity=".22" fill="none" stroke="${P.f}" stroke-width="1">
    <circle cx="300" cy="360" r="150"/><circle cx="300" cy="360" r="215"/>
  </g>
  <g fill="${P.f}" opacity="${P.o}">
    <rect x="264" y="196" width="72" height="58" rx="4"/>
    <path d="M226 620 L226 300 Q226 288 238 288 L362 288 Q374 288 374 300 L374 620 Z"/>
  </g>
  <ellipse cx="300" cy="628" rx="105" ry="12" fill="#000" opacity=".12"/>
</svg>`;
}

/* ---------------------------------------------------------
   Catálogo
--------------------------------------------------------- */
const PRODUCTOS = [
  {id:"hawas-ice", marca:"Rasasi", nombre:"Hawas Ice Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"arabe",
   familia:"Fresco", precio:1290, lista:1690, best:1, rating:4.9, reviews:214,
   notas:{s:"Bergamota, manzana verde, cardamomo", c:"Lavanda, jazmín, notas acuáticas", f:"Ámbar gris, musgo, madera de cedro"},
   desc:"El más pedido de la tienda. Una apertura helada y cítrica que se asienta en un fondo ambarado y limpio. Rinde entre 8 y 10 horas y proyecta fuerte las primeras dos.",
   art:{shape:2, c1:"#5C8FD6", c2:"#13264F", cap:"#0A0F1C"}},

  {id:"mandarin-sky", marca:"Armaf", nombre:"Mandarin Sky Eau de Parfum", ml:"100 ml", genero:"unisex", cat:"arabe",
   familia:"Cítrico", precio:990, lista:1290, best:1, rating:4.7, reviews:158,
   notas:{s:"Mandarina, pimienta rosa, pera", c:"Jazmín, flor de azahar", f:"Almizcle blanco, ámbar, vainilla"},
   desc:"Cítrico luminoso y fácil de usar todo el día. Es el que más se vende para clima cálido y oficina.",
   art:{shape:4, c1:"#E0A33E", c2:"#2A3E74", cap:"#B98A33"}},

  {id:"hawas-malibu", marca:"Rasasi", nombre:"Hawas Malibu Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"arabe",
   familia:"Fresco", precio:1390, lista:1790, best:1, nuevo:1, rating:4.8, reviews:96,
   notas:{s:"Piña, bergamota, pimienta rosa", c:"Notas marinas, jazmín", f:"Ámbar, pachulí, almizcle"},
   desc:"La versión tropical de Hawas. Más frutal en la salida y con el mismo fondo ambarado que lo hizo famoso.",
   art:{shape:2, c1:"#3FB7A6", c2:"#10324F", cap:"#0A0F1C"}},

  {id:"most-wanted-intense", marca:"Azzaro", nombre:"The Most Wanted Intense Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Oriental", precio:2190, lista:2790, best:1, rating:4.9, reviews:302,
   notas:{s:"Cardamomo, lavanda", c:"Bourbon, madera de gaiac", f:"Vainilla, haba tonka, ámbar"},
   desc:"Dulce, licoroso y muy elogiado. De los mejores para noche y clima frío. Estela larga.",
   art:{shape:1, c1:"#8B1E3F", c2:"#1A1024", cap:"#0A0F1C"}},

  {id:"odyssey-mega", marca:"Armaf", nombre:"Odyssey Mega Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"arabe",
   familia:"Amaderado", precio:1190, lista:1490, best:1, rating:4.7, reviews:141,
   notas:{s:"Bergamota, pimienta negra", c:"Lavanda, geranio, salvia", f:"Vetiver, cedro, ámbar"},
   desc:"Amaderado aromático con muy buena relación precio-rendimiento. Uso diario, oficina y clima templado.",
   art:{shape:5, c1:"#4C6FA8", c2:"#0F1B33", cap:"#0A0F1C"}},

  {id:"club-de-nuit-intense", marca:"Armaf", nombre:"Club de Nuit Intense Man Eau de Toilette", ml:"105 ml", genero:"hombre", cat:"arabe",
   familia:"Fresco", precio:1090, lista:1390, rating:4.8, reviews:410,
   notas:{s:"Piña, limón, grosella negra", c:"Abedul, jazmín, rosa", f:"Ámbar gris, almizcle, vainilla"},
   desc:"Un clásico absoluto del segmento. Fresco frutal con fondo ahumado, potencia muy alta.",
   art:{shape:1, c1:"#2B3A55", c2:"#080C16", cap:"#0A0F1C"}},

  {id:"khamrah", marca:"Lattafa", nombre:"Khamrah Eau de Parfum", ml:"100 ml", genero:"unisex", cat:"arabe",
   familia:"Dulce", precio:1250, lista:1590, rating:4.8, reviews:268,
   notas:{s:"Canela, nuez moscada, bergamota", c:"Dátil, praliné, haba tonka", f:"Vainilla, benjuí, mirra"},
   desc:"Gourmand especiado que se volvió fenómeno. Ideal para invierno y eventos de noche.",
   art:{shape:6, c1:"#C9A227", c2:"#3B2412", cap:"#7C5A19"}},

  {id:"asad", marca:"Lattafa", nombre:"Asad Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"arabe",
   familia:"Amaderado", precio:990, lista:1290, rating:4.6, reviews:187,
   notas:{s:"Pimienta negra, piña, bergamota", c:"Café, lavanda, cardamomo", f:"Vetiver, ámbar, almizcle"},
   desc:"Café y madera con un toque frutal. Muy rendidor para el precio.",
   art:{shape:1, c1:"#6B4B2A", c2:"#1B1209", cap:"#C9A227"}},

  {id:"yara", marca:"Lattafa", nombre:"Yara Eau de Parfum", ml:"100 ml", genero:"mujer", cat:"arabe",
   familia:"Dulce", precio:890, lista:1190, nuevo:1, rating:4.7, reviews:233,
   notas:{s:"Orquídea, heliotropo", c:"Frutas tropicales, gardenia", f:"Vainilla, almizcle, sándalo"},
   desc:"Dulce, cremoso y muy femenino. El más vendido de la marca en México.",
   art:{shape:4, c1:"#E58AB4", c2:"#5B1F47", cap:"#C9A227"}},

  {id:"hawas-for-her", marca:"Rasasi", nombre:"Hawas for Her Eau de Parfum", ml:"100 ml", genero:"mujer", cat:"arabe",
   familia:"Floral", precio:1290, lista:1590, rating:4.7, reviews:112,
   notas:{s:"Bergamota, grosella negra, mandarina", c:"Jazmín, peonía, rosa", f:"Almizcle, ámbar, madera"},
   desc:"La contraparte femenina de Hawas: floral fresco con fondo limpio y duradero.",
   art:{shape:2, c1:"#D98FB0", c2:"#3B1B3A", cap:"#0A0F1C"}},

  {id:"ameer-al-oudh", marca:"Lattafa", nombre:"Ameer Al Oudh Intense Oud", ml:"100 ml", genero:"unisex", cat:"arabe",
   familia:"Oriental", precio:1150, rating:4.6, reviews:88,
   notas:{s:"Azafrán, nuez moscada", c:"Oud, rosa, pachulí", f:"Ámbar, almizcle, madera"},
   desc:"Oud clásico para quien quiere entrar al perfume árabe tradicional sin gastar de más.",
   art:{shape:6, c1:"#8E6B3A", c2:"#231508", cap:"#C9A227"}},

  {id:"bade-al-oud", marca:"Lattafa", nombre:"Bade'e Al Oud Sublime", ml:"100 ml", genero:"unisex", cat:"arabe",
   familia:"Oriental", precio:1190, rating:4.7, reviews:104,
   notas:{s:"Frutos rojos, bergamota", c:"Oud, especias, rosa", f:"Vainilla, ámbar, almizcle"},
   desc:"Oud moderno y afrutado, mucho más llevadero que un oud tradicional.",
   art:{shape:3, c1:"#7B2E4E", c2:"#1A0D1B", cap:"#C9A227"}},

  {id:"sauvage-edp", marca:"Dior", nombre:"Sauvage Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Fresco", precio:3290, lista:3790, best:1, rating:4.9, reviews:521,
   notas:{s:"Bergamota de Calabria, pimienta de Sichuan", c:"Lavanda, nuez moscada, anís estrellado", f:"Ambroxan, vainilla, haba tonka"},
   desc:"El más reconocido del mercado. Versátil, elegante y seguro para cualquier ocasión.",
   art:{shape:1, c1:"#2D4C74", c2:"#0A1220", cap:"#1A1A1A"}},

  {id:"bleu-de-chanel", marca:"Chanel", nombre:"Bleu de Chanel Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Amaderado", precio:3590, rating:4.9, reviews:388,
   notas:{s:"Toronja, limón, menta", c:"Jengibre, jazmín, nuez moscada", f:"Incienso, cedro, sándalo"},
   desc:"Amaderado aromático de manual. Formal, limpio y de proyección controlada.",
   art:{shape:3, c1:"#243C63", c2:"#070B14", cap:"#0A0F1C"}},

  {id:"eros-edt", marca:"Versace", nombre:"Eros Eau de Toilette", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Fresco", precio:1890, lista:2290, rating:4.8, reviews:297,
   notas:{s:"Menta, manzana verde, limón", c:"Haba tonka, geranio, ámbar", f:"Vainilla, vetiver, cedro"},
   desc:"Menta y vainilla, uno de los más vendidos del mundo. Juvenil y de alta proyección.",
   art:{shape:4, c1:"#2F7F6B", c2:"#0C2A22", cap:"#C9A227"}},

  {id:"y-edp", marca:"Yves Saint Laurent", nombre:"Y Eau de Parfum", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Amaderado", precio:2790, lista:3190, rating:4.8, reviews:203,
   notas:{s:"Bergamota, jengibre, manzana", c:"Salvia, junípero, lavanda", f:"Ambroxan, cedro, haba tonka"},
   desc:"Fresco arriba y amaderado abajo. El favorito para oficina y día a día.",
   art:{shape:1, c1:"#4B5A6E", c2:"#0B0E14", cap:"#0A0F1C"}},

  {id:"one-million", marca:"Paco Rabanne", nombre:"1 Million Eau de Toilette", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Oriental", precio:2190, lista:2590, rating:4.7, reviews:344,
   notas:{s:"Toronja, menta, mandarina roja", c:"Canela, rosa, especias", f:"Cuero, madera blanca, ámbar"},
   desc:"Canela y cuero. Un clásico de noche que sigue vendiendo igual que hace diez años.",
   art:{shape:3, c1:"#D4A72C", c2:"#6B4B0E", cap:"#B98A33"}},

  {id:"le-male-elixir", marca:"Jean Paul Gaultier", nombre:"Le Male Elixir Parfum", ml:"125 ml", genero:"hombre", cat:"disenador",
   familia:"Dulce", precio:3190, lista:3590, nuevo:1, rating:4.9, reviews:176,
   notas:{s:"Lavanda, menta", c:"Miel, haba tonka", f:"Vainilla, benjuí, madera"},
   desc:"La versión más dulce y concentrada de Le Male. Rendimiento muy alto en clima frío.",
   art:{shape:6, c1:"#C79B4A", c2:"#3A2A12", cap:"#B98A33"}},

  {id:"bad-boy", marca:"Carolina Herrera", nombre:"Bad Boy Eau de Toilette", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Amaderado", precio:2390, rating:4.7, reviews:221,
   notas:{s:"Pimienta negra, bergamota", c:"Salvia, cedro", f:"Cacao, haba tonka, ámbar"},
   desc:"Cacao y especias en el frasco de rayo. De los más elegidos para regalo.",
   art:{shape:5, c1:"#3A3F4A", c2:"#08090D", cap:"#C9A227"}},

  {id:"invictus", marca:"Paco Rabanne", nombre:"Invictus Eau de Toilette", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Fresco", precio:1990, lista:2390, rating:4.6, reviews:259,
   notas:{s:"Toronja, notas marinas, mandarina", c:"Hoja de laurel, jazmín", f:"Ámbar gris, madera de gaiac, pachulí"},
   desc:"Deportivo, fresco y limpio. Excelente para clima cálido y uso diurno.",
   art:{shape:4, c1:"#8A9AA8", c2:"#1A2733", cap:"#C0C6CC"}},

  {id:"voyage", marca:"Nautica", nombre:"Voyage Eau de Toilette", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Fresco", precio:690, lista:1090, oferta:1, rating:4.5, reviews:402,
   notas:{s:"Manzana, hoja verde", c:"Loto, mimosa", f:"Musgo, almizcle, madera"},
   desc:"El mejor precio por rendimiento del catálogo. Fresco verde para diario.",
   art:{shape:2, c1:"#4E9BD1", c2:"#0E2C4A", cap:"#0A0F1C"}},

  {id:"stronger-with-you", marca:"Emporio Armani", nombre:"Stronger With You Eau de Toilette", ml:"100 ml", genero:"hombre", cat:"disenador",
   familia:"Dulce", precio:2090, rating:4.7, reviews:188,
   notas:{s:"Cardamomo, menta, rosa pimienta", c:"Salvia, lavanda, junípero", f:"Vainilla, castaña, ámbar"},
   desc:"Dulce equilibrado, muy bien recibido por el público joven. Ideal para cita.",
   art:{shape:1, c1:"#6B3E2E", c2:"#1A0F0B", cap:"#0A0F1C"}},

  {id:"good-girl", marca:"Carolina Herrera", nombre:"Good Girl Eau de Parfum", ml:"80 ml", genero:"mujer", cat:"disenador",
   familia:"Oriental", precio:2890, lista:3290, best:1, rating:4.9, reviews:466,
   notas:{s:"Almendra, café", c:"Jazmín sambac, nardo", f:"Cacao, haba tonka, sándalo"},
   desc:"Café y jazmín en el icónico frasco de tacón. El más regalado de la categoría femenina.",
   art:{shape:5, c1:"#1C2A45", c2:"#06080E", cap:"#C9A227"}},

  {id:"la-vie-est-belle", marca:"Lancôme", nombre:"La Vie Est Belle Eau de Parfum", ml:"100 ml", genero:"mujer", cat:"disenador",
   familia:"Dulce", precio:2990, rating:4.8, reviews:311,
   notas:{s:"Grosella negra, pera", c:"Iris, jazmín, flor de azahar", f:"Praliné, vainilla, pachulí"},
   desc:"Gourmand floral de larga duración. Un básico del tocador.",
   art:{shape:2, c1:"#E2A9C2", c2:"#6B2949", cap:"#C9A227"}},

  {id:"black-opium", marca:"Yves Saint Laurent", nombre:"Black Opium Eau de Parfum", ml:"90 ml", genero:"mujer", cat:"disenador",
   familia:"Dulce", precio:2890, lista:3290, rating:4.8, reviews:357,
   notas:{s:"Pera, pimienta rosa, naranja", c:"Café, jazmín sambac", f:"Vainilla, pachulí, cedro"},
   desc:"Café y vainilla. Nocturno, adictivo y de proyección alta.",
   art:{shape:3, c1:"#2B2B33", c2:"#08080B", cap:"#C9A227"}},

  {id:"olympea", marca:"Paco Rabanne", nombre:"Olympéa Eau de Parfum", ml:"80 ml", genero:"mujer", cat:"disenador",
   familia:"Floral", precio:2290, rating:4.7, reviews:198,
   notas:{s:"Jazmín acuático, mandarina verde", c:"Vainilla salada, flor de jengibre", f:"Sándalo, ámbar gris, madera de cachemira"},
   desc:"Vainilla salada y flores blancas. Femenino, fresco y muy duradero.",
   art:{shape:6, c1:"#D8C39A", c2:"#7A5A2E", cap:"#C9A227"}},

  {id:"scandal", marca:"Jean Paul Gaultier", nombre:"Scandal Eau de Parfum", ml:"80 ml", genero:"mujer", cat:"disenador",
   familia:"Dulce", precio:2490, rating:4.7, reviews:164,
   notas:{s:"Naranja sanguina, mandarina", c:"Miel, gardenia, jazmín", f:"Pachulí, cera de abeja, caramelo"},
   desc:"Miel y flores blancas en el frasco de cadera. Dulce sin empalagar.",
   art:{shape:4, c1:"#E8B84B", c2:"#7A4A12", cap:"#B98A33"}},

  {id:"coco-mademoiselle", marca:"Chanel", nombre:"Coco Mademoiselle Eau de Parfum", ml:"100 ml", genero:"mujer", cat:"disenador",
   familia:"Floral", precio:3690, rating:4.9, reviews:402,
   notas:{s:"Naranja, bergamota, mandarina", c:"Rosa, jazmín, litchi", f:"Pachulí, vetiver, vainilla"},
   desc:"Elegancia sin discusión. Chipre floral que funciona todo el año.",
   art:{shape:3, c1:"#D9CFC0", c2:"#6F6357", cap:"#1A1A1A"}},

  {id:"212-vip-rose", marca:"Carolina Herrera", nombre:"212 VIP Rosé Eau de Parfum", ml:"80 ml", genero:"mujer", cat:"disenador",
   familia:"Floral", precio:2190, lista:2590, rating:4.6, reviews:207,
   notas:{s:"Champán rosado, durazno", c:"Rosa, flor de azahar", f:"Almizcle, madera de cachemira"},
   desc:"Champaña y rosas. Festivo, ligero y muy fácil de usar.",
   art:{shape:4, c1:"#E7B7C4", c2:"#8C4A62", cap:"#D9A7B4"}},

  {id:"bombshell", marca:"Victoria's Secret", nombre:"Bombshell Eau de Parfum", ml:"100 ml", genero:"mujer", cat:"disenador",
   familia:"Floral", precio:1490, lista:1890, oferta:1, rating:4.6, reviews:276,
   notas:{s:"Maracuyá, toronja", c:"Peonía, orquídea de vainilla", f:"Almizcle, madera"},
   desc:"Frutal floral muy popular. Fresco, alegre y de buen rendimiento.",
   art:{shape:2, c1:"#EFA7C3", c2:"#9C2C5B", cap:"#E7B7C4"}}
];

/* categorías para navegación y filtros */
const CATEGORIAS = [
  {slug:"hombre",     titulo:"Para él",            desc:"Amaderados, frescos y orientales para uso diario y de noche."},
  {slug:"mujer",      titulo:"Para ella",          desc:"Florales, dulces y orientales de las casas más buscadas."},
  {slug:"unisex",     titulo:"Unisex",             desc:"Fragancias que funcionan igual de bien para cualquiera."},
  {slug:"arabe",      titulo:"Perfumes árabes",    desc:"Rasasi, Armaf y Lattafa: alto rendimiento y precio accesible."},
  {slug:"disenador",  titulo:"Diseñador",          desc:"Dior, Chanel, Versace, YSL y más, 100% originales."},
  {slug:"best",       titulo:"Los más vendidos",   desc:"Lo que más sale de la tienda cada semana."},
  {slug:"nuevo",      titulo:"Novedades",          desc:"Últimas llegadas al inventario."},
  {slug:"oferta",     titulo:"Ofertas",            desc:"Precios especiales por tiempo limitado."}
];

const FAMILIAS = ["Fresco","Amaderado","Oriental","Dulce","Floral","Cítrico"];
const MARCAS = [...new Set(PRODUCTOS.map(p=>p.marca))].sort();

/* datos del negocio — se editan en un solo lugar */
const TIENDA = {
  nombre:"miperfumeria",
  instagram:"https://www.instagram.com/miperfumeriamx",
  instagramUser:"@miperfumeriamx",
  whatsapp:"https://wa.me/52",           // ← agregar número real
  correo:"hola@miperfumeria.mx",         // ← correo real
  envioGratisPiezas:3,
  mayoreoMonto:4000,
  paqueteria:"Skydrop"
};
