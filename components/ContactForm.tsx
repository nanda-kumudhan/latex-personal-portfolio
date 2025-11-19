import React, { useState, useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Button, TextField, Spinner, Text, Callout } from '@radix-ui/themes';
import emailjs from '@emailjs/browser';
import styles from '../styles/contactForm.module.css';

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Validation helpers
  const isEmailValid = (email: string) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
  const isNameValid = (name: string) => name.trim().length >= 2;
  const isMessageValid = (msg: string) => msg.trim().length >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

        // Fire confetti if available
        try {
          const confetti = require('canvas-confetti');
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        } catch (_e) {
          // silent fallback
        }

        // Clear message after 4 seconds
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (error) {
      console.error('❌ [FORM] Failed to send email:', error);
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root asChild>
      <form onSubmit={handleSubmit} className={styles.form}>
        {message && (
          <Callout.Root color={message.type === 'success' ? 'green' : 'red'} className={styles.alert}>
            <Callout.Text>{message.text}</Callout.Text>
          </Callout.Root>
        )}

        <Form.Field name="name">
          <Box className={styles.fieldGroup}>
            <Form.Label className={styles.label}>Full Name</Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className={styles.input}
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Your name"
              />
            </Form.Control>
            {formData.name !== '' && !isNameValid(formData.name) && (
              <Form.Message className={styles.errorMessage}>Name too short</Form.Message>
            )}
          </Box>
        </Form.Field>

        <Form.Field name="email">
          <Box className={styles.fieldGroup}>
            <Form.Label className={styles.label}>Email Address</Form.Label>
            <Form.Control asChild>
              <input
                type="email"
                className={styles.input}
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="your.email@example.com"
              />
            </Form.Control>
            {formData.email !== '' && !isEmailValid(formData.email) && (
              <Form.Message className={styles.errorMessage}>Invalid email</Form.Message>
            )}
          </Box>
        </Form.Field>

        <Form.Field name="message">
          <Box className={styles.fieldGroup}>
            <Form.Label className={styles.label}>Message</Form.Label>
            <Form.Control asChild>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                required
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                placeholder="Your message here..."
                rows={6}
              />
            </Form.Control>
            {formData.message !== '' && !isMessageValid(formData.message) && (
              <Form.Message className={styles.errorMessage}>Minimum 10 characters</Form.Message>
            )}
          </Box>
        </Form.Field>

        <Button
          type="submit"
          disabled={loading}
          className={styles.submitBtn}
          size="3"
        >
          {loading ? (
            <>
              <Spinner size="2" />
              <span>Sending...</span>
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form.Root>
  );
}

export default ContactForm;

