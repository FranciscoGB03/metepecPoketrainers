import { useEffect, useState } from "react";
import useAxiosGet from "../../../hooks/useAxiosGetBack";
import useAxiosPost from "../../../hooks/useAxiosPostBack";
import axiosPogo from "../../../config/axiosPogoApi";
import axiosPokeApi from "../../../config/axiosPokeApi";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

export const RankingMundialAdmin = () => {
   /** hooks */
   const[jugador,setJugador]=useState({
    nombre_jugador:"",
    equipo_insignia:"",
    puntos_totales:0,        
})
const { data, error, loading, fetchData } = useAxiosGet();
const { postData } = useAxiosPost();
const url = '/getTopMundial';

/** useEffect */
useEffect(() => {
   fetchData('/getTopMundial');
   const response= axiosPogo.get('/v1/pokemon_names.json');
   console.log(response);
   const response2= axiosPokeApi('/pokemon/bulbasaur').then(data=>console.log(data.data.sprites.front_default));
   console.log(response2);
}, []);

/** functions */
const onSave= async ()=>{
    await postData('/guardarJugador', jugador);
    fetchData(url);
}
/** función para actualizar campos */
const actualizaCampo=(campo,valor)=>{
    setJugador((prevJugador) => ({
        ...prevJugador,
        [campo]: valor,
      }));
}
/** render */
return(
    <div>
        <div>
            <h3>Agregar jugador top</h3>
            <div>
                <label>
                    Nombre jugador: <input min="0" onChange={e=>actualizaCampo("nombre_jugador",e.target.value)} value={jugador?.nombre_jugador}/>
                </label>
            </div>
            <div>
                <label>Equipo insignia: <select value={jugador.equipo_insignia} // ...fuerza al valor del select a coincidir con la variable de estado,...
                                                onChange={e => actualizaCampo("equipo_insignia",e.target.value)} // ...¡y a actualizar la variable de estado con cualquier cambio!
                                                >
                                                <option value="instinto">Instinto</option>
                                                <option value="valor">Valor</option>
                                                <option value="sabiduria">Sabiduria</option>
                                        </select>
                </label>
            </div>
            <div>
                <label>Puntos totales: <input type="number" 
                                              onChange={e=>actualizaCampo("puntos_totales",parseInt(e.target.value)<=0?0:parseInt(e.target.value))}
                                              value={jugador?.puntos_totales}/>
                </label>
            </div>
            <button onClick={onSave}>Guardar</button>
        </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            {loading?<div>Cargando...</div>:null}
            {error!=null?<div>{error?.message}</div>:null}
            <Table className="min-w-full leading-normal">
                <TableHead className="bg-light border border-1">
                    <TableRow>
                    <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Jugador <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"/>
                    </TableHeaderCell>
                    <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Equipo
                    </TableHeaderCell>
                    <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Puntos
                    </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data||[]).map((reg) => (
                    <TableRow key={reg.id}>
                        <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {reg.nombre_jugador}<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"/>
                        </TableCell>
                        <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {reg.equipo_insignia}
                        </TableCell>
                        <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {reg.puntos_totales}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div> 
    </div>
);
}
