import { ethers } from "ethers";
import contract from "../contracts/CratenautContract.json";

const CONTRACT_ABI = contract.abi;
const CONTRACT_ADDRESS = "0x58E67B494d47E76E5f5dcb45Ed40d56CcEA43d6A";

const getContract = async (ethereum) => {
  const web3Provider = new ethers.BrowserProvider(ethereum);
  const signer = await web3Provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const get = async (ethereum, address) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.cratenauts(address);
  }
};

export const create = async (ethereum, alias) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.addCratenaut(alias);
  }
};

export const updateImg = async (ethereum, url) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.updateImg(url);
  }
};

export const updatePlan = async (ethereum, plan) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.updatePlan(plan);
  }
};

export default {
  get,
  create,
  updateImg,
  updatePlan,
};
