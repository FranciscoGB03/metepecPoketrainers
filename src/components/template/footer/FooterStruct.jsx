import { FaFacebook } from "react-icons/fa";
import "./FooterStruct.css";

const FooterStruct = () => {
  return (
    <footer className="footer">
      espacio para el footer aqui se mostraran las redes sociales
      <div>
        <ul>
          <li>
            <FaFacebook />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterStruct;
