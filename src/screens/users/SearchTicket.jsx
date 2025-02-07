import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderUser from "../../components/users/headerUser";
import ErrorScreenComponent from "../../components/generals/errorScreenComponent";
import Btn from "../../components/generals/btn";
import Swal from "sweetalert2";
import Uno from "../../assets/images/1.webp";
import Dos from "../../assets/images/2.webp";
import Tres from "../../assets/images/3.webp";
import Cuatro from "../../assets/images/4.webp";
import Cinco from "../../assets/images/5.webp";
import PaymentInstructions from "../../components/users/paymentInstructions";
import TicketComponent from "../../components/users/ticketComponent";

export default function SearchTicket(){
    const {idRaffle} = useParams();
    const navigate = useNavigate();

    const [raffleExist, setRaffleExist] = useState(true);
    const [raffleData, setRaffleData] = useState({
        raffleName: "Rifa de Verano",
        organizerName: "Juan Pérez",
        contactPhone: "5551234567",
        canalW: "https://micanalw.com",
        image: "https://preview.redd.it/mx302upz546a1.jpgwidth=640&crop=smart&auto=webps=8ea96b6996795c62084d3384e9ec3f9537ce3aa9",
        previewImage: "https://preview.redd.itmx302upz546a1.jpg?width=640&crop=smart&auto=webps=8ea96b6996795c62084d3384e9ec3f9537ce3aa9",
        articleDetails: "Un artículo exclusivo, único ensu tipo y de gran calidad. Ideal paracoleccionistas. Cuenta con un tamaño de 20 cm",
        raffleDetails: "Compra un boleto y participa enesta rifa única. Los ganadores serán contactadosdirectamente. Si no registras bien tus datos serealizara un nuevo sorteo.",
        numberOfTickets: "150",
        date: "1740000000",
        paymentE: true,
        paymentT: true,
        paymentC: true,
        nameCard: "María López",
        card: "1234567812345678",
        nameAccount: "Carlos Ramírez",
        account: "123456789012345678",
    });
    const [purchase, setPurchase] = useState({
        nameClient: "Kevin Alejandro",
        phoneClient: "7761236889",
        datePurchase: "1739000000",
        code: "AX23234"
    })
    const [tickets, setTickets] = useState([
        { numberTicket: 1, id: 1, idRafle: 89, status: 2 },
        { numberTicket: 23, id: 2, idRafle: 89, status: 3 },
        { numberTicket: 3, id: 3, idRafle: 89, status: 3 },
        { numberTicket: 45, id: 4, idRafle: 89, status: 2 },
        { numberTicket: 5, id: 5, idRafle: 89, status: 3 },
        { numberTicket: 63, id: 6, idRafle: 89, status: 3 },
        { numberTicket: 72, id: 7, idRafle: 89, status: 2 }
    ])

    const [seeTicket, setSeeTicket] = useState("");
    const [searchText, setSearchText] = useState("");
    
    // Busqueda de el ticket
    const search = () => {
        setSeeTicket(false);

        if (searchText === "") {
            Swal.fire({
                title: "Ingresa un código de seguimiento para buscar",
                icon: "error",
                confirmButtonText: "Entendido",
                customClass: {
                    container: "alertSwal",
                    confirmButton: "button",
                    title: "title"
                }
            });
        } else if (searchText <= 10) {
            setSeeTicket(true);
        }else{
            Swal.fire({
                title: "Este ticket no existe",
                icon: "warning",
                confirmButtonText: "Entendido",
                customClass: {
                    container: "alertSwal",
                    confirmButton: "button",
                    title: "title"
                }
            })
        }
    }

    // identificando cuando se da clichk en enter para buscar
    const handleKeyPress = (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    };
    
    useEffect(() => {
        document.addEventListener("keydown",handleKeyPress);
    
        return () => {
            document.removeEventListener("keydown",handleKeyPress);
        };
    }, [searchText]);

    // Verificar que la rifa exista
    useEffect(() => {
      if (idRaffle > 6) {
        setRaffleExist(false)
      }
    }, [])
    

    return (  
        <div className="container-fluid searchTicketContainer">
            <HeaderUser route={`/raffleInstructions/${idRaffle}`} center={true} name={raffleExist && raffleData.raffleName && raffleData.raffleName}/>
            {raffleExist ? 
                <main>
                    <img className="uno" src={Uno} alt="icono" />
                    <img className="dos" src={Dos} alt="icono" />
                    <img className="tres" src={Tres} alt="icono" />
                    <img className="cuatro" src={Cuatro} alt="icono" />
                    <img className="cinco" src={Cinco} alt="icono" />

                    <div className="containerI">
                        <h2>Ingresa tu código de seguimiento</h2>

                        <div className="containerInputS">

                            <svg className='search' xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="none" stroke="#c71585" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/></svg>

                            <input type="text" name="search" id="search" className='search' placeholder='Código de la seguimiento' maxLength={16} value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>

                            <svg className='search searchA' onClick={search} xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 15 15"><path fill="#324AB2" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"/></svg>
                        </div>

                    </div>
                </main>
            :    
                <ErrorScreenComponent message={"Esta rifa no existe"}/>
            }

            {raffleExist && seeTicket && 
                <div className="ticketFind">
                    <TicketComponent raffleData={raffleData} purchase={purchase} tickets={tickets}/>

                    <Btn 
                        txt={"Descargar ticket"}
                        colorBg={"#c71585"}
                        colorBgH={"#df47a7"}
                        size={"1.6rem"}
                        styles={{
                            height: 75,
                            width: "100%",
                            marginTop: 20
                        }}
                    >
                        <svg className="iconBtn" xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M12 11a1 1 0 0 1 1 1v6.584l1.293-1.292a1 1 0 0 1 1.414 1.416l-2.824 2.819c-.253.252-.5.473-.883.473c-.336 0-.566-.169-.788-.38l-2.919-2.912a1 1 0 0 1 1.414-1.416L11 18.584V12a1 1 0 0 1 1-1m-.5-9c2.784 0 5.16 1.75 6.086 4.212a6.003 6.003 0 0 1 .395 11.453a3 3 0 0 0-.858-1.785a3 3 0 0 0-1.914-.873L15 15v-3a3 3 0 0 0-5.995-.176L9 12v3a3 3 0 0 0-2.123.88a3 3 0 0 0-.875 2.02A5.002 5.002 0 0 1 5 8.416A6.5 6.5 0 0 1 11.5 2"/></g></svg>
                    </Btn>

                    <PaymentInstructions visible={true}/>
                </div>
            }

            {raffleExist && 
                <footer>
                    <div className="contact">
                        <p className="name">{raffleData.organizerName}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 256 258"><defs><linearGradient id="IconifyId194dcb468a9b873772" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1FAF38"/><stop offset="100%" stopColor="#60D669"/></linearGradient><linearGradient id="IconifyId194dcb468a9b873773" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#F9F9F9"/><stop offset="100%" stopColor="#FFF"/></linearGradient></defs><path fill="url(#IconifyId194dcb468a9b873772)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"/><path fill="url(#IconifyId194dcb468a9b873773)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"/><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"/></svg>
                        <p className="phone">{raffleData.contactPhone}</p>
                    </div>

                    <p className="copyright">2025, Rifas Ahuazo © Todos los derechos reservados</p>
                </footer>
            }
        </div>
    );
}