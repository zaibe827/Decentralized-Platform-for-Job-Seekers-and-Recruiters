import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ApprovalAndMetamaskIntegration = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [response, setResponse] = useState(false);
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

  return (
    <div>
      <h1>Metamask Integration</h1>
      {metamaskInstalled ? (
        <div>
          {!walletConnected && <button onClick={connectMetamask}>Connect Metamask</button>}
          {walletConnected && (
            <div>
              <p>Current Response: {response ? 'Approved' : 'Not Approved'}</p>
              <button onClick={() => handleSignApproval(true)} disabled={loading}>Approve</button>
              <button onClick={() => handleSignApproval(false)} disabled={loading}>Reject</button>
              {loading && <p>{transactionStatus}</p>}
            </div>
          )}
        </div>
      ) : (
        <p>Please install Metamask first</p>
      )}
      {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
export default ApprovalAndMetamaskIntegration;
