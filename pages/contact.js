import React, { useState } from "react";
import css from "../styles/contact.module.css"
import Layout from "../components/Layout";

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`);
  };

  return (
    <Layout>
    <div className={css.contact_us_container} >
      <h2>Contact Us</h2>
      <form className={css.form_data} onSubmit={handleSubmit}>
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className={css.btn} type="submit">Submit</button>
      </form>
    </div>
    </Layout>
  );
};

export default ContactUs;
