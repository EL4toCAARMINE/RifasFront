import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Raffles({data}){
    const navigate = useNavigate();
    const { id, raffleName, status, date, organizerName, numberOfTickets } = data;
    
    const [statustext, setStatusText] = useState({
        text: "Status",
        color: "#A3A3A3"
    });
    const [optionsVisible, setOptionsVisible] = useState(false);

    useEffect(()=>{
        switch (status) {
            case 1:
                setStatusText({text: "LLeno", color: "#ff9500"});
                break;
            case 2:
                setStatusText({text: "Finalizado", color: "#ff0000"});
                break;
            case 3:
                setStatusText({text: "Disponible", color: "#0CA732"});
                break;
            default:
                setStatusText({text: "Status", color: "#A3A3A3"});
                break;
        }
    },[]);

    const updateR = (event) => {
        event.stopPropagation();
        setOptionsVisible(false);
    }

    const deleteR = (event) => {
        event.stopPropagation();
        setOptionsVisible(false);
    }
    
    const openOptions = (event) => {
        event.stopPropagation();
        setOptionsVisible(true);
    }
    
    const goToRaffle = () => {
        navigate("/raffleAdmin");
    }

    return (  
        <div className="col-12 col-md-6 col-lg-5 col-xl-4 raffleComponentContainer" onClick={()=>goToRaffle()}>
            <div className="raffleC">
                <div className="optionsI">
                    <div className="statusC" style={{background: statustext.color}}>
                        <p>{statustext.text}</p>
                    </div>
                    <div className="optionsC" onClick={openOptions}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><path fill="#A3A3A3" d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/></svg>
                    </div>
                    {optionsVisible &&
                        <div className="optionsEE" onMouseLeave={()=>setOptionsVisible(false)}>
                            <div onClick={updateR}>
                                <p>Editar</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><path fill="none" stroke="#324AB2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"/></svg>
                            </div>
                            <div onClick={deleteR}>
                                <p>Eliminar</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><path fill="none" stroke="#ff0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                            </div>
                        </div>
                    }
                </div>

                <p><span>Nombre de la rifa: </span>{raffleName}</p>
                <p><span>Fecha: </span>{date}</p>
                <p><span>Organizador: </span>{organizerName}</p>
                <p><span>Cantidad de números: </span>{numberOfTickets}</p>
            </div>
        </div>
    );
}