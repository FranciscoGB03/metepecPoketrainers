import FooterStruct from "./footer/FooterStruct";
import NavbarStruct from "./navbar/NavbarStruct";
import './Template.css';

const Template = ({children}) => {
  return (
    <div className="page">
      <NavbarStruct />
      <div className="content">
        <div className="template-body">
          {children}
        </div>
      </div>
      <FooterStruct />
    </div>
  );
};

export default Template;
