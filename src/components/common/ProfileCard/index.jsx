import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { BiSolidEdit } from 'react-icons/bi';
import { useLocation } from "react-router-dom";
import "./index.scss";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import FileUploadModal from '/src/components/common/FileUploadModal/index.jsx';
import decImg3 from "../../../assets/blockchain.png"



export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);


  const getImage = (event) => {
    // console.log("Hi")
    setCurrentImage(event.target.files[0]);
  }

  const uploadImage = () => {
    uploadImageAPI(currentImage, currentUser.userID, setModalOpen, setProgress, setCurrentImage);
  }

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  // console.log("Current user ID:", currentUser.id);
  // console.log("Location state ID:", location?.state?.id);


  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">

        {currentUser.id === location?.state?.id ? (
          <div className="edit-btn">
            <BiSolidEdit className="edit-icon" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )}

        <div className="profile-info">

          <img
            className="profile-image"
            src={
              Object.values(currentProfile).length === 0
                ? currentUser.imageLink
                : currentProfile?.imageLink
            }
            onClick={() => currentUser.id === location?.state?.id && setModalOpen(true)}
            alt=""
          />

          <div>
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {/* {(currentUser.city || currentUser.country) &&
              (currentProfile?.city || currentProfile?.country) ? ( */}
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country} `
                : `${currentProfile?.city}, ${currentUser.country}`}
            </p>
            {/* ) : (
              <></>
            )} */}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                href={
                  Object.values(currentProfile).length === 0
                    ? (currentUser.website.startsWith("http") ? currentUser.website : "https://" + currentUser.website)
                    : (currentProfile?.website.startsWith("http") ? currentProfile?.website : "https://" + currentProfile?.website)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {Object.values(currentProfile).length === 0
                  ? currentUser.website
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}


          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
            {/* Display past experience */}
            {currentUser.pastExperience && currentUser.pastExperience.length > 0 && (
              <div className="past-exp">
                <b>Past Experience:</b>
                {currentUser.pastExperience.map((exp, index) => (
                  <p key={index}>{exp.title} at {exp.company}. {exp.status}</p>
                ))}
              </div>
            )}

          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}

        {/* Display Vision if available, only for the current user */}
        {currentUser.id === location?.state?.id && (currentUser.vision || currentProfile?.vision) && (
          <p className="vision">
            <span className="vision-label">Vision</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.vision
              : currentProfile?.vision}
          </p>
        )}

        {/* Display Mission if available, only for the current user */}
        {currentUser.id === location?.state?.id && (currentUser.mission || currentProfile?.mission) && (
          <p className="mission">
            <span className="mission-label">Mission</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.mission
              : currentProfile?.mission}
          </p>
        )}

      </div>

      <div className="profile-text-para">
        <div className="profile-text"> <ul>
          <li>D</li>
          <li>e</li>
          <li>c</li>
          <li>e</li>
          <li>n</li>
          <li>t</li>
          <li>r</li>
          <li>a</li>
          <li>l</li>
          <li>i</li>
          <li>z</li>
          <li>e</li>
          <li>d</li>
          <li>-</li>
          <li>V</li>
          <li>e</li>
          <li>r</li>
          <li>i</li>
          <li>f</li>
          <li>i</li>
          <li>c</li>
          <li>a</li>
          <li>t</li>
          <li>i</li>
          <li>o</li>
          <li>n</li>

        </ul>
        </div>
        <img className="profile-image-dec" src={decImg3} alt="Sample Image" />

      </div>




      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>

              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}