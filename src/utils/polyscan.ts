import axios from "axios";

const polygonScanApiKey = import.meta.env.PUBLIC_POLYGONSCAN_API_KEY;
const polygonScanApiUrl = import.meta.env.PUBLIC_POLYGONSCAN_API_URL;

export const getTxStatus = async (txHash: string) => {
  try {
    const response = await axios.get(polygonScanApiUrl, {
      params: {
        module: "transaction",
        action: "gettxreceiptstatus",
        txhash: txHash,
        apikey: polygonScanApiKey,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
