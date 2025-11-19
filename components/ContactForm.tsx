import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Alert, CircularProgress, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import emailjs from '@emailjs/browser';

// Initialize EmailJS (replace with your public key)
// Get your keys from: https://dashboard.emailjs.com/
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

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

interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);

  // Simple validation helpers
  const isEmailValid = (email: string) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
  const isNameValid = (name: string) => name.trim().length >= 2;
  const isMessageValid = (msg: string) => msg.trim().length >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Client-side validation
    if (!isNameValid(formData.name) || !isEmailValid(formData.email) || !isMessageValid(formData.message)) {
      setMessage({ type: 'error', text: 'Please fill all fields correctly (message ≥ 10 chars).' });
      return;
    }
    
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('❌ [FORM] EmailJS credentials not configured');
      setMessage({ type: 'error', text: 'Email service not configured. Please try again later.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    console.log('📧 [FORM] Sending contact form...');

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: formData.email,
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        console.log('✅ [FORM] Email sent successfully');
        setMessage({ type: 'success', text: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
        setSnackOpen(true);
        // Fire confetti if available
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const confetti = require('canvas-confetti');
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        } catch (_e) {
          // silent fallback
        }
      }
    } catch (error) {
      console.error('❌ [FORM] Failed to send email:', error);
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      sx={{ width: '100%' }}
    >
      {message && (
        <Alert severity={message.type} sx={{ background: message.type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)' }}>
          {message.text}
        </Alert>
      )}
      <StyledTextField
        id="name"
        type="text"
        name="name"
        label="Full Name"
        variant="outlined"
        fullWidth
        required
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        error={formData.name !== '' && !isNameValid(formData.name)}
        helperText={formData.name !== '' && !isNameValid(formData.name) ? 'Name too short' : ' '}
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
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
        error={formData.email !== '' && !isEmailValid(formData.email)}
        helperText={formData.email !== '' && !isEmailValid(formData.email) ? 'Invalid email' : ' '}
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
        value={formData.message}
        onChange={handleChange}
        disabled={loading}
        error={formData.message !== '' && !isMessageValid(formData.message)}
        helperText={formData.message !== '' && !isMessageValid(formData.message) ? 'Minimum 10 characters' : ' '}
        InputLabelProps={{
          sx: { color: '#ccc' },
        }}
      />
      <StyledButton type="submit" variant="contained" disabled={loading}>
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
      </StyledButton>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        message="Message sent!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Stack>
  );
}

export default ContactForm;
