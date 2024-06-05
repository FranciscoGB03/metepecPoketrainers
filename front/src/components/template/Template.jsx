import { Outlet } from "react-router-dom";
import FooterStruct from "./footer/FooterStruct";
import NavbarStruct from "./navbar/NavbarStruct";
import './Template.css';

const Template = () => {
  return (
    <div className="page">
      <NavbarStruct />
      <div className="content">
        <div className="template-body">
          <Outlet/>
        </div>
      </div>
      <FooterStruct />
    </div>
  );
};

export default Template;
