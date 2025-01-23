import React, { useState } from 'react';
import HeaderAdmin from "../../components/headerAdmin";
import Btn from "../../components/btn";
import { useNavigate } from 'react-router-dom';
import Raffles from '../../components/raffles';
import Loader from '../../components/Loader';
import Pagination from "../../components/pagination";

export default function DashAdmin(){
    const navigation = useNavigate();

    const [loaderIsVisible, setLoaderIsVisible] = useState(false);
    
    const [raffles, setRaffles] = useState([
        {
          id: 1,
          raffleName: "Holiday Raffle",
          status: 3, // 1: "full", 2: "finished", 3: "available"
          date: 1766601600, // UNIX
          organizerName: "John Doe",
          numberOfTickets: 500,
        },
        {
          id: 2,
          raffleName: "Summer Giveaway",
          status: 1, // 1: "full"
          date: 1755273600, // UNIX
          organizerName: "Alice Smith",
          numberOfTickets: 300,
        },
        {
          id: 3,
          raffleName: "Charity Raffle",
          status: 2, // 2: "finished"
          date: 1762723200, // UNIX
          organizerName: "Michael Brown",
          numberOfTickets: 200,
        },
        {
          id: 4,
          raffleName: "Tech Draw",
          status: 3, // 3: "available"
          date: 1751990400, // UNIX
          organizerName: "Sarah Johnson",
          numberOfTickets: 100,
        },
        {
          id: 5,
          raffleName: "Sports Lottery",
          status: 3, // 3: "available"
          date: 1759219200, // UNIX
          organizerName: "David Lee",
          numberOfTickets: 400,
        },
        {
          id: 6,
          raffleName: "Winter Bonanza",
          status: 2, // 2: "finished"
          date: 1736899200, // UNIX
          organizerName: "Laura Wilson",
          numberOfTickets: 250,
        }
    ]);

    //Paginacion
    const [page, setPage] = React.useState(1);
    const [forPage, setForPage] = React.useState(2);

    const logOut = () => {
        setLoaderIsVisible(true);
        setLoaderIsVisible(false);
        navigation("/loginAdmin");
    }

    const goToCreate = () => {
        navigation("/createRaffle");
    }

    return (
        <div className="container-fluid containerDashAdmin">
            <HeaderAdmin>
                <Btn 
                    size={"1.2rem"} 
                    reverse={true} 
                    colorBg={"#FF0000"} 
                    colorBgH={"#dc2626"} 
                    txt={"Cerrar Sesión"}
                    action={()=>logOut()}
                    styles={{justifyContent: "space-evenly", borderRadius: 25, position: "absolute", right: 20, width: 150, height: 35}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="36" strokeDashoffset="36" d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"/></path><path strokeDasharray="14" strokeDashoffset="14" d="M9 12h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path><path strokeDasharray="6" strokeDashoffset="6" d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="6;0"/></path></g></svg>
                </Btn>
            </HeaderAdmin>
            <main>
                <div className="topR">
                    <Btn
                        reverse={true}
                        size={"1.4rem"}
                        action={()=>goToCreate()}
                        styles={{
                            justifyContent: "space-evenly", 
                            width: 250, 
                            height: 50,
                            boxShadow: "0px 4px 4px #00000060"
                        }}
                        txt={"Crear nueva rifa"}
                        colorBg={"linear-gradient(90deg, #80E0E6 0%, #227ABA 50%, #C71585 100%)"}
                        colorBgH={"linear-gradient(90deg, #C71585 0%, #227ABA 50%, #80E0E6 100%)"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#ffffff" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4"/></svg>
                    </Btn>
                </div>
                {raffles ? 
                    <div className="row midR">
                        {raffles.slice((page - 1) * forPage, page * forPage).map((raffle, index) => {
                            return <Raffles key={index} data={raffle} />
                        })}
                    </div>
                :
                    <div className="midRN">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16rem" height="16rem" viewBox="0 0 24 24"><g fill="none" stroke="#A3a3a3" stroke-width="1.5"><circle cx="12" cy="12" r="2"/><path stroke-linecap="round" d="M12 10c5 0 4.6 12-3 12"/><path stroke-linecap="round" d="M12.312 14c-5 0-4.6-12 3-12"/><path stroke-linecap="round" d="M10 12.312c0-2.78 3.707-3.89 7-3.024m5 6.024c0-1.97-.806-3.456-2-4.49M14 12c0 2.779-3.707 3.89-7 3.024M2 9c0 1.68.586 3.008 1.5 4.004"/></g></svg>
                        <p>Aún no has creado rifas</p>
                    </div>
                }

                {raffles &&
                    <div className="bottomR">
                        <Pagination page={page} setPage={setPage} forPage={forPage} arrLength={raffles.length}/>
                    </div>
                }
            </main>
            <Loader visible={loaderIsVisible}/>
        </div>
    );
}