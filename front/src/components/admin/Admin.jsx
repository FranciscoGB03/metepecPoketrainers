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
    <div>
        Bienvenido a la página de administrador!! 
        {getPermiso('guardar_jugador_top')&&<div>si tengo permisos, rol: {getRolFromToken()}</div>}
    </div>
    );
}

export default Admin;