import React, { Fragment, useEffect, useState } from "react";
import ev1 from "../assets/ev-1.png";
import { Badge, Col, Container, Row } from "react-bootstrap";
import BannerPoster from "../components/BannerPoster";
import MenuList from "../components/NavBar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Events = () => {
  const [allevents, setAllEvents] = useState([]);

  // Getting all the events
  useEffect(() => {
    fetchAllEvents();
  }, []);

  async function fetchAllEvents() {
    const res = await fetch("http://localhost:4000/campaign/viewAllnp", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setAllEvents(data.allCampaigns);
    // console.log("allevents state:", allevents);
  }

  return (
    <Fragment>
      <MenuList />
      <BannerPoster cap="Campaign" />
      <Container className="event-lists" style={{ marginBottom: "50px" }}>
        <Row>
          {allevents.length === 0 ? (
            <Badge bg="secondary">
              <h1>No Events</h1>
            </Badge>
          ) : (
            allevents.map((event) => (
              <Col xl="3" lg="4" md="6" key={event._id}>
                <div
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    margin: "20px 0",
                    padding: "20px",
                  }}
                >
                  <img src={ev1} alt="eventImage" style={{ width: "100%" }} />
                  <h4
                    style={{
                      textAlign: "center",
                      color: "grey",
                      marginTop: "10px",
                    }}
                  >
                    {event.title}
                  </h4>
                  <h6>
                    <span className="">Venue :</span> {event.venue}
                  </h6>
                  <h6>
                    <span>Date :</span> {event.date.slice(0, 10)}
                  </h6>
                  <h6>
                    <span>Description :</span> {event.description}
                  </h6>
                  <h6>
                    <span>Type :</span> {event.type}
                  </h6>
                  <h6>
                    <span>Target :</span> ₹{event.target}
                  </h6>
                  <Row>
                    {
                      <Col xs={6} xsOffset={6}>
                        {sessionStorage.getItem("role") === "Organiser" ? (
                          ""
                        ) : (
                          <Link to={`/donate/${event.title}`}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={(e) => {
                                sessionStorage.setItem("event", event.title);
                              }}
                            >
                              Donate
                            </Button>
                          </Link>
                        )}
                      </Col>
                    }
                  </Row>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Events;
