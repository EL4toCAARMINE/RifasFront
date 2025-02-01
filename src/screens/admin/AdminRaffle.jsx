import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/admin/headerAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorScreenComponent from '../../components/generals/errorScreenComponent';
import Btn from "../../components/generals/btn";
import Swal from 'sweetalert2';
import { convertToUnix, unixToString, unixToStringYMD } from '../../utils/DateUnixFunctions';
import Talonario from '../../components/generals/talonario';

export default function AdminRaffle(){
    const navigate = useNavigate();
    const {idRaffle} = useParams();
    
    const [today, setToday] = useState(null);
    const [toraffleIsVisible, setToRaffleIsVisible] = useState(false);
    const [dataRaffle, setDataRaffle] = useState(null);

    const [tickets, setTickets] = useState([
        { numberTicket: 1, id: 1, idRafle: 89, status: 2 },
        { numberTicket: 2, id: 2, idRafle: 89, status: 3 },
        { numberTicket: 3, id: 3, idRafle: 89, status: 1 },
        { numberTicket: 4, id: 4, idRafle: 89, status: 2 },
        { numberTicket: 5, id: 5, idRafle: 89, status: 1 },
        { numberTicket: 6, id: 6, idRafle: 89, status: 3 },
        { numberTicket: 7, id: 7, idRafle: 89, status: 2 },
        { numberTicket: 8, id: 8, idRafle: 89, status: 1 },
        { numberTicket: 9, id: 9, idRafle: 89, status: 3 },
        { numberTicket: 10, id: 10, idRafle: 89, status: 2 },
        { numberTicket: 11, id: 11, idRafle: 89, status: 1 },
        { numberTicket: 12, id: 12, idRafle: 89, status: 3 },
        { numberTicket: 13, id: 13, idRafle: 89, status: 2 },
        { numberTicket: 14, id: 14, idRafle: 89, status: 1 },
        { numberTicket: 15, id: 15, idRafle: 89, status: 3 },
        { numberTicket: 16, id: 16, idRafle: 89, status: 2 },
        { numberTicket: 17, id: 17, idRafle: 89, status: 1 },
        { numberTicket: 18, id: 18, idRafle: 89, status: 3 },
        { numberTicket: 19, id: 19, idRafle: 89, status: 2 },
        { numberTicket: 20, id: 20, idRafle: 89, status: 1 },
        { numberTicket: 21, id: 21, idRafle: 89, status: 3 },
        { numberTicket: 22, id: 22, idRafle: 89, status: 2 },
        { numberTicket: 23, id: 23, idRafle: 89, status: 1 },
        { numberTicket: 24, id: 24, idRafle: 89, status: 3 },
        { numberTicket: 25, id: 25, idRafle: 89, status: 2 },
        { numberTicket: 26, id: 26, idRafle: 89, status: 1 },
        { numberTicket: 27, id: 27, idRafle: 89, status: 3 },
        { numberTicket: 28, id: 28, idRafle: 89, status: 2 },
        { numberTicket: 29, id: 29, idRafle: 89, status: 1 },
        { numberTicket: 30, id: 30, idRafle: 89, status: 3 },
        { numberTicket: 31, id: 31, idRafle: 89, status: 2 },
        { numberTicket: 32, id: 32, idRafle: 89, status: 1 },
        { numberTicket: 33, id: 33, idRafle: 89, status: 3 },
        { numberTicket: 34, id: 34, idRafle: 89, status: 2 },
        { numberTicket: 35, id: 35, idRafle: 89, status: 1 },
        { numberTicket: 36, id: 36, idRafle: 89, status: 3 },
        { numberTicket: 37, id: 37, idRafle: 89, status: 2 },
        { numberTicket: 38, id: 38, idRafle: 89, status: 1 },
        { numberTicket: 39, id: 39, idRafle: 89, status: 3 },
        { numberTicket: 40, id: 40, idRafle: 89, status: 2 },
        { numberTicket: 41, id: 41, idRafle: 89, status: 1 },
        { numberTicket: 42, id: 42, idRafle: 89, status: 3 },
        { numberTicket: 43, id: 43, idRafle: 89, status: 2 },
        { numberTicket: 44, id: 44, idRafle: 89, status: 1 },
        { numberTicket: 45, id: 45, idRafle: 89, status: 3 },
        { numberTicket: 46, id: 46, idRafle: 89, status: 2 },
        { numberTicket: 47, id: 47, idRafle: 89, status: 1 },
        { numberTicket: 48, id: 48, idRafle: 89, status: 3 },
        { numberTicket: 49, id: 49, idRafle: 89, status: 2 },
        { numberTicket: 50, id: 50, idRafle: 89, status: 1 },
        { numberTicket: 51, id: 51, idRafle: 89, status: 3 },
        { numberTicket: 52, id: 52, idRafle: 89, status: 2 },
        { numberTicket: 53, id: 53, idRafle: 89, status: 1 },
        { numberTicket: 54, id: 54, idRafle: 89, status: 3 },
        { numberTicket: 55, id: 55, idRafle: 89, status: 2 },
        { numberTicket: 56, id: 56, idRafle: 89, status: 1 },
        { numberTicket: 57, id: 57, idRafle: 89, status: 3 },
        { numberTicket: 58, id: 58, idRafle: 89, status: 2 },
        { numberTicket: 59, id: 59, idRafle: 89, status: 1 },
        { numberTicket: 60, id: 60, idRafle: 89, status: 3 },
        { numberTicket: 61, id: 61, idRafle: 89, status: 2 },
        { numberTicket: 62, id: 62, idRafle: 89, status: 1 },
        { numberTicket: 63, id: 63, idRafle: 89, status: 3 },
        { numberTicket: 64, id: 64, idRafle: 89, status: 2 },
        { numberTicket: 65, id: 65, idRafle: 89, status: 1 },
        { numberTicket: 66, id: 66, idRafle: 89, status: 3 },
        { numberTicket: 67, id: 67, idRafle: 89, status: 2 },
        { numberTicket: 68, id: 68, idRafle: 89, status: 1 },
        { numberTicket: 69, id: 69, idRafle: 89, status: 3 },
        { numberTicket: 70, id: 70, idRafle: 89, status: 2 },
        { numberTicket: 71, id: 71, idRafle: 89, status: 1 },
        { numberTicket: 72, id: 72, idRafle: 89, status: 3 },
        { numberTicket: 73, id: 73, idRafle: 89, status: 2 },
        { numberTicket: 74, id: 74, idRafle: 89, status: 1 },
        { numberTicket: 75, id: 75, idRafle: 89, status: 3 },
        { numberTicket: 76, id: 76, idRafle: 89, status: 2 },
        { numberTicket: 77, id: 77, idRafle: 89, status: 1 },
        { numberTicket: 78, id: 78, idRafle: 89, status: 3 },
        { numberTicket: 79, id: 79, idRafle: 89, status: 2 },
        { numberTicket: 80, id: 80, idRafle: 89, status: 1 },
        { numberTicket: 81, id: 81, idRafle: 89, status: 3 },
        { numberTicket: 82, id: 82, idRafle: 89, status: 2 },
        { numberTicket: 83, id: 83, idRafle: 89, status: 1 },
        { numberTicket: 84, id: 84, idRafle: 89, status: 3 },
        { numberTicket: 85, id: 85, idRafle: 89, status: 2 },
        { numberTicket: 86, id: 86, idRafle: 89, status: 1 },
        { numberTicket: 87, id: 87, idRafle: 89, status: 3 },
        { numberTicket: 88, id: 88, idRafle: 89, status: 2 },
        { numberTicket: 89, id: 89, idRafle: 89, status: 1 },
        { numberTicket: 90, id: 90, idRafle: 89, status: 3 },
        { numberTicket: 91, id: 91, idRafle: 89, status: 2 },
        { numberTicket: 92, id: 92, idRafle: 89, status: 1 },
        { numberTicket: 93, id: 93, idRafle: 89, status: 3 },
        { numberTicket: 94, id: 94, idRafle: 89, status: 2 },
        { numberTicket: 95, id: 95, idRafle: 89, status: 1 },
        { numberTicket: 96, id: 96, idRafle: 89, status: 3 },
        { numberTicket: 97, id: 97, idRafle: 89, status: 2 },
        { numberTicket: 98, id: 98, idRafle: 89, status: 1 },
        { numberTicket: 99, id: 99, idRafle: 89, status: 3 },
        { numberTicket: 100, id: 100, idRafle: 89, status: 2 }
    ]);   

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const backToDash = () => {
        navigate("/dashAdmin");
    }

    const editRaffle = () => {
        navigate(`/editRaffle/${idRaffle}`)
    }

    const deleteRaffle = () => {
        console.log("Delete");
    }

    useEffect(() => {
        
        setDataRaffle({
            id: 6,
            raffleName: "Rifa de pantalla",
            raffleLink: "https://www.rifasahuazo.com/rifa",
            canalW: "https://www.whatsapp.com/channel/canalrifa",
            date: 1738360000,
            raffled: false
        })

        const getToday = new Date();
        setToday(convertToUnix(getToday));
        
        // reiniciando el scroll
        window.scrollTo(0, 0);
    }, []);

    const openRulette = () => {
        if (!dataRaffle.raffled) {
            if (dataRaffle.date < today) {
                setToRaffleIsVisible(true);
            }else{
                Swal.fire({
                    title: "Solo se puede realizar el sorteo en la fecha marcada " + unixToStringYMD(dataRaffle.date) + " o despues",
                    icon: "info",
                    confirmButtonText: "Entendido",
                    customClass: {
                        container: "alertErrorDate",
                        confirmButton: "button",
                        title: "title"
                    }
                })
            }
        }
    }
    
    // Copiando datos
    const copyIdRaffle = () => {
        const text = document.getElementById("idRaffle").value; // Obtiene el texto del <p>
        navigator.clipboard
        .writeText(text) // Copia el texto al portapapeles
        .then(() => {
            Toast.fire({
                icon: "info",
                title: "ID copiado en el portapapeles"
            });
        })
        .catch((err) => {
            Toast.fire({
                icon: "error",
                title: "Error al copiar"
            });
        });
    }

    const copyLink = () => {
        const text = document.getElementById("linkRaffle").value; // Obtiene el texto del <p>
        navigator.clipboard
        .writeText(text) // Copia el texto al portapapeles
        .then(() => {
            Toast.fire({
                icon: "info",
                title: "Link copiado en el portapapeles"
            });
        })
        .catch((err) => {
            Toast.fire({
                icon: "error",
                title: "Error al copiar"
            });
        });
    }

    const copyLinkChannel = () => {
        const text = document.getElementById("linkChannelRaffle").value; // Obtiene el texto del <p>
        navigator.clipboard
        .writeText(text) // Copia el texto al portapapeles
        .then(() => {
            Toast.fire({
                icon: "info",
                title: "Link del canal copiado en el portapapeles"
            });
        })
        .catch((err) => {
            Toast.fire({
                icon: "error",
                title: "Error al copiar"
            });
        });
    }   

    return (  
        <div className="container-fluid containerAdminRaffle">
            <HeaderAdmin>
                <svg onClick={backToDash} className='arrowBack' xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><path fill="#000000" d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"/></svg>
                
                {dataRaffle && 
                    <div className="editAndDeleteC">
                        <Btn 
                            colorBg={"#c71585"} 
                            colorBgH={"#c8559e"}
                            size={"1.2rem"}
                            txt={"Editar Rifa"}
                            action={editRaffle}
                            styles={{borderRadius: 25, width: 120, height: 35, justifyContent: "space-evenly", marginRight: 20}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"/></svg>
                        </Btn>
                        <Btn 
                            hidden={true}
                            colorBg={"#FF0000"} 
                            colorBgH={"#dc2626"} 
                            action={deleteRaffle}
                            styles={{borderRadius: 25, width: 35, height: 35}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 24 24"><path fill="#ffffff" d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7zm4 12H8v-9h2zm6 0h-2v-9h2zm.618-15L15 2H9L7.382 4H3v2h18V4z"/></svg>
                        </Btn>
                    </div>
                }
            </HeaderAdmin>

            <div style={{height:50, background: "#ff0000"}}></div>

            {dataRaffle ? 
                <main>
                    <div className="containerData">
                        <div className="dataR">
                            <h2>{dataRaffle ? dataRaffle.raffleName : "Rifa"}</h2>

                            <div className="row">
                                <div className="col-12 col-md-6 copyAreaC">
                                    <p className='title'>ID de la Rifa</p>
                                    <div className="copyArea">
                                        <input type="text" className="copyB" value={dataRaffle ? dataRaffle.id : "#"} id='idRaffle' disabled={true}/>
                                        <Btn
                                            action={copyIdRaffle}
                                            colorBg={"#c71585"}
                                            colorBgH={"#c8559e"}
                                            size={"1.2rem"}
                                            txt={"Copiar"}
                                            styles={{flex: 2, maxWidth: 70, borderRadius: 10, height: 30}}
                                        ></Btn>
                                    </div>
                                    <p className='details'>Este ID es el medio por el cual el usuario puede encontrar esta rifa.</p>
                                </div>
                                <div className="col-12 col-md-6 copyAreaC">
                                    <p className='title'>Link de la Rifa</p>
                                    <div className="copyArea">
                                        <input type="text" className="copyB" value={dataRaffle ? dataRaffle.raffleLink : "https://..."} id='linkRaffle' disabled={true}/>
                                        <Btn
                                            action={copyLink}
                                            colorBg={"#c71585"} 
                                            colorBgH={"#c8559e"}
                                            size={"1.2rem"}
                                            txt={"Copiar"}
                                            styles={{flex: 2, maxWidth: 70, borderRadius: 10, height: 30}}
                                        ></Btn>
                                    </div>
                                    <p className='details'>Este link es el medio por el cual las personas podrán obtener boletos.</p>
                                </div>
                                {/* {dataRaffle && dataRaffle.canalW &&  */}
                                    <div className="col-12 copyAreaC">
                                        <p className='title'>Link al canal de WhatsApp</p>
                                        <div className="copyArea">
                                            <input type="text" className="copyB" value={dataRaffle ? dataRaffle.canalW : "https://www.whatsapp.com/channel/..."} id='linkChannelRaffle' disabled={true}/>
                                            <Btn
                                                action={copyLinkChannel}
                                                colorBg={"#c71585"} 
                                                colorBgH={"#c8559e"}
                                                size={"1.2rem"}
                                                txt={"Copiar"}
                                                styles={{flex: 2, maxWidth: 70, borderRadius: 10, height: 30}}
                                            ></Btn>
                                        </div>
                                        <p className='details'>Canal de WhatsApp en el que se daran noticias respecto a la rifa.</p>
                                    </div>
                                {/* } */}
                            </div>

                            <h2>Métodos de pago habilitados</h2>

                            <div className="row">
                                {/* {dataRaffle && dataRaffle.paymentE &&  */}
                                    <div className="col-12 col-md-4 paymentM">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24"><g fill="none" stroke="#00000080" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#000000"><path d="M2 4.5h6.757a3 3 0 0 1 2.122.879L14 8.5m-9 5H2m6.5-6l2 2a1.414 1.414 0 1 1-2 2L7 10c-.86.86-2.223.957-3.197.227L3.5 10"/><path d="M5 11v4.5c0 1.886 0 2.828.586 3.414S7.114 19.5 9 19.5h9c1.886 0 2.828 0 3.414-.586S22 17.386 22 15.5v-3c0-1.886 0-2.828-.586-3.414S19.886 8.5 18 8.5H9.5"/><path d="M15.25 14a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0"/></g></svg>
                                        <h3>Pago en efectivo</h3>
                                        <p>Los participantes deben pagar en efectivo antes de la fecha indicada. Pueden contactarte al número de WhatsApp visible en la página.</p>
                                    </div>
                                {/* } */}
                                {/* {dataRaffle && dataRaffle.paymentT &&  */}
                                    <div className="col-12 col-md-4 paymentM">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 56 56"><path fill="#00000080" d="M9.625 47.71h36.75c4.898 0 7.36-2.413 7.36-7.241V15.555c0-4.828-2.462-7.266-7.36-7.266H9.625c-4.898 0-7.36 2.438-7.36 7.266v24.914c0 4.828 2.461 7.242 7.36 7.242M6.039 15.767c0-2.438 1.313-3.703 3.656-3.703h36.633c2.32 0 3.633 1.265 3.633 3.703v1.968H6.039Zm3.656 28.172c-2.344 0-3.656-1.243-3.656-3.68V23.055h43.922v17.203c0 2.437-1.313 3.68-3.633 3.68ZM12.39 37h5.743c1.383 0 2.297-.914 2.297-2.25v-4.336c0-1.312-.914-2.25-2.297-2.25H12.39c-1.383 0-2.297.938-2.297 2.25v4.336c0 1.336.914 2.25 2.297 2.25"/></svg>
                                        <h3>Pago con tarjeta</h3>
                                        <p>Los participantes pueden pagar con tarjeta. El nombre y número de la tarjeta registrada estarán visibles en la página de la rifa.</p>
                                    </div>
                                {/* } */}
                                {/* {dataRaffle && dataRaffle.paymentC &&  */}
                                    <div className="col-12 col-md-4 paymentM">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 640 512"><path fill="#00000080" d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23l-174-.2c-13.3 0-24-10.7-24-24s10.7-24 24-24h174.1zM105 377l-23 23h174c13.3 0 24 10.7 24 24s-10.7 24-24 24H81.9l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64h241.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52h117.4c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0l19.3-19.3V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52H138.6c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64m64 64H96v64c35.3 0 64-28.7 64-64m384 192c-35.3 0-64 28.7-64 64h64zm-224 32a96 96 0 1 0 0-192a96 96 0 1 0 0 192"/></svg>
                                        <h3>Pago con transferencia</h3>
                                        <p>Los interesados pueden realizar el pago por transferencia a la cuenta CLABE registrada. Los datos  estaran visibles en la página de la rifa.</p>
                                    </div>
                                {/* } */}
                            </div>

                            <div className="date">
                                <p>La rifa se llevara a cabo el día {dataRaffle ? dataRaffle.date ? unixToStringYMD(1766601600) : "dd/mm/yy" : unixToStringYMD(1766601600) }</p>
                            </div>
                        </div>
                    </div>

                    <div className="containerTickets">
                        <Btn
                            size={"1.6rem"}
                            styles={{
                                justifyContent: "space-evenly", 
                                width: 250, 
                                height: 50,
                                boxShadow: "0px 4px 4px #00000060"
                            }}
                            txt={"Realizar sorteo"}
                            colorBg={"linear-gradient(90deg, #80E0E6 0%, #227ABA 50%, #C71585 100%)"}
                            colorBgH={"linear-gradient(90deg, #C71585 0%, #227ABA 50%, #80E0E6 100%)"}
                            action={openRulette}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 20 20"><path fill="#ffffff" d="M12.437 3.25A5 5 0 0 0 10.001 5a5 5 0 0 0-2.437-1.75A3 3 0 0 1 10.001 2c1.003 0 1.892.493 2.436 1.25m-8.81 7.97a6.504 6.504 0 0 1 5.85-5.2a4 4 0 1 0-5.85 5.199m12.747 0a4 4 0 1 0-5.85-5.199a6.504 6.504 0 0 1 5.85 5.199M15.5 12.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-7.5-2a.5.5 0 0 0 .5.5h2.24q-.154.22-.32.485c-.483.772-1.028 1.846-1.166 2.953a.5.5 0 1 0 .992.124c.112-.893.567-1.819 1.022-2.547a11 11 0 0 1 .843-1.168l.012-.014l.004-.004A.5.5 0 0 0 11.75 10H8.5a.5.5 0 0 0-.5.5"/></svg>
                        </Btn>
                        <Talonario isAdmin={true} tickets={tickets} setTickets={setTickets}/>
                    </div>
                </main>
            :
                <ErrorScreenComponent message={"Error la esta rifa no existe"}/>
            }
        </div>
    );
}