import { useStore } from "@nanostores/react";
import { currentAccount } from "../store/wallet";

export default function Footer() {
  const $currentAccount = useStore(currentAccount);
  const { ethereum } = window;

  const checkWalletIsConnected = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    accounts.length > 0 && currentAccount.set(accounts[0]);
  };

  checkWalletIsConnected();

  const handleConnect = async () => {
    if (!ethereum) {
      alert("Error al iniciar metamask");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      currentAccount.set(accounts[0]);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <footer>
      <div className="flex flex-col items-center">
        <h3 className="mb-10 font-bold text-2xl">
          Start now by connecting with us
        </h3>
        {$currentAccount ? (
          <button
            onClick={() => handleConnect()}
            className="mb-48 px-8 py-3 rounded-full bg-purple-700 hover:bg-purple-800"
          >
            Mint Crate
          </button>
        ) : (
          <button
            onClick={() => handleConnect()}
            className="mb-48 px-8 py-3 rounded-full bg-blue-700 hover:bg-blue-800"
          >
            Connect wallet
          </button>
        )}
        <div className="mb-5">
          Created in 🇻🇪 by BitCode - All Rights Reserved 2023
        </div>
      </div>
    </footer>
  );
}
