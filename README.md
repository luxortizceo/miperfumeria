# miperfumeria — maquetado del sitio

Maquetado completo y navegable de la tienda en línea, construido con la misma
estructura que usa El Palacio de Hierro en su sitio: barra de avisos rotativa,
cintillo de servicios, header con logo centrado y buscador, mega-menú por
categoría, carruseles de producto, cintillos editoriales, franja de servicio,
newsletter y footer en columnas (acordeón en móvil).

No hay base de datos ni pasarela de pago: el objetivo es que el cliente vea y
recorra cómo se va a sentir su sitio terminado.

## Cómo verlo

Abre `index.html` con doble clic. Funciona sin servidor.

Si prefieres servirlo en local:

```bash
cd miperfumeria && python3 -m http.server 8899
```

Luego abre http://localhost:8899

## Páginas incluidas

| Archivo | Qué es |
|---|---|
| `index.html` | Home: carrusel, más vendidos, categorías, editoriales, ofertas, newsletter |
| `catalogo.html` | Listado con filtros (género, familia, marca, precio), orden y búsqueda |
| `producto.html` | Ficha: galería, notas olfativas, presentaciones, acordeones, relacionados |
| `carrito.html` | Bolsa completa con resumen y sugerencias |
| `checkout.html` | Datos de envío y formas de pago (efectivo, transferencia, depósito) |
| `mayoreo.html` | Niveles de precio, calculadora de margen, pasos y solicitud de lista |
| `autenticidad.html` | Garantía de originalidad, quiénes somos y guía para elegir perfume |
| `ayuda.html` | Envíos, pagos, rastreo, preguntas frecuentes, devoluciones, legales |
| `contacto.html` | Canales de contacto y formulario |
| `cuenta.html` | Inicio de sesión / crear cuenta |

## Lo que sí funciona en la demo

- Navegación completa entre todas las páginas y el mega-menú.
- Buscador: filtra el catálogo por marca, nombre y notas.
- Filtros, orden y etiquetas activas en el catálogo.
- Bolsa de compra real (se guarda en el navegador): agregar, cambiar cantidad,
  eliminar, barra de progreso de envío gratis y aviso de precio de mayoreo.
- Calculadora de margen en la página de mayoreo.
- Carruseles, acordeones, menú móvil y diseño responsivo.

## Lo que está simulado

- Los formularios muestran un aviso y no envían nada.
- El checkout no cobra: es la maqueta del flujo.
- Las redes sociales apuntan a Instagram real; Facebook y TikTok quedan en `#`.

## Qué hay que reemplazar antes de publicar

Todo lo editable vive en **`assets/js/data.js`**:

1. **`TIENDA`** (al final del archivo): número de WhatsApp, correo, monto de
   mayoreo y piezas para envío gratis.
2. **`PRODUCTOS`**: precios, existencias, descripciones y notas. Los precios
   actuales son ilustrativos.
3. **Fotografías**: mientras no haya fotos propias, cada producto se dibuja con
   un frasco vectorial generado en el navegador (función `cardArt`). Cuando
   lleguen las fotos reales, se sustituye esa función por una etiqueta `<img>`
   y todo el sitio las toma automáticamente.
4. **Logotipo**: hoy se reconstruye en SVG dentro de `assets/js/layout.js`
   (función `logoSVG`). Si nos pasan el archivo vectorial original, se cambia
   ahí en un solo lugar.

Los textos legales (términos, aviso de privacidad, devoluciones) son un borrador
de referencia y los debe revisar el negocio.

## Paleta y tipografía

- Azul marino `#101C3A`, negro `#0A0F1C`, blanco y grises.
- Rojo `#9B1B30` únicamente para marcar descuentos.
- Playfair Display (títulos en itálicas), Montserrat (logotipo y etiquetas),
  Inter (texto).

## Estructura de archivos

```
miperfumeria/
├── index.html · catalogo.html · producto.html · carrito.html · checkout.html
├── mayoreo.html · autenticidad.html · ayuda.html · contacto.html · cuenta.html
└── assets/
    ├── css/styles.css   → todo el diseño
    └── js/
        ├── data.js      → catálogo, datos del negocio e ilustraciones
        ├── layout.js    → header, navegación, footer, iconos, logotipo
        └── app.js       → carrito, filtros, carruseles e interacciones
```
