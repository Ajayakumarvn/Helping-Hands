import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const InitialForm = {
    name: "",
    email: "",
    age: "",
    password: "",
    role: "",
  };

  const [form, setForm] = useState(InitialForm);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:4000/users/signup", {
      method: "POST",
      body: JSON.stringify(form),

      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 200) {
      setForm({
        name: "",
        email: "",
        password: "",
        age: "",
        role: "",
      });
      // Show notification
      toast.success("Registration SuccessFull", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
    const data = await res.json();
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("name", data.name);
    navigate("/home");
    console.log(data);
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    value={form.name}
                    onChange={handleInput}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    type="number"
                    label="Age"
                    name="age"
                    value={form.age}
                    onChange={handleInput}
                    autoComplete="age"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={handleInput}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.role}
                        label="Role"
                        name="role"
                        onChange={handleInput}
                      >
                        <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                        <MenuItem value={"Organiser"}>Organiser</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Register
              </Button>
              <Link to="/donatenow">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={() => {
                    sessionStorage.setItem("name", "Sponsor");
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Donate
                </Button>
              </Link>
              <Link to="/signin">
                <p>Already Have An Account ? Sign In</p>
              </Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Register;
