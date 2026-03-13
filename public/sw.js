// Define a cache name
const CACHE_NAME = 'fanaticos-cache-v1';

// Install event: skip waiting to activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event: claim clients so the SW takes control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch event: simple network-first strategy to satisfy PWA requirements
// Browsers require a fetch event handler for the "Install as App" prompt
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean GET o que sean a esquemas raros (chrome-extension)
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // En un escenario real aquí guardaríamos en caché dinámicamente.
        // Por ahora, simplemente retornamos la respuesta de red fresca.
        return response;
      })
      .catch(() => {
        // Fallback básico offline (Requisito indispensable para PWA Installability)
        return new Response(
          '<html><body><h1>Estás sin conexión a internet.</h1><p>Por favor revisa tu red para continuar escuchando Misión FM.</p></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
  );
});
