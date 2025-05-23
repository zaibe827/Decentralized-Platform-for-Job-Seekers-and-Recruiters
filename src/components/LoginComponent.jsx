import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import '../Sass/LoginComponent.scss';
import logo from "../assets/logoName.png";

import Lottie from 'lottie-react';
import animationData from "../assets/animation.json";

import GoogleButton from 'react-google-button';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import {
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from '../firebaseConfig';

export const ForgotPassword = (email) => {
  sendPasswordResetEmail(auth, email).then(() => {
    alert("A Password Reset Link has been sent to your email");
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);
  })
}

const LoginComponent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    let formIsValid = true;
    let errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email || !emailRegex.test(credentials.email)) {
      formIsValid = false;
      errors["email"] = "Please enter a valid email address.";
    }

    // Password validation
    if (!credentials.password || credentials.password.length < 6) {
      formIsValid = false;
      errors["password"] = "Password must be at least 6 characters long.";
    } else if (credentials.password.length > 20) {
      formIsValid = false;
      errors["password"] = "Password must not exceed 20 characters.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const login = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to DecentralHire!");
      console.log(res);
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate("/home");
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  const handleForgotPassword = () => {
    ForgotPassword(credentials.email);
  }

  return (
    <div className="background">
      <div className="login-wrapper">
        <div className='logo-div'>
          <img src={logo} className="logo" alt="logo" />
        </div>

        <div className='pageImage'>
          <Lottie animationData={animationData} />
        </div>

        <div className="login-form">
          <div className="login-wrapper-inner">
            <h1 className="heading">Sign in</h1>

            <div className="auth-inputs">
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, email: event.target.value })
                }
                onKeyPress={handleKeyPress}
                type="email"
                className="common-input"
                placeholder="Email"
                maxLength={30}  // Set a reasonable max length for email
              />
              <span className="error">{errors.email}</span>

              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, password: event.target.value })
                }
                onKeyPress={handleKeyPress}
                type="password"
                className="common-input"
                placeholder="Password"
                maxLength={20}  // Set a reasonable max length for password
              />
              <span className="error">{errors.password}</span>

              <label id='forgot-password-label' onClick={handleForgotPassword}>Forgot Password?</label>
            </div>

            <button onClick={login} className="login-btn">
              Sign in
            </button>
            <hr className="hr-text" data-content="or" />
          </div>

          <div className="google-btn-container">
            <GoogleButton className='google-btn' onClick={googleSignIn} />
            <p className="go-to-signup">
              Don't have an account?{" "}
              <span className="join-now" onClick={() => navigate("/register")}>
                Join now
              </span>
            </p>
          </div>
        </div >
      </div>
    </div>
  )
}

export default LoginComponent;
