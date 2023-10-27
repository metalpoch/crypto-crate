import QRCode from "qrcode.react";

export default function ({ text }) {
  return <QRCode value={text} size={320} includeMargin={true} />;
}
