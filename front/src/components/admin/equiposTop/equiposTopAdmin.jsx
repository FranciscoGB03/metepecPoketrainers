import { useEffect, useState } from "react";
import useAxiosBack from "../../../hooks/useAxiosBack";
import Listado from "./Listado";
import EquipoModal from "./EquipoModal";
import "./styles.css";
import {
  showConfirmationAlert,
  showErrorAlert,
} from "../../../utils/alertUtils";
import {
  DELETE_TOP_TEAM,
  GET_ATAQUES_CARGADOS,
  GET_ATAQUES_RAPIDOS,
  GET_CATALOGOS_LIGA_EQUIPOS,
  GET_EQUIPOS_TOP,
  GET_POKEMONS,
  LOGIN,
} from "../../../utils/urls";
import { useNavigate } from "react-router-dom";
import { getPermiso, isTokenExpired } from "../../auth/helpers";
import { VER_ADMIN_EQUIPOS_TOP } from "../../../utils/permisos";

const EquiposTopAdmin = () => {
  /** hooks */
  const [ligaSuper, setLigaSuper] = useState([]);
  const [ligaUltra, setLigaUltra] = useState([]);
  const [ligaMaster, setLigaMaster] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { data, error, sendRequest } = useAxiosBack();
  const navigate = useNavigate();
  /** useEffect */
  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      navigate(LOGIN);
    }
    if (!getPermiso(VER_ADMIN_EQUIPOS_TOP)) {
      navigate("/");
    }
    const fetchData = async () => {
      await sendRequest("GET", GET_CATALOGOS_LIGA_EQUIPOS, {}, "liga");
      await sendRequest("GET", GET_EQUIPOS_TOP, {}, "equipos");
      await sendRequest("GET", GET_POKEMONS, {}, "pokes");
      await sendRequest("GET", GET_ATAQUES_RAPIDOS, {}, "rapidos");
      await sendRequest("GET", GET_ATAQUES_CARGADOS, {}, "cargados");
    };
    fetchData();
  }, []);

  useEffect(() => {
    const message = error?.save?.message || error?.delete?.message;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${message}`);
      }, 200);
    }
  }, [error.save, error.delete]);

  useEffect(() => {
    setLigaSuper(data?.equipos?.filter((equipo) => equipo.liga.id === 1));
    setLigaUltra(data?.equipos?.filter((equipo) => equipo.liga.id === 2));
    setLigaMaster(data?.equipos?.filter((equipo) => equipo.liga.id === 3));
  }, [data.equipos]);
  /**functions */
  const onClose = () => {
    setIsVisible(false);
  };
  /** elimina un equipo de pokemon */
  const onDeleteTeam = async (id) => {
    const eliminar = showConfirmationAlert(
      "¿Realmente desea eliminar el registro?"
    );
    if ((await eliminar).isConfirmed) {
      await sendRequest("DELETE", DELETE_TOP_TEAM + id, {}, "delete");
      await sendRequest("GET", GET_EQUIPOS_TOP, {}, "equipos");
    }
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
          onDeleteTeam={onDeleteTeam}
        />
      </div>

      <div className="[grid-area:ultra] min-w-full">
        <Listado
          arrData={ligaUltra}
          titulo="Liga Ultra"
          setIsVisible={setIsVisible}
          onDeleteTeam={onDeleteTeam}
        />
      </div>
      <div className="[grid-area:master] flex-col min-w-full">
        <Listado
          arrData={ligaMaster}
          titulo="Liga Master"
          setIsVisible={setIsVisible}
          onDeleteTeam={onDeleteTeam}
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
