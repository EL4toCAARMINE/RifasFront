import React from "react";

const TicketNS = ({numberT}) => {
    return(
        <div className="ticketElement">
            <p>{numberT}</p>
        </div>
    );
} 

const TicketS = ({numberT}) => {
    return(
        <div className="ticketElement ticketElementN">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#c71585" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0m5-9v4m0 10v4m-9-9h4m10 0h4m-2.636-6.364l-2.828 2.828m-7.072 7.072l-2.828 2.828m0-12.728l2.828 2.828m7.072 7.072l2.828 2.828"/></g></svg>
            <p>{numberT}</p>
        </div>
    );
} 

export default function Talonario({isAdmin, number, arrSold}){
    return (  
        <div className="containerTComponent">
            <h2>Talonario</h2>

            <div className="row tickets">
                {/* {(()=>{
                    for (let i = 1; i <= number; i++) {
                        
                    }
                })()} */}
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketS numberT={55}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
                <TicketNS numberT={1}/>
            </div>
        </div>
    );
}