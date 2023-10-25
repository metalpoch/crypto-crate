import logo from "../images/crypto-crates-logo-light.svg";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

import { useStore } from "@nanostores/react";
import { currentAccount } from "../store/wallet";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const $currentAccount = useStore(currentAccount);
  const { ethereum } = window;

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

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
    <header className="lg:px-20 lg:py-5">
      <nav className="p-8 flex justify-between items-center">
        <div className="flex gap-x-20 items-center">
          <div className="flex justify-center items-center gap-x-3">
            <img
              src={logo.src}
              alt="crypto creates logo"
              className="w-10 aspect-square"
            />
            <a className="text-2xl font-bold" href="/">
              Crypto Crates
            </a>
          </div>
          <input
            className="rounded-full bg-zinc-700 px-8 py-3 w-[400px] hidden lg:block"
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="flex gap-x-8 items-center">
          <div className="lg:flex gap-x-10 text-lg hidden">
            <a href="/">Explore</a>
            <a href="/">Collections</a>
            <a href="/">Gallery</a>
          </div>
          <div className="flex gap-x-4">
            {$currentAccount ? (
              <button
                onClick={() => handleConnect()}
                className="px-8 py-3 hidden lg:block rounded-full bg-purple-700 hover:bg-purple-800"
              >
                Mint Crate
              </button>
            ) : (
              <button
                onClick={() => handleConnect()}
                className="px-8 py-3 hidden lg:block rounded-full bg-blue-700 hover:bg-blue-800"
              >
                Connect wallet
              </button>
            )}
            <select className="border px-4 py-3 rounded-full hidden bg-zinc-900 text-white lg:block">
              <option value="EN">EN</option>
            </select>
          </div>
        </div>
        <button
          className=" px-4 py-3 rounded-full bg-zinc-700 lg:hidden"
          onClick={toggleMenu}
        >
          <HiMenu className="w-6 h-6" />
        </button>
      </nav>
      {menuVisible && (
        <div className="bg-zinc-950 flex flex-col justify-center items-center gap-y-4 py-6 lg:hidden">
          <a href="/">Explore</a>
          <a href="/">Collections</a>
          <a href="/">Gallery</a>
          {$currentAccount ? (
            <button
              onClick={() => handleConnect()}
              className="px-8 py-3 hidden lg:block rounded-full bg-purple-700 hover:bg-purple-800"
            >
              Mint Crate
            </button>
          ) : (
            <button
              onClick={() => handleConnect()}
              className="px-8 py-3 hidden lg:block rounded-full bg-blue-700 hover:bg-blue-800"
            >
              Connect wallet
            </button>
          )}
        </div>
      )}
    </header>
  );
}
