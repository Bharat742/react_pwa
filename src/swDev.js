import { registerPush } from "./pushNotification";

export default function swDev() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.warn("✅ Service Worker Registered:", registration);

        // Request permission + register push
        const publicVapidKey = 'BGuH-BZdpShuJMHisDaOvZCQgiKiON4PvjINGmKtxkB6xOPESoCHxd7MmcKiyVtYrfOGepMu3wnhN2CDTa26YwE';
        registerPush(registration, publicVapidKey);
      })
      .catch((err) => console.error("❌ Service Worker registration failed:", err));
  }
}
