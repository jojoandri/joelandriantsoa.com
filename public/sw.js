// Service Worker pour la mise en cache des ressources
const CACHE_NAME = 'portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/fonts/NeueMontreal_Medium.otf',
  '/fonts/Neglige.otf',
  '/images/background.jpg',
  '/images/background2.jpg',
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache des ressources statiques (images, fonts, etc.)
  if (url.pathname.startsWith('/images/') || 
      url.pathname.startsWith('/fonts/') || 
      url.pathname.startsWith('/videos/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((response) => {
          // Cloner la réponse pour la mettre en cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
  }
  
  // Pour les autres ressources, utiliser le réseau en priorité
  else {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
  }
});
