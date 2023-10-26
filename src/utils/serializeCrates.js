import { get } from './crateContract.js'
function serializeCrates(input) {
  const crates = [];
  for (const item in input) {
    crates.push({
      id: Number(input[item][0]),
      title: input[item][1],
      description: input[item][2],
      imageUrl: input[item][3],
      owner: input[item][5],
    });
  }
  console.log(crates)
  return crates;
}
// despues la usas asi
const results = await get(window.ethereum, wallet);
export const serializedCrates = serializeCrates({ ...results });

