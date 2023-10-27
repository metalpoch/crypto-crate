import { useEffect, useState } from "react";
import { getMany } from "../utils/crateContract";
import type { Crate } from "../types/types";
import { serializeCrates } from "../utils/serializeCrates";

export default function CratesList() {
  const [crates, setCrates] = useState<Array<Crate>>();
  const { ethereum } = window;

  useEffect(() => {
    async function fetchCrates() {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const wallet = accounts[0];
        const results = await getMany(window.ethereum, wallet);
        const serializedCrates = serializeCrates({ ...results });
        setCrates(serializedCrates);
      }
    }

    fetchCrates();
  }, []);

  function shortWallet(wallet:string){
    return wallet.slice(0, 6) + "..."
  }

  return (
    <div className="p-2 lg:px-40 mb-10">
      <div className="grid lg:grid-cols-3 gap-4">
        {crates &&
          crates.map((crate) => (
            <a
              href={"/crate/" + crate.id}
              key={crate.id}
              className="flex flex-col flex-wrap gap-3 bg-gray-800 rounded-lg p-3 shadow-md hover:bg-gray-700"
            >
              <div className="flex flex-col">
                <img
                  className="rounded-lg w-[200px] h-[200px] object-cover shadow-sm"
                  src={
                    crate.imageUrl
                      ? crate.imageUrl
                      : "https://placehold.co/200x200"
                  }
                />
              </div>
              <h2 className="my-3 font-semibold">{crate.title}</h2>
              <div className="flex gap-1">
                <div className="flex">
                  <img
                    className="w-7 h-7 rounded-full mt-2 mr-2"
                    src="https://placehold.co/50x50"
                    alt="avatar"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-light text-xs text-gray-400">
                    creator
                  </span>
                  <h2 className="font-semibold">{shortWallet(crate.owner)}</h2>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
