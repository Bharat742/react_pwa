
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
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res || fetch(event.request);
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl)

      })
    );
  }

});

// ####################

// Push Notification Event
self.addEventListener("push", (event) => {
  console.warn("Service Worker: Push Received");

  let title = "Push Notification";
  let options = {
    body: "This message from SW",
    icon: "/logo192.png", 
    badge: "/logo192.png",
    data: {
      url: "/"
    }
  };

  if (event.data) {
    try {
      const data = event.data.json(); //  Try parsing JSON
      title = data.title || title;
      options.body = data.body || options.body;
      options.data.url = data.url || "/";
    } catch (e) {
      console.warn("Fallback to text body:", e);
      options.body = event.data.text(); //  Plain text fallback
    }
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});



// Notification Click Event
self.addEventListener("notificationclick", function (event) {
  console.warn(" Notification Clicked");
  event.notification.close();

  const message = " This message was pushed by the Service Worker";

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
    // clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
    //   if (clientList.length > 0) {
    //     // Send a message to your frontend
    //     clientList[0].postMessage({
    //       type: "NOTIFICATION_CLICKED",
    //       message: message,
    //       from: "service-worker"
    //     });
    //     return clientList[0].focus();
    //   } else {
    //     return clients.openWindow("/");
    //   }
    // })
  );
});

