import { firestore } from '../firebaseConfig';
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { toast } from 'react-toastify';


let postsRef = collection(firestore, 'posts');
let userRef = collection(firestore, 'users');

export const postStatus = (object) => {

  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};



export const getStatus = (setAllStatus) => {

  onSnapshot(postsRef, (response) => {
    setAllStatus(response.docs.map((docs) => {
      return { ...docs.data(), id: docs.id };
    }));
  });
};


export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => { })
    .catch((err) => {
      console.log(err);
    });
};


export const getCurrentUser = (setCurrentUser) => {
  let currentEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (response) => {
    const userData = response.docs
      .map((docs) => ({ ...docs.data(), userID: docs.id }))
      .filter((item) => item.email.toLowerCase() === currentEmail.toLowerCase())[0];
    

    const completeUserData = {
      ...userData, 
      headline: userData.headline || "",
      country: userData.country || "",
      city: userData.city || "",
      company: userData.company || "",
      pastJobTitle: userData.pastExperience?.title || "",
      pastJobCompany: userData.pastExperience?.company || "",
      pastJobStatus: userData.pastExperience?.status || "unverified",

      industry: userData.industry || "",
      college: userData.college || "",
      website: userData.website || "",
      aboutMe: userData.aboutMe || "",
      skills: userData.skills || "",
      vision: userData.vision || "",
      mission: userData.mission || "",
      walletAddress: userData.walletAddress || "",
      imageLink: userData.imageLink || "",

    };
    setCurrentUser(completeUserData);
  });
};


export const editProfile = (userID, payload) => {
  console.log("Editing profile for userID:", userID);
  if (payload.pastExperience) {
    payload.pastExperience.forEach(job => {
      if (!job.status) {
        job.status = 'unverified';
      }
    });
  }
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

const jobsRef = collection(firestore, 'jobs');
export const postJobForCurrentUser = async (jobData, userID) => {
  try {
    if (!userID) {
      console.error("No user ID provided.");
      return;
    }

    const userDoc = await getDoc(doc(collection(firestore, 'users'), userID));
    if (userDoc.exists()) {
      const jobWithUserId = { ...jobData, userID };
      await addDoc(jobsRef, jobWithUserId);
      console.log("Job has been posted successfully");
      toast.success("Job has been posted successfully");
    } else {
      console.error("No user found with the provided user ID.");
    }
  } catch (error) {
    console.error("Error posting job:", error);
  }
};

export const getJobs = async () => {
  try {
    const jobsSnapshot = await getDocs(collection(firestore, 'jobs'));
    const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const updatePost = (id, status) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status });
    toast.success("Post has been updated!");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};

const notificationsRef = collection(firestore, 'notifications');

export const addNotification = async (companyID,companyName, jobTitle, claimantID, userName, imageLink) => {
  try {
    // Check if the notification already exists
    const existingQuery = query(notificationsRef,
      where("companyID", "==", companyID),
      where("companyName", "==", companyName),
      where("jobTitle", "==", jobTitle),
      where("claimantID", "==", claimantID),
      where("userName", "==", userName),     
    );
    
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      console.log("Notification already exists");
      return;
    }

    const notificationData = { companyID,companyName, jobTitle, claimantID, userName };
    if (imageLink !== undefined && imageLink !== null) {
      notificationData.imageLink = imageLink;
    } else {
      notificationData.imageLink = '';
    }

    await addDoc(notificationsRef, notificationData);
    console.log("Notification added successfully");
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};
export const fetchNotificationsByCompanyID = async (userID) => {
  try {
    const q = query(collection(firestore, 'notifications'), where("companyID", "==", userID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const notificationsData = querySnapshot.docs.map(doc => doc.data());
      return notificationsData;
    } else {
      return []; 
    }
  } catch (error) {
    console.error("Error fetching notifications by company ID:", error);
    throw error; 
  }
};

export const deleteNotification = async (userId, jobTitle, companyName) => {
  try {
    const querySnapshot = await getDocs(query(notificationsRef,
      where("claimantID", "==", userId),
      where("jobTitle", "==", jobTitle),
      where("companyName", "==", companyName)
    ));

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(notificationsRef, docId));
      console.log("Notification deleted successfully");
    } else {
      console.error("Notification not found");
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

export const getJobsByCompanyAndTitle = async (claimantID, companyID, jobTitle) => {
  try {
    const q = query(collection(firestore, 'jobs'),
      where("claimantID", "==", claimantID),
      where("companyID", "==", companyID),
      where("jobTitle", "==", jobTitle)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.log("No job found for company and title:", companyID, jobTitle);
      return null;
    }
  } catch (error) {
    console.error("Error getting job by company and title:", error);
    return null;
  }
};
export const getUserByCompany = async (company) => {
  try {
    const q = query(userRef, where("name", "==", company));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.log("No user found for company:", company);
      return null;
    }
  } catch (error) {
    console.error("Error getting user by company:", error);
    return null;
  }
};


export const updateJobStatusToVerified = async (userId, jobTitle, companyName, updatedStatus) => {
  try {
    const userDocRef = doc(userRef, userId);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      if (userData && userData.pastExperience) {
        const updatedPastExperience = userData.pastExperience.map(job => {
          if (job.title === jobTitle && job.company === companyName) {

            return { ...job, status: updatedStatus };
          }
          return job;
        });
        await updateDoc(userDocRef, { pastExperience: updatedPastExperience });
        console.log("Job status updated successfully");
      } else {
        console.error("User data or pastExperience array not found.");
      }
    } else {
      console.error("User document not found.");
    }
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error;
  }
};
// export const totalNotifications = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(firestore, 'notifications'));
//     return querySnapshot.size;
//   } catch (error) {
//     console.error("Error fetching total notifications:", error);
//     throw error;
//   }
// };