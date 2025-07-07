// src/Components/Home.js

import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import image from "@/../../public/logo192.png";
import Notifications from "../Notifications";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        {/* Left Column */}
        <Col md={6} className="mb-4">
          <h1 className="mb-3">Welcome to Our Website</h1>
          <p>
            This is a simple React app styled with <strong>React-Bootstrap</strong>. It's fully responsive and mobile-friendly.
          </p>
          {/* <Button variant="primary" className="me-2">
            Learn More
          </Button> */}
          <div  className="d-flex gap-2">
          <Notifications/>
          <Button variant="outline-light" className="bg-dark">
            Contact Us
          </Button>
          </div>
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
              {/* <Button variant="success">Explore</Button> */}
              <Notifications/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
