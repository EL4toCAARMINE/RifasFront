import React, { useEffect, useState } from 'react';
import HeaderUser from '../../components/users/headerUser';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Talonario from '../../components/generals/talonario';
import { convertToUnix, unixToStringYMD } from '../../utils/DateUnixFunctions';
import PaymentInstructions from '../../components/users/paymentInstructions';
import ErrorScreenComponent from '../../components/generals/errorScreenComponent';
import Btn from '../../components/generals/btn';
import FooterComponent from '../../components/users/footerComponent';
import RandomTicket from '../../components/users/randomTicket';
import Loader from '../../components/generals/loader';
import Swal from 'sweetalert2';
import Api from '../../utils/Api';

export default function BuyTicket() {
    const { idRaffle } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // ancho de la pantalla para mostrar un menu de un diseño u otro
    const [width, setWidth] = useState(window.innerWidth);
    // editar el menu burger del menu
    const [menuOpen, setMenuOpen] = useState(2);
    const [isVisible, setIsVisible] = useState(false);

    const [raffleExist, setRaffleExist] = useState(true);
    const [menuStatus, setMenuStatus] = useState(1);
    const [winner, setWinner] = useState(null);
    // const [winner, setWinner] = useState({idWinner: 2, numberWinner: 2});

    const [today, setToday] = useState(null);
    const [needInstructionsP, setNeedInstructionsP] = useState(false);

    const [tickets, setTickets] = useState(null);

    const [raffleData, setRaffleData] = useState(null);

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

    // Busqueda de el ticket
    const getAllData = async () => {
        setIsVisible(true);
        try {
            let uri = import.meta.env.VITE_URL + "raffleUser/getRaffle/" + idRaffle;
            let api = new Api(uri, "GET");
            await api.call().then((res) => {
                if (res.response) {
                    let tickestsL = res.result.tickets;
                    setTickets(tickestsL);
                    delete res.result.tickets;
                    if (res.result.winner === 1) {
                        setWinner({ winner: res.result === 1 ? true : false, numberWinner: res.result.winnerNumber })
                    }
                    setRaffleData(res.result);
                    setRaffleExist(true);
                } else {
                    showAlert(res.message, "warning");
                    setRaffleExist(false);
                }
            });
        } catch (e) {
            showAlert("Error de conexión", "error");
            setRaffleExist(false);
        }

        setIsVisible(false);
    }

    // Verificar que la rifa exista
    useEffect(() => {
        const getToday = new Date();
        setToday(convertToUnix(getToday));

        // reiniciando el scroll
        window.scrollTo(0, 0);

        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        getAllData();

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    // detectar la apertura del menu
    useEffect(() => {
        const body = document.body;

        if (menuOpen == 1) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    }, [menuOpen]);

    useEffect(() => {
        if (raffleData) {
            if (raffleData.paymentC || raffleData.paymentT) {
                setNeedInstructionsP(true);
            }
        }
    }, [raffleData]);

    const goToSearch = () => {
        navigate(`/searchTicket/${idRaffle}`)
    };

    return (
        <div className="container-fluid containerBuyTicket">
            <HeaderUser name={raffleData ? raffleData.raffleName : " "} route={`/raffleInstructions/${idRaffle}`}>
                {width > 1000 ?
                    <nav className="menu">
                        <ul>
                            <a className={menuStatus == 1 ? 'selected' : 'section'} onClick={() => setMenuStatus(1)} href='#section1'><li>Detalles</li></a>
                            {!winner &&
                                <a className={menuStatus == 2 ? 'selected' : 'section'} onClick={() => setMenuStatus(2)} href='#section2'><li>Selección de boletos</li></a>
                            }
                            {!winner &&
                                (raffleData && (raffleData.paymentC || raffleData.paymentT) &&
                                    <a className={menuStatus == 3 ? 'selected' : 'section'} onClick={() => setMenuStatus(3)} href='#section3'><li>¿Cómo pagar?</li></a>
                                )
                            }
                            <a className={menuStatus == 4 ? 'selected' : 'section'} onClick={() => setMenuStatus(4)} href='#section4'><li>Talonario</li></a>
                            <a className={menuStatus == 5 ? 'selected' : 'section'} onClick={() => setMenuStatus(5)} href='#section5'><li>Contacto</li></a>
                        </ul>
                    </nav>
                    :
                    <div className='burgerMenu'>
                        {menuOpen == 1 ?
                            <svg onClick={() => setMenuOpen(0)} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 3v18M12 3v18M6 3v18" /></svg>
                            :
                            <svg onClick={() => setMenuOpen(1)} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18" /></svg>
                        }
                    </div>
                }
            </HeaderUser>

            <div style={{ height: 50 }}></div>

            {raffleExist && !isVisible ?
                <main>
                    <div id='section1' className="containerData">
                        <div className="dataR">
                            <h2>Detalles del articulo que se rifara</h2>

                            <div className="row" style={{ flexDirection: width < 800 && "column" }}>
                                <div className="imgContainer" style={{ maxWidth: width < 800 && "100%" }}>
                                    <img src={raffleData ? raffleData.image : "#"} alt="Articulo que se rifara" />
                                </div>
                                <p>{raffleData ? raffleData.articleDetails : ""}</p>
                            </div>

                            <h2>Detalles de la rifa</h2>

                            <div className="row">
                                <p>{raffleData ? raffleData.raffleDetails : ""}</p>
                            </div>

                            {winner ?
                                <div className="result">
                                    <h3>Felicidades 🎉🎉</h3>
                                    <p>La rifa se llevo a cabo el día 📅  {raffleData ? raffleData.dateRaffled ? unixToStringYMD(raffleData.date) : "dd/mm/yy" : "dd/mm/yy"}</p>
                                    <p>El número ganador es el:</p>
                                    <span>#{winner.numberWinner}</span>
                                </div>
                                :
                                <div className="date">
                                    <p>La rifa se llevara a cabo el día 📅  {raffleData ? raffleData.date ? unixToStringYMD(raffleData.dateRaffled) : "dd/mm/yy" : "dd/mm/yy"}</p>
                                </div>
                            }
                        </div>
                    </div>

                    {!winner && (tickets && tickets.length !== 0) &&
                        <div id="section2" className="ticketsSelection">
                            <RandomTicket listAvailableT={tickets.filter(ticket => ticket.status === 1)} raffleData={raffleData} reloadPage={getAllData} />
                        </div>
                    }

                    {!winner &&
                        <div id='section3' className="paymentI">
                            <PaymentInstructions visible={needInstructionsP} />
                            <Btn
                                txt={"Consultar ticket digital"}
                                colorBg={"#c71585"}
                                colorBgH={"#df47a7"}
                                size={"1.6rem"}
                                action={goToSearch}
                                styles={{
                                    height: 50,
                                    width: "90%",
                                    maxWidth: 500,
                                    marginTop: 20
                                }}
                            >
                                <svg className='iconBtn' xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19z" /></svg>
                            </Btn>
                        </div>
                    }

                    <div id='section4' className="containerTickets">
                        {tickets && tickets.length !== 0 &&
                            <Talonario isAdmin={false} tickets={tickets} setTickets={setTickets} />
                        }
                    </div>
                </main>
                :
                (!raffleExist && !isVisible ? <ErrorScreenComponent message={"Esta rifa no existe"} /> : <></>)
            }
            {!isVisible &&
                <div id='section5' className="fC">
                    <FooterComponent isVisible={raffleExist} organizerName={raffleData && raffleData.organizerName} contactPhone={raffleData && raffleData.contactPhone} />
                </div>
            }

            <nav className={`menuVertical ${menuOpen == 1 && 'slide-in'} ${menuOpen == 0 && 'slide-out'}`}>
                <ul>
                    <a className={menuStatus == 1 ? 'selected' : 'section'} onClick={() => { setMenuStatus(1); setMenuOpen(0); }} href='#section1'><li>Detalles</li></a>
                    {!winner &&
                        <a className={menuStatus == 2 ? 'selected' : 'section'} onClick={() => { setMenuStatus(2); setMenuOpen(0); }} href='#section2'><li>Selección de boletos</li></a>
                    }
                    {!winner &&
                        (raffleData && (raffleData.paymentC || raffleData.paymentT) &&
                            <a className={menuStatus == 3 ? 'selected' : 'section'} onClick={() => { setMenuStatus(3); setMenuOpen(0); }} href='#section3'><li>¿Cómo pagar?</li></a>
                        )
                    }
                    <a className={menuStatus == 4 ? 'selected' : 'section'} onClick={() => { setMenuStatus(4); setMenuOpen(0); }} href='#section4'><li>Talonario</li></a>
                    <a className={menuStatus == 5 ? 'selected' : 'section'} onClick={() => { setMenuStatus(5); setMenuOpen(0); }} href='#section5'><li>Contacto</li></a>
                </ul>
            </nav>

            <Loader visible={isVisible} />
        </div>
    );
}