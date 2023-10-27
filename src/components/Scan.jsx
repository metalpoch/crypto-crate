import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import icon from "./QRIcon.jsx";

export function Scan() {
  const [qrData, setQrData] = useState("no data yet");
  const handleDecode = (result) => {
    setQrData(result);
  };

  return (
    <>
      <a href="/" className="mt-5">
        <svg viewBox="0 0 24 24" fill="#fff" className="w-8 h-8">
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <div className="flex flex-col justify-center items-center h-screen">
        <header className="flex flex-col items-center text-gray-300 bg-gray-700 my-10 p-7 shadow-md rounded-2xl w-3/4 md:w-1/5">
          <h2 className="text-bold text-3xl mb-1">Scan QR Code</h2>
          <span className="text-lg p-5">{icon}</span>
          <p className="font-light text-center">Quickly scan QR code</p>
        </header>
        <div className="border-2 border-green-500 border-dashed h-82 w-11/12 max-w-md bg-transparent rounded-lg">
          <QrScanner onDecode={handleDecode} />
        </div>

        <h2 className="text-white text-center mt-1">
          QR Data: <span className="text-white font-bold">{qrData}</span>
        </h2>
      </div>
    </>
  );
}
