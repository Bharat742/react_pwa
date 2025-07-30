export async function registerPush(swReg, publicVapidKey) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('❌ Notification permission denied');
      return;
    }

    const subscription = await swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    console.log('✅ Push Subscription:', JSON.stringify(subscription));

    // 🔥 Send subscription to backend
    // await fetch('https://service-worker-backend-h4qr.onrender.com/subscribe', {
    await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('❌ Push subscription failed:', err);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
}
