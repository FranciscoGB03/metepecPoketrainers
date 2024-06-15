import { useEffect, useState } from "react";
import { PokemonCompetidor } from "../models/models";

const AgregarPokemon = ({ competidorId, pokemons, ligas, rapidos, cargados,sendRequest}) => {
  /**hooks */
  const [pokemon, setPokemon] = useState(PokemonCompetidor);
  // Asegurarse de que las props sean arrays antes de intentar mapear
  const pokemonsArray = Array.isArray(pokemons) ? pokemons : [];
  const ligasArray = Array.isArray(ligas) ? ligas : [];
  const rapidosArray = Array.isArray(rapidos) ? rapidos : [];
  const cargadosArray = Array.isArray(cargados) ? cargados : [];

  /** useEffect */
  useEffect(()=>{
    setPokemon({...pokemon, competidor_id:competidorId});
  },[competidorId])

  /**functions */
  /** Función para manejar el cambio en los select */
  const handleChange = (e, catalogo) => {
    const { name, value } = e.target;
    const po=catalogo.find(p=>{
      if (p.id==value){
        return p;
      }
    })
    setPokemon({ ...pokemon, [name]: po });
  };
  /** function that saves a pokemon */
  const savePokemon = async () => {
    
    const pokemones= new Array();
    pokemones.push(pokemon)
    console.log(pokemones);
    await sendRequest("POST", "/registrarEquipo",pokemones);
    await sendRequest("GET", "/getLigaLocal", {}, "competidores");
  };

  return (
    <div>
      <label>
        Pokemon:{" "}
        <select
          name="pokemon"
          onChange={e=>handleChange(e, pokemonsArray)}
          value={pokemon.pokemon.id}
        >
          <option value="">Selecciona un Pokémon</option>
          {pokemonsArray.map((poke) => (
            <option key={poke.id} value={poke.id}>
              {poke.nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ataque rápido:{" "}
        <select
          name="ataque_rapido"
          onChange={e=>handleChange(e, rapidosArray)}
          value={pokemon.ataque_rapido.id}
        >
          <option value="">Selecciona un Ataque Rápido</option>
          {rapidosArray.map((rapido) => (
            <option key={rapido.id} value={rapido.id}>
              {rapido.nombre_es}
            </option>
          ))}
        </select>
      </label>
      <label>
        Primer ataque cargado:{" "}
        <select
          name="primer_ataque_cargado"
          onChange={e=>handleChange(e,cargadosArray)}
          value={pokemon.primer_ataque_cargado.id}
        >
          <option value="">Selecciona un Primer Ataque Cargado</option>
          {cargadosArray.map((cargado) => (
            <option key={cargado.id} value={cargado.id}>
              {cargado.nombre_es}
            </option>
          ))}
        </select>
      </label>
      <label>
        Segundo ataque cargado:{" "}
        <select
          name="segundo_ataque_cargado"
          onChange={e=>handleChange(e,cargadosArray)}
          value={pokemon.segundo_ataque_cargado.id}
        >
          <option value="">Selecciona un Segundo Ataque Cargado</option>
          {cargadosArray.map((cargado) => (
            <option key={cargado.id} value={cargado.id}>
              {cargado.nombre_es}
            </option>
          ))}
        </select>
      </label>
      <label>
        Seleccione la liga:{" "}
        <select
          name="liga"
          onChange={e=>handleChange(e,ligasArray)}
          value={pokemon.liga.id}
        >
          <option value="">Selecciona liga</option>
          {ligasArray.map((liga) => (
            <option key={liga.id} value={liga.id}>
              {liga.nombre}
            </option>
          ))}
        </select>
      </label>

      <button onClick={savePokemon}>Guardar</button>
    </div>
  );
};
export default AgregarPokemon;
