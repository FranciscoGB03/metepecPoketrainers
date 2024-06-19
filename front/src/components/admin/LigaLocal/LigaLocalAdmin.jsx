import { useEffect, useState } from "react";
import useAxiosBack from "../../../hooks/useAxiosBack";

import { CompetidorModel } from "../models/models";
import AgregarPokemonModal from "./AgregarPokemonModal";
import { showErrorAlert } from "../../../utils/alertUtils";
import { agregarJugador, handleInputChange } from "./functions";
import Listado from "./Listado";
import { getUID } from "../../auth/helpers";

const LigaLocalAdmin = () => {
	/**hooks */
	const { data, setData, error, sendRequest } = useAxiosBack();
	const [newCompetidor, setNewCompetidor] = useState(CompetidorModel);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [regId, setRegId] = useState(null);
	//useEffect
	useEffect(() => {
		const fetchData = async () => {
			await sendRequest("GET", "/getCatalogosLigaEquipos", {}, "liga");
			await sendRequest("GET", "/getPokemons", {}, "pokes");
			await sendRequest("GET", "/getLigaLocal", {}, "competidores");
			await sendRequest("GET", "/getAtaquesRapidos", {}, "rapidos");
			await sendRequest("GET", "/getAtaquesCargados", {}, "cargados");
		};
		fetchData();
	}, []);
	useEffect(() => {
		if (newCompetidor.user_id === 0) {
			setNewCompetidor({ ...newCompetidor, user_id: getUID() });
		}
	}, [newCompetidor]);
	useEffect(() => {
		const message =
			error?.addPokemon?.message ||
			error?.addCompetidor?.message ||
			error?.competidor?.message ||
			error?.actualizaCompetidor?.message ||
			error?.eliminaPoke?.message;
		if (message) {
			setTimeout(() => {
				showErrorAlert(`Error:${message}`);
			}, 200);
		}
	}, [error]);
	/** funciones */
	const openModal = (id) => {
		setRegId(id);
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);
	/**render */
	return (
		<div>
			LigaLocalAdmin
			<div className="d-flex center">
				<h1>Competidores de liga local</h1>
			</div>
			<div>
				<label>
					Nombre:{" "}
					<input
						type="text"
						name="nombre"
						value={newCompetidor.nombre}
						onChange={(e) => handleInputChange(e, setNewCompetidor)}
					/>
				</label>

				<label>
					Equipo Insignia:{" "}
					<select
						name="equipo_insignia"
						value={newCompetidor.equipo_insignia.id}
						onChange={(e) =>
							handleInputChange(e, setNewCompetidor, data.liga.EquipoInsignia)
						}>
						{data?.liga?.EquipoInsignia?.map((equipo) => (
							<option key={equipo.id} value={equipo.id}>
								{equipo.nombre}
							</option>
						))}
					</select>
				</label>
				<label>
					Puntos Iniciales:{" "}
					<input
						type="number"
						name="puntos"
						min={0}
						value={newCompetidor.puntos}
						onChange={(e) => handleInputChange(e, setNewCompetidor)}
					/>
				</label>
				<button
					onClick={() =>
						agregarJugador(sendRequest, newCompetidor, setNewCompetidor)
					}>
					Guardar competidor
				</button>
			</div>
			<div>
				<Listado
					data={data}
					setData={setData}
					openModal={openModal}
					sendRequest={sendRequest}
				/>
			</div>
			<AgregarPokemonModal
				isOpen={isModalOpen}
				onClose={closeModal}
				competidorId={regId}
				pokemons={data.pokes}
				ligas={data?.liga?.Liga}
				rapidos={data.rapidos}
				cargados={data.cargados}
				sendRequest={sendRequest}
			/>
		</div>
	);
};

export default LigaLocalAdmin;
