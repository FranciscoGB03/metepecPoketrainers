import FooterStruct from "./footer/FooterStruct";
import NavbarStruct from "./navbar/NavbarStruct";

const Template = (props) => {
  return (
  <div>
    <NavbarStruct/>
    {props.children}
    <FooterStruct/>
  </div>
  );
};

export default Template;
