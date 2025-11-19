import React from 'react';
import styles from '../styles/Contact.module.css';

function ContactForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("This form is not yet connected. Please connect it to a backend service.");
  };

  return (
      <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="name">
        Full Name
      </label>
      <input
        id="name"
        type="text" 
        name="name"
        className={styles.input}
        required
      />
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className={styles.input}
        required
      />
      <label htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className={styles.textarea}
        required
      />
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
