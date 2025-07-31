
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

// Push Notification Event
self.addEventListener("push", (event) => {
  console.warn("Service Worker: Push Received");
  console.log("📨 Push data:", event.data ? event.data.text() : "No data");

  let title = "Push Notification";
  let options = {
    body: "This message from SW",
    icon: "/logo192.png", 
    badge: "/logo192.png",
    data: {
      url: "/"
    },
    requireInteraction: true, // Keep notification visible until user interacts
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  if (event.data) {
    try {
      const data = event.data.json(); // Try parsing JSON
      title = data.title || title;
      options.body = data.body || options.body;
      options.data.url = data.url || "/";
      console.log("✅ Parsed push data:", data);
    } catch (e) {
      console.warn("⚠️ Fallback to text body:", e);
      options.body = event.data.text(); // Plain text fallback
    }
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Event
self.addEventListener("notificationclick", function (event) {
  console.warn("🔔 Notification Clicked");
  console.log("Action clicked:", event.action);
  
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const message = "This message was pushed by the Service Worker";

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Notification Close Event
self.addEventListener("notificationclose", function (event) {
  console.warn("🔕 Notification Closed");
});

