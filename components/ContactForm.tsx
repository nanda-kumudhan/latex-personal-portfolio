import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/Contact.module.css';

function ContactForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  if (!formId) {
    return <p>Form ID is not configured. Please set NEXT_PUBLIC_FORMSPREE_FORM_ID.</p>
  }
  const [state, handleSubmit] = useForm(formId);
  if (state.succeeded) {
      return <p>Thanks for your message!</p>;
  }
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
      />
      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className={styles.input}
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className={styles.textarea}
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className={styles.button}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
