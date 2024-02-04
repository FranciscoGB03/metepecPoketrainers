import { FaFacebook } from "react-icons/fa";
import { AiOutlineCopyright } from 'react-icons/ai';
import "./FooterStruct.css";
import { Link } from "react-router-dom";
import moment from "moment";

const FooterStruct = () => {
  return (
    <footer className="footer">
      <span>Ponte en contacto con nosotros</span>
      <div className="redes">
        <ul className="redes-elementos">
          <li className="redes-elemento">
            <Link
              to={"https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              to={"https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              to={"https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              to={"https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={25} />
            </Link>
          </li>
        </ul>
      </div>
      <span className="terminos"><Link to="/">Terminos y Condiciones</Link></span><br/>
      <span><AiOutlineCopyright /> {moment().year()}. Todos los derechos reservados.</span>
    </footer>
  );
};

export default FooterStruct;
