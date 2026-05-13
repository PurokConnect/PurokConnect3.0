const CACHE_NAME = 'purokconnect-v1';
const urlsToCache = [
  '/PurokConnect3.0/',
  '/PurokConnect3.0/index.html',
  '/PurokConnect3.0/logo.png',
  '/PurokConnect3.0/manifest.json'
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch event: serve cached files first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
