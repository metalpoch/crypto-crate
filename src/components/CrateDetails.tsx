import { useEffect, useState } from "react";
import { get } from "../utils/crateContract";
import QRCode from "qrcode.react";
import type { Crate } from "../types/types";

export default function CrateDetails({ id }: { id: string | undefined }) {
  const [crate, setCrate] = useState<Crate | null>(null);
  const { ethereum } = window;
  const [showModal, setShowModal] = useState(false);
  const [showCopyLink, setShowCopyLink] = useState(false);

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

  const copyLink = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setShowCopyLink(true);
    setTimeout(() => {
      setShowCopyLink(false);
    }, 3000);
  };

  if (crate) {
    return (
      <>
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
          <div className="mb-20">
            <div className="my-5">
              <h1 className="text-3xl mb-5">{crate.title}</h1>
              <div className="uppercase text-zinc-500">Owner</div>
              <div className="mb-3">{crate.owner}</div>
              <div className="uppercase text-zinc-500">Category</div>
              <h3 className="mb-3">{crate.category}</h3>
              <div className="uppercase text-zinc-500">Description</div>
              <h3 className="mb-3">{crate.description}</h3>
            </div>
            <div className="flex gap-x-4">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 lg:block rounded-full bg-blue-700 hover:bg-blue-800"
              >
                Show QR
              </button>
              <button
                onClick={() => copyLink()}
                className="border px-4 py-3 rounded-full bg-zinc-900 text-white lg:block"
              >
                Copy link
              </button>
            </div>
            {showCopyLink && <div className="mt-4">Crate link copied to clipboard!</div>}
          </div>
        </div>
        {showModal ? (
          <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-700 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">QR code</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
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
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={crate.id.toString()}
                        viewBox={`0 0 250 250`}
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </>
    );
  } else {
    return (
      <div className="p-4 lg:px-30 flex flex-col lg:flex-row justify-center">
        Crate not found
      </div>
    );
  }
}
