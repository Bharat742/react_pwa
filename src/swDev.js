export default function swDev() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register(swUrl).then(async (registration) => {
      console.warn("Service Worker Registered:", registration);

      // 🔁 Wait until the service worker is active
      if (registration.installing) {
        await new Promise((resolve) => {
          registration.installing.addEventListener("statechange", function (e) {
            if (e.target.state === "activated") resolve();
          });
        });
      } else if (registration.waiting) {
        await new Promise((resolve) => {
          registration.waiting.addEventListener("statechange", function (e) {
            if (e.target.state === "activated") resolve();
          });
        });
      } else if (registration.active) {
        // already active, proceed
      }

      // 💥 At this point, the service worker is active

      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Unsubscribing old push subscription...");
        await existingSubscription.unsubscribe();
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const publicVapidKey = 'BGuH-BZdpShuJMHisDaOvZCQgiKiON4PvjINGmKtxkB6xOPESoCHxd7MmcKiyVtYrfOGepMu3wnhN2CDTa26YwE';
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        console.log("Push Subscription:", subscription);

        // Send to server
        await fetch('https://service-worker-backend-h4qr.onrender.com/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        console.warn("Notification permission denied.");
      }
    }).catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
  }
}

// 🔧 VAPID key helper
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
