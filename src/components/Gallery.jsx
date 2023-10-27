import { useState, useEffect } from "react";

export const Product = () => {
  // const [result, setResult] = useState({})
  // function serializeCrates(input) {
  //   const crates = [];
  //   for (const item in input) {
  //     crates.push({
  //       id: Number(input[item][0]),
  //       title: input[item][1],
  //       description: input[item][2],
  //       imageUrl: input[item][3],
  //       owner: input[item][5],
  //     });
  //   }

  //   return crates;
  // }

  // useEffect(() => {
  //   const getResult = async () => {
  //     const results = await get(window.ethereum, 10);
  //     const serializedCrates = serializeCrates({ ...results });
  //   }
  //   getResult();
  // }, [])

  return (
    <section className="flex flex-col flex-wrap gap-3 bg-gray-800 rounded-lg p-3 shadow-md">
      <div className="flex flex-col">
        <img
          className="rounded-lg w-[200px] h-[200px] object-cover shadow-sm"
          src="https://placehold.co/200x200"
        />
      </div>
      <h2 className="my-3 font-semibold">Title</h2>
      <div className="flex gap-1">
        <div className="flex">
          <img
            className="w-7 h-7 rounded-full mt-2 mr-2"
            src="https://placehold.co/50x50"
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light text-xs text-gray-400">creator</span>
          <h2 className="font-semibold">owner</h2>
        </div>
      </div>
    </section>
  );
};
