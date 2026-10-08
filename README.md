# CosmetikHud

Tienda B2B en español de **CosmetikHud**, importador y distribuidor de productos de medicina estética (toxina botulínica, ácido hialurónico y bioestimuladores) para profesionales de la salud en Colombia. Los pedidos se completan por WhatsApp.

Instagram: [@cosmetikhud](https://www.instagram.com/cosmetikhud/)

## Stack

React 18 + Vite. Sin backend, sin router. Se sirve con nginx en Docker.

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # previsualizar el build
npm test          # pruebas (Vitest + Testing Library)
```

## Pruebas

```bash
npm test                              # todas las pruebas
npm run test:watch                    # modo observación
npx vitest run src/App.test.jsx       # un archivo
npx vitest run -t "never shows prices" # una prueba por nombre
```

| Archivo | Qué cubre |
| --- | --- |
| `src/App.test.jsx` | Flujo completo: filtros, búsqueda, detalle de producto, carrito, mensaje de WhatsApp, productos ocultos y agotados, error al cargar el catálogo, menú móvil, sin precios y aviso legal |
| `src/lib/catalog.test.js` | Lectura de `products.json`: valores por defecto y entradas inválidas |
| `src/lib/useCart.test.js` | Carrito: cantidades, tope de 99, agotados, guardado en el navegador y datos corruptos |
| `src/lib/order.test.js` | Texto del pedido y de las consultas por WhatsApp |
| `src/project.test.js` | `products.json` válido (campos, SKU únicos, imágenes existentes, sin precios), que el código no dependa de `src/design` y que existan los íconos |

## Docker

```bash
docker compose up --build -d        # http://localhost:8080
PORT=3000 docker compose up --build -d   # otro puerto
docker compose down
```

- La imagen ejecuta `npm test` antes de compilar: si una prueba falla, la imagen no se construye.
- La imagen final es nginx con los archivos estáticos (sin Node) e incluye un healthcheck.
- nginx guarda en caché por un año los archivos de `assets/` (tienen hash en el nombre) y siempre revalida `index.html` y `products.json`, así cada cambio se ve de inmediato.
- `public/data` y `public/products` se montan desde el equipo: editar `products.json` o agregar fotos de producto no requiere reconstruir la imagen.

## Estructura

```
src/
  App.jsx             estado de la interfaz (filtro, búsqueda, diálogos, aviso)
  data/categories.js  las tres categorías y sus descripciones
  data/site.js        datos de contacto y enlaces de WhatsApp
  lib/                catálogo (lee products.json), pedido por WhatsApp, carrito y animaciones
  components/         secciones de la página, diálogos y logo (SVG)
  assets/             imágenes web (WebP): portada, producto destacado y piezas de redes
  styles.css          estilos globales con los colores y la tipografía de la marca
public/
  data/products.json  lista de productos (se edita sin recompilar)
  products/           fotos de producto (WebP, 640 × 640, fondo blanco)
  favicon.svg, apple-touch-icon.png
legacy/index.html     versión anterior de un solo archivo (referencia)
```

## Fuentes de diseño (`src/design`)

La carpeta `src/design` (logo, catálogo impreso, piezas de redes; unos 1 GB en PSD, AI y PDF) **no se sube a git** y tampoco entra en la imagen de Docker. El sitio no la necesita para compilar:

- Las imágenes que usa el sitio ya están exportadas en `src/assets/` y `public/products/` (WebP).
- El logo está como SVG en `src/components/Logo.jsx`, y el favicon en `public/`.
- `src/project.test.js` falla si algún archivo del sitio importa algo de `src/design`.

Para cambiar una imagen, expórtela desde la pieza original a WebP y guárdela en `src/assets/`. Las fotos de producto van en `public/products/`, cuadradas (640 × 640 px) y con fondo blanco.

## Identidad visual

Tomada de la bitácora de diseño de redes de CosmetikHud:

- Tipografía: Montserrat (negrita en títulos, liviana en textos).
- Colores: azul `#0d2b52` (principal), dorado `#c8a97e` (acentos y líneas), blanco, crema `#e8ded2` y gris azulado `#d9dde3`; texto `#111111`. El azul brillante `#2563eb` es solo para pauta, nunca en el sitio.
- Estilo minimalista: mucho espacio en blanco y una línea dorada como acento.
- Títulos de sección en mayúsculas, en dos tonos (azul y dorado), con el número en recuadro del catálogo impreso.

## Animaciones

- Curvas suaves (`cubic-bezier(0.25, 1, 0.5, 1)` y `cubic-bezier(0.16, 1, 0.3, 1)`), de 250 a 450 ms en interacciones y hasta 600 ms en apariciones, con escalonado de 80 ms.
- Portada: título, texto y botones aparecen en secuencia; la imagen entra con un leve zoom y desenfoque.
- Secciones: aparecen al entrar en pantalla (`useReveal` en `src/lib/reveal.js` con IntersectionObserver); los valores de "Nosotros" de izquierda a derecha y los pasos de "Cómo pedir" uno tras otro.
- Tarjetas: se elevan al pasar el cursor; el botón Agregar muestra "Agregado" al confirmar.
- Encabezado: al bajar se vuelve translúcido (desenfoque) y se compacta.
- Con "reducir movimiento" activado en el sistema, no hay desplazamientos y todo el contenido se muestra de inmediato.

## Controlar los productos (`public/data/products.json`)

Todos los productos están en [public/data/products.json](public/data/products.json). El sitio lee este archivo en cada visita: al guardarlo, el cambio se ve al recargar la página, sin compilar ni reconstruir Docker.

Cada producto tiene estos campos (el orden de la lista es el orden en la página):

| Campo | Qué es |
| --- | --- |
| `sku` | Referencia única (se envía en el pedido de WhatsApp) |
| `category` | `Toxina Botulínica`, `Ácido Hialurónico` o `Bioestimulador` |
| `name`, `lab`, `presentation`, `description` | Textos de la tarjeta y del detalle |
| `image` | Nombre del archivo en `public/products/` |
| `visible` | `false` lo oculta del sitio (catálogo, búsqueda, categorías y carrito) |
| `available` | `false` lo muestra como **Agotado**: no se puede agregar al pedido, pero se puede consultar por WhatsApp |

Ejemplos:

```json
{ "sku": "TOX-BOT-100", ..., "visible": false }     // ya no se muestra
{ "sku": "AH-ELA-D", ..., "available": false }      // se muestra como Agotado
```

- Para agregar un producto, copie un bloque, cambie el `sku` (no puede repetirse) y los textos, y guarde la foto en `public/products/` con el nombre indicado en `image`.
- Si un producto tiene un error (falta un campo, SKU repetido o categoría desconocida), el sitio lo omite y lo avisa en la consola del navegador; `npm test` también lo detecta.
- **Nunca** agregue precios ni costos al archivo: el sitio no los muestra.
- Si Neuronox está oculto o agotado, la sección "Producto destacado" desaparece.
- El archivo debe ser JSON válido (comillas dobles, comas entre productos, sin comentarios).

Los datos de contacto están en [src/data/site.js](src/data/site.js). El horario de atención se muestra cuando se completa `hours`.

## Reglas del sitio

- No se muestran precios ni costos; las tarjetas indican consultar con un asesor.
- El aviso legal del pie (sin afiliación con los titulares de las marcas; venta solo a profesionales con licencia) debe mantenerse.
