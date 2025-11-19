import React from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    background: 'rgba(255, 255, 255, 0.1)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0070f3',
    },
  },
  '& .MuiOutlinedInput-input::placeholder': {
    color: '#ccc',
    opacity: 1,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: '#0070f3',
  color: 'white',
  padding: '0.8rem 1.5rem',
  fontSize: '1.1rem',
  textTransform: 'none',
  '&:hover': {
    background: '#005bb5',
  },
  '&:disabled': {
    background: '#555',
  },
}));

function ContactForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("This form is not yet connected. Please connect it to a backend service.");
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      sx={{ width: '100%' }}
    >
      <StyledTextField
        id="name"
        type="text"
        name="name"
        label="Full Name"
        variant="outlined"
        fullWidth
        required
        InputLabelProps={{
          sx: { color: '#ccc' },
        }}
      />
      <StyledTextField
        id="email"
        type="email"
        name="email"
        label="Email Address"
        variant="outlined"
        fullWidth
        required
        InputLabelProps={{
          sx: { color: '#ccc' },
        }}
      />
      <StyledTextField
        id="message"
        name="message"
        label="Message"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        required
        InputLabelProps={{
          sx: { color: '#ccc' },
        }}
      />
      <StyledButton type="submit" variant="contained">
        Submit
      </StyledButton>
    </Stack>
  );
}

export default ContactForm;
