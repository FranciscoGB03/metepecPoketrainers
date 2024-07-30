import { useEffect, useState } from "react";
import "./styles.css";
import useAxiosBack from "../../../hooks/useAxiosBack";
import Listado from "./Listado";
import EquipoModal from "./EquipoModal";

const EquiposTopAdmin = () => {
  /** hooks */
  const [ligaSuper, setLigaSuper] = useState([]);
  const [ligaUltra, setLigaUltra] = useState([]);
  const [ligaMaster, setLigaMaster] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { data, setData, error, sendRequest } = useAxiosBack();
  /**useEffects */
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", "/getEquiposTop", {}, "equipos");
      await sendRequest("GET", "/getPokemons", {}, "pokes");
      await sendRequest("GET", "/getLigaLocal", {}, "competidores");
      await sendRequest("GET", "/getAtaquesRapidos", {}, "rapidos");
      await sendRequest("GET", "/getAtaquesCargados", {}, "cargados");
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLigaSuper(data?.equipos?.filter((equipo) => equipo.liga.id === 1));
    setLigaUltra(data?.equipos?.filter((equipo) => equipo.liga.id === 2));
    setLigaMaster(data?.equipos?.filter((equipo) => equipo.liga.id === 3));
  }, [data]);
  /**functions */
  const onClose = () => {
    setIsVisible(false);
  };
  /**render */
  return (
    <div id="team-container" className="gap-2 p-2 h-screen">
      <header className="[grid-area:header] p-2">
        <h1 className="text-2xl  font-bold text-center p-0">Equipos Top</h1>
      </header>
      <div className="[grid-area:super] flex flex-col min-w-full">
        <Listado
          arrData={ligaSuper}
          titulo="Liga super"
          setIsVisible={setIsVisible}
        />
      </div>

      <div className="[grid-area:ultra] min-w-full">
        <Listado
          arrData={ligaUltra}
          titulo="Liga Ultra"
          setIsVisible={setIsVisible}
        />
      </div>
      <div className="[grid-area:master] flex-col min-w-full">
        <Listado
          arrData={ligaMaster}
          titulo="Liga Master"
          setIsVisible={setIsVisible}
        />
      </div>
      <EquipoModal
        isVisible={isVisible}
        onClose={onClose}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};

export default EquiposTopAdmin;
