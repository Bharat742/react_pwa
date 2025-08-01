// src/Components/Home.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
// import image from "@/../../public/logo192.png";
import Notifications from "../Notifications";
import PushNotificationButton from "./PushNotificationButton";

const VAPID_PUBLIC_KEY = 'BGuH-BZdpShuJMHisDaOvZCQgiKiON4PvjINGmKtxkB6xOPESoCHxd7MmcKiyVtYrfOGepMu3wnhN2CDTa26YwE';

const Home = () => {
  const [notificationStatus, setNotificationStatus] = useState("");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  useEffect(() => {
    // Debug: Check what's in localStorage
    const prompted = localStorage.getItem('notificationPrompted');
    console.log('🔍 localStorage notificationPrompted:', prompted);
    console.log('🔍 Should show modal?', prompted !== 'true');
    
    // Only show the popup if not already asked
    if (prompted !== 'true') {
      console.log('✅ Setting modal to show');
      setShowSubscribeModal(true);
    } else {
      console.log('❌ Modal will not show (already prompted)');
    }
  }, []);

  const handleSubscribe = async () => {
    console.log('✅ User clicked Yes - subscribing');
    setShowSubscribeModal(false);
    localStorage.setItem('notificationPrompted', 'true');
    // Request permission and subscribe
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          setNotificationStatus('❌ Notification permission denied');
          setTimeout(() => setNotificationStatus(""), 4000);
          return;
        }
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
        // Send subscription to backend
        await fetch('https://service-worker-b.onrender.com/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription)
        });
        setNotificationStatus('✅ Subscribed and endpoint sent to server!');
        setTimeout(() => setNotificationStatus(""), 4000);
      } catch (err) {
        setNotificationStatus('❌ Subscription failed: ' + err.message);
        setTimeout(() => setNotificationStatus(""), 4000);
      }
    }
  };

  const handleDecline = () => {
    console.log('❌ User clicked No - not subscribing');
    setShowSubscribeModal(false);
    // Do NOT set localStorage here - this allows popup to show again on refresh
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
  }

  const sendNotificationToAll = async () => {
    try {
      setNotificationStatus("Sending notifications...");
      const response = await fetch('https://service-worker-b.onrender.com/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      console.log('Notification sent to all devices:', result);
      setNotificationStatus(`✅ ${result.message}`);
      setTimeout(() => setNotificationStatus(""), 5000);
    } catch (error) {
      console.error('Error sending notification:', error);
      setNotificationStatus("❌ Failed to send notification");
      setTimeout(() => setNotificationStatus(""), 5000);
    }
  };

  const checkSubscriptions = async () => {
    try {
      const response = await fetch('https://service-worker-b.onrender.com/subscribe/list');
      const result = await response.json();
      console.log('Current subscriptions:', result);
      alert(`Found ${result.count} subscriptions`);
    } catch (error) {
      console.error('Error checking subscriptions:', error);
      alert('Failed to check subscriptions');
    }
  };

  const resetPopup = () => {
    localStorage.removeItem('notificationPrompted');
    setShowSubscribeModal(true);
    console.log('🔄 Reset popup - localStorage cleared');
  };

  // Debug: Log modal state
  console.log('🔍 Modal show state:', showSubscribeModal);

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        {/* Modal for subscription */}
        <Modal show={showSubscribeModal} onHide={handleDecline} centered>
          <Modal.Header closeButton>
            <Modal.Title>Subscribe to Notifications?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Would you like to receive push notifications from us?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDecline}>
              No
            </Button>
            <Button variant="primary" onClick={handleSubscribe}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Left Column */}
        <Col md={12} className="mb-4">
          <h1 className="mb-3">Welcome to Our Website</h1>
          <p>
            This is a simple React app styled with <strong>React-Bootstrap</strong>. It's fully responsive and mobile-friendly.
          </p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Notifications/>
            <PushNotificationButton/>
            <Button 
              variant="success" 
              onClick={sendNotificationToAll}
              className="me-2"
            >
              Send Notification to All
            </Button>
            <Button 
              variant="info" 
              onClick={checkSubscriptions}
              className="me-2"
            >
              Check Subscriptions
            </Button>
            <Button 
              variant="warning" 
              onClick={resetPopup}
              className="me-2"
            >
              Reset Popup
            </Button>
            <Button variant="outline-light" className="bg-dark">
              Contact Us
            </Button>
          </div>
          
          {notificationStatus && (
            <div className={`alert ${notificationStatus.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
              {notificationStatus}
            </div>
          )}
        </Col>

        {/* Right Column */}
        {/* <Col md={6}>
          <Card>
            <Card.Img 
              className="!w-[40px]"
              variant="top"
              src={image}
              alt="Placeholder"
            />
            <Card.Body>
              <Card.Title>Featured Section</Card.Title>
              <Card.Text>
                You can place anything here, like images, sliders, or text blocks.
              </Card.Text>
              <Notifications/>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Home;
