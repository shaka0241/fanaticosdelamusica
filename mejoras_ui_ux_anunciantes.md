# Mejoras de UI/UX y Accesibilidad para Tarjetas de Anunciantes

Para llevar la sección de anunciantes a un nivel más profesional, útil y accesible de cara al usuario final, se recomienda solicitar e integrar la siguiente información a la base de datos (y posteriormente a la interfaz):

## 1. Ubicación Física y Navegación (Crucial para negocios locales)

* **Dirección Corta (`address`):** Ayuda a los usuarios a saber enseguida si el local les queda cerca antes de interactuar. Ej: *"Av. Principal, Sector X"*.
* **Enlace a Google Maps (`mapsUrl`):** Un botón de "Cómo llegar" que abra directamente la app de mapas. A nivel de accesibilidad, los usuarios con movilidad reducida necesitan saber exactamente a dónde van.

## 2. Canales de Contacto Directo (Multicanalidad)

* **WhatsApp (`whatsapp`):** El número formateado (ej. `584120644212`) para crear un botón de *API de WhatsApp* directo. Las personas prefieren escribir por chat antes que realizar una llamada tradicional.
* **Redes Sociales (`instagram`, `facebook`, `tiktok`):** Nombre de usuario (ej. `@farmacia_rosario`). Además de generar confianza visual y prueba social, permite a los usuarios ver fotos reales del local, productos o menú.

## 3. Información Temporal (Decisión de compra)

* **Horario de Atención (`schedule`):** Ej: *"Lun a Sáb: 8am - 6pm"*.
* **Estado Abierto/Cerrado (`isOpen`):** Poder visualizar un indicador en tiempo real de si el local está abierto reduce la frustración de intentar contactar a un negocio inactivo.

## 4. Categorización y Accesibilidad Visual

* **Etiquetas / Badges (`category` o `tags`):** Palabras clave como `[Salud]`, `[Comida Rápidas]`, `[24 Horas]`. Se recomienda mostrarlas como pequeñas *píldoras* visuales. Esto mejora la carga cognitiva, al ser mucho más fácil escanear colores y etiquetas cortas que leer párrafos completos.
* **Texto Alternativo del Logo (`altText`):** Vital para herramientas como lectores de pantalla (para personas con discapacidad visual). No basta con que el `alt` sea el nombre genérico del local; si el logo incluye un eslogan textual, este debe estar fielmente documentado en el código.

---

### Impacto en la Interfaz

Al recolectar toda esta data, el diseño actual puede evolucionar para incluir una **fila inferior de botones de acción rápida icónicos** (ej. iconos para *Llamar*, *WhatsApp*, *Instagram* e *Ir al Mapa*). Esto resulta mucho más ergonómico y "hace clic" naturalmente en dispositivos móviles que depender únicamente de texto plano.
