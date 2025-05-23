import React, { useState, useEffect } from "react";
import "../OrganizationProfile/OrgNotifications.scss";
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import logo1 from './logo1.png';
import { getCurrentUser, fetchNotificationsByCompanyID, updateJobStatusToVerified, deleteNotification } from "../../../api/FirestoreAPI"; // Import getCurrentUser function
import { ethers } from 'ethers';

function OrgNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');

  const contractAddress = '0x4352CDc4c6ACc45105A068B389Dc874c04b77e66';
  const contractABI = [
    'function signApproval(bool _response) external',
    'function getResponse() external view returns (bool)'
  ];

  useEffect(() => {
    // Fetch the current user and retrieve the userID
    getCurrentUser(currentUser => {
      if (currentUser) {
        const currentUserID = currentUser.userID;
        if (currentUserID) {
          // Fetch notifications for the current user (companyID)
          fetchNotificationsByCompanyID(currentUserID)
            .then((notificationsData) => {
              setNotifications(notificationsData);
            })
            .catch((error) => {
              console.error("Error fetching notifications:", error);
            });
        }
      }
    });

    // Check if Metamask is installed
    if (window.ethereum) {
      setMetamaskInstalled(true);
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const currentResponse = await contract.getResponse();
      setResponse(currentResponse);

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        setWalletConnected(true);
      } else {
        setWalletAddress('');
        setWalletConnected(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please check console for details.');
    }
  };
  const handleSignApproval = async (approve) => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        setLoading(true);
        setTransactionStatus('Pending...');

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.signApproval(approve);
        await tx.wait();
        setResponse(approve);
        setTransactionStatus('Transaction Done');

        // Return true if approve is true, otherwise return false
        return approve === true;
      } else {
        console.error('MetaMask extension not detected');
        setError('MetaMask extension not detected');
        setLoading(false);
        return false; // Return false if MetaMask extension is not detected
      }
    } catch (error) {
      console.error('Error signing approval:', error);
      setError('Error signing approval. Please check console for details.');
      setLoading(false);
      return false; // Return false if there's an error signing the approval
    }
  };
  const connectMetamask = async () => {
    if (!metamaskInstalled) {
      alert('Please install Metamask first');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        setWalletConnected(true);
      } else {
        setWalletAddress('');
        setWalletConnected(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to Metamask');
    }
  };
  // Function to handle when CheckCircle is clicked
  const handleCheckCircleClick = async (userId, jobTitle, companyName) => {
    console.log("UserId of the sender:", userId);
    console.log("Job Title:", jobTitle);
    console.log("Company Name:", companyName);

    try {
      await handleSignApproval(true); // Approve action
      await updateJobStatusToVerified(userId, jobTitle, companyName, "Verified");
      await deleteNotification(userId, jobTitle, companyName);
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };
  const handleCancelClick = async (userId, jobTitle, companyName) => {
    console.log("UserId of the sender:", userId);
    console.log("Job Title:", jobTitle);
    console.log("Company Name:", companyName);

    try {
      await handleSignApproval(true); // Approve action
      await updateJobStatusToVerified(userId, jobTitle, companyName, "Rejected");
      await deleteNotification(userId, jobTitle, companyName);
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  return (
    <div className="notifications">
      {/* <div className="metamask-message">
        <p>Please Connect Your MetaMask Account in Order to Receive Notifications!</p>
      </div> */}
      {metamaskInstalled ? (
        <div>
          {!walletConnected && <button className="connect-btn-notification" onClick={connectMetamask}>Connect Metamask</button>}
          {walletConnected && (
            <div>
              {notifications && notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div className="notification" key={index}>
                    <div className="notif">
                      <img className='profile-img' src={notification.imageLink ? notification.imageLink : logo1} alt='profile-image' />
                      <div className="content">
                        <p className="message">
                          {notification.userName} asked for verification for "{notification.jobTitle} job."
                        </p>
                      </div>
                    </div>
                    <div className="buttons">
                      <CheckCircle onClick={() => handleCheckCircleClick(notification.claimantID, notification.jobTitle, notification.companyName)} />
                    </div>
                    <div className="buttons">
                      <Cancel onClick={() => handleCancelClick(notification.claimantID, notification.jobTitle, notification.companyName)} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No notifications</p>
              )}
              {loading && <p>{transactionStatus}</p>}
            </div>
          )}
        </div>
      ) : (
        <p>Please install Metamask first</p>
      )}
    </div>
  );
}

export default OrgNotifications;
