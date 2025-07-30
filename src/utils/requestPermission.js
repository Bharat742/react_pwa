// utils/requestPermission.js
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
};
