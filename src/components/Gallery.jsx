import {useState, useEffect } from 'react';
import { get } from '../utils/crateContract.js'

export const Product = ({ img, userImg, title, owner }) => {
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        async function obtenerResultado() {
          const eth = "window.ethereum"// obtener instancia de Ethereum
          const id = 10 // obtener id
          const resultado = await get(eth,id);
          setResultado(resultado);
        }
        obtenerResultado();
        console.log(resultado)
      });

    return (

        <section className="flex flex-col flex-wrap gap-3 bg-gray-800 rounded-lg p-3 shadow-md">
            <h1 className="text-white text-center">{resultado}</h1>
            <div className="flex flex-col">
                <img className="rounded-lg w-[200px] h-[200px] object-cover shadow-sm" src={img}></img>
            </div>
            <h2 className="my-3 font-semibold">{title}</h2>
            <div className="flex gap-1">
                <div className="flex">
                    <img className="w-7 h-7 rounded-full mt-2 mr-2" src={userImg} alt="avatar" />
                </div>
                <div className="flex flex-col">
                    <span className="font-light text-xs text-gray-400">creator</span>
                    <h2 className="font-semibold">{owner}</h2>
                </div>
            </div>
            
        </section>

    )
}