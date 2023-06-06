import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const theme = createTheme();

export default function CharityForm() {

     
  const InitialForm ={
    title:'',
    body:'',
    amount:'',
    category:'Charity',
    status:'Active',
    createdBy:sessionStorage.getItem("username"),
    uid:sessionStorage.getItem("uid")
  }
  
  const [form,setForm]= useState(InitialForm);
  
  function handleInput(e){
    
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res=await fetch("http://localhost:4000/categories",{
        method:"POST",
        body:JSON.stringify(form),
       
        headers:{
          "content-type":"application/json",
        }
       },
      );
       if(res.ok)
       {
        setForm(InitialForm);
       }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
           Charity Info
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={handleInput}
              value={form.title}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="body"
              label="Body"
              name="body"
              autoComplete="title"
              autoFocus
              multiline
              minRows={4}
              onChange={handleInput}
              value={form.body}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Fund to be Raised"
              name="amount"
              autoComplete="title"
              autoFocus
              onChange={handleInput}
              value={form.amount}
            />
          
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
     
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}