import React, { useState } from "react";
import "../OrganizationProfile/HomePage.scss";
import { AiOutlineEdit } from 'react-icons/ai';

function Homepage() {
  const [editMode, setEditMode] = useState(false);
  const [vision, setVision] = useState("Air University aspires to be among the leading national universities, excelling in teaching, learning, research, innovation and public service.");
  const [mission, setMission] = useState("The mission of Air University is to achieve excellence in teaching and research for producing graduates with sound professional knowledge.");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleVisionChange = (event) => {
    setVision(event.target.value);
  };

  const handleMissionChange = (event) => {
    setMission(event.target.value);
  };

  const saveChanges = () => {
    // Here you can save the changes to the backend or perform any other action
    toggleEditMode();
  };

  return (
    <div className="HomePage">
      <div className="photos">
        <img
          id="pic-organ"
          src="/src/assets/img.png"
          alt="orgainzation pic"
        />
      </div> 
      <div className="information">
        {editMode ? (
          <>
            <label>Vision</label>
            <textarea
              value={vision}
              onChange={handleVisionChange}
              rows={5}
            />
            <label>Mission</label>
            <textarea
              value={mission}
              onChange={handleMissionChange}
              rows={5}
            />
            <button onClick={saveChanges}>Save</button>
          </>
        ) : (
          <>
            <h1 id="Main-Text">Vision</h1>
            <p id="secondry-text">{vision}</p>
            <h1 id="Main-Text">Mission</h1>
            <p id="secondry-text">{mission}</p>
          </>
        )}
      </div>
      {!editMode && (
        <button className="edit-mode-btn" onClick={toggleEditMode}>
          Edit
        </button>
      )}
    </div>
  );
}

export default Homepage;
