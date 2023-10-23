import { useStore } from "@nanostores/react";
import { currentAccount } from "../store/wallet";

export default function Navbar() {
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
    <header>
      <nav className="p-8 flex justify-between items-center">
        <div className="flex gap-x-20 items-center">
          <a className="text-2xl font-bold" href="/">
            Crypto Crates
          </a>
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
            <button className="border px-8 py-3 rounded-full hidden lg:block">
              Whatever
            </button>
            {$currentAccount ? (
              <button
                className="px-8 py-3 rounded-full bg-purple-700"
                onClick={() => alert("keloke")}
              >
                Mint Crate
              </button>
            ) : (
              <button
                className="px-8 py-3 rounded-full bg-blue-700"
                onClick={() => handleConnect()}
              >
                Connect wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
