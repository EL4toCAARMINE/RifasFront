import React, { useEffect, useState } from "react";
import Btn from "./btn";
import Pagination from "./pagination";
import ErrorScreenComponent from "./errorScreenComponent";
import UpdateStatusTicket from "../admin/updateStatusTicket";
import Loader from "./Loader";
import { showAlert } from "../../utils/showAlert";

const TicketS = ({dataT, action, isAdmin}) => {
    return(
        <div 
            className={`ticketElement ${dataT.status !== 1 &&  "ticketElementN"}`} 
            onClick={()=>{ isAdmin && dataT.status === 1 ? showAlert("No puedes modificar este boleto, ya que aun no ha sido apartado", "info") : action(dataT)}}
            style={{cursor: isAdmin && dataT.status !== 1 && "pointer"}}
        >
            {dataT.status !== 1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#df47a7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0m5-9v4m0 10v4m-9-9h4m10 0h4m-2.636-6.364l-2.828 2.828m-7.072 7.072l-2.828 2.828m0-12.728l2.828 2.828m7.072 7.072l2.828 2.828"/></g></svg>}
            <p>{dataT.numberTicket}</p>
        </div>
    );
} 

export default function Talonario({isAdmin, tickets, getRaffle}){
    const [arrSoldCollection, setArrSoldCollection] = useState(null);
    const [filterFocus, setFilterFocus] = useState(0);

    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [ticketFocus, setTicketFocus] = useState(null);

    //Paginacion
    const [page, setPage] = React.useState(1);
    const [forPage, setForPage] = React.useState(100);

    // Filtro
    const filterTickets = (number) => {
        if (number == 0) {
            setArrSoldCollection(tickets);
        }else{
            setPage(1);
            setArrSoldCollection(tickets.filter(ticket => ticket.status === number));
        }
        setFilterFocus(number);
    }

    const updateTickets = (d) => {
        setTicketFocus(d);
        setIsVisible(true);
    }

    useEffect(()=>{
        if (tickets) {
            setArrSoldCollection(tickets);
        }
    }, [tickets])

    return (  
        <div className="containerTComponent">
            <h2>Talonario</h2>

            {isAdmin && 
                <div className="containerfilter">
                    <Btn 
                        txt={"Todos"}
                        styles={{width: "24%", height: 30}}
                        colorBg={filterFocus == 0 ? "#000" : "#324AB2"}
                        colorBgH={filterFocus == 0 ? "#4d4d4d" : "#3b57f2"}
                        action={()=>filterTickets(0)}
                        size={"1.2rem"}
                    ></Btn>
                    <Btn 
                        txt={"Disponibles"}
                        styles={{width: "24%", height: 30}}
                        colorBg={filterFocus == 1 ? "#000" : "#324AB2"}
                        colorBgH={filterFocus == 1 ? "#4d4d4d" : "#3b57f2"}
                        action={()=>filterTickets(1)}
                        size={"1.2rem"}
                    ></Btn>
                    <Btn 
                        txt={"No pagados"}
                        styles={{width: "24%", height: 30}}
                        colorBg={filterFocus == 2 ? "#000" : "#324AB2"}
                        colorBgH={filterFocus == 2 ? "#4d4d4d" : "#3b57f2"}
                        action={()=>filterTickets(2)}
                        size={"1.2rem"}
                    ></Btn>
                    <Btn 
                        txt={"Pagados"}
                        styles={{width: "24%", height: 30}}
                        colorBg={filterFocus == 3 ? "#000" : "#324AB2"}
                        colorBgH={filterFocus == 3 ? "#4d4d4d" : "#3b57f2"}
                        action={()=>filterTickets(3)}
                        size={"1.2rem"}
                    ></Btn>
                </div>
            }
            <div className="ticketsArea">

                {arrSoldCollection && arrSoldCollection.length > 0 ? 
                    <div className="tickets">
                        {arrSoldCollection.slice((page - 1) * forPage, page * forPage).map((ticket, index) => {
                            return <TicketS key={index} dataT={ticket} isAdmin={isAdmin} action={updateTickets}/>
                        })}
                    </div>
                :
                    <div className="errorMenssage">
                        <ErrorScreenComponent message={"No hay boletos"}/>
                    </div>
                }

                <div className="bottomR">
                    <Pagination page={page} setPage={setPage} forPage={forPage} arrLength={arrSoldCollection && arrSoldCollection.length}/>
                </div>
            </div>

            <UpdateStatusTicket visible={isVisible} setIsVisible={setIsVisible} data={ticketFocus} getRaffle={getRaffle} loaderVisible={isLoaderVisible} setLoaderVisible={setIsLoaderVisible}/>

            <Loader visible={isLoaderVisible}/>
        </div>
    );
}