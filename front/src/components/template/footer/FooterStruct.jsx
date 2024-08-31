import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineCopyright } from "react-icons/ai";
import "./FooterStruct.css";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  EQUIPOS_TOP,
  RANKING_LOCAL,
  RANKING_MUNDIAL,
  TERMINOS_CONDICIONES,
} from "../../../utils/urls";

const FooterStruct = () => {
  return (
    <footer className="footer justify-end pt-8">
      <span className="mt-8	" style={{ margin: "20px" }}>
        Ponte en contacto con nosotros:
      </span>
      <div className="redes mt-5">
        <ul className="redes-elementos mb-5">
          <li className="redes-elemento">
            <Link
              to={"https://www.facebook.com/gaming/MetepecPokeTrainers"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              to={"https://www.instagram.com/metepecpoketrainers/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={25} />
            </Link>
            <Link
              to={"https://www.twitch.tv/tavorey"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitch size={25} />
            </Link>
            <Link
              to={"https://api.whatsapp.com/send?phone=527131157360"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={25} />
            </Link>
          </li>
        </ul>
      </div>
      <ul className="menu">
        <li>
          <Link to={RANKING_MUNDIAL}>Ranking Mundial</Link>
          <Link to={RANKING_LOCAL}>Ranking Local</Link>
          <Link to={EQUIPOS_TOP}>Equipos Top</Link>
          <Link to={TERMINOS_CONDICIONES}>Términos y Condiciones</Link>
        </li>
      </ul>
      <span className="derechos ">
        <AiOutlineCopyright className="mr-2" /> {moment().year()}. Todos los
        derechos reservados.
      </span>
    </footer>
  );
};

export default FooterStruct;
