import { Outlet } from "react-router-dom";
import FooterStruct from "./footer/FooterStruct";
import NavbarStruct from "./navbar/NavbarStruct";
import "./Template.css";
import { useNavigate, useLocation } from "react-router-dom";
import logoPokemonGo from "../../../public/img/pokemonGo.png";
import { REGISTER } from "../../utils/urls";
// import fondo from '../../../public/img/fondo.png';

const Template = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const onRegister = () => {
    navigate(REGISTER);
  };
  return (
    <div className="page">
      {isHome ? (
        <div className="landing-home">
          <NavbarStruct />
          <div className="text-center texto-descripcion text-zinc-800	">
            <div className="flex justify-center items-center">
              <img
                className="w-3/12 text-center"
                src={logoPokemonGo}
                alt="logo de pokemon"
              ></img>
            </div>

            <div className="btn-cta-content pt-1 pb-40 text-6xl	">
              <button
                onClick={onRegister}
                className=" px-5 transition-colors duration-150 border border-blue-800 rounded-lg focus:shadow-outline hover:bg-blue-800 hover:text-indigo-100"
              >
                <span className="py-5 font-bold text-amber-300 ">Unete</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NavbarStruct />
      )}
      <div className="content">
        <div className="template-body">
          <Outlet />
        </div>
      </div>
      <FooterStruct />
    </div>
  );
};

export default Template;
