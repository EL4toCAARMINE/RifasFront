import React, { useState, useEffect } from 'react';
import {unixToStringYMD} from "../../utils/DateUnixFunctions";

const Ticket = ({tic}) => {
    
    return(
        <div className="containerTicketOnTicket">
            <p className="status" style={{color: tic.status === 3 ? "#0FBA00" : tic.status === 2 && "#ff0000"}}>{tic.status === 3 ? "Pagado" : tic.status === 2 && "No pagado"}</p>
            <div className='number'>
                <p>Boleto #{tic.numberTicket}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#000000" d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2"/></svg>
            </div>
        </div>
    );
}

export default function TicketComponent({raffleData, tickets, purchase}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (tickets) {
            let tot = 0;
            tickets.forEach(ticket => {
                tot += ticket.numberTicket;
            });
            setCount(tot);
        }
    }, []);

    return(
        <div className="ticketComponent">
            <svg xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" viewBox="0 0 24 24"><g fill="none" stroke="#A3A3A3" strokeWidth="2"><path strokeLinejoin="round" d="M18 21V3l-3 2l-3-2l-3 2l-3-2v18l3-1.5l3 1.5l3-1.5z"/><path strokeLinecap="round" d="M10 9h4m-4 6h4m-4-3h4"/></g></svg>
            <h2>{raffleData ? raffleData.raffleName : "Nombre de la rifa"}</h2>
            <p className='code'>Código de seguimiento: {purchase ? purchase.code : "AXS3412"}</p>
            
            <div className="containerDataPurchase">
                <p className="text">Nombre</p>
                <p className="value">{purchase && purchase.nameClient}</p>
            </div>
            <div className="containerDataPurchase">
                <p className="text">Teléfono</p>
                <p className="value">{purchase && purchase.phoneClient}</p>
            </div>
            <div className="containerDataPurchase">
                <p className="text">Fecha de solicitud</p>
                <p className="value">{purchase && unixToStringYMD(purchase.datePurchase)}</p>
            </div>
            <div className="containerDataPurchase">
                <p className="text">Fecha del sorteo</p>
                <p className="value">{raffleData && unixToStringYMD(raffleData.date)}</p>
            </div>

            <div className="contTickets">
                {tickets ? 
                    tickets.map((ticket, index)=>{
                        return <Ticket key={index} tic={ticket}>{ticket.numberTicket}</Ticket>
                    })
                :
                    <div className="error">
                        <p>No hay boletos disponibles. Es probable que hayan sido eliminados por falta de pago.</p>
                    </div>
                }
            </div>

            <hr />

            <div className="totalContainer">
                <div className="text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="#000000" d="M12.005 22.003c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10m-3.5-8v2h2.5v2h2v-2h1a2.5 2.5 0 1 0 0-5h-4a.5.5 0 1 1 0-1h5.5v-2h-2.5v-2h-2v2h-1a2.5 2.5 0 1 0 0 5h4a.5.5 0 0 1 0 1z"/></svg>
                    <p>Total</p>
                </div>
                <p className="total">${tickets ? count : 0}</p>
            </div>

            <p className='message'>No olvides realizar tu pago, ya que los boletos no pagados no serán tomados en cuenta para el sorteo.</p>

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
        </div>
    );
}