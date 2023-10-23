import { ethers } from "ethers";
import contract from "../contracts/CrateContract.json";

const CONTRACT_ABI = contract.abi;
const CONTRACT_ADDRESS = "0x6b980B88334a0004e31cAb45F6688254De37FDe4";

const getContract = async (ethereum) => {
  const web3Provider = new ethers.BrowserProvider(ethereum);
  const signer = await web3Provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const get = async (ethereum, id) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.crates(id);
  }
};

export const getMany = async (ethereum, wallet) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.getCratesByOwner(wallet);
  }
};

export const create = async (ethereum, newCrate) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.createCrate(...newCrate);
  }
};

export const update = async (ethereum, id, newValues) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    return await contract.updateCrate(id, ...newValues);
  }
};

// ⚠️ HAY QUE SOLUCIONAR UN PROBLEMA CON MONTO ENVIADO PARA QUE ESTEN EN GWEI ⚠️
export const buy = async (ethereum, gwei, recipient, id) => {
  if (ethereum) {
    const contract = await getContract(ethereum);
    const transaction = await contract.buyCrate(recipient, id, {
      value: ethers.parseUnits(gwei, "gwei"),
    });
    return await transaction.wait();
  }
};

export default {
  get,
  getMany,
  create,
  update,
  buy,
};
