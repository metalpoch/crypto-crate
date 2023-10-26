import { useEffect, useState } from "react";
import { get, getMany } from "../utils/crateContract";

type Crate = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  owner: string;
};

export default function CratesList() {
  const [crates, setCrates] = useState<Array<Crate>>();
  const { ethereum } = window;

  function serializeCrates(input: any): Array<Crate> {
    const crates: Array<Crate> = [];
    for (const item in input) {
      crates.push({
        id: Number(input[item][0]),
        title: input[item][1],
        description: input[item][2],
        imageUrl: input[item][3],
        owner: input[item][5],
      });
    }
    return crates;
  }

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

  return (
    <div>
      <h1>crates</h1>
      {crates &&
        crates.map((crate) => (
          <div key={crate.id} className="mb-2 p-5">
            <div>id: {crate.id}</div>
            <div>title: {crate.title}</div>
            <div>description: {crate.description}</div>
            <div>imageUrl: {crate.imageUrl}</div>
            <div>owner wallet: {crate.owner}</div>
          </div>
        ))}
    </div>
  );
}
