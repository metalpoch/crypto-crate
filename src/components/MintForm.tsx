import React, { useEffect, useRef, useState } from "react";
import { create as createCrate } from "../utils/crateContract";
import { useDropzone } from "react-dropzone";
import supabase from "../utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../utils/categories";
import Modal from "./Modal";

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

interface ProviderMessage {
  type: string;
  data: unknown;
}

type ContractTransactionResponse = {
  from: string;
  hash: string;
  to: string;
};

export default function MintForm() {
  const { ethereum } = window;
  const [wallet, setWallet] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("1");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [premium, setPremium] = useState(false);
  const [isSalable, setIsSalable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txResponse, setTxResponse] =
    useState<ContractTransactionResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const resultRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const checkAccount = async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        window.location.replace("/");
        return;
      } else {
        setWallet(accounts[0]);
      }
    };

    checkAccount();
  }, []);

  const handleForm = async (e: React.FormEvent<EventTarget>) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!title || !amount || !description || Number(amount) < 1) {
        alert("You must fill the required fields");
        return;
      }

      if (files[0] === undefined) {
        alert("you must choose a valid image");
        return;
      }

      const { data, error } = await supabase.storage
        .from("crates_images")
        .upload(`${wallet}/${uuidv4()}`, files[0]);

      if (data?.path) {
        const { data: image } = supabase.storage
          .from("crates_images")
          .getPublicUrl(data.path);

        const newCrate = [
          title,
          category,
          description,
          image.publicUrl,
          amount,
          isSalable,
        ];

        const result = await createCrate(window.ethereum, newCrate);
        setTxResponse(result);
        console.log(result);
        setShowModal(true);
        clearForm();
        if (resultRef.current) {
          resultRef.current.scrollIntoView();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  function clearForm() {
    setTitle("");
    setCategory("");
    setDescription("");
    setAmount("1");
    setFiles([]);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-y-24 lg:gap-x-10 mb-20 min-h-[60vh]">
        <div className="m-4">
          <div className="block mb-2 text-sm font-medium text-white">Image</div>
          <section className="border border-white border-dashed rounded-lg h-[300px] lg:w-[300px]">
            <div
              {...getRootProps({ className: "dropzone" })}
              className="h-[300px] w-full flex justify-center items-center"
            >
              <input {...getInputProps()} />
              <div className="text-center ">
                <p>Drag an image</p>
                <p>or click to choose</p>
              </div>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>
        </div>
        <form className="p-8 flex flex-col lg:w-[400px]" onSubmit={handleForm}>
          <div className="mb-4">
            <label
              htmlFor="categories"
              className="block mb-2 text-sm font-medium text-white"
            >
              Select an option
            </label>
            <select
              id="categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Choose a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
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
      <Modal
        title="Transaction in progress"
        showModal={showModal}
        handleClose={handleCloseModal}
      >
        {txResponse ? (
          <div>
            <div className="uppercase text-zinc-500">From</div>
            <div className="mb-3">{txResponse.from}</div>
            <div className="uppercase text-zinc-500">Tx Hash</div>
            <h3 className="mb-3">{txResponse.hash}</h3>
            <a
              href="/collection"
              className="px-8 py-3 rounded-full bg-blue-700 hover:bg-blue-800 mt-2"
            >
              Go to collection
            </a>
          </div>
        ) : (
          <div>...</div>
        )}
      </Modal>
    </div>
  );
}
