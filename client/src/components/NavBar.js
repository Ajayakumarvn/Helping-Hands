import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const logoutHandler = () => {
    sessionStorage.clear();

    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("role");
    // sessionStorage.removeItem("name");
    // sessionStorage.removeItem("event");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ padding: "20px" }}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/home" className="logo">
            <img src={Logo} alt="logo" width="50" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Nav
            className="nav-menus"
            style={{ dislay: "flex", alignItems: "center" }}
          >
            {sessionStorage.getItem("role") === "Admin" ||
            sessionStorage.getItem("role") === "Organiser" ? (
              <Link to="/addevents">Add Events</Link>
            ) : (
              " "
            )}

            <Link to="/events">Events</Link>
            {sessionStorage.getItem("role") === "Admin" ||
            sessionStorage.getItem("role") === "Organiser" ? (
              <Link to="/myevents">My Events</Link>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Volunteer" ? (
              <Link to="/participatedevents">My Events</Link>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Admin" ? (
              <Link to="/volunteerlist">Volunteers</Link>
            ) : (
              " "
            )}
            {sessionStorage.getItem("role") === "Admin" ? (
              <Link to="/organiserlist">Organisers</Link>
            ) : (
              " "
            )}
            {sessionStorage.getItem("role") === "Admin" ? (
              <Link to="/transactions">Transactions</Link>
            ) : (
              " "
            )}
            {/* <Link to="/contact">Contact</Link> */}
            <div style={{ display: "flex" }}>
              <Button variant="warning">
                {sessionStorage.getItem("name")}
              </Button>{" "}
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
