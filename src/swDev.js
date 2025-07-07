export default function swDev() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.warn(" Service Worker Registered:", registration);

        // Unsubscribe any existing push subscription first
        registration.pushManager.getSubscription().then((existingSubscription) => {
          if (existingSubscription) {
            console.log(" Unsubscribing old push subscription...");
            existingSubscription.unsubscribe();
          }

          // Now ask for permission and create a new subscription
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              const publicVapidKey = 'BGuH-BZdpShuJMHisDaOvZCQgiKiON4PvjINGmKtxkB6xOPESoCHxd7MmcKiyVtYrfOGepMu3wnhN2CDTa26YwE';

              registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
              }).then((subscription) => {
                console.log("Push Subscription:", subscription);

                // Send it to your server
                fetch('https://service-worker-backend-h4qr.onrender.com/subscribe', {
                  method: 'POST',
                  body: JSON.stringify(subscription),
                  headers: { 'Content-Type': 'application/json' }
                });
              }).catch((err) => {
                console.error("Push subscription failed:", err);
              });
            } else {
              console.warn(" Notification permission denied.");
            }
          });
        });
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
