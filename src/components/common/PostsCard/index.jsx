import React, { useMemo, useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getCurrentUser, deletePost } from '../../../api/FirestoreAPI';
import logo1 from './logo1.png'; // Import the image
import { BsPencil, BsTrash } from "react-icons/bs";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa"; // Import icons for Like, Comment, and Share

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  // Get the user object with the matching userID
  const currentUserOBJ = allUsers.find((item) => item.id === posts.userID);

  // Check if the user is found before accessing properties
  const userImageLink = currentUserOBJ ? currentUserOBJ.imageLink : '';

  // Use the imported image
  const imageUrl = userImageLink || logo1;

  return (
    <div className='posts-card' key={id}>
      <div className='post-image-wrapper'>
        {currentUser.userID === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}
        <img className='post-image' src={imageUrl} alt='profile-image' />
        <div>
          <p
            className='name'
            onClick={() =>
              navigate('/profile', {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {posts.userName}
          </p>
          <p className='timestamp'>{posts.timeStamp}</p>
        </div>
      </div>
      <p className='status'>{posts.status}</p>
      {/* <div className='actions'>
        <button className='like-button'>
          <FaRegThumbsUp size={20} />
          <span>Like</span>
        </button>
        <button className='comment-button'>
          <FaRegComment size={20} />
          <span>Comment</span>
        </button>
        <button className='share-button'>
          <FaShare size={20} />
          <span>Share</span>
        </button>
      </div> */}
    </div>
  );
}
