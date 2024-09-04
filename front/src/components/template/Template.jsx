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
          <div className="bg-sky-950 bg-opacity-20		"><NavbarStruct /></div>
          <div className="text-center texto-descripcion	">
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
              >
                <span className="py-5 font-bold text-amber-300 transition-colors duration-150 rounded-lg focus:shadow-outline  hover:text-orange-600">
                  Unete
                </span>
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
