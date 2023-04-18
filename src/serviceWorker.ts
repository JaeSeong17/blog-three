export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service worker registered: ', registration);
        })
        .catch(error => {
          console.error('Error registering service worker: ', error);
        });
    });
  }
};
/// <reference lib="webworker" />
/// <reference types="serviceworker" />

const CACHE_NAME = 'my-cache-v1';
const CACHE_URLS: string[] = [
  '/cube.ico',
  '/Gear.png',
  '/model/keycap_long.glb',
  '/model/keycap.glb',
  '/font/NanumGothic_subset.json',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache: Cache) => cache.addAll(CACHE_URLS)),
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.open('my-cache').then(async (cache: Cache) => {
      return cache.match(event.request).then(response => {
        if (response) {
          // 캐시에서 찾은 경우 캐시 반환
          return response;
        } else {
          // 네트워크에서 가져와 캐시에 추가
          return fetch(event.request).then(response => {
            // TTL 1분으로 설정하여 캐시 추가
            const maxAge = 31536000; // seconds
            const headers = new Headers(response.headers);
            headers.set('Cache-Control', 'max-age=' + maxAge);
            const newResponse = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers,
            });
            cache.put(event.request, newResponse);
            return newResponse;
          });
        }
      });
    }),
  );
});
