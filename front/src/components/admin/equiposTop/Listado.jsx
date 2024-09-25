import Tooltip from "../../../utils/Tooltip";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import {
  PERMISO_AGREGAR_EQUIPO_TOP,
  PERMISO_ELIMINAR_EQUIPO_TOP,
} from "../../../utils/permisos";
import { useAuthorization } from "../../auth/AuthorizationProvider";

const Listado = ({ arrData, titulo, setIsVisible, onDeleteTeam }) => {
  const { getPermiso } = useAuthorization();
  /** render */
  return (
    <div className="border rounded-md border-blue-400 flex flex-col overflow-y-auto max-h-screen hover:bg-gray-600/10">
      <div className="bg-cyan-950 p-2 flex justify-center">
        <h2 className="uppercase text-xl text-center text-white mr-2">
          {titulo}
        </h2>
        {getPermiso(PERMISO_AGREGAR_EQUIPO_TOP) && (
          <Tooltip header="Agregar Equipo" position="top">
            <button
              className="border border-white mt-1 w-6 h-6 text-white rounded-full flex items-center justify-center hover:bg-cyan-800"
              onClick={() => setIsVisible(true)}
            >
              <p className="mb-1 text-2xl font-bold">+</p>
            </button>
          </Tooltip>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-gradient-to-r from-cyan-600 to-cyan-900 text-white text-xl font-bold">
            <tr>
              <th>#</th>
              <th>Pokemon 1</th>
              <th>Pokemon 2</th>
              <th>Pokemon 3</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(arrData || []).map((reg) => (
              <tr key={reg.id}>
                <td>
                  <span className="text-lg font-serif text-cyan-700">
                    {reg.posicion}
                  </span>
                </td>
                <td>
                  <Tooltip
                    position="left"
                    header={
                      <div className="flex flex-col">
                        <strong className="uppercase pb-1">
                          {reg.pokemon1.nombre}
                        </strong>
                        <span>
                          Ataque basico: {reg.ataque_rapido1?.nombre_la}
                        </span>
                        <span>
                          Ataques cargados: {reg.primer_cargado1?.nombre_la},{" "}
                          {reg.segundo_cargado1?.nombre_la}
                        </span>
                      </div>
                    }
                  >
                    <img src={reg.pokemon1.img_url} alt={reg.pokemon1.nombre} />
                  </Tooltip>
                </td>
                <td>
                  <Tooltip
                    position="center"
                    header={
                      <div className="flex flex-col">
                        <strong className="uppercase pb-1">
                          {reg.pokemon2.nombre}
                        </strong>
                        <span>
                          Ataque basico: {reg.ataque_rapido2?.nombre_la}
                        </span>
                        <span>
                          Ataques cargados: {reg.primer_cargado2?.nombre_la},{" "}
                          {reg.segundo_cargado2?.nombre_la}
                        </span>
                      </div>
                    }
                  >
                    <img src={reg.pokemon2.img_url} alt={reg.pokemon2.nombre} />
                  </Tooltip>
                </td>
                <td>
                  <Tooltip
                    position="right"
                    header={
                      <div className="flex flex-col">
                        <strong className="uppercase pb-1">
                          {reg.pokemon3.nombre}
                        </strong>
                        <span>
                          Ataque basico: {reg.ataque_rapido3?.nombre_la}
                        </span>
                        <span>
                          Ataques cargados: {reg.primer_cargado3?.nombre_la},{" "}
                          {reg.segundo_cargado3?.nombre_la}
                        </span>
                      </div>
                    }
                  >
                    <img src={reg.pokemon3.img_url} alt={reg.pokemon3.nombre} />
                  </Tooltip>
                </td>
                <td>
                  {getPermiso(PERMISO_ELIMINAR_EQUIPO_TOP) && (
                    <button onClick={() => onDeleteTeam(reg.id)}>
                      <MdDelete />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
Listado.propTypes = {
  arrData: PropTypes.array,
  titulo: PropTypes.string.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  onDeleteTeam: PropTypes.func,
};

export default Listado;
