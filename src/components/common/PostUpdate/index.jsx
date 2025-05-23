import React, { useState, useMemo } from 'react';
import './index.scss';
import ModalComponent from '../Modal';
import { postStatus, getStatus, updatePost } from '../../../api/FirestoreAPI';
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import getUniqueId from '../../../helpers/getUniqueId';


export default function PostStatus({ currentUser }) {

    // console.log(currentUser);

    let userEmail = localStorage.getItem('userEmail')
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatus] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPost, setCurrentPost] = useState({});



    const sendStatus = async () => {

        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp('LLL'),
            // userEmail: currentUser.email,
            userEmail: userEmail,
            userName: currentUser.name,
            userID: currentUser.userID,
            postID: getUniqueId(),
        }
        await postStatus(object);
        await setModalOpen(false);
        setIsEdit(false);
        await setStatus("");
    };

    const updateStatus = () => {
        updatePost(currentPost.id, status);
        setModalOpen(false);
    };
    const getEditData = (posts) => {
        setModalOpen(true);
        setStatus(posts?.status);
        setCurrentPost(posts);
        setIsEdit(true);
    };

    useMemo(() => {
        getStatus(setAllStatus);
    }, []);


    return (
        <div className='post-status-main'>
            <div className="post-status">
                <button className="open-post-modal" onClick={() => {
                    setModalOpen(true);
                    setIsEdit(false);
                }}>Start a Post</button>
            </div>

            <ModalComponent status={status} setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} sendStatus={sendStatus} isEdit={isEdit} updateStatus={updateStatus} setCurrentPost={setCurrentPost}
                currentPost={currentPost} />

            <div>
                {allStatuses
                    .slice() // Create a shallow copy of the array to avoid mutating the original
                    .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)) // 28-January-2024 Sort posts by timestamp in descending order
                    .map((posts) => (
                        <div key={posts.id}>
                            <PostsCard posts={posts} getEditData={getEditData} />
                        </div>
                    ))}


            </div>

        </div>

    )
}


