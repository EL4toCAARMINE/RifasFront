import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderUser from "../../components/users/headerUser";
import ErrorScreenComponent from "../../components/generals/errorScreenComponent";
import Btn from "../../components/generals/btn";

export default function RaffleInstructions(){
    const {idRaffle} = useParams();
    const navigate = useNavigate();

    const [raffleExist, setRaffleExist] = useState(true);
    const [raffleData, setRaffleData] = useState({
        raffleName: "Rifa de Verano",
        organizerName: "Juan Pérez",
        contactPhone: "5551234567",
        canalW: "https://micanalw.com",
        image: "https://preview.redd.it/mx302upz546a1.jpg?width=640&crop=smart&auto=webp&s=8ea96b6996795c62084d3384e9ec3f9537ce3aa9",
        previewImage: "https://preview.redd.it/mx302upz546a1.jpg?width=640&crop=smart&auto=webp&s=8ea96b6996795c62084d3384e9ec3f9537ce3aa9",
        articleDetails: "Un artículo exclusivo, único en su tipo y de gran calidad. Ideal para coleccionistas. Cuenta con un tamaño de 20 cm",
        raffleDetails: "Compra un boleto y participa en esta rifa única. Los ganadores serán contactados directamente. Si no registras bien tus datos se realizara un nuevo sorteo.",
        numberOfTickets: "150",
        date: "1740000000",
        paymentE: false,
        paymentT: true,
        paymentC: true,
        nameCard: "María López",
        card: "1234567812345678",
        nameAccount: "Carlos Ramírez",
        account: "123456789012345678",
    });

    const goToSearch = () => {
        navigate(`/searchTicket/${idRaffle}`)
    };

    const goToBuy = () => {
        navigate(`/buyTicket/${idRaffle}`)
    };

    useEffect(() => {
      if (idRaffle > 6) {
        setRaffleExist(false)
      }
    }, [])
    

    return (  
        <div className="container-fluid welcomeContainer">
            <HeaderUser route={"/"} center={true} name={raffleExist && raffleData.raffleName && raffleData.raffleName}/>
            {raffleExist ? 
                <div className="row containerInstructions">
                    <div className="col-md-12 col-lg-6 dataC">
                        <div className="iconC">
                            <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24"><path fill="#ffffff" d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2"/></svg>
                        </div>

                        <h2>¡Bienvenido a la Rifa!</h2>

                        <div className="containerSub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
                            <h3>Reglas Importantes</h3>
                        </div>

                        <ul>
                            <li>Los números de los boletos se asignan de manera aleatoria. El número que obtengas será el monto que pagarás.</li>
                            <li>Puedes seleccionar uno o varios boletos, con un máximo de 10 boletos por compra.</li>
                            <li>Cada boleto tiene un número único entre 1 y {raffleData.numberOfTickets ? raffleData.numberOfTickets : 100}.</li>
                            <li>Es obligatorio registrar tu nombre y número de teléfono, ya que estos datos serán la forma de identificarte. Asegúrate de ingresarlos correctamente.</li>
                            <li>El ganador será anunciado en la página de la rifa{raffleData.canalW && " o a través del canal de WhatsApp"}.</li>
                            <li>Una vez registrado, no podrás modificar los boletos seleccionados.</li>
                            <li>Tu boleto quedará reservado una vez confirmes tu selección. Sin embargo, para conservarlo, deberás pagarlo vía transferencia o en efectivo. Si tu número no está pagado y resulta ganador, será descartado y se realizará un nuevo sorteo para elegir otro ganador.</li>
                        </ul>
                    </div>

                    <div className="col-md-12 col-lg-6 dataC dataCRight">
                        <h2>¿Cómo participar?</h2>

                        <ol>
                            <li>Haz clic en el botón "Seleccionar Boletos".</li>
                            <li>Agrega la cantidad de boletos que desees.</li>
                            <li>Ingresa tu nombre y número de teléfono.</li>
                            <li>Verifica tus datos.</li>
                            <li>Confirma tu selección.</li>
                            <li>Toma una captura de pantalla de tus numeros o descarga el pdf.</li>
                            {raffleData.canalW &&
                                <li>Unete al canal de WhatsApp para enterarte de todas las novedades: <a href={raffleData.canalW} target="_blank">https://chat.whatsapp.com/Código</a></li>
                            }
                            <li>Realiza el pago de tus boletos por cualquiera de los medios indicados.</li>
                        </ol>

                        <div className="containerWin">
                            <p>El ganador será contactado al número de teléfono registrado durante su compra. ¡Mucha suerte!</p>
                        </div>

                        <Btn 
                            txt={"Buscar mi ticket"}
                            colorBg={"#c71585"}
                            colorBgH={"#df47a7"}
                            size={"1.6rem"}
                            action={goToSearch}
                            styles={{
                                height: 50,
                                width: "100%"
                            }}
                        >
                            <svg className="iconBtn" xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="#ffffff" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                        </Btn>
                        
                        <Btn 
                            txt={"Seleccionar boletos"}
                            size={"1.6rem"}
                            action={goToBuy}
                            styles={{
                                height: 50,
                                width: "100%",
                                marginTop: 10
                            }}
                        >
                            <svg className="iconBtn" xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="#ffffff" d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2"/></svg>
                        </Btn>
                    </div>
                </div>
            :    
                <ErrorScreenComponent message={"Esta rifa no existe"}/>
            }
        </div>
    );
}