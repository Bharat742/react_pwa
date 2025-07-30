// src/Notifications.js
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swDev from "./swDev";

const Notifications = () => {
  const [messageFromSW, setMessageFromSW] = useState("");

  // ✅ Correctly using useEffect inside the component
  useEffect(() => {
    swDev(); // Register service worker and push on mount

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("Message from SW:", event.data);

        if (event.data?.type === "NOTIFICATION_CLICKED") {
          setMessageFromSW(event.data.message);
        }
      });
    }
  }, []);

  const askNotificationPermission = () => {
    if (Notification.permission === "granted") {
      console.log("Notification already granted.");
      swDev();
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        swDev();
      } else {
        console.warn("Permission denied.");
      }
    });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={askNotificationPermission}>
        Enable Notifications
      </button>

      <ToastContainer position="top-center" />

      {messageFromSW && (
        <div style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
          {messageFromSW}
        </div>
      )}
    </div>
  );
};

export default Notifications;
