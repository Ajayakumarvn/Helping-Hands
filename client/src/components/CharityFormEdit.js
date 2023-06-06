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
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

export default function CharityForm() {

  const navigate=useNavigate();

  const { id } = useParams();

  const [charityedit, setCharityedit] = useState([]);
  

  useEffect(() => {
    fetchOldCharity();
  }, []);
  
 
  async function  fetchOldCharity(){
    
    const res = await fetch(`http://localhost:4000/categories/charity/${id}`);
    const { charitydata } = await res.json();
  
    setCharityedit(charitydata);
    
  }
  


const InitialForm ={
  title:charityedit.title,
  body: charityedit.body,
  amount: charityedit.amount

}

const clearForm={
  title:'',
  body: '',
  amount: '',

}




function handleInput(e){
  
  setCharityedit({...InitialForm,[e.target.name]:e.target.value})
}

const handleSubmit = async (event) => {
    event.preventDefault();
   
  const res= await fetch(`http://localhost:4000/categories/charity/${id}`,
  {
      method:"PATCH",
      body:JSON.stringify(InitialForm),
      headers:{
            "content-type":"application/json",
          }
    } 
    
    );
    if(res.ok){
    
     setCharityedit(clearForm);
     navigate('/view');
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
              value={InitialForm.title}
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
              value={InitialForm.body}
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
              value={InitialForm.amount}
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