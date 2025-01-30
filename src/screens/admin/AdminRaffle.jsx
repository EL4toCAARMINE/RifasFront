import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorScreenComponent from '../../components/errorScreenComponent';
import Btn from "../../components/btn";
import Swal from 'sweetalert2';
import { unixToStringYMD } from '../../utils/DateUnixFunctions';
import Talonario from '../../components/talonario';

export default function AdminRaffle(){
    const navigate = useNavigate();
    const {idRaffle} = useParams();
    
    const [existRaffle, setExistRaffle] = useState(true);
    const [dataRaffle, setDataRaffle] = useState(null);

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
        if (idRaffle > 6) {
            setExistRaffle(false);
        }
    }, [])
    
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

    const tickets = [
        { numberTicket: 37, id: 1, idRafle: 89 },
        { numberTicket: 22, id: 2, idRafle: 14 },
        { numberTicket: 53, id: 3, idRafle: 45 },
        { numberTicket: 91, id: 4, idRafle: 76 },
        { numberTicket: 12, id: 5, idRafle: 30 },
        { numberTicket: 48, id: 6, idRafle: 60 },
        { numberTicket: 6, id: 7, idRafle: 98 },
        { numberTicket: 85, id: 8, idRafle: 23 },
        { numberTicket: 77, id: 9, idRafle: 55 },
        { numberTicket: 34, id: 10, idRafle: 67 },
        { numberTicket: 19, id: 11, idRafle: 42 },
        { numberTicket: 63, id: 12, idRafle: 88 },
        { numberTicket: 27, id: 13, idRafle: 11 },
        { numberTicket: 74, id: 14, idRafle: 9 },
        { numberTicket: 49, id: 15, idRafle: 31 },
        { numberTicket: 90, id: 16, idRafle: 20 },
        { numberTicket: 15, id: 17, idRafle: 70 },
    ];

    return (  
        <div className="container-fluid containerAdminRaffle">
            <HeaderAdmin>
                <svg onClick={backToDash} className='arrowBack' xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><path fill="#000000" d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"/></svg>

                <div className="editAndDeleteC">
                    <Btn 
                        colorBg={"#c71585"} 
                        colorBgH={"#c8559e"}
                        size={"1.2rem"}
                        txt={"Editar Rifa"}
                        action={editRaffle}
                        styles={{borderRadius: 25, width: 120, height: 35, justifyContent: "space-evenly", marginRight: 20}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"/></svg>
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
            </HeaderAdmin>

            <div style={{height:50, background: "#ff0000"}}></div>

            {existRaffle ? 
                <main>
                    <div className="containerData">
                        <div className="dataR">
                            <h2>{dataRaffle ? dataRaffle.raffleName : "Rifa"}</h2>

                            <div className="row">
                                <div className="col-12 col-md-6 copyAreaC">
                                    <p className='title'>ID de la Rifa</p>
                                    <div className="copyArea">
                                        <input type="text" className="copyB" value={dataRaffle ? dataRaffle.raffleName : "#"} id='idRaffle' disabled={true}/>
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
                                        <input type="text" className="copyB" value={dataRaffle ? dataRaffle.raffleName : "https://..."} id='linkRaffle' disabled={true}/>
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
                                            <input type="text" className="copyB" value={dataRaffle ? dataRaffle.raffleName : "https://www.whatsapp.com/channel/..."} id='linkChannelRaffle' disabled={true}/>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24"><g fill="none" stroke="#00000080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#000000"><path d="M2 4.5h6.757a3 3 0 0 1 2.122.879L14 8.5m-9 5H2m6.5-6l2 2a1.414 1.414 0 1 1-2 2L7 10c-.86.86-2.223.957-3.197.227L3.5 10"/><path d="M5 11v4.5c0 1.886 0 2.828.586 3.414S7.114 19.5 9 19.5h9c1.886 0 2.828 0 3.414-.586S22 17.386 22 15.5v-3c0-1.886 0-2.828-.586-3.414S19.886 8.5 18 8.5H9.5"/><path d="M15.25 14a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0"/></g></svg>
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
                            action={()=>{"agregar navegacion a sorteo"}}
                            styles={{
                                justifyContent: "space-evenly", 
                                width: 250, 
                                height: 50,
                                boxShadow: "0px 4px 4px #00000060"
                            }}
                            txt={"Realizar sorteo"}
                            colorBg={"linear-gradient(90deg, #80E0E6 0%, #227ABA 50%, #C71585 100%)"}
                            colorBgH={"linear-gradient(90deg, #C71585 0%, #227ABA 50%, #80E0E6 100%)"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 20 20"><path fill="#ffffff" d="M12.437 3.25A5 5 0 0 0 10.001 5a5 5 0 0 0-2.437-1.75A3 3 0 0 1 10.001 2c1.003 0 1.892.493 2.436 1.25m-8.81 7.97a6.504 6.504 0 0 1 5.85-5.2a4 4 0 1 0-5.85 5.199m12.747 0a4 4 0 1 0-5.85-5.199a6.504 6.504 0 0 1 5.85 5.199M15.5 12.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-7.5-2a.5.5 0 0 0 .5.5h2.24q-.154.22-.32.485c-.483.772-1.028 1.846-1.166 2.953a.5.5 0 1 0 .992.124c.112-.893.567-1.819 1.022-2.547a11 11 0 0 1 .843-1.168l.012-.014l.004-.004A.5.5 0 0 0 11.75 10H8.5a.5.5 0 0 0-.5.5"/></svg>
                        </Btn>
                        <Talonario isAdmin={true} number={100} arrSold={tickets}/>
                    </div>
                </main>
            :
                <ErrorScreenComponent message={"Error la esta rifa no existe"}/>
            }
        </div>
    );
}