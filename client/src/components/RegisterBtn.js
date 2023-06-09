import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterBtn = () => {
  return (
    <div>
      <Link to="register">
        <Button variant="dark">Register</Button>
      </Link>
    </div>
  );
};

export default RegisterBtn;
