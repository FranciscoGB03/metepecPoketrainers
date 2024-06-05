import "./Homepage.css";
import figureHeader from "../../img/imgchicos.png";
const Homepage = () => {
  return (
    <div>
      <div className="hpbackground">
        <div className="grid grid-cols-2 gap-4">
          <div className="ml-10 text-left text-white font-weight: 700 texto-descripcion">
            <h1 className="mb-4 ">Pokémon Go</h1>
            <p>
              Únete a nuestra comunidad para <br />
              combatir con los mejores
              <br />
              entrenadores de pokémon en Metepec.
            </p>
            <div className="btn-cta-content">
              <button className="btn-cta px-5 transition-colors duration-150 border border-blue-300 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100">
                <span className="py-5 m-5">Unete</span>
              </button>
            </div>
          </div>
          <div>
            <img className="trainer-img" src={figureHeader} />
          </div>
        </div>
      </div>
      <div className="separador-hp"></div>
    </div>
  );
};

export default Homepage;
