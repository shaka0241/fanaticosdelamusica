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
  event.respondWith(
    fetch(event.request).catch(() => {
      // Basic offline fallback if needed
      return new Response('Estás sin conexión a internet.');
    })
  );
});
