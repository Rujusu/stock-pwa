const CACHE_NAME = 'stock-cache-v2';
const FILES_TO_CACHE = [
  'index.html',
  'stock.html',
  'recipes.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'service-worker.js'
];

// Install: cache all files and skip waiting
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve cached content if available, else fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
