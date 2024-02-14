import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineCopyright } from 'react-icons/ai';
import "./FooterStruct.css";
import { Link } from "react-router-dom";
import moment from "moment";

const FooterStruct = () => {
  return (
    <footer className="footer">
      <span>Ponte en contacto con nosotros:</span>
      <div className="redes">
        <ul className="redes-elementos">
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
      <span className="terminos"><Link to="/terminosCondiciones">Términos y Condiciones</Link></span><br/>
      <span><AiOutlineCopyright /> {moment().year()}. Todos los derechos reservados.</span>
    </footer>
  );
};

export default FooterStruct;
