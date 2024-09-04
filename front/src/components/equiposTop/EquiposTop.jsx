import iconPokeball from "./../../../public/img/pokebalLiga.svg";
import { useEffect, useState } from "react";
import useAxiosGet from "../../hooks/useAxiosGetBack";
import { GET_EQUIPOS_TOP } from "../../utils/urls";

const EquiposTop = () => {
  /** hooks */
  const { data, fetchData } = useAxiosGet();
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [dataLiga, setDataLiga] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleFilter = (equipo) => {
    setEquipoSeleccionado(equipo);
  };
  /**useEffect */
  useEffect(() => {
    fetchData(GET_EQUIPOS_TOP);
    if (equipoSeleccionado != null && data) {
      setShowData(true);
      const ligaData = data.filter(
        (item) => item.liga.id === equipoSeleccionado
      );
      console.log(ligaData);
      setDataLiga(ligaData);
    }
  }, [equipoSeleccionado]);

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-semibold leading-tight">Equipos Top</h2>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <button
                className="bg-gradient-to-tr from-blue-700 via-sky-500 to-slate-50 shadow-md rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={() => handleFilter(1)}
              >
                <img
                  className="w-8 mt-10  mb-10"
                  src={iconPokeball}
                  alt="icon pokeball"
                />
                <h2 className="text-xl  text-white uppercase font-bold ml-2 mt-10 mb-10">
                  Liga Super
                </h2>
              </button>
              <button
                className="bg-gradient-to-tr from-gray-900 via-gray-600 to-slate-300 shadow-md rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={() => handleFilter(2)}
              >
                <img
                  className="w-8 mt-10  mb-10"
                  src={iconPokeball}
                  alt="icon pokeball"
                />
                <h2 className="text-xl  text-white uppercase font-bold ml-2 mt-10 mb-10">
                  Liga Ultra
                </h2>
              </button>

              <button
                className="bg-gradient-to-tr from-blue-900 via-indigo-500 to-slate-50 shadow-md rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={() => handleFilter(3)}
              >
                <img
                  className="w-8 mt-10  mb-10"
                  src={iconPokeball}
                  alt="icon pokeball"
                />
                <h2 className="text-xl  text-white uppercase font-bold ml-2 mt-10 mb-10">
                  Liga Master
                </h2>
              </button>
            </div>
          </div>
        </div>
        {showData ? (
          <div>
            {data.length > 0 ? (
              dataLiga.map((liga, index) => (
                <div
                  className="grid grid-cols-6 grid-rows-1 gap-4 mb-10"
                  key={index}
                >
                  <div className="w-8 h-8 flex justify-center items-center bg-sky-500	rounded-full text-white">
                    {liga.posicion}
                  </div>
                  <div className="col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="bg-amber-100 max-w-sm rounded overflow-hidden shadow-lg	">
                      <div className="mt-5 ml-5 text-xl uppercase font-bold 	">
                        <h3>{liga.pokemon1.nombre}</h3>
                      </div>
                      <div className="mt-1 ml-5 mr-5 mb-5 bg-white	 max-w-sm rounded overflow-hidden shadow-lg ">
                        <div className="w-full h-50 relative bg-gradient-to-tr from-red-700 via-red-500 to-slate-50 border-4 border-orange-300">
                          <img
                            className="w-full flex justify-center self-start "
                            src={liga.pokemon1.img_url}
                            alt="primer pokemon"
                          />
                        </div>
                        <div className="m-3 ">
                          <h3 className="text-xl uppercase font-bold">
                            Ataques:
                          </h3>
                          <hr className="border-solid	border-amber-900 m-2"/>
                          <div className="mt-2 ml-2">
                              {liga.ataque_rapido1.nombre_es?
                                <p className="">
                                  Ataque Rapido: {liga.ataque_rapido1.nombre_es}
                                </p>:''
                              }
                              
                              {liga.primer_cargado1.nombre_es?
                                <p >
                                  1º Ataque cargado:{liga.primer_cargado1.nombre_es}
                                </p> :''}
                              
                              {liga.segundo_cargado1.nombre_es?
                                <p>
                                  2º Ataque cargado:{liga.segundo_cargado1.nombre_es}
                                </p>:''
                              }
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-100 max-w-sm rounded overflow-hidden shadow-lg	">
                      <div className="mt-5 ml-5 text-xl uppercase font-bold 	">
                        <h3>{liga.pokemon2.nombre}</h3>
                      </div>
                      <div className="mt-1 ml-5 mr-5 mb-5 bg-white	 max-w-sm rounded overflow-hidden shadow-lg ">
                        <div className="w-full h-50 relative bg-gradient-to-tr from-red-700 via-red-500 to-slate-50 border-4 border-orange-300">
                          <img
                            className="w-full flex justify-center self-start "
                            src={liga.pokemon2.img_url}
                            alt="primer pokemon"
                          />
                        </div>
                        <div className="m-3 ">
                          <h3 className="text-xl uppercase font-bold">
                            Ataques:
                          </h3>
                          <hr className="border-solid	border-amber-900 m-2"/>
                          <div className="mt-2 ml-2">
                              {liga.ataque_rapido2.nombre_es?
                                <p className="">
                                  Ataque Rapido: {liga.ataque_rapido2.nombre_es}
                                </p>:''
                              }
                              
                              {liga.primer_cargado2.nombre_es?
                                <p >
                                  1º Ataque cargado:{liga.primer_cargado2.nombre_es}
                                </p> :''}
                              
                              {liga.segundo_cargado2.nombre_es?
                                <p>
                                  2º Ataque cargado:{liga.segundo_cargado2.nombre_es}
                                </p>:''
                              }
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-100 max-w-sm rounded overflow-hidden shadow-lg	">
                      <div className="mt-5 ml-5 text-xl uppercase font-bold 	">
                        <h3>{liga.pokemon3.nombre}</h3>
                      </div>
                      <div className="mt-1 ml-5 mr-5 mb-5 bg-white	 max-w-sm rounded overflow-hidden shadow-lg ">
                        <div className="w-full h-50 relative bg-gradient-to-tr from-red-700 via-red-500 to-slate-50 border-4 border-orange-300">
                          <img
                            className="w-full flex justify-center self-start "
                            src={liga.pokemon3.img_url}
                            alt="primer pokemon"
                          />
                        </div>
                        <div className="m-3 ">
                          <h3 className="text-xl uppercase font-bold">
                            Ataques:
                          </h3>
                          <hr className="border-solid	border-amber-900 m-2"/>
                          <div className="mt-2 ml-2">
                              {liga.ataque_rapido3.nombre_es?
                                <p className="">
                                  Ataque Rapido: {liga.ataque_rapido1.nombre_es}
                                </p>:''
                              }
                              
                              {liga.primer_cargado3.nombre_es?
                                <p >
                                  1º Ataque cargado:{liga.primer_cargado3.nombre_es}
                                </p> :''}
                              
                              {liga.segundo_cargado3.nombre_es?
                                <p>
                                  2º Ataque cargado:{liga.segundo_cargado3.nombre_es}
                                </p>:''
                              }
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))
            ) : (
              <div>Aun no hay datos disponibles</div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default EquiposTop;
