const CACHE_NAME = "1v1-lol-ub-cache";
const FILES_TO_CACHE = [
  "https://cloudcompile.github.io/1v1-lol-ub/",
  "https://cloudcompile.github.io/1v1-lol-ub/lib/jquery.min.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/IronSourceRV.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/mobileRedirect.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/fullscreen.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/sdkloader/ima3.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/cpmstar.js",
  "https://cloudcompile.github.io/1v1-lol-ub/UnityLoader.js",
  "https://cloudcompile.github.io/1v1-lol-ub/firebase/firebase-app.js",
  "https://cloudcompile.github.io/1v1-lol-ub/firebase/firebase-analytics.js",
  "https://cloudcompile.github.io/1v1-lol-ub/firebase/firebase-auth.js",
  "https://cloudcompile.github.io/1v1-lol-ub/firebase/firebase-firestore.js",
  "https://cloudcompile.github.io/1v1-lol-ub/firebase/firebase-remote-config.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/firebase.js?v=147",
  "https://cloudcompile.github.io/1v1-lol-ub/js/login.js?v=147",
  "https://cloudcompile.github.io/1v1-lol-ub/js/firebase-config.js?v=147",
  "https://cloudcompile.github.io/1v1-lol-ub/js/windowResize.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/adblockManager.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/macUserAgent.js",
  "https://cloudcompile.github.io/1v1-lol-ub/js/visibilityChangeListener.js",
  "https://cloudcompile.github.io/1v1-lol-ub/css/style.css",
  "https://cloudcompile.github.io/1v1-lol-ub/logo.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
