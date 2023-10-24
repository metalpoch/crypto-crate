import { ethers, formatEther } from "ethers";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const [balance, setBalance] = useState("0");
  const [hasProvider, setHasProvider] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    checkBalance();
  }, [hasProvider]);

  async function connectToMetaMask() {
    console.log(window.ethereum);
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask accounts
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const address = await setHasProvider(true);
        // Use the provider for further interactions
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not found");
    }
  }

  async function checkBalance() {
    if (hasProvider) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const address = await provider.getSigner().getAddress();
        const balance = await provider.getBalance(address);
        const formattedBalance = formatEther(balance);
        setBalance(formattedBalance);
      } catch (error) {
        console.error("Error checking balance:", error);
      }
    }
  }

  return (
    <>
      <button
        className="px-8 py-3 rounded-full bg-blue-700"
        onClick={connectToMetaMask}
      >
        Connect wallet
      </button>
    </>
  );
};

export default ConnectWallet;
