self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/js/',
          '/css/',
          '/images/',
          '/mail/',
          '/vendor/',
          'https://fonts.googleapis.com/css?family=Montserrat:400,700',
          'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic'
        ]);
      })
  );
});

self.addEventListener('activate', function () {
  console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});