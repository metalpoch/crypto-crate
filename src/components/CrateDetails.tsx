import { useEffect, useState } from "react";
import { get } from "../utils/crateContract";
import QRCode from "qrcode.react";
import type { Crate } from "../types/types";

export default function CrateDetails({ id }: { id: string | undefined }) {
  const [crate, setCrate] = useState<Crate | null>(null);
  const { ethereum } = window;

  function serializeCrate(input: any): Crate {
    const crate = {
      id: Number(input[0]),
      title: input[1],
      category: input[2],
      description: input[3],
      imageUrl: input[4],
      owner: input[5],
    };
    return crate;
  }

  useEffect(() => {
    async function fetchCrate() {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const wallet = accounts[0];
        const results = await get(window.ethereum, id);
        const serializedCrate = serializeCrate(results);
        setCrate(serializedCrate);
      } else {
        window.location.replace("/");
      }
    }

    fetchCrate();
  }, []);

  if (crate) {
    return (
      <div className="p-4 lg:px-30 flex flex-col lg:justify-center items-center lg:items-start lg:gap-x-20 lg:flex-row mb-28">
        <div>
          <img
            className="max-w-[400px] max-h-[400px] rounded-lg"
            src={
              crate.imageUrl ? crate.imageUrl : "https://placehold.co/400x400"
            }
            alt="crate image"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="text-3xl mb-5">{crate.title}</h1>
            <div className="uppercase text-zinc-500">Owner</div>
            <div className="mb-3">{crate.owner}</div>
            <div className="uppercase text-zinc-500">Category</div>
            <h3 className="mb-3">{crate.description}</h3>
            <div className="uppercase text-zinc-500">Description</div>
            <h3 className="mb-3">{crate.description}</h3>
          </div>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 250,
              width: "100%",
            }}
          >
            <QRCode
              size={400}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={crate.id.toString()}
              viewBox={`0 0 250 250`}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-4 lg:px-30 flex flex-col lg:flex-row justify-center">
        Crate not found
      </div>
    );
  }
}
