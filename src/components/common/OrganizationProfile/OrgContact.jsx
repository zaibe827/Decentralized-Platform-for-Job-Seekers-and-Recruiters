import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../OrganizationProfile/OrgContact.scss';

const OrgContact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_w6lt1an', 'template_wefy275', formRef.current, {
        publicKey: 'c-D2sU99ogKid2nJy',})
      .then(
        (result) => {
          alert('Email sent successfully!');
          console.log('Email sent successfully!', result.text);
          e.target.reset();
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          alert('Failed to send email. Please try again later.');
        },
      );
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="user_name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="user_email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4"></textarea>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OrgContact;
