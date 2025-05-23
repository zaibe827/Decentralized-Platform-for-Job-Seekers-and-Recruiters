// Routes.jsx
import { createBrowserRouter, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Layouts/HomeLayout";
import ProfileLayout from "../Layouts/ProfileLayout";
import Search from "antd/es/transfer/search";
import SearchLayout from "../Layouts/SearchLayout";
import OrgaizationProfile from "../Layouts/OrganizationProfile";
import HomePage from "../components/common/OrganizationProfile/HomePage";
import OrgContact from "../components/common/OrganizationProfile/OrgContact";
import JobPage from "../components/common/OrganizationProfile/JobPage";
import OrgNotifications from "../components/common/OrganizationProfile/OrgNotifications";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/search",
    element: <SearchLayout />,
  },
  
 {
  path: "/OrganizationProfile/*",
  element: <OrgaizationProfile />,
  children: [
    // {
    //   path: "", // Updated path to match "/OrganizationProfile"
    //   element: <HomePage />,
    // },
    // {
    //   path: "HomePage",
    //   element: <HomePage />,
    // },
    {
      path: "", // Updated path to match "/OrganizationProfile"
      element: <JobPage />,
    },
    {
      path: "JobPage",
      element: <JobPage />,
    },
    {
      path: "OrgContact",
      element: <OrgContact />,
    },
    {
      path: "OrgNotifications",
      element: <OrgNotifications />,
    }
  ],
},
]);
