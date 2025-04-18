import React, { useState, useEffect } from 'react';
import Btn from '../../components/generals/btn';
import HeaderAdmin from '../../components/admin/headerAdmin';
import Loader from '../../components/generals/Loader';
import Api from '../../utils/Api';
import { useDispatch } from 'react-redux';
import { logInReducer } from "../../features/AuthSlice";
import { showAlert } from "../../utils/showAlert"

export default function LoginAdmin() {
  const [isText, setIsText] = useState(false);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //Permite acceder a los actions del store
  const dispatch = useDispatch();

  // lllamamos al action
  const logInR = (data) => {
    dispatch(logInReducer(data));
  };

  const validateC = () => {
    let vali = true;

    setEmailError("");
    setPassError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Correo incorrecto");
      vali = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Formato de correo incorrecto");
      vali = false;
    }

    if (!pass) {
      setPassError("Contraseña incorrecta");
      vali = false;
    }

    return vali;
  }

  // Iniciando sesion
  const logIn = async () => {

    if (validateC()) {
      setLoaderIsVisible(true);
      try {
        let uri = import.meta.env.VITE_URL + "auth/logIn";
        let params = {
          pass: pass,
          email: email
        }
        let api = new Api(uri, "POST", params);
        await api.call().then((res) => {
          if (res.response) {
            // Decodificar Base64
            let decodedToken = atob(res.result);
            decodedToken = JSON.parse(decodedToken);

            let dataAuth = {
              id: decodedToken.data,
              session: true,
              token: res.result,
              expiration: decodedToken.exp
            }

            setEmailError("");
            setPassError("");
            setEmail("");
            setPass("");

            setLoaderIsVisible(false);

            logInR(dataAuth);
          } else {
            showAlert(res.message, "warning");
          }
        });
      } catch ($e) {
        showAlert("Error al iniciar sesión intetalo nuevamente", "error");
      }
      setLoaderIsVisible(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      logIn();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [email, pass]);

  return (
    <div className='container-fluid containerLogin'>
      <HeaderAdmin></HeaderAdmin>

      <div style={{ height: 50 }}></div>

      <main>
        <div className="containerFL">
          <h2>Iniciar Sesión</h2>

          <div className="inputC">
            <label htmlFor="email">Correo electrónico</label>
            <input type="text" id="email" className='email' placeholder='Ingresa tu correo' maxLength={150} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            {emailError && <p>{emailError}</p>}
          </div>

          <div className="inputC">
            <label htmlFor="pass">Contraseña</label>
            <div className="containerPass">
              <input type={isText ? "text" : "password"} id="pass" className='pass' placeholder='Ingresa tu contraseña' maxLength={150} value={pass} onChange={(e) => { setPass(e.target.value) }} />
              {isText ?
                <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24" onClick={() => { setIsText(false) }}><path fill="#ffffff" d="M4.52 5.935L1.394 2.808l1.414-1.414l19.799 19.798l-1.414 1.415l-3.31-3.31A10.95 10.95 0 0 1 12 21c-5.392 0-9.878-3.88-10.818-9A11 11 0 0 1 4.52 5.935m10.238 10.237l-1.464-1.464a3 3 0 0 1-4.001-4.001L7.829 9.243a5 5 0 0 0 6.929 6.929M7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.95 10.95 0 0 1-2.012 4.593l-3.86-3.86Q17 12.373 17 12a5 5 0 0 0-5.732-4.947z" /></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24" onClick={() => { setIsText(true) }}><path fill="#ffffff" d="M1.182 12C2.122 6.88 6.608 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.819 9s-9.878-3.88-10.818-9M12 17a5 5 0 1 0 0-10a5 5 0 0 0 0 10m0-2a3 3 0 1 1 0-6a3 3 0 0 1 0 6" /></svg>
              }
            </div>
            {passError && <p>{passError}</p>}
          </div>

          <Btn reverse={true} txt={"Iniciar sesión"} size={"1.4rem"} styles={{ width: "70%", height: 50 }} colorBg={"#00000040"} colorBgH={"#00000060"} action={() => { logIn() }} >
            <svg xmlns="http://www.w3.org/2000/svg" className='loginIcon' width="2rem" height="2rem" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="36" strokeDashoffset="36" d="M13 4l7 0c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0" /></path><path strokeDasharray="14" strokeDashoffset="14" d="M3 12h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0" /></path><path strokeDasharray="6" strokeDashoffset="6" d="M14.5 12l-3.5 -3.5M14.5 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="6;0" /></path></g></svg>
          </Btn>
        </div>
      </main>
      <Loader visible={loaderIsVisible} />
    </div>
  );
}