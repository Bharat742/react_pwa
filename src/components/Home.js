// src/Components/Home.js

import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import image from "@/../../public/logo192.png";
import Notifications from "../Notifications";
import PushNotificationButton from "./PushNotificationButton";

const Home = () => {
  const [notificationStatus, setNotificationStatus] = useState("");

  const sendNotificationToAll = async () => {
    try {
      setNotificationStatus("Sending notifications...");
      const response = await fetch('https://pwa-react-single-page.netlify.app/sendNotification', {
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
      const response = await fetch('https://pwa-react-single-page.netlify.app/subscribe/list');
      const result = await response.json();
      console.log('Current subscriptions:', result);
      alert(`Found ${result.count} subscriptions`);
    } catch (error) {
      console.error('Error checking subscriptions:', error);
      alert('Failed to check subscriptions');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        {/* Left Column */}
        <Col md={6} className="mb-4">
          <h1 className="mb-3">Welcome to Our Website</h1>
          <p>
            This is a simple React app styled with <strong>React-Bootstrap</strong>. It's fully responsive and mobile-friendly.
          </p>
          <div className="d-flex gap-2 mb-3">
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
        <Col md={6}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
