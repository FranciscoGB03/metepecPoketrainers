import { useEffect } from "react"
import useAxiosBack from "../../../hooks/useAxiosBack";

const LigaLocalAdmin = () => {
  const { data, sendRequest } = useAxiosBack();
  //catalogos
  useEffect(()=>{
 const fetchData = async () => {
            await sendRequest('GET', '/getCatalogosLigaEquipos', {}, 'liga');
            await sendRequest('GET', '/getPokemons', {}, 'pokes');
        };
        fetchData();
  },[])
  return (
    <div>
      LigaLocalAdmin
      <div>
          <label>
            Pokemon:{" "}
            <select>
               {data?.pokes?.map(poke=><option key={poke.id} value={poke.id}>{poke.nombre}</option>)}
            </select>
          </label>
          <label>
            Equipo Insiginia:{" "}
            <select>
               {data?.liga?.EquipoInsignia?.map(equipo=><option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>)}
            </select>
          </label>
          <label>
            Liga:{" "}
            <select>
               {data?.liga?.Liga?.map(liga=><option key={liga.id} value={liga.id}>{liga.nombre}</option>)}
            </select>
          </label>
        </div>
    </div>
  )
}

export default LigaLocalAdmin