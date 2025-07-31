export async function registerPush(swReg, publicVapidKey) {
  try {
    console.log('🔐 Requesting notification permission...');
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      console.warn('❌ Notification permission denied');
      return;
    }

    console.log('✅ Notification permission granted');
    console.log('📱 Registering push subscription...');

    const subscription = await swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    console.log('✅ Push Subscription created:', JSON.stringify(subscription));

    // Send subscription to backend
    console.log('📤 Sending subscription to backend...');
    const response = await fetch('https://pwa-react-single-page.netlify.app/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Subscription saved to backend:', result);
    } else {
      console.error('❌ Failed to save subscription to backend');
    }

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
