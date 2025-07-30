// components/PushNotificationButton.jsx
import React from "react";
import { requestNotificationPermission } from "../utils/requestPermission";

const PushNotificationButton = () => {
  const handleNotificationClick = async () => {
    const permissionGranted = await requestNotificationPermission();

    if (!permissionGranted) {
      alert("Notification permission not granted.");
      return;
    }

    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;

      registration.showNotification("Push Notification", {
        body: "This message was triggered by a React button",
        icon: "/logo192.png",
        badge: "/logo192.png",
        data: {
          url: "/",
        },
      });
    } else {
      alert("Service Worker not supported in this browser.");
    }
  };

  return (
    <button onClick={handleNotificationClick}>
      Trigger Push Notification
    </button>
  );
};

export default PushNotificationButton;
