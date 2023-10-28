import { useEffect, useState } from "react";
import { get } from "../utils/crateContract";
import QRCode from "qrcode.react";
import type { Crate } from "../types/types";
import { serializeSingleCrate } from "../utils/serializeCrates";
import Modal from "./Modal";

export default function CrateDetails({ id }: { id: string | undefined }) {
  const [crate, setCrate] = useState<Crate | null>(null);
  const { ethereum } = window;
  const [showModal, setShowModal] = useState(false);
  const [showCopyLink, setShowCopyLink] = useState(false);

  useEffect(() => {
    async function fetchCrate() {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const wallet = accounts[0];
        const results = await get(window.ethereum, id);
        const serializedCrate = serializeSingleCrate(results);
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

  function handleCloseModal() {
    setShowModal(false);
  }

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
            {showCopyLink && (
              <div className="mt-4">Crate link copied to clipboard!</div>
            )}
          </div>
        </div>
        <Modal
          title="QR code"
          showModal={showModal}
          handleClose={handleCloseModal}
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
        </Modal>
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
