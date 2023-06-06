import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import {Row,Card} from 'react-bootstrap'
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from 'react-router-dom';




function TabPanel(props) {
  const { children, value, index, ...other } = props;


  


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function NestedTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const uid = sessionStorage.getItem("uid");
  const username = sessionStorage.getItem("username");
  
  const navigate = useNavigate();
  
  const [myDisasters, setMyDisasters] = useState([]);
  const [myFunctions, setMyFunctions] = useState([]);
  const [myCharities, setMyCharities] = useState([]);
  
  useEffect(() => {
   
    fetchMyDisasters();
    fetchMyFunctions();
    fetchMyCharities();
    }, []);
  
  async function fetchMyDisasters() {
      const res = await fetch(
        `http://localhost:4000/categories/mycategories/dis/${uid}`
      );
      const { mydis } = await res.json();
      setMyDisasters(mydis);
      console.log(mydis);
    }

    async function fetchMyFunctions() {
        const res = await fetch(
          `http://localhost:4000/categories/mycategories/fun/${uid}`
        );
        const { myfun } = await res.json();
        setMyFunctions(myfun);
        console.log(myfun);
      }

      async function fetchMyCharities() {
        const res = await fetch(
          `http://localhost:4000/categories/mycategories/cha/${uid}`
        );
        const { mycha } = await res.json();
        setMyCharities(mycha);
        console.log(mycha);
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
        fetchMyDisasters();
        fetchMyFunctions();
        fetchMyCharities();
        window.location.reload(false);
        window.alert("Deleted Successfully");
      }
    }

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="outer tabs">
        <Tab label="Disaster" id="outer-tab-1" aria-controls="tabpanel-1" />
        <Tab label="Social/Function" id="outer-tab-2" aria-controls="tabpanel-2" />
        <Tab label="Charity" id="outer-tab-3" aria-controls="tabpanel-3" />
      </Tabs>
      <TabPanel value={value} index={0}>
       
      <Row>
                {myDisasters.map((mydis) => (
                  <div className="col-md-3" key={mydis._id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src="holder.js/100px180?text=Image cap"
                      />
                      <Card.Body>
                        <Card.Title>{mydis.title}</Card.Title>
                        <Card.Text>{mydis.body}</Card.Text>
                        <p>
                          <b>Venue:</b>
                          {mydis.venue}
                        </p>

                        <div
                          className="ms-auto"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit
                            className="text-primary mx-2"
                            onClick={() => edit(mydis._id, mydis.category)}
                          />

                          <IoMdTrash
                            className="text-danger mx-2"
                            onClick={() => remove(mydis._id)}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>    

       
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Row>
                {myFunctions.map((myfun) => (
                  <div className="col-md-3" key={myfun._id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src="holder.js/100px180?text=Image cap"
                      />
                      <Card.Body>
                        <Card.Title>{myfun.title}</Card.Title>
                        <Card.Text>{myfun.body}</Card.Text>
                        <p>
                          <b>Venue:</b>
                          {myfun.venue}
                        </p>
                        <p>
                          <b>Date:</b>
                          {myfun.date}
                        </p>
                        <p>
                          <b>Time:</b>
                          {myfun.time}
                        </p>

                        <div
                          className="ms-auto"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit
                            className="text-primary mx-2"
                            onClick={() => edit(myfun._id, myfun.category)}
                          />

                          <IoMdTrash
                            className="text-danger mx-2"
                            onClick={() => remove(myfun._id)}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>

        
       </TabPanel>
       <TabPanel value={value} index={2}>
       
        
       <Row>
                {myCharities.map((mycha) => (
                  <div className="col-md-3" key={mycha._id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src="holder.js/100px180?text=Image cap"
                      />
                      <Card.Body>
                        <Card.Title>{mycha.title}</Card.Title>
                        <Card.Text>{mycha.body}</Card.Text>
                        <p>
                          <b>Status:</b>
                          {mycha.status}
                        </p>
                        <p>
                          <b>Amount:</b>
                          {mycha.amount}
                        </p>

                        <div
                          className="ms-auto"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit
                            className="text-primary mx-2"
                            onClick={() => edit(mycha._id, mycha.category)}
                          />

                          <IoMdTrash
                            className="text-danger mx-2"
                            onClick={() => remove(mycha._id)}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
       </TabPanel>
       
    </div>
  );
}

export default NestedTabs;
