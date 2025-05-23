import React from 'react';
import "./index.scss";
export default function Footer() {
    return ( 
        <div className="footer">
            Copyright ©2023 DecentralHire - All Rights Reserved.
            <div className="a">
                <a className="a" href="" rel="get" name="ftrSupport">Contact Us</a> |
                <a className="a" href="" rel="get" name="ftrFaq"> FAQ</a> |
                <a className="a" href="" rel="get" name="ftrPrivacyPolicy"> Privacy Policy</a> |
                <a className="a" href="" rel="get" name="ftrPrivacyPolicy"> Terms and Conditions</a> |
                <a className="a" href="" rel="get" name="ftrAboutUs"> About Us</a>
            </div>
        </div>
    );
}