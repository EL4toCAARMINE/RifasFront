import React, { useEffect, useState } from 'react';
import HeaderUser from '../../components/users/headerUser';
import { useNavigate, useParams } from 'react-router-dom';
import Talonario from '../../components/generals/talonario';
import { convertToUnix, unixToStringYMD } from '../../utils/DateUnixFunctions';
import PaymentInstructions from '../../components/users/paymentInstructions';
import ErrorScreenComponent from '../../components/generals/errorScreenComponent';
import Btn from '../../components/generals/btn';
import FooterComponent from '../../components/users/footerComponent';
import RandomTicket from '../../components/users/randomTicket';

export default function BuyTicket(){
    const {idRaffle} = useParams();
    const navigate = useNavigate();

    // ancho de la pantalla para mostrar un menu de un diseño u otro
    const [width, setWidth] = useState(window.innerWidth);
    // editar el menu burger del menu
    const [menuOpen, setMenuOpen] = useState(2);
    
    const [raffleExist, setRaffleExist] = useState(true);
    const [menuStatus, setMenuStatus] = useState(1);
    const [winner, setWinner] = useState(null);
    // const [winner, setWinner] = useState({idWinner: 2, numberWinner: 2});
    
    const [today, setToday] = useState(null);
    const [needInstructionsP, setNeedInstructionsP] = useState(false);

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
        { numberTicket: 10, id: 10, idRafle: 89, status:2 },
        { numberTicket: 11, id: 11, idRafle: 89, status:1 },
        { numberTicket: 12, id: 12, idRafle: 89, status:3 },
        { numberTicket: 13, id: 13, idRafle: 89, status:2 },
        { numberTicket: 14, id: 14, idRafle: 89, status:1 },
        { numberTicket: 15, id: 15, idRafle: 89, status:3 },
        { numberTicket: 16, id: 16, idRafle: 89, status:2 },
        { numberTicket: 17, id: 17, idRafle: 89, status:1 },
        { numberTicket: 18, id: 18, idRafle: 89, status:3 },
        { numberTicket: 19, id: 19, idRafle: 89, status:2 },
        { numberTicket: 20, id: 20, idRafle: 89, status:1 },
        { numberTicket: 21, id: 21, idRafle: 89, status:3 },
        { numberTicket: 22, id: 22, idRafle: 89, status:2 },
        { numberTicket: 23, id: 23, idRafle: 89, status:1 },
        { numberTicket: 24, id: 24, idRafle: 89, status:3 },
        { numberTicket: 25, id: 25, idRafle: 89, status:2 },
        { numberTicket: 26, id: 26, idRafle: 89, status:1 },
        { numberTicket: 27, id: 27, idRafle: 89, status:3 },
        { numberTicket: 28, id: 28, idRafle: 89, status:2 },
        { numberTicket: 29, id: 29, idRafle: 89, status:1 },
        { numberTicket: 30, id: 30, idRafle: 89, status:3 },
        { numberTicket: 31, id: 31, idRafle: 89, status:2 },
        { numberTicket: 32, id: 32, idRafle: 89, status:1 },
        { numberTicket: 33, id: 33, idRafle: 89, status:3 },
        { numberTicket: 34, id: 34, idRafle: 89, status:2 },
        { numberTicket: 35, id: 35, idRafle: 89, status:1 },
        { numberTicket: 36, id: 36, idRafle: 89, status:3 },
        { numberTicket: 37, id: 37, idRafle: 89, status:2 },
        { numberTicket: 38, id: 38, idRafle: 89, status:1 },
        { numberTicket: 39, id: 39, idRafle: 89, status:3 },
        { numberTicket: 40, id: 40, idRafle: 89, status:2 },
        { numberTicket: 41, id: 41, idRafle: 89, status:1 },
        { numberTicket: 42, id: 42, idRafle: 89, status:3 },
        { numberTicket: 43, id: 43, idRafle: 89, status:2 },
        { numberTicket: 44, id: 44, idRafle: 89, status:1 },
        { numberTicket: 45, id: 45, idRafle: 89, status:3 },
        { numberTicket: 46, id: 46, idRafle: 89, status:2 },
        { numberTicket: 47, id: 47, idRafle: 89, status:1 },
        { numberTicket: 48, id: 48, idRafle: 89, status:3 },
        { numberTicket: 49, id: 49, idRafle: 89, status:2 },
        { numberTicket: 50, id: 50, idRafle: 89, status:1 },
        { numberTicket: 51, id: 51, idRafle: 89, status:3 },
        { numberTicket: 52, id: 52, idRafle: 89, status:2 },
        { numberTicket: 53, id: 53, idRafle: 89, status:1 },
        { numberTicket: 54, id: 54, idRafle: 89, status:3 },
        { numberTicket: 55, id: 55, idRafle: 89, status:2 },
        { numberTicket: 56, id: 56, idRafle: 89, status:1 },
        { numberTicket: 57, id: 57, idRafle: 89, status:3 },
        { numberTicket: 58, id: 58, idRafle: 89, status:2 },
        { numberTicket: 59, id: 59, idRafle: 89, status:1 },
        { numberTicket: 60, id: 60, idRafle: 89, status:3 },
        { numberTicket: 61, id: 61, idRafle: 89, status:2 },
        { numberTicket: 62, id: 62, idRafle: 89, status:1 },
        { numberTicket: 63, id: 63, idRafle: 89, status:3 },
        { numberTicket: 64, id: 64, idRafle: 89, status:2 },
        { numberTicket: 65, id: 65, idRafle: 89, status:1 },
        { numberTicket: 66, id: 66, idRafle: 89, status:3 },
        { numberTicket: 67, id: 67, idRafle: 89, status:2 },
        { numberTicket: 68, id: 68, idRafle: 89, status:1 },
        { numberTicket: 69, id: 69, idRafle: 89, status:3 },
        { numberTicket: 70, id: 70, idRafle: 89, status:2 },
        { numberTicket: 71, id: 71, idRafle: 89, status:1 },
        { numberTicket: 72, id: 72, idRafle: 89, status:3 },
        { numberTicket: 73, id: 73, idRafle: 89, status:2 },
        { numberTicket: 74, id: 74, idRafle: 89, status:1 },
        { numberTicket: 75, id: 75, idRafle: 89, status:3 },
        { numberTicket: 76, id: 76, idRafle: 89, status:2 },
        { numberTicket: 77, id: 77, idRafle: 89, status:1 },
        { numberTicket: 78, id: 78, idRafle: 89, status:3 },
        { numberTicket: 79, id: 79, idRafle: 89, status:2 },
        { numberTicket: 80, id: 80, idRafle: 89, status:1 },
        { numberTicket: 81, id: 81, idRafle: 89, status:3 },
        { numberTicket: 82, id: 82, idRafle: 89, status:2 },
        { numberTicket: 83, id: 83, idRafle: 89, status:1 },
        { numberTicket: 84, id: 84, idRafle: 89, status:3 },
        { numberTicket: 85, id: 85, idRafle: 89, status:2 },
        { numberTicket: 86, id: 86, idRafle: 89, status:1 },
        { numberTicket: 87, id: 87, idRafle: 89, status:3 },
        { numberTicket: 88, id: 88, idRafle: 89, status:2 },
        { numberTicket: 89, id: 89, idRafle: 89, status:1 },
        { numberTicket: 90, id: 90, idRafle: 89, status:3 },
        { numberTicket: 91, id: 91, idRafle: 89, status:2 },
        { numberTicket: 92, id: 92, idRafle: 89, status:1 },
        { numberTicket: 93, id: 93, idRafle: 89, status:3 },
        { numberTicket: 94, id: 94, idRafle: 89, status:2 },
        { numberTicket: 95, id: 95, idRafle: 89, status:1 },
        { numberTicket: 96, id: 96, idRafle: 89, status:3 },
        { numberTicket: 97, id: 97, idRafle: 89, status:2 },
        { numberTicket: 98, id: 98, idRafle: 89, status:1 },
        { numberTicket: 99, id: 99, idRafle: 89, status:3 },
        { numberTicket: 100, id: 100, idRafle: 89, status:2 }
    ]);  

    const [raffleData, setRaffleData] = useState(null);

    const getAllData = () => {
        //Aqui consumo de la api y actualizacion de la lista de tickets y data de la rifa
    };

    // Verificar que la rifa exista
    useEffect(() => {
        const getToday = new Date();
        setToday(convertToUnix(getToday));
        
        // reiniciando el scroll
        window.scrollTo(0, 0);
        
        const handleResize = () => setWidth(window.innerWidth);
    
        window.addEventListener("resize", handleResize);

        if (idRaffle > 6) {
            setRaffleExist(false);
        }else{
            setRaffleExist(true);
            setRaffleData({
                raffleName: "Rifa de Verano",
                organizerName: "Juan Pérez",
                contactPhone: "5551234567",
                canalW: "https://micanalw.com",
                image: "https://preview.redd.it/mx302upz546a1.jpg?width=640&crop=smart&auto=webp&s=8ea96b6996795c62084d3384e9ec3f9537ce3aa9",
                articleDetails: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis eros sit amet tortor tempus, nec imperdiet eros faucibus. Ut rhoncus gravida turpis nec blandit. Ut sit amet eleifend velit. Donec facilisis ex viverra, egestas diam id, lacinia metus. Ut ante ante, tincidunt ac est sed, venenatis pulvinar risus. Nunc malesuada, magna nec fringilla facilisis, quam metus finibus diam, sit amet pretium odio neque viverra urna. Maecenas a tortor dapibus, iaculis urna quis, placerat mi. \nInteger at mattis massa. In commodo mollis leo non posuere. Vestibulum sed nibh mattis, dignissim velit eget, hendrerit mauris. \nNulla facilisi. Morbi lacinia ultrices elementum. Donec non elit venenatis risus ullamcorper condimentum et ut neque. Integer sed.",
                raffleDetails: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis eros sit amet tortor tempus, nec imperdiet eros faucibus. Ut rhoncus gravida turpis nec blandit. Ut sit amet eleifend velit. Donec facilisis ex viverra, egestas diam id, lacinia metus. Ut ante ante, tincidunt ac est sed, venenatis pulvinar risus. Nunc malesuada, magna nec fringilla facilisis, quam metus finibus diam, sit amet pretium odio neque viverra urna. Maecenas a tortor dapibus, iaculis urna quis, placerat mi. \nInteger at mattis massa. In commodo mollis leo non posuere. Vestibulum sed nibh mattis, dignissim velit eget, hendrerit mauris. \nNulla facilisi. Morbi lacinia ultrices elementum. Donec non elit venenatis risus ullamcorper condimentum et ut neque. Integer sed.",
                numberOfTickets: "150",
                date: "1740000000",
                dateRaffled: "1740000000",
                paymentE: true,
                paymentT: true,
                paymentC: true,
                nameCard: "María López",
                card: "1234567812345678",
                nameAccount: "Carlos Ramírez",
                account: "123456789012345678",
            });
        }

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

    useEffect(()=>{
        if (raffleData) {
            if (raffleData.paymentC || raffleData.paymentT) {
                setNeedInstructionsP(true);
            }
        }
    }, [raffleData]);
    
    const goToSearch = () => {
        navigate(`/searchTicket/${idRaffle}`)
    };

    return(
        <div className="container-fluid containerBuyTicket">
            <HeaderUser name={raffleData ? raffleData.raffleName : " "} route={`/raffleInstructions/${idRaffle}`}>
                {width > 1000 ? 
                    <nav className="menu">
                        <ul>
                            <a className={menuStatus == 1 ? 'selected' : 'section'} onClick={() => setMenuStatus(1)} href='#section1'><li>Detalles</li></a>
                            <a className={menuStatus == 2 ? 'selected' : 'section'} onClick={() => setMenuStatus(2)} href='#section2'><li>Selección de boletos</li></a>
                            {raffleData && (raffleData.paymentC || raffleData.paymentT) &&
                                <a className={menuStatus == 3 ? 'selected' : 'section'} onClick={() => setMenuStatus(3)} href='#section3'><li>¿Cómo pagar?</li></a>
                            }
                            <a className={menuStatus == 4 ? 'selected' : 'section'} onClick={() => setMenuStatus(4)} href='#section4'><li>Talonario</li></a>
                            <a className={menuStatus == 5 ? 'selected' : 'section'} onClick={() => setMenuStatus(5)} href='#section5'><li>Contacto</li></a>
                        </ul>
                    </nav>
                :
                    <div className='burgerMenu'>
                        {menuOpen == 1 ? 
                            <svg onClick={()=>setMenuOpen(0)} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 3v18M12 3v18M6 3v18"/></svg>
                        :
                            <svg onClick={()=>setMenuOpen(1)} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
                        }
                    </div>
                }
            </HeaderUser>

            <div style={{height:50}}></div>

            {raffleExist ? 
                <main>
                    <div id='section1' className="containerData">
                        <div className="dataR">
                            <h2>Detalles del articulo que se rifara</h2>
                            
                            <div className="row" style={{flexDirection: width < 800 && "column"}}>
                                <div className="imgContainer" style={{maxWidth: width < 800 && "100%"}}>
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

                    <div id="section2" className="ticketsSelection">
                        <RandomTicket listAvailableT={tickets.filter(ticket => ticket.status === 1)} raffleData={raffleData} reloadPage={getAllData}/>
                    </div>

                    <div id='section3' className="paymentI">
                        <PaymentInstructions visible={needInstructionsP}/>
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
                            <svg className='iconBtn' xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19z"/></svg>
                        </Btn>
                    </div>

                    <div id='section4' className="containerTickets">
                        <Talonario isAdmin={false} tickets={tickets} setTickets={setTickets}/>
                    </div>
                </main>
            :
                <ErrorScreenComponent message={"Error esta rifa no existe"}/>
            }
            
            <div id='section5' className="fC">
                <FooterComponent isVisible={raffleExist} organizerName={raffleData && raffleData.organizerName} contactPhone={raffleData && raffleData.contactPhone}/>
            </div>

            <nav className={`menuVertical ${menuOpen == 1 && 'slide-in'} ${menuOpen == 0 && 'slide-out'}`}>
                <ul>
                    <a className={menuStatus == 1 ? 'selected' : 'section'} onClick={() => {setMenuStatus(1); setMenuOpen(0);}}href='#section1'><li>Detalles</li></a>
                    <a className={menuStatus == 2 ? 'selected' : 'section'} onClick={() => {setMenuStatus(2); setMenuOpen(0);}}href='#section2'><li>Selección de boletos</li></a>
                    {raffleData && (raffleData.paymentC || raffleData.paymentT) &&
                        <a className={menuStatus == 3 ? 'selected' : 'section'} onClick={() => {setMenuStatus(3); setMenuOpen(0);}} href='#section3'><li>¿Cómo pagar?</li></a>
                    }
                    <a className={menuStatus == 4 ? 'selected' : 'section'} onClick={() => {setMenuStatus(4); setMenuOpen(0);}}href='#section4'><li>Talonario</li></a>
                    <a className={menuStatus == 5 ? 'selected' : 'section'} onClick={() => {setMenuStatus(5); setMenuOpen(0);}}href='#section5'><li>Contacto</li></a>
                </ul>
            </nav>
        </div>
    );
}