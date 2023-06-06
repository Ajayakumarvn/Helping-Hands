import React from "react";
import NavBar from "../components/NavBar";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import NestedTabs from "./Nest";

function ViewEvents() {
  const uid = sessionStorage.getItem("uid");
  const username = sessionStorage.getItem("username");

  const navigate = useNavigate();

  const [disasters, setDisasters] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetchDisasters();
    fetchFunctions();
    fetchCharities();
  }, []);

  async function fetchDisasters() {
    const res = await fetch("http://localhost:4000/categories/disaster");
    const { disasterdata } = await res.json();
    setDisasters(disasterdata);
  }

  async function fetchFunctions() {
    const res = await fetch("http://localhost:4000/categories/function");
    const { functiondata } = await res.json();
    setFunctions(functiondata);
  }

  async function fetchCharities() {
    const res = await fetch("http://localhost:4000/categories/charity");
    const { charitydata } = await res.json();
    setCharities(charitydata);
  }

  async function edit(_id, cat) {
    if (cat == "Disaster") {
      navigate(`/disaster/${_id}`);
    } else if (cat == "Social/Function") {
      navigate(`/function/${_id}`);
    } else if (cat == "Charity") {
      navigate(`/charity/${_id}`);
    }
  }

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:4000/categories/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchDisasters();
      fetchFunctions();
      fetchCharities();
      window.location.reload();
      window.alert("Deleted Successfully");
    }
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Disaster" {...a11yProps(0)} />
              <Tab label="Social/Functions" {...a11yProps(1)} />
              <Tab label="Charity" {...a11yProps(2)} />
              <Tab label="My Categories" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Row>
              {disasters.map((dis) => (
                <div className="col-md-3" key={dis._id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="holder.js/100px180?text=Image cap"
                    />
                    <Card.Body>
                      <Card.Title>{dis.title}</Card.Title>
                      <Card.Text>{dis.body}</Card.Text>
                      <p>
                        <b>Venue:</b>
                        {dis.venue}
                      </p>
                      <p>
                        <b>Created by:</b>
                        {dis.createdBy}
                      </p>

                      {username == "Admin" ? (
                        <div
                          className="ms-auto"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit
                            className="text-primary mx-2"
                            onClick={() => edit(dis._id, dis.category)}
                          />

                          <IoMdTrash
                            className="text-danger mx-2"
                            onClick={() => remove(dis._id)}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Row>
              {functions.map((fun) => (
                <div className="col-md-3" key={fun._id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="holder.js/100px180?text=Image cap"
                    />
                    <Card.Body>
                      <Card.Title>{fun.title}</Card.Title>
                      <Card.Text>{fun.body}</Card.Text>
                      <p>
                        <b>Venue:</b>
                        {fun.venue}
                      </p>
                      <p>
                        <b>Date:</b>
                        {fun.date}
                      </p>
                      <p>
                        <b>Time:</b>
                        {fun.time}
                      </p>
                      <p>
                        <b>Created by:</b>
                        {fun.createdBy}
                      </p>

                      {username == "Admin" ? (
                        <div
                          className="ms-auto"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit
                            className="text-primary mx-2"
                            onClick={() => edit(fun._id, fun.category)}
                          />

                          <IoMdTrash
                            className="text-danger mx-2"
                            onClick={() => remove(fun._id)}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Row>
              {charities.map((cha) => (
                <div className="col-md-3" key={cha._id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="holder.js/100px180?text=Image cap"
                    />
                    <Card.Body>
                      <Card.Title>{cha.title}</Card.Title>
                      <Card.Text>{cha.body}</Card.Text>
                      <p>
                        <b>Status:</b>
                        {cha.status}
                      </p>
                      <p>
                        <b>Amount:</b>
                        {cha.amount}
                      </p>
                      <p>
                        <b>Created by:</b>
                        {cha.createdBy}
                      </p>

                      {username == "Admin" ? (
                        <div
                          className="ms-auto"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit
                            className="text-primary mx-2"
                            onClick={() => edit(cha._id, cha.category)}
                          />

                          <IoMdTrash
                            className="text-danger mx-2"
                            onClick={() => remove(cha._id)}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <NestedTabs></NestedTabs>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default ViewEvents;
