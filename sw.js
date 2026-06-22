const CACHE_NAME = 'sige-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Ignora requisições para o Google Scripts para não quebrar a API
  if (e.request.url.includes('script.google.com')) return;
  
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});