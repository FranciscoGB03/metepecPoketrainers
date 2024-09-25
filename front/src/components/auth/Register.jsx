// src/components/Login.js
import { useEffect, useState } from "react";
import useAxiosBack from "../../hooks/useAxiosBack";
import "./login.css";
import figureHeader from "../../../public/img/chico_saludando.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { REGISTER } from "../../utils/urls";
import { useAuthorization } from "./AuthorizationProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [verifypassword, setVerifypassword] = useState("");
  const { data, error, sendRequest } = useAxiosBack();
  const [showPass, setShownPass] = useState(false);
  const [showVerifyPass, setshowVerifyPass] = useState(false);
  const { fetchData } = useAuthorization();

  const navigate = useNavigate();

  useEffect(() => {
    const message = error?.data?.response?.data;
    if (message) {
      let newErrors = {};
      newErrors.acceptTerms = `Hubo un problema al iniciar sesión: ${message}`;
      setErrors(newErrors);
    }
  }, [error]);

  useEffect(() => {
    const token = data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      fetchData();
      navigate("/");
    }
  }, [data, navigate]);

  const switchShowPass = () => setShownPass(!showPass);
  const switchshowVerifyPass = () => setshowVerifyPass(!showVerifyPass);

  const handleSubmit = async () => {
    let newErrors = {};
    // Validaciones
    if (!email) newErrors.email = "El correo es obligatorio.";
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Introduce un correo valido.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    if (verifypassword != password)
      newErrors.verifypassword = "Las contraseñas no coinciden.";
    if (!acceptTerms)
      newErrors.acceptTerms = "Debes aceptar los terminos y condiciones.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await sendRequest("POST", REGISTER, { email, password });
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
        <div className="bg-white rounded-3xl bg-opacity-10 shadow-xl w-full overflow-hidden login-style">
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-9 px-5 md:px-9">
              <h1 className="text-4xl font-semibold text-center">
                Bienvenido a nuestra comunidad
              </h1>
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
                    {errors.email && (
                      <div className="text-red-500 italic">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-lg font-medium">Contraseña</label>
                    <div className="relative flex w-full">
                      <div className="relative w-full">
                        <input
                          className=" w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                          placeholder="Escribe tu correo"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPass ? "text" : "password"}
                        />
                      </div>
                      <button
                        className="!absolute right-1 top-1 py-5 px-5 text-center align-middle"
                        type="button"
                        onClick={switchShowPass}
                      >
                        {showPass ? (
                          <IoEyeOffSharp className="text-white text-lg" />
                        ) : (
                          <IoMdEye className="text-white text-lg" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="text-red-500 italic">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-lg font-medium">
                      Repite Contraseña
                    </label>
                    <div className="relative flex w-full">
                      <div className="relative w-full">
                        <input
                          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                          placeholder="Escribe tu correo"
                          value={verifypassword}
                          onChange={(e) => setVerifypassword(e.target.value)}
                          type={showVerifyPass ? "text" : "password"}
                        />
                      </div>
                      <button
                        className="!absolute right-1 top-1 py-5 px-5 text-center align-middle"
                        type="button"
                        onClick={switchshowVerifyPass}
                      >
                        {showVerifyPass ? (
                          <IoEyeOffSharp className="text-white text-lg" />
                        ) : (
                          <IoMdEye className="text-white text-lg" />
                        )}
                      </button>
                    </div>
                    {errors.verifypassword && (
                      <div className="text-red-500 italic">
                        {errors.verifypassword}
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <div>
                      <input
                        type="checkbox"
                        value={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.value)}
                        id="terms-conditions"
                      />
                      <label
                        className="ml-2 font-medium text-base"
                        htmlFor="terms-conditions"
                      >
                        <Link to="/terminosCondiciones">
                          {" "}
                          Acepta terminos y condiciones{" "}
                        </Link>
                      </label>
                    </div>
                  </div>
                  {errors.acceptTerms && (
                    <div className="text-red-500 italic">
                      {errors.acceptTerms}
                    </div>
                  )}
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
                <img
                  className="trainer-img"
                  src={figureHeader}
                  alt="imagen de registro"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
