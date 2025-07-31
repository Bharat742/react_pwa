// import { registerPush } from "./pushNotification";

export default function swDev() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('🔧 Registering service worker...');
    
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.warn("✅ Service Worker Registered:", registration);
        console.log('📱 Service Worker scope:', registration.scope);

        // Wait a bit for the service worker to be ready
        // setTimeout(async () => {
        //   try {
        //     // Request permission + register push
        //     const publicVapidKey = 'BGuH-BZdpShuJMHisDaOvZCQgiKiON4PvjINGmKtxkB6xOPESoCHxd7MmcKiyVtYrfOGepMu3wnhN2CDTa26YwE';
        //     console.log('🔑 Using VAPID key:', publicVapidKey.substring(0, 20) + '...');
            
        //     await registerPush(registration, publicVapidKey);
        //   } catch (error) {
        //     console.error('❌ Error in push registration:', error);
        //   }
        // }, 1000);

      })
      .catch((err) => {
        console.error("❌ Service Worker registration failed:", err);
      });
  } else {
    console.warn('⚠️ Service Worker or Push Manager not supported in this browser');
  }
}
