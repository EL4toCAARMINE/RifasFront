import React, { useState } from "react";
import Swal from "sweetalert2";
import Btn from "../generals/btn";

export default function ({visible, setIsVisible, data}){
    const [ticket, setTicket] = useState({
        numberTicket: 1,
        id: 1,
        idRaffle: 89,
        status: 2,
        buyerName: "John Doe",
        buyerPhone: "123-456-7890"
    });
    const [selectedOption, setSelectedOption] = useState(2);

    //Manejar cambios en los radio buttons
    const changeStatus = (e) => {
        e.stopPropagation();
        setSelectedOption(e.target.value);
    };

    const revertStatus = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Al marcar este boleto como disponible, se eliminará su asociación con la persona que lo apartó",
            customClass:{
                container: "swalUpdateStatusAdmin",
                title: "title",
                cancelButton: "cancel",
                confirmButton: "confirm",
                popup: "cont"
            },
            text: `Para confirmar, escribe el número del boleto (${ticket.numberTicket}):`,
            input: "text",
            inputPlaceholder: "Escribe aquí el número del boleto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Verificar",
            cancelButtonText: "Cancelar",
            preConfirm: (inputValue) => {
              if (inputValue != ticket.numberTicket) {
                
                Swal.showValidationMessage("Número incorrecto. Intenta de nuevo.");
                return false; // Incorrecto
              }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedOption(e.target.value);
            }
        });
    };

    // Actualizar el status en la base de datos
    const updateStatus = (e) => {
        e.stopPropagation();
        setSelectedOption(2);
        setIsVisible(false);
    }
    
    const cancelUpdateStatus = (e) => {
        e.stopPropagation();
        setSelectedOption(2);
        setIsVisible(false);
    }

    // Si visible es true, se bloquea el scroll
    React.useEffect(() => {
        const body = document.body;
    
        if (visible) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    }, [visible]);

    return visible && (  
        <div className="backUSP" onClick={cancelUpdateStatus}>
            <div className="containerFormUS" onClick={(e)=>e.stopPropagation()}>
                {ticket.status == 3 &&
                    <svg className="close" onClick={cancelUpdateStatus} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 1216 1312"><path fill="#000000" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"/></svg>
                }

                <div className="textsC">
                    <h4>Boleto #{ticket.numberTicket}</h4>
                    <hr />
                    <div className="textC">
                        <p>Comprador:</p>
                        <p className="bold">{ticket.buyerName}</p>
                    </div>
                    <div className="textC">
                        <p>Numero:</p>
                        <p className="bold">{ticket.buyerPhone}</p>
                    </div>
                </div>

                {ticket.status == 2 ?
                    <div className="containerPayStatus">
                        <h4>Cambiar estado del boleto</h4>
                        <div className="containerRadio">
                            <label htmlFor="available">Disponible</label>
                            <input type="radio" name="available" id="available" value={1} checked={selectedOption == 1} onChange={revertStatus}/>
                        </div>
                        <div className="containerRadio">
                            <label htmlFor="noPay">No pagado</label>
                            <input type="radio" name="available" id="noPay" value={2} checked={selectedOption == 2} onChange={changeStatus}/>
                        </div>
                        <div className="containerRadio">
                            <label htmlFor="pay">Pagado</label>
                            <input type="radio" name="available" id="pay" value={3} checked={selectedOption == 3} onChange={changeStatus}/>
                        </div>

                        <div className="containerBtns">
                            <Btn
                                txt={"Guardar cambios"}
                                colorBg={"#c71585"}
                                colorBgH={"#df47a7"}
                                styles={{
                                    width: "48%",
                                    height: 30,
                                    marginRight: 2
                                }}
                                action={updateStatus}
                            />
                            <Btn
                                txt={"Cancelar"}
                                colorBg={"##000"}
                                colorBgH={"#4d4d4d"}
                                styles={{
                                    width: "48%",
                                    height: 30,
                                    marginLeft: 2
                                }}
                                action={cancelUpdateStatus}
                            />
                        </div>
                    </div>
                :
                    <div className="containerPayStatusS">
                        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 48 48"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path fill="#2F88FF" stroke="#000" d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"/><path stroke="#fff" d="M17 24L22 29L32 19"/></g></svg>
                        <p>Boleto pagado</p>
                    </div>
                }
            </div>
        </div>
    );
}