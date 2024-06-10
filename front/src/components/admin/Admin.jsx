import { useNavigate } from "react-router-dom";
import { getEmailFromToken, isTokenExpired } from "../auth/helpers";
import { useEffect, useState } from "react";

const Admin =()=>{
    const[permisos,setPermisos]=useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            navigate('/login');
        }else{
            // Obtener los permisos del usuario del localStorage y convertirlos en un arreglo
            const permissionsString = localStorage.getItem('permissions');
            const userPermissions = JSON.parse(permissionsString);
            setPermisos(userPermissions);
            console.log(userPermissions.includes('ver_admin'));
            setPermisos(localStorage.getItem('permissions'))
        }
    },[])
    return(
    <div>
        Bienvenido a la página de administrador!! 
        {getEmailFromToken()}
        {permisos?.includes('guardar_jugador_top')&&<div>si tengo permisos</div>}
    </div>
    );
}

export default Admin;