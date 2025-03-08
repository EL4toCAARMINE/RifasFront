import React, { useEffect, useRef, useState } from "react";
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
import Loader from "../../components/generals/Loader";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import PreviewPDFModal from "../../components/users/previewPDFModal";
import FooterComponent from "../../components/users/footerComponent";

export default function SearchTicket(){
    const {idRaffle} = useParams();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [paymentV, setPaymentV] = useState(false);

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
    });
    const [tickets, setTickets] = useState([
        { numberTicket: 1, id: 1, idRafle: 89, status: 2 },
        { numberTicket: 23, id: 2, idRafle: 89, status: 3 },
        { numberTicket: 3, id: 3, idRafle: 89, status: 3 },
        { numberTicket: 45, id: 4, idRafle: 89, status: 2 },
        { numberTicket: 5, id: 5, idRafle: 89, status: 3 },
        { numberTicket: 63, id: 6, idRafle: 89, status: 3 },
        { numberTicket: 72, id: 7, idRafle: 89, status: 2 }
    ]);

    const [seeTicket, setSeeTicket] = useState("");
    const [searchText, setSearchText] = useState("");
    
    // Busqueda de el ticket
    const search = () => {
        setSeeTicket(false);
        setIsVisible(true);

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
        setIsVisible(false);
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

    useEffect(() => {
      if (raffleData.paymentC || raffleData.paymentT) {
        setPaymentV(true);
      }
    }, [raffleData])
    

    // Crear pdf para descargar
    const showModal = () => {
        setIsVisibleModal(true);
    };

    return (  
        <div className="container-fluid searchTicketContainer">
            <HeaderUser center={true} name={raffleExist && raffleData.raffleName && raffleData.raffleName}/>
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
                        action={showModal}
                    >
                        <svg className="iconBtn" xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M12 11a1 1 0 0 1 1 1v6.584l1.293-1.292a1 1 0 0 1 1.414 1.416l-2.824 2.819c-.253.252-.5.473-.883.473c-.336 0-.566-.169-.788-.38l-2.919-2.912a1 1 0 0 1 1.414-1.416L11 18.584V12a1 1 0 0 1 1-1m-.5-9c2.784 0 5.16 1.75 6.086 4.212a6.003 6.003 0 0 1 .395 11.453a3 3 0 0 0-.858-1.785a3 3 0 0 0-1.914-.873L15 15v-3a3 3 0 0 0-5.995-.176L9 12v3a3 3 0 0 0-2.123.88a3 3 0 0 0-.875 2.02A5.002 5.002 0 0 1 5 8.416A6.5 6.5 0 0 1 11.5 2"/></g></svg>
                    </Btn>

                    <p className="goToRaffle" onClick={()=>navigate(`/buyTicket/${idRaffle}`)}>Ir a la rifa 🎲</p>

                    <PaymentInstructions visible={paymentV}/>
                </div>
            }

            <FooterComponent isVisible={raffleExist} organizerName={raffleData && raffleData.organizerName} contactPhone={raffleData && raffleData.contactPhone}/>

            <Loader visible={isVisible}/>
            <PreviewPDFModal visibleM={isVisibleModal} purchase={purchase} tickets={tickets} raffleData={raffleData} setIsVisible={setIsVisible} setIsVisibleM={setIsVisibleModal}/>
        </div>
    );
}