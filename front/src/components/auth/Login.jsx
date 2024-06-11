// src/components/Login.js
import { useState } from "react";
import useAxiosBack from "../../hooks/useAxiosBack";
import "./login.css";
import figureHeader from "../../../public/img/chico_saludando.jpeg";

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { data, sendRequest } = useAxiosBack();

   const handleSubmit = async (e) => {
       e.preventDefault();
       await sendRequest('POST', '/login', { email, password });
       if (data.data) {
           const { token, permissions } = data.data;
           localStorage.setItem('token', token);
           localStorage.setItem('permissions', JSON.stringify(permissions));
       }
   };

  return (
    <div class="min-w-screen min-h-screen p-8 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center px-5 py-5">
      <div className="bg-white rounded-3xl shadow-xl w-full overflow-hidden login-style">
        <div class="md:flex w-full">
            <div className="w-full md:w-1/2 py-9 px-5 md:px-9">
            <h1 className="text-4xl font-semibold text-center">Bienvenido</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5 ">
                        <div>
                            <label className="text-lg font-medium">Email</label>
                            <input 
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Escribe tu correo"
                            />
                        </div>
                        <div>
                            <label className="text-lg font-medium">Contraseña</label>
                            <input 
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" 
                                placeholder="Escribe tu correo"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </div >
                        <div className="mt-5 flex justify-between items-center">
                            <div>
                            <input 
                            type="checkbox" 
                            id='terms-conditions'/>
                            <label className="ml-2 font-medium text-base" for="terms-conditions">
                                <a href="#"> Acepta terminos y condiciones </a>
                            </label>
                            </div>
                        </div>
                        <button className="font-medium text-base text-blue-900">Olvidaste tu contraseña</button>
                    </div>
                    <div className='mt-5 flex flex-col grap-y-4'>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-900 text-white text-lg font-bold'
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                        {/* <button className=' active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl text-blue-900 text-white text-lg font-bold'>Iniciar sesión</button> */}
                    </div>
                </form>

                    <div className='mt-5 flex justify-center items-center'>
                        <p className='font-medium text-base'>¿No tienes cuenta aun?</p>
                        <button 
                            className='text-blue-900 text-base font-medium ml-2'>Registrate</button>
                    </div>
            </div>
          <div className="hidden md:block "> 
            <div className=" w-full ">
                <img className="trainer-img" src={figureHeader} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
