import { useNavigate } from "react-router-dom";
import { getEmailFromToken, getRolFromToken, isTokenExpired } from "../auth/helpers";
import { useEffect, useState } from "react";

const Admin =()=>{
    const[permisos,setPermisos]=useState(null);
    const[rol,setRol]=useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if (isTokenExpired()) {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            navigate('/login');
        }else{
            // Obtener los permisos del usuario del localStorage y convertirlos en un arreglo
            const permissionsString = localStorage.getItem('permissions');
            const userPermissions = JSON.parse(permissionsString);
            setPermisos(userPermissions);
            setRol(getRolFromToken());
            // console.log(userPermissions.includes('ver_admin'));
            setPermisos(localStorage.getItem('permissions'))
        }
    },[])
    return(
    <div>
        Bienvenido a la página de administrador!! 
        {getEmailFromToken()}
        {permisos?.includes('guardar_jugador_top')&&<div>si tengo permisos, rol: {rol}</div>}
    </div>
    );
}

export default Admin;