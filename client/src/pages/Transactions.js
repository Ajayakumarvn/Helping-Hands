import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BannerPoster from "../components/BannerPoster";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";

export default function Transactions() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transactions/view", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });
    const data = await res.json();

    setDonations(data.allTransactions);
  }

  return (
    <Fragment>
      <NavBar />
      <BannerPoster cap="Transactions" />
      <Container>
        <TableContainer
          component={Paper}
          style={{ marginTop: "30px", marginBottom: "50px" }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            style={{ border: "1px solid #333" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Transaction ID</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>Card Holder</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((don) => (
                <TableRow
                  key={don._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{don._id}</TableCell>
                  <TableCell>{don.c_event}</TableCell>
                  <TableCell component="th" scope="row">
                    {don.accountHolderName}
                  </TableCell>
                  <TableCell align="center">{don.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
}
