import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Cards = ({ cardtitle, cardtext, cardimg }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={cardimg}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{cardtitle}</Card.Title>
          <Card.Text
            style={{ textAlign: "justify", fontSize: "14px", height: "130px" }}
          >
            {cardtext}
          </Card.Text>

          <Link to="register">
            <Button variant="dark">Register</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
