import React, { useState } from "react";
import InputText from "../generals/inputText";
import Btn from "../generals/btn";

export default function RandomTicket({listAvailableT, raffleData, reloadPage}){
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [total, setTotal] = useState(0);
    const [ticketsSelected, setTicketsSelected] = useState([]);

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const validateInputs = () => {
        let flag = true;
        setNameError("");
        setPhoneError("");

        if (name == "" || name == null || name.length < 10) {
            setNameError("Ingresa tu nombre completo")
            flag = false;
        }

        if (phone == "" || phone == null) {
            setPhoneError("Ingresa tu numero de télefono")
            flag = false;
        }else if(!/^\d{10}$/.test(phone)){
            setPhoneError("Ingresa un numero de télefono valido")
        }
    }

    return(
        <div className="containerRandomTicketForm">
            <h2 className='titles'>Selección de boletos</h2>

            <InputText
                text={"Nombre completo"}
                textPlace={"Juan Pérez"}
                maxL={100}
                width={"90%"}
                val={name}
                setVal={setName}
                textError={nameError}
                classAdd={"inputRF"}
            />
            <InputText
                text={"Número de télefono"}
                textPlace={"776-111-11-11"}
                maxL={10}
                width={"90%"}
                val={phone}
                setVal={setPhone}
                textError={phoneError}
                classAdd={"inputRF"}
            />

            <div className="containerAddBtn">
                <p className="ticketsS">Boletos seleccionados</p>
                <Btn 
                    reverse={true}
                >

                </Btn>
            </div>

            <div className="tickets">
                {ticketsSelected.length === 0 ? 
                    <div className="errorPage">
                        Error    
                    </div>
                :   
                    <div className="ticketsSelected">
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                }
            </div>

            <div className="containerTotalC">
                <p className="totalTxt">Total: ${total}</p>
                <Btn/>
            </div>

            <div className="containerPayM">
                <p>Puedes realizar el pago de tus boletos a través de los siguientes medios:</p>

                {raffleData && raffleData.paymentC && (
                    <p>Número de cuenta CLABE: <span>{raffleData.nameAccount} | {raffleData.account}</span></p>
                )}
                {raffleData && raffleData.paymentT && (
                    <p>Tarjeta de débito: <span>{raffleData.nameCard} | {raffleData.card}</span></p>
                )}
                {raffleData && raffleData.paymentE && (
                    <p>Efectivo: <span>Contáctame por WhatsApp o por Teléfono al {raffleData.contactPhone}</span></p>
                )}
            </div>
        </div>
    )
};