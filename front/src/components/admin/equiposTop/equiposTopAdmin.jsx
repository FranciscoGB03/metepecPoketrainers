import { useEffect, useState } from "react";
import useAxiosBack from "../../../hooks/useAxiosBack";
import Listado from "./Listado";
import EquipoModal from "./EquipoModal";
import "./styles.css";
import { showErrorAlert } from "../../../utils/alertUtils";

const EquiposTopAdmin = () => {
  /** hooks */
  const [ligaSuper, setLigaSuper] = useState([]);
  const [ligaUltra, setLigaUltra] = useState([]);
  const [ligaMaster, setLigaMaster] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { data, error, sendRequest } = useAxiosBack();
  /**useEffects */
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", "/getCatalogosLigaEquipos", {}, "liga");
      await sendRequest("GET", "/getEquiposTop", {}, "equipos");
      await sendRequest("GET", "/getPokemons", {}, "pokes");
      await sendRequest("GET", "/getAtaquesRapidos", {}, "rapidos");
      await sendRequest("GET", "/getAtaquesCargados", {}, "cargados");
    };
    fetchData();
  }, []);

  useEffect(() => {
    const message = error?.save?.message;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${message}`);
      }, 200);
    }
  }, [error.save]);

  useEffect(() => {
    setLigaSuper(data?.equipos?.filter((equipo) => equipo.liga.id === 1));
    setLigaUltra(data?.equipos?.filter((equipo) => equipo.liga.id === 2));
    setLigaMaster(data?.equipos?.filter((equipo) => equipo.liga.id === 3));
  }, [data.equipos]);
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
        ligas={data?.liga?.Liga}
        pokemons={data?.pokes}
        rapidos={data?.rapidos}
        cargados={data?.cargados}
        sendRequest={sendRequest}
      />
    </div>
  );
};

export default EquiposTopAdmin;
