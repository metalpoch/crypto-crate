import type { Crate } from "../types/types";

export function serializeSingleCrate(input: any): Crate {
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

export function serializeCrates(input: any): Array<Crate> {
  const crates: Array<Crate> = [];
  for (const item in input) {
    crates.push({
      id: Number(input[item][0]),
      title: input[item][1],
      category: input[item][2],
      description: input[item][3],
      imageUrl: input[item][4],
      owner: input[item][5],
    });
  }
  return crates;
}
