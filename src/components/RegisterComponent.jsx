import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import '../Sass/LoginComponent.scss';
import React, { useState, useEffect } from "react";
import logo from "../assets/logoName.png";
import GoogleButton from 'react-google-button';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { postUserData } from '../api/FirestoreAPI';
import getUniqueId from '../helpers/getUniqueId';
import Footer from '../components/common/Footer';
import Lottie from 'lottie-react';
import animationData from "../assets/animation.json";
import { auth } from '../firebaseConfig';
import { sendEmailVerification } from "firebase/auth";

export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [errors, setErrors] = useState({});
    const [walletAddress, setWalletAddress] = useState('');
    const [metamaskInstalled, setMetamaskInstalled] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            setMetamaskInstalled(true);
        }
    }, []);

    const connectMetamask = async () => {
        if (!metamaskInstalled) {
            alert('Please install Metamask first');
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                const address = accounts[0];
                setWalletAddress(address);
                setCredentials({ ...credentials, walletAddress: address });
                toast.success("Wallet has been added successfully");
                console.log("Wallet Address:", address);
            } else {
                alert('No Ethereum accounts found');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to Metamask');
        }
    };

    const validateInput = () => {
        let formIsValid = true;
        let errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!credentials.email || !emailRegex.test(credentials.email)) {
            formIsValid = false;
            errors["email"] = "Please enter a valid email address.";
        } else if (credentials.email.length > 50) {
            formIsValid = false;
            errors["email"] = "Email must not exceed 50 characters.";
        }

        if (!credentials.password || credentials.password.length < 6) {
            formIsValid = false;
            errors["password"] = "Password must be at least 6 characters long.";
        } else if (credentials.password.length > 20) {
            formIsValid = false;
            errors["password"] = "Password must not exceed 20 characters.";
        }

        if (!credentials.name || credentials.name.trim().length < 3) {
            formIsValid = false;
            errors["name"] = "Name must be at least 3 characters long.";
        } else if (credentials.name.trim().length > 50) {
            formIsValid = false;
            errors["name"] = "Name must not exceed 50 characters.";
        }

        setErrors(errors);
        return formIsValid;
    };

    const register = async () => {
        if (!validateInput()) {
            return;
        }

        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            console.log(res);
            toast.success("Account Created");
            postUserData({ userID: getUniqueId(), name: credentials.name, email: credentials.email, walletAddress: walletAddress });
            localStorage.setItem("userEmail", res.user.email);

            // Send verification email
            await sendEmailVerification(res.user);
            toast.success("Verification email sent. Please check your inbox.");

            navigate("/home");
        } catch (err) {
            console.log(err);
            toast.error("Cannot Create Your Account");
        }
    };

    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        navigate("/home");
    }

    return (
        <div className="background">
            <div className="login-wrapper">
                <div className='logo-div'>
                    <img src={logo} className="logo" />
                </div>

                <div className='pageImage'>
                    <Lottie animationData={animationData} />
                </div>

                <div className='login-form'>
                    <div className="login-wrapper-inner">
                        <h1 className="heading">Sign up</h1>

                        <div className="auth-inputs">
                            <input
                                onChange={(event) =>
                                    setCredentials({ ...credentials, name: event.target.value })
                                }
                                type="text"
                                className="common-input"
                                placeholder="Your Name Here"
                                maxLength={50}  // Set a reasonable max length for name
                            />
                            <span className="error">{errors.name}</span>

                            <input
                                onChange={(event) =>
                                    setCredentials({ ...credentials, email: event.target.value })
                                }
                                type="email"
                                className="common-input"
                                placeholder="Email"
                                maxLength={30}   // Set a reasonable max length for email
                            />
                            <span className="error">{errors.email}</span>

                            <input
                                onChange={(event) =>
                                    setCredentials({ ...credentials, password: event.target.value })
                                }
                                type="password"
                                className="common-input"
                                placeholder="Password (6 or more characters)"
                                maxLength={20}  // Set a reasonable max length for password
                            />
                            <span className="error">{errors.password}</span>
                        </div>

                        <div className="metamask-container">
                            {metamaskInstalled ? (
                                <button className="connect-metmask-button" onClick={connectMetamask}>Connect Metamask</button>
                            ) : (
                                <p className="alert">Please install Metamask first</p>
                            )}
                        </div>

                        <button onClick={register} className="login-btn">
                            Join Now
                        </button>
                        {/* <hr className="hr-text" data-content="or" /> */}
                    </div>

                    <div className="google-btn-container">
                        {/* <GoogleButton className='google-btn' onClick={googleSignIn} /> */}
                        <p className="go-to-signup">
                            Already on DecentralHire?{" "}
                            <span className="join-now" onClick={() => navigate("/")}>
                                Sign in
                            </span>
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
