import React from "react";
import "../components/common/OrganizationProfile/Sidebar.scss";
import Sidebar from "../components/common/OrganizationProfile/Sidebar";
import Topbar from "../components/common/Topbar";
import { Outlet, Route } from "react-router-dom";

function App() {
  return (
    
      <div className="App">
      
        <Topbar/>
        <Sidebar />
        <Outlet />
      </div>

  );
}

export default App;

