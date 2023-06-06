import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import NavBar from "../components/NavBar";

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  async function fetchVolunteers() {
    const res = await fetch("http://localhost:4000/users/viewvolunteers", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    setVolunteers(data.volunteers);
  }

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:4000/users/delete/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      fetchVolunteers();
      window.alert("Deleted Successfully");
    }
  }

  return (
    <>
      <NavBar />
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteers.map((vol) => (
                <TableRow
                  key={vol._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {vol.name}
                  </TableCell>
                  <TableCell align="center">{vol.email}</TableCell>
                  <TableCell align="center">{vol.age}</TableCell>
                  <TableCell align="center">
                    <AiFillDelete onClick={() => remove(vol._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
