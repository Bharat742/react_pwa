console.warn("Service Worker is running");

let cacheName = "appV1";

self.addEventListener("install", (event) => {
  console.warn("Service Worker: Install event");

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/users',
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
      ]);
    })
  );
});


self.addEventListener("fetch", (event) => {
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((res) => {
                if(res){
                    return res || fetch(event.request);
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            
            })
        );
    }
  
});

