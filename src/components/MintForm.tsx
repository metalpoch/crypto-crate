import React, { useEffect, useRef, useState } from "react";

import { create as createCrate } from "../utils/crateContract";
import Dropzone from "./Dropzone";

export default function MintForm() {
  const { ethereum } = window;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("1");
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/600");
  const [premium, setPremium] = useState(false);
  const [isSalable, setIsSalable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [crate, setCrate] = useState(null);

  const resultRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const checkAccount = async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        window.location.replace("/");
        return;
      }
    };

    checkAccount();
  }, []);

  const handleForm = async (e: React.FormEvent<EventTarget>) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (
        !title ||
        !amount ||
        !description ||
        !imageUrl ||
        Number(amount) < 1
      ) {
        alert("You must fill the required fields");
        return;
      }

      const newCrate = [
        title,
        description,
        imageUrl,
        premium,
        amount,
        isSalable,
      ];

      const result = await createCrate(window.ethereum, newCrate);
      console.log(result);
      alert("Crate minted successfully");
      setCrate(result);
      clearForm();
      if (resultRef.current) {
        resultRef.current.scrollIntoView();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setAmount("1");
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-y-24 lg:gap-x-10 mb-20 min-h-[60vh]">
        <div className="m-4">
          <div className="block mb-2 text-sm font-medium text-white">Image</div>
          <Dropzone />
        </div>
        <form className="p-8 flex flex-col lg:w-[400px]" onSubmit={handleForm}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Product's name"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Description
            </label>
            <input
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="description"
              placeholder="Product's description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-white"
            >
              Amount
            </label>
            <input
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Must be at least 1"
              type="number"
              min="1"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            className="px-8 py-3 rounded-full bg-blue-700 hover:bg-blue-800"
            disabled={loading}
            style={{ opacity: loading ? 0.8 : 1 }}
            type="submit"
          >
            Mint Crate
          </button>
        </form>
      </div>
      {crate && (
        <div className="mx-4 lg:mx-12 pb-20">
          <h2 className="text-2xl font-bold mb-4" ref={resultRef}>
            Transaction result:
          </h2>
          <div className="whitespace-pre-wrap break-words">
            {JSON.stringify(crate, null, 4)}
          </div>
        </div>
      )}
    </div>
  );
}
