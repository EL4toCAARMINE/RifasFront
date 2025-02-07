import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import castiel from "../assets/images/castiel404.webp";
import Btn from '../components/generals/btn';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      // Si hay historial, regresa a la página anterior
      navigate(-1);
    } else {
      // Si no hay historial, redirige al home
      navigate("/");
    }
  };

  return (
    <div className="container404">
        <div className="space-y-2">
            <img src={castiel} alt="imagen 404" className="cas" />
            <h1>404 Not Found</h1>
            <p>{"No pudimos encontrar la página que estabas buscando. A veces las cosas simplemente... no están donde esperas."}</p>
        </div>
        <Btn action={handleGoBack} size={"1.4rem"} styles={{justifyContent: "space-around"}} reverse={true} txt={"Volver al camino"}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 512 512"><path fill="#fff" d="M149.9 27.2L34.25 56.74v76.76L157.8 93.85l46.7-44.67zm132.8 57c-7.4.18-10.1 1.88.9 7.13C346.9 121.6 441.7 206.8 391.3 216.9C232.2 249 130.4 292.3 48.51 390.8C25.42 418.6 18 494.8 18 494.8h432.6s-139-21.1-147.8-75.7c-14.9-92.2 194.5-102.7 196.5-199.9c.9-43.2-88.3-124.99-184.4-132.52c-5.6-.44-22.7-2.71-32.2-2.48m-163.5 40.9l-32.69 10.5v122.2l35.99-10z"/></svg>
        </Btn>
    </div>
  );
}
