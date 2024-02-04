import FooterStruct from "./footer/FooterStruct";
import NavbarStruct from "./navbar/NavbarStruct";

const Template = (props) => {
  return (
    <div className="page">
      <NavbarStruct />
      <div className="content">{props.children}</div>
      <FooterStruct />
    </div>
  );
};

export default Template;
