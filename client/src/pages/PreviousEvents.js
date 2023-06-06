import React from "react";
import Cards from "../components/Cards";

import ev1 from "../assets/ev-1.png";
import ev2 from "../assets/ev-2.avif";
import ev3 from "../assets/ev-3.webp";
import ev4 from "../assets/ev-4.jpg";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";

const PreviousEvents = () => {
  const cardtext1 =
    "Build an API driven static-site with Gatsby.js and use Ghost as a completely decoupled headless CMS. Read more about how it works and how to use this starter theme here!";
  const cardtext2 =
    "Welcome, it's great to have you here. We know that first impressions are important, so we've populated your new site with some initial getting started posts that will help you get familiar with everything in no time.";
  const cardtext3 =
    "Discover familiar formatting options in a functional toolbar and the ability to add dynamic content seamlessly.";
  const cardtext4 =
    "Ghost comes with a beautiful default theme designed for publishers which can easily be adapted for most purposes, or you can build a custom theme to suit your needs.";
  return (
    <>
      <NavBar />
      <Container className="event-lists">
        <Row>
          <h2 className="heading-2">
            Lets Join our Hand to help those in need
          </h2>
        </Row>
        <Row>
          <Col>
            <Cards cardimg={ev1} cardtitle="Event-1" cardtext={cardtext1} />
          </Col>
          <Col>
            <Cards cardimg={ev2} cardtitle="Event-1" cardtext={cardtext2} />
          </Col>
          <Col>
            <Cards cardimg={ev3} cardtitle="Event-1" cardtext={cardtext3} />
          </Col>
          <Col>
            <Cards cardimg={ev4} cardtitle="Event-1" cardtext={cardtext4} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PreviousEvents;
