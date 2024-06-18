import { useNavigate } from "react-router-dom";
import { getPermiso, getRolFromToken, isTokenExpired } from "../auth/helpers";
import { useEffect } from "react";

const Admin =()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if (isTokenExpired()) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    },[]);
    return(
        <div className="p-8 ">
      <div>
        <h1 className="text-3xl font-semibold">Bienvenido a la página de administrador!!</h1>
        {getPermiso('guardar_jugador_top')&&<div>si tengo permisos, rol: {getRolFromToken()}</div>}

      </div>
    </div>
    );
}

export default Admin;