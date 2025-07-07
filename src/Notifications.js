// src/Notifications.js
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swDev from "./swDev";

const Notifications = () => {
  const [messageFromSW, setMessageFromSW] = useState("");

  // Listen for service worker messages
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(" Message from SW:", event.data);

        if (event.e === "NOTIFICATION_CLICKED") {
          setMessageFromSW(event.data.message); // Show on screen
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
    <div className="">
      <button className="btn btn-primary" onClick={askNotificationPermission}>
        Enable Notifications
      </button>
        {/* Add ToastContainer to render toasts */}
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
