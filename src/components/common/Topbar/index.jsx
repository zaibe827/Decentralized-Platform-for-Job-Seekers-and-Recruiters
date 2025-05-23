import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import "./index.scss";
import logo from "../../../assets/logoName.png";
import user from "../../../assets/user.png";
import ProfilePopup from "../ProfilePopup";

import { AiOutlineHome} from 'react-icons/ai';
import { RiUserLine } from 'react-icons/ri'; // Changed from RxPerson to RiUserLine
//import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineSearch } from 'react-icons/ai';
 import { BsBriefcase } from 'react-icons/bs';
// import { IoIosNotifications } from "react-icons/io";


export default function Topbar() {
  const [popupVisible, setPopupVisible] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="logo-topbar" src={logo} alt="Logo" onClick={() => goToRoute("/home")} title="Home" />

      <div className='react-icons'>
        <div className={`icon-container ${location.pathname === "/home" ? "active" : ""}`} onClick={() => goToRoute("/home")} title="Home">
          <AiOutlineHome size={30} className='react-icon' />
          <span className="icon-text">Home</span>
        </div>
        <div className={`icon-container ${location.pathname === "/profile" ? "active" : ""}`} onClick={() => goToRoute("/profile")} title="Profile">
          <RiUserLine size={30} className='react-icon' />
          <span className="icon-text">Profile</span>
        </div>
        <div className={`icon-container ${location.pathname === "/OrganizationProfile" ? "active" : ""}`} onClick={() => goToRoute("/OrganizationProfile")} title="Organization Profile">
          <BsBriefcase size={30} className='react-icon' />
          <span className="icon-text">Notification </span>
        </div>
        <div className={`icon-container ${location.pathname === "/search" ? "active" : ""}`} onClick={() => goToRoute("/search")} title="Search">
          <AiOutlineSearch size={30} className='react-icon' />
          <span className="icon-text">Search</span>
        </div>
      </div>
      <img className="user-logo" src={user} alt="user" onClick={displayPopup} />
    </div>
  );
} 
