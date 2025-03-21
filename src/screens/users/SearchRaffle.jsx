import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/admin/headerAdmin';
import Loader from '../../components/generals/loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Api from "../../utils/Api";

export default function SearchRaffle() {
    const navigate = useNavigate();
    
    const [isVisible, setIsVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    // Función para mostrar alertas con SweetAlert2
    const showAlert = (title, icon) => {
        Swal.fire({
            title: title,
            icon: icon,
            confirmButtonText: "Entendido",
            customClass: {
                container: "alertSwal",
                confirmButton: "button",
                title: "title"
            }
        });
    };

    // Busqueda de rifa
    const search = async () => {
        setIsVisible(true);
        if (!searchText) {
            showAlert("Ingresa un id para buscar", "error");
        } else {
            try{
                let uri = import.meta.env.VITE_URL + "raffleUser/searchRaffleById/" + searchText;
                let api = new Api(uri, "GET");
                await api.call().then((res)=>{
                    if (res.response) {
                        navigate(`/raffleInstructions/${res.result.id}`, {state: res.result});
                    } else {
                        showAlert("Esta rifa no existe", "warning");
                    }
                });
            }catch(e){
                showAlert("Error de conexión", "error");
            }
        }
        setIsVisible(false);
    }

    // Identificando presionado del enter
    const handleKeyPress = (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [searchText]);

    return (
        <div className="container-fluid containerSearchRaffle">
            <HeaderAdmin></HeaderAdmin>
            <main>
                <div className="containerI">
                    <h2>🎉 ¡Bienvenido a Rifas Ahuazo! 🎉</h2>
                    <p className='welcome'>Para comenzar, ingresa el <strong>número de identificación</strong> de la rifa a la que has sido invitado. 🏷️
                        Si no conoces el número de identificación, solicítalo a la persona que te invitó.
                        O, si prefieres, salta este paso utilizando el <strong>enlace de invitación</strong> que te hayan compartido. 🔗</p>

                    <div className="containerInputS">

                        <svg className='search' xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="none" stroke="#c71585" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6" /></svg>

                        <input type="text" name="search" id="search" className='search' placeholder='Ingresa el id de la rifa' maxLength={16} value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                        <svg className='search searchA' onClick={search} xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 15 15"><path fill="#324AB2" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" /></svg>
                    </div>

                </div>
            </main>

            <Loader visible={isVisible}/>
        </div>
    );
}