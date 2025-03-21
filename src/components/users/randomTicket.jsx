import React, { useEffect, useRef, useState } from "react";
import InputText from "../generals/inputText";
import Btn from "../generals/btn";
import Swal from "sweetalert2";
import PreviewPDFModal from "./previewPDFModal";
import Loader from "../generals/loader";

export default function RandomTicket({ listAvailableT, raffleData, reloadPage }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [total, setTotal] = useState(0);

    const [ticketsSelected, setTicketsSelected] = useState([]);
    // Lista de tickets disponibles Falata verificar 
    const [ticketsA, setTicketsA] = useState(listAvailableT);
    // Para descargar ticket debera setearese volviendo a llamar a getRaffle
    const [purchase, setPurchase] = useState(null);

    const [canRaffle, setCanRaffle] = useState(false);
    const [canBuy, setCanBuy] = useState(true);

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [isVisibleLoader, setIsVisibleLoader] = useState(false);

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
            setPhoneError("Ingresa tu numero de télefono");
            flag = false;
        } else if (!/^\d{10}$/.test(phone)) {
            setPhoneError("Ingresa un numero de télefono valido")
        }

        return flag;
    }

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

    // Seleccionar lo boletos
    function randomTicketSelect() {
        // Evitar errores si no hay boletos disponibles
        if (ticketsA.length === 0) {
            showAlert("Ya no quedan boletos disponibles", "warning");
            return;
        }

        // Clonar los arrays para evitar mutaciones directas
        let ticketsS2 = [...ticketsSelected];
        let ticketsA2 = [...ticketsA];

        // Elegir índice aleatorio
        let ticSelI = Math.floor(Math.random() * ticketsA2.length);

        // Extraer el boleto seleccionado sin mutar el array original
        let [ticSel] = ticketsA2.splice(ticSelI, 1);

        // Actualizar estados sin modificar directamente las referencias
        setTicketsA(ticketsA2);
        setTotal(total + ticSel.numberTicket)
        setTicketsSelected([...ticketsS2, ticSel]); // Agregar el nuevo boleto al array
    }

    // guardar los boletos seleccionados
    const createPurchase = async () => {

        // Limpiar la pagina
        const clearPage = () => {
            setTicketsSelected([]);
            setTotal(0);
            setName("");
            setNameError("");
            setPhone("");
            setPhoneError("");
            setCanBuy(true);
            setCanRaffle(false);
            reloadPage();
        }

        // verificamos si los datos de contacto fueron registrados antes de guardar los boletos 
        let canContinue = validateInputs();

        if (canContinue) {
            // hay que consultar la api y en caso de que salga todo bien hay que mostrar el alert

            Swal.fire({
                title: "Se han registrado tus boletos",
                icon: "success",
                confirmButtonText: "Entendido",
                showCancelButton: true,
                cancelButtonText: '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#ffffff" d="M13 13v5.585l1.828-1.828l1.415 1.415L12 22.414l-4.243-4.242l1.415-1.415L11 18.585V13zM12 2a7 7 0 0 1 6.954 6.194A5.5 5.5 0 0 1 18 18.978V17a6 6 0 0 0-11.996-.225L6 17v1.978a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2"/></svg> Descargar ticket',
                reverseButtons: true,
                html: ' <div> <p>Para concluir y asegurar tus boletos, no olvides realizar tu pago, ya que los boletos no pagados no se tomarán en cuenta para el sorteo</p> <span>Número de seguimiento:</span> <strong>AKO54</strong> <p>Guarda este número, ya que te servirá para consultar esta transacción en otro momento o descargar tu ticket</p> </div>',
                allowOutsideClick: true,
                didClose: clearPage,
                customClass: {
                    container: "alertSwal",
                    confirmButton: "buttonCancel buttonCancel2",
                    cancelButton: "button button2",
                    title: "text",
                    htmlContainer: "swalHTMLBuy",
                    actions: "foot"
                },
            }).then((result) => {
                // Al cerrar limpiamos
                if (result.dismiss === Swal.DismissReason.cancel) {
                    // mostramos la pantalla de preview para el ticket y que se descargue pero si algun ticket no se pudo apartar porque ya estaba apartado mandmos una alrta antes de mostrar el modal

                    // cuando se cierra el modal se borrara lo que contenga el listado de tickets seleccionados habra que hacer que una api consuma y traiga los datos de la compra con los tickets que selecciono o aue cuando se registren por defecto ala api los retorne para poder insertarlos en el pdf recordar que los datos de la purchase igual hay q eliminarlos al cerrar el modal
                    setIsVisibleModal(true);
                }
            });
        } else {
            Swal.fire({
                title: "Recuerda que debes registrar tu nombre y número de teléfono correctamente, ya que son los medios por los cuales se te podrá identificar y entregar tu premio en caso de salir ganador.",
                icon: "warning",
                confirmButtonText: "Entendido",
                customClass: {
                    container: "alertSwal",
                    confirmButton: "button",
                    title: "title"
                }
            });
        }
    }

    // limpiamos el purchase al cerrar el modal del pdf
    useEffect(() => {
        if (isVisibleModal == false) {
            setPurchase(null);
        }
    }, [isVisibleModal]);

    // Verificamos si aún se puede seleccionar un boleto
    useEffect(() => {
        if (ticketsSelected.length >= 10) {
            setCanRaffle(true);
            Swal.fire({
                title: "Solo puedes seleccionar 10 boletos por compra. Para agregar más boletos, termina esta compra y realiza una nueva.",
                icon: "info",
                confirmButtonText: "Entendido",
                customClass: {
                    container: "alertSwal",
                    confirmButton: "button",
                    title: "title"
                }
            });
        }

        if (ticketsSelected.length > 0) {
            setCanBuy(false);
        }
    }, [ticketsSelected])

    return (
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
                    txt={"Agregar boleto"}
                    colorBg={canRaffle ? "grey" : "#c71585"}
                    colorBgH={"#df47a7"}
                    size={"1.4rem"}
                    styles={{ width: "50%", height: 40, justifyContent: "space-around", cursor: canRaffle && "default" }}
                    disable={canRaffle}
                    action={randomTicketSelect}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 12 16"><path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z" fill="#ffffff" /></svg>
                </Btn>
            </div>

            <div className="ticketsRR">
                {ticketsSelected.length === 0 ?
                    <div className="errorPage">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 0 }} width="10rem" height="10rem" viewBox="0 0 128 128"><path fill="#A65F3E" d="M3.16 33.47v65.27c0 1.11.9 2.02 2.02 2.02h115.96c1.11 0 2.02-.9 2.02-2.02V33.47c0-1.11-.9-2.02-2.02-2.02H5.18c-1.12 0-2.02.91-2.02 2.02m83.01 62.81c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.38-.57.7-.94.94m0-16.83c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.37-.57.7-.94.94m0-17.83c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.37-.57.7-.94.94m0-16.83c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.37-.57.7-.94.94" /><path fill="#FFD54F" d="M3.16 30.47v65.27c0 1.11.9 2.02 2.02 2.02h115.96c1.11 0 2.02-.9 2.02-2.02V30.47c0-1.11-.9-2.02-2.02-2.02H5.18c-1.12 0-2.02.91-2.02 2.02m83.01 62.81c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.38-.57.7-.94.94m0-16.83c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.37-.57.7-.94.94m0-17.83c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.37-.57.7-.94.94m0-16.83c-5.57 3.57-11.49-2.34-7.91-7.91c.24-.38.56-.7.94-.94c5.57-3.57 11.49 2.34 7.91 7.91c-.25.37-.57.7-.94.94" /><path fill="none" stroke="#4E342E" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8" d="M15.06 51.03h32.56M15.06 66.51h23.07m15.96 0h4.84" opacity=".8" /><path fill="#6D4C41" d="M13.56 80.46h3v9.3h-3zm25.15 0h3v9.3h-3zm5.44 0h3v9.3h-3zm-24.68 0h6v9.3h-6zm30.19 0h7v9.3h-7zm-21.52 0h8v9.3h-8z" opacity=".5" /><path fill="#E2A610" d="M122.04 28.45H4.27c-.62 0-1.11.5-1.11 1.11v9.96h74.45c-.72-1.67-.64-3.77.76-5.82c.19-.28.44-.53.72-.72c4.42-2.93 9.1.17 9.1 4.36c0 .77-.16 1.51-.45 2.17h35.41v-9.96c.01-.6-.49-1.1-1.11-1.1" /><path fill="#6D4C41" d="M97.81 48.68h18.23v16.69H97.81z" opacity=".5" /><path fill="none" stroke="#4E342E" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" d="M98.98 74.14h9.07m-9.07 6.32h14.28" opacity=".8" /></svg>
                        <p>Aún no has agregado boletos</p>
                    </div>
                    :
                    <div className="ticketsSelected">
                        {ticketsSelected.map((tS, index) => {
                            return <div key={index} className="ticketS">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#000000" d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2" /></svg>
                                <p>Boleto #{tS.numberTicket}</p>
                            </div>
                        })}
                    </div>
                }
            </div>

            <div className="containerTotalC">
                <p className="totalTxt">Total: ${total}</p>
                <Btn
                    txt={"Confirmar selección"}
                    size={"1.4rem"}
                    colorBg={canBuy && "grey"}
                    styles={{ width: "70%", height: 40, cursor: canBuy && "default" }}
                    action={createPurchase}
                    disable={canBuy}
                />
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

            <Loader visible={isVisibleLoader} />
            {purchase &&
                <PreviewPDFModal visibleM={isVisibleModal} purchase={purchase.purchaseData} tickets={purchase.ticketsPurchase} raffleData={purchase.dataRaffle} setIsVisible={setIsVisibleLoader} setIsVisibleM={setIsVisibleModal} />
            }
        </div>
    )
};