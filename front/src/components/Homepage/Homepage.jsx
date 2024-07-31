import "./Homepage.css";
import figureHeader from "../../img/imgchicos.png";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../auth/helpers";
import aboutUsImage from "../../../public/img/aboutus.png";

const Homepage = () => {
  const navigate=useNavigate();  
  const onRegister=()=>{
    navigate('/register');
  }
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
              <button disabled={!isTokenExpired()} onClick={onRegister} className="btn-cta px-5 transition-colors duration-150 border border-blue-300 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100">
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
      <div className="grid grid-cols-3 gap-4">
        <div className="about-us col-span-2" >
          <img src={aboutUsImage}></img>
        </div>
        <div className=" w-full p-10">
          <div className="text-left">
            <h3 className=" text-4xl font-bold pt-10">Nosotros</h3>
            <h4 className="text-lg pt-10">Somos un apasionado equipo de programadores y jugadores de Pokémon en Metepec. Nos unimos para crear un espacio donde los mejores entrenadores Pokémon puedan destacar y recibir el reconocimiento que merecen. Nuestra misión es fomentar la comunidad Pokémon, impulsar la excelencia en el entrenamiento y promover la camaradería entre los jugadores.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
