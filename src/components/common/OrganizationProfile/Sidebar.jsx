import React,{useState,useMemo} from "react";
import "../OrganizationProfile/Sidebar.scss";
import { SidebarData } from "../OrganizationProfile/SidebarData";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreAPI";

function Sidebar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
}, []);

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className="Sidebar">
      <div className="ComName">
        <h1 id="Name">{currentUser?.name}</h1>
        {/* <h1 id="Name">Air University</h1> */}
      </div>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => (
          <li
            key={key}
            className="row"
            onClick={() => handleNavigation(val.link)}
          >
            <div id="icon">{val.icon}</div>
            <div id="title">{val.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
