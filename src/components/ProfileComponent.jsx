import React, { useState } from "react";
import ProfileCard from "./common/ProfileCard";
// import ProfileEdit from "./common/ProfileEdit";
import ProfileEdit from "./common/ProfileEdit";
// import { getEditData } from "../components/common/PostUpdate/index";



export default function ProfileComponent({ currentUser }) {
    const [isEdit, setisEdit] = useState(false);

    const onEdit = () => {
        setisEdit(!isEdit);
    };
  
    return (
        <div>
            {isEdit ? (
                <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
            ) : (
                <ProfileCard onEdit={onEdit} currentUser={currentUser}   />
                
            )}
            
        </div>
        
    );
}

