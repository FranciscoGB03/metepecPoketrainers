import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./styles.css";

const AdminTemplate = () => {
  return (
    <div className="admin-contenedor">
      
      {/* <Navbar /> */}
      <div className="admin-body">
        <Sidebar />
        <div className="admin-outlet">
          <Outlet />  
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
