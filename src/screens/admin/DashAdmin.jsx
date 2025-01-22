import React from 'react';
import HeaderAdmin from "../../components/headerAdmin";
import Btn from "../../components/btn";
import { useNavigate } from 'react-router-dom';

export default function DashAdmin(){
    const navigation = useNavigate();

    const logOut = () => {
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="36" stroke-dashoffset="36" d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M9 12h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="6;0"/></path></g></svg>
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
                <div className="row midR">
                    
                </div>
                <div className="bottomR">

                </div>
            </main>
        </div>
    );
}