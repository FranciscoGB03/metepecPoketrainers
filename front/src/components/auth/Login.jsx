// src/components/Login.js
import { useEffect, useState } from "react";
import useAxiosBack from "../../hooks/useAxiosBack";
import "./login.css";
import figureHeader from "../../../public/img/chico_saludando.jpeg";
import { isTokenExpired } from "./helpers";
import { Link, useNavigate } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../../utils/alertUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, error, sendRequest } = useAxiosBack();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isTokenExpired()) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const message = error?.data?.response?.data;
    if (message) {
      showErrorAlert(`Hubo un problema al iniciar sesión: ${message}`);
    }
  }, [error]);

  useEffect(() => {
    const token = data?.data?.token;
    if (token) {
      showSuccessAlert("Acceso correcto!!");
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [data, navigate]);

  const handleSubmit = async () => {
    let newErrors = {};
    if (!email) newErrors.email = "El correo es obligatorio.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      await sendRequest("POST", "/login", { email, password });
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500  px-5 py-5">
      <div className="p-8 mb-10">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl bg-opacity-30 shadow-xl w-full overflow-hidden login-style">
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-9 px-5 md:px-9">
              <h1 className="text-4xl font-semibold text-center">Bienvenido</h1>
              <div>
                <div className="mt-5 ">
                  <div>
                    <label htmlFor='email' className="text-lg font-medium">Email</label>
                    <input
                      type="emai"
                      name="email"
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Escribe tu correo"
                    />
                    {errors.email && (
                      <div className="text-red-500 italic">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="text-lg font-medium">Contraseña</label>
                    <input
                      name="password"
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Escribe tu correo"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                    {errors.password && (
                      <div className="text-red-500 italic">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <button className="font-medium text-base text-blue-900">
                    Olvidaste tu contraseña
                  </button>
                </div>
                <div className="mt-5 flex flex-col grap-y-4">
                  <button
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-900 text-white text-lg font-bold"
                    onClick={handleSubmit}
                    //type="submit"
                  >
                    Iniciar sesión
                  </button>
                  {/* <button className=' active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl text-blue-900 text-white text-lg font-bold'>Iniciar sesión</button> */}
                </div>
              </div>

              <div className="mt-5 flex justify-center items-center">
                <p className="font-medium text-base">¿No tienes cuenta aun?</p>
                <Link
                  className="text-blue-900 text-base font-medium"
                  to="/register"
                >
                  Registrate
                </Link>
              </div>
            </div>
            <div className="hidden md:block ">
              <div className=" w-full ">
                <img alt="persona saludando" className="trainer-img" src={figureHeader} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
