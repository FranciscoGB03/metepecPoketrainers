// src/components/Login.js
import { useEffect, useState } from "react";
import useAxiosBack from "../../hooks/useAxiosBack";
import "./login.css";
import figureHeader from "../../../public/img/chico_saludando.jpeg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms,setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [verifypassword, setPasswordVerify] = useState("");
  const { data, sendRequest } = useAxiosBack();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.data) {
      const { token } = data.data;
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [data]);

  const handleSubmit =  async () => {

    let newErrors = {};

    // Validaciones
    if (!email) newErrors.email = 'El correo es obligatorio.';
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Introduce un correo valido.';
    if (!password) newErrors.password = 'La contraseña es obligatoria.';
    if (verifypassword != password) newErrors.verifypassword = 'Las contraseñas no coinciden.';
    if (!acceptTerms ) newErrors.acceptTerms = 'Debes aceptar los terminos y condiciones.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
       await sendRequest("POST", "/register", { email, password })
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500  px-5 py-5">
      <div className="p-8 mb-10">
        <a href="/" className="text-white text-lg font-bold">
          Home
        </a>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl bg-opacity-10 shadow-xl w-full overflow-hidden login-style">
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-9 px-5 md:px-9">
              <h1 className="text-4xl font-semibold text-center">Bienvenido a nuestra comunidad</h1>
              <div>
                <div className="mt-5 ">
                  <div>
                    <label className="text-lg font-medium">Email</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Escribe tu correo"
                    />
                      {errors.email && <div className="text-red-500 italic">{errors.email}</div>}
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
                    {errors.password && <div className="text-red-500 italic">{errors.password}</div>}
                  </div>
                  <div>
                    <label className="text-lg font-medium">Repite Contraseña</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Escribe tu correo"
                      value={verifypassword}
                      onChange={(e) => setPasswordVerify(e.target.value)}
                      type="password"
                    />
                    {errors.verifypassword && <div className="text-red-500 italic">{errors.verifypassword}</div>}
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <div>
                      <input type="checkbox"
                      value={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.value)} id="terms-conditions" />
                      <label
                        className="ml-2 font-medium text-base"
                        htmlFor="terms-conditions"
                      >
                        <a href="#"> Acepta terminos y condiciones </a>
                      </label>
                    </div>
                  </div>
                    {errors.acceptTerms && <div className="text-red-500 italic">{errors.acceptTerms}</div>}
                </div>
                <div className="mt-5 flex flex-col grap-y-4">
                  <button
                    onClick={handleSubmit}
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-900 text-white text-lg font-bold"
                    //type="submit"
                  >
                    Registrarse
                  </button>
                  {/* <button className=' active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl text-blue-900 text-white text-lg font-bold'>Iniciar sesión</button> */}
                </div>
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
    </div>
  );
};

export default Register;
