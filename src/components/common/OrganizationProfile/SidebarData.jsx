import React from "react";
// import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const SidebarData = [
    // {
    //     title: "Home",
    //     icon: <HomeIcon/>,
    //     link: "/OrganizationProfile/HomePage"
    // },
    {
        title: "Job",
        icon: <WorkIcon/>,
        link: "/OrganizationProfile/JobPage" 
    },
    {
        title: "Contact Us",
        icon: <EmailIcon/>,
        link: "/OrganizationProfile/OrgContact"
        
    },
    {
        title: "Notifications",
        icon: <NotificationsIcon/>,
        link: "/OrganizationProfile/OrgNotifications"
    }
      
]

