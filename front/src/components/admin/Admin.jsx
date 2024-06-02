import { useState } from "react";
import Template from "../template/Template";
import useAxios from "../../hooks/useAxios";
import axiosInstance from "../../config/axiosConfig";

const Admin =()=>{
    /** hooks */
    const[jugador,setJugador]=useState({
        nombre_jugador:"",
        equipo_insignia:"",
        puntos_totales:0,        
    })
    const url = '/getTopMundial';
    const options = {};
    const { data, error, loading } = useAxios(url,options);
    

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    /** functions */
    const onSave= async ()=>{
        try {
            console.log(jugador);
            const response=await axiosInstance.post('/guardarJugador', 
            {
                nombre_jugador:jugador.nombre_jugador,
                equipo_insignia:jugador.equipo_insignia, 
                puntos_totales:jugador.puntos_totales
            }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            console.log(response);
          } catch (err) {
            console.error('Error saving player:', err);
          }
    }

    const actualizaCampo=(campo,valor)=>{
        setJugador((prevJugador) => ({
            ...prevJugador,
            [campo]: valor,
          }));
    }
    /** render */
    return(
        <Template>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div>
                <h3>Agregar jugador top</h3>
                <div>
                    <label>Nombre jugador:</label>
                    <input onChange={e=>actualizaCampo("nombre_jugador",e.target.value)}
                    value={jugador?.nombre_jugador}/>
                </div>
                <div>
                    <label>Equipo insignia:</label>
                    <select 
                        value={jugador.equipo_insignia} // ...fuerza al valor del select a coincidir con la variable de estado,...
                        onChange={e => actualizaCampo("equipo_insignia",e.target.value)} // ...¡y a actualizar la variable de estado con cualquier cambio!
                        >
                        <option value="instinto">Instinto</option>
                        <option value="valor">Valor</option>
                            <option value="sabiduria">Sabiduria</option>
                    </select>
                </div>
                <div>
                    <label>Puntos totales:</label>
                    <input type="number" onChange={e=>actualizaCampo("puntos_totales",parseInt(e.target.value))}
                    value={jugador?.puntos_totales}/>
                </div>
                <button onClick={onSave}>Guardar</button>
            </div>
        </Template>
    );
}

export default Admin;