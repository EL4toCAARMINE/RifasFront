import React, { useEffect, useState } from 'react';
import HeaderAmin from "../../components/headerAdmin";
import InputText from '../../components/inputText';
import Btn from "../../components/btn";
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { useNavigate } from 'react-router-dom';

export default function CreateRaffle(){
    const navigate = useNavigate();

    // #region states para values de los inputs
    const [raffleName, setRaffleName] = useState("");
    const [organizerName, setOrganizerName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [canalW, setCanalW] = useState("");
    
    const [articleDetails, setArticleDetails] = useState("");
    const [raffleDetails, setRaffleDetails] = useState("Compra un boleto y paga un monto equivalente al número que obtengas en el sorteo.\nPor ejemplo, si el número que obtienes es 57, tendrás que pagar 57 pesos.\nEl número del sorteo determinará el monto a pagar.\nEs importante registrar tu nombre y teléfono correctamente, ya que serán los medios para contactarte e identificarte.\n¡Anímate a participar!");
    const [numberOfTickets, setNumberOfTickets] = useState("");
    const [date, setDate] = useState("");
    const [paymentE, setPaymentE] = useState(false);
    const [paymentT, setPaymentT] = useState(false);
    const [paymentC, setPaymentC] = useState(false);
    const [nameCard, setNameCard] = useState("");
    const [card, setCard] = useState("");
    const [nameAccount, setNameAccount] = useState("");
    const [account, setAccount] = useState("");
    // #endregion
    
    // #region states para errorres
    const [raffleNameError, setRaffleNameError] = useState("");
    const [organizerNameError, setOrganizerNameError] = useState("");
    const [contactPhoneError, setContactPhoneError] = useState("");
    const [canalWError, setCanalWError] = useState("");

    const [articleDetailsError, setArticleDetailsError] = useState("");
    const [raffleDetailsError, setRaffleDetailsError] = useState("");
    const [numberOfTicketsError, setNumberOfTicketsError] = useState("");
    const [dateError, setDateError] = useState("");
    const [paymentError, setPaymentError] = useState(false);
    const [nameCardError, setNameCardError] = useState("");
    const [cardError, setCardError] = useState("");
    const [nameAccountError, setNameAccountError] = useState("");
    const [accountError, setAccountError] = useState("");
    // #endregion

    // estableciendo fecha minima para input date
    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        // Establecer la fecha mínima como la fecha de hoy
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    // Volver a login
    const backToDash = () => {
        navigate("/dashAdmin")
    }

    // validar los datos

    // Crear la rifa
    const createRaffle = () => {

    }
    
    return (  
        <div className="container-fluid containerCreateRaffle">
            <HeaderAmin>
                <svg onClick={backToDash} className='arrowBack' xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><path fill="#000000" d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"/></svg>
            </HeaderAmin>

            <div style={{height:50, background: "#ff0000"}}>xd</div>

            <h2>Crear nueva rifa</h2>

            <form>
                <InputText 
                    textError={raffleNameError}
                    text={"Nombre de la rifa (¿Como quieres que se identifique tu rifa?):"}
                    textPlace={"Ingresa el nombre de tu rifa: Rifa de pantalla Samsung"}
                    width={"100%"}
                    val={raffleName}
                    setVal={setRaffleName}
                    maxL={200}
                />

                <div className="containerInputTwo">
                    <InputText 
                        textError={organizerNameError}
                        text={"Nombre del organizador:"}
                        textPlace={"Ingresa un nombre"}
                        width={"50%"}
                        val={organizerName}
                        setVal={setOrganizerName}
                        maxL={150}
                    />
                    <InputText 
                        textError={contactPhoneError}
                        text={"Numero de telefono para contacto (WhatsApp):"}
                        textPlace={"Ingresa un numero de teléfono"}
                        width={"50%"}
                        val={contactPhone}
                        setVal={setContactPhone}
                        maxL={10}
                    />
                </div>

                <InputText 
                    textError={canalWError}
                    text={"Link del canal de WhatsApp (Opcional):"}
                    textPlace={"Ingresa el URL del canal"}
                    width={"100%"}
                    val={canalW}
                    setVal={setCanalW}
                    maxL={300}
                />

                <div className="imageInputC">
                    <p>Imagen del articulo a rifar:</p>
                </div>

                <div className="textAreaC">
                    <label htmlFor="artD">Detalles del producto:</label>
                    <textarea name="artD" className='textC' placeholder='Detalles...' maxLength={750} value={articleDetails} onChange={(e)=>setArticleDetails(e.target.value)}></textarea>
                    <p className='countCharacters'>{articleDetails.length}/750</p>
                    {articleDetailsError ?
                        <p className='inputError'>{}{articleDetailsError}</p>
                    :
                        <div className="inputError"></div>
                    }
                </div>

                <div className="textAreaC">
                    <label htmlFor="artD">Detalles de la rifa:</label>
                    <textarea name="artD" className='textC' placeholder='Detalles...' maxLength={750} value={raffleDetails} onChange={(e)=>setRaffleDetails(e.target.value)}></textarea>
                    <p className='countCharacters'>{raffleDetails.length}/750</p>
                    {raffleDetailsError ?
                        <p className='inputError'>{}{raffleDetailsError}</p>
                    :
                        <div className="inputError"></div>
                    }
                </div>

                <div className="containerInputTwo">
                    <InputText
                        text={"Numero de boletos:"}
                        textPlace={"0"}
                        maxL={3}
                        width={"50%"}
                        textError={numberOfTickets}
                        val={numberOfTickets}
                        setVal={numberOfTickets}
                    />

                    <div className="containerI">
                        <label htmlFor="artD">Numero de boletos:</label>
                        <input type='date' name="date" className='textC' placeholder='0' maxLength={3} value={date} onChange={(e)=>setDate(e.target.value)} min={minDate}/>
                        {dateError ?
                            <p className='inputError'>{}{dateError}</p>
                        :
                            <div className="inputError"></div>
                        }
                    </div>
                </div>

                <div className="containerCheck">
                    <label className='instructionsP'>Selecciona los métodos de pago que desesa aceptar en tu rifa:</label>
                    <div className="checks">
                        <label htmlFor='paymentE'>
                            <input
                                type="checkbox"
                                name="paymentE"
                                value={paymentE}
                                checked={paymentE}
                                onChange={(e)=>{
                                    if(paymentE){
                                        setPaymentE(!e.target.value);
                                    }else{
                                        setPaymentE(e.target.value);
                                    }
                                }}
                            />
                            Pago con efectivo
                        </label>

                        <label htmlFor='paymentT'>
                            <input
                                type="checkbox"
                                name="paymentT"
                                value={paymentT}
                                checked={paymentT}
                                onChange={(e)=>{
                                    if(paymentT){
                                        setPaymentT(!e.target.value);
                                    }else{
                                        setPaymentT(e.target.value);
                                    }
                                }}
                            />
                            Pago con tarjeta
                        </label>

                        <label htmlFor='paymentC'>
                            <input
                                type="checkbox"
                                name="paymentC"
                                value={paymentC}
                                checked={paymentC}
                                onChange={(e)=>{
                                    if(paymentC){
                                        setPaymentC(!e.target.value);
                                    }else{
                                        setPaymentC(e.target.value);
                                    }
                                }}
                            />
                            Transferencia cuenta CLABE
                        </label>
                    </div>

                    {paymentError ?
                        <p className='inputError'>Debes seleccionar al menos 1 método de pago</p>
                    :
                        <div className="inputError"></div>
                    }
                </div>

                {paymentE && 
                    <div className="paymentI">
                        <h2>Pago en efectivo</h2>
                        <p className="textP">Al seleccionar "pago en efectivo", el cliente que desee pagar sus boletos se pondrá en contacto contigo a través del número que proporcionaste para coordinar la entrega. Para confirmar el pago y marcar el boleto como "pagado", el cliente deberá mostrar su ticket y entregar la cantidad indicada.</p>
                    </div>
                }

                {paymentT && 
                    <div className="paymentI" style={{paddingBottom: 0, marginBottom: 0}}>
                        <h2>Pago con tarjeta</h2>
                        <p className="textP">Al seleccionar "pago con tarjeta", el cliente que desee pagar sus boletos se pondrá en contacto contigo mediante el número que proporcionaste para coordinar la transacción. Debes solicitar el ticket de pago y el comprobante de pago. Una vez que confirmes que recibiste el pago, marcarás el boleto como "pagado".</p>
                        <div className="inputsP">
                            <InputText
                                width={"50%"}
                                text={"Nombre del titular de la tarjeta:"}
                                textPlace={"Ingresa el nombre del titular"}
                                maxL={150}
                                val={nameCard}
                                setVal={setNameCard}
                                textError={nameCardError}
                            />
                            <InputText
                                width={"50%"}
                                text={"Ingresa los 16 números de la tarjeta:"}
                                textPlace={"XXXXXXXXXXXX1234"}
                                maxL={16}
                                val={card}
                                setVal={setCard}
                                textError={cardError}
                            />
                        </div>
                    </div>
                }

                {paymentC && 
                    <div className="paymentI" style={{paddingBottom: 0, marginBottom: 0}}>
                        <h2>Transferencia a cuenta CLABE</h2>
                        <p className="textP">Si el cliente selecciona "transferencia a cuenta CLABE", se pondrá en contacto contigo mediante el número que proporcionaste para confirmar los detalles de la cuenta. Debes solicitar el comprobante de pago de la transferencia. Una vez confirmes que recibiste el pago, marcarás el boleto como "pagado".</p>
                        <div className="inputsP">
                            <InputText
                                width={"50%"}
                                text={"Nombre del titular de la cuenta:"}
                                textPlace={"Ingresa el nombre del titular"}
                                maxL={150}
                                val={nameAccount}
                                setVal={setNameAccount}
                                textError={nameAccountError}
                            />
                            <InputText
                                width={"50%"}
                                text={"Ingresa los 18 dígitos de la cuenta CLABE:"}
                                textPlace={"XXXXXXXXXXXXXX1234"}
                                maxL={18}
                                val={account}
                                setVal={setAccount}
                                textError={accountError}
                            />
                        </div>
                    </div>
                }
            </form>
            <div className="buttonsC">
                <Btn txt={"Cancelar"} action={backToDash} colorBg={"#ff0000"} colorBgH={"#ff4444"} size={"1.4rem"} styles={{width: "45%"}}></Btn>
                <Btn txt={"Crear Rifa"} action={createRaffle} size={"1.4rem"} styles={{width: "45%"}}></Btn>
            </div>
        </div>
    );
}