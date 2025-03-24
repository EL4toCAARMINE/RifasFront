import React, { useState } from 'react';
import Btn from '../generals/btn';
import rouletteI from "../../assets/images/ruleta.gif";
import Swal from 'sweetalert2';
import Api from '../../utils/Api';
import { showAlert } from '../../utils/showAlert';
import { useSelector } from 'react-redux';

export default function ToRaffle({ isVisible, setIsVisible, tickets, getRaffle, idRaffle }) {
    const [roulette, setRoulette] = useState(false);
    const [result, setResult] = useState(false);
    const [winner, setWinner] = useState(null);
    const auth = useSelector((state) => state.auth);

    // Si visible es true, se bloquea el scroll
    React.useEffect(() => {
        const body = document.body;

        if (isVisible) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    }, [isVisible]);

    const getWinner = async () => {

        let ticketsP = tickets.filter(ticket => ticket.status === 3);
        const randomIndex = Math.floor(Math.random() * ticketsP.length);
        setWinner(ticketsP[randomIndex - 1]);

        try {
            let uri = import.meta.env.VITE_URL + "raffle/setWinner";
            let params = {
                id: idRaffle,
                winner: true,
                winnerNumber: ticketsP[randomIndex - 1].numberTicket
            }

            let api = new Api(uri, "PUT", params, auth.token);
            await api.call().then((res) => {
                
                if (res.response) {
                    setResult(true);
                } else {
                    setResult(false);
                    showAlert(res.message, "warning");
                    setWinner(null);
                    setIsVisible(false)
                    return false;
                }
            });
        } catch (e) {
            setResult(false);
            setWinner(null);
            showAlert("Error al asigar al ganador, intenta nuevamente", "error");
            return false;
        }
    }

    const toRaffleAction = () => {
        Swal.fire({
            title: "¿Estás seguro de querer realizar el sorteo? Una vez llevado a cabo, no se podrá repetir",
            icon: "warning",
            confirmButtonText: "Continuar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            customClass: {
                container: "swalUpdateStatusAdmin",
                title: "title",
                cancelButton: "cancel",
                confirmButton: "confirm",
                popup: "cont"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setRoulette(true);
                setTimeout(() => {
                    let winner = getWinner();

                    if (winner) {
                        setRoulette(false);
                    }
                }, 5000);
            }
        });
    }

    const cancelToRaffle = () => {
        getRaffle();
        setIsVisible(false);
    }

    return isVisible && (
        <div className="toRaffleComponent">
            <div className="containerToRaffle">
                {!result &&
                    <h2>Rifar</h2>
                }

                {!result &&
                    <svg className="close" onClick={cancelToRaffle} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 1216 1312"><path fill="#000000" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68" /></svg>
                }

                {!result && !roulette &&
                    <p className='text'>La rifa se llevará a cabo seleccionando un ganador de forma aleatoria entre los boletos ya pagados. Esta acción solo puede realizarse una vez, por lo que, una vez completada, no podrá repetirse.</p>
                }

                {roulette &&
                    <div className="rullete">
                        <img src={rouletteI} alt="Ruleta" />
                    </div>
                }

                {result &&
                    <div className="result">
                        <h3>Felicidades 🎉🎉</h3>
                        <p>El número ganador es el:</p>
                        <span>#{winner.numberTicket}</span>
                    </div>
                }

                {!result && !roulette &&
                    <Btn
                        colorBg={"#c71585"}
                        colorBgH={"#df47a7"}
                        size={"1.3rem"}
                        txt={"Sortear"}
                        action={toRaffleAction}
                    ></Btn>
                }

                {result &&
                    <Btn
                        colorBg={"#c71585"}
                        colorBgH={"#df47a7"}
                        size={"1.3rem"}
                        txt={"Salir"}
                        action={() => { cancelToRaffle();}}
                    ></Btn>
                }
            </div>
        </div>
    );
}