import React, { useEffect, useState } from 'react';
import HeaderAmin from "../../components/admin/headerAdmin";
import InputText from '../../components/generals/inputText';
import Btn from "../../components/generals/btn";
import { useNavigate } from 'react-router-dom';
import { convertToUnix, unixToDate, unixToDate2 } from '../../utils/DateUnixFunctions';
import { validateForm } from '../../utils/ValidateFormAdmin';
import Api from "../../utils/Api";
import { useSelector } from 'react-redux';
import ApiFiles from '../../utils/ApiFiles';
import Loader from '../../components/generals/Loader';
import { showAlert } from '../../utils/showAlert';

export default function CreateRaffle() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    // #region states para values de los inputs
    const [raffleName, setRaffleName] = useState("");
    const [organizerName, setOrganizerName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [canalW, setCanalW] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null)
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
    const [imageError, setImageError] = useState("");
    const [articleDetailsError, setArticleDetailsError] = useState("");
    const [raffleDetailsError, setRaffleDetailsError] = useState("");
    const [numberOfTicketsError, setNumberOfTicketsError] = useState("");
    const [dateError, setDateError] = useState("");
    const [paymentError, setPaymentError] = useState("");
    const [nameCardError, setNameCardError] = useState("");
    const [cardError, setCardError] = useState("");
    const [nameAccountError, setNameAccountError] = useState("");
    const [accountError, setAccountError] = useState("");
    // #endregion

    // estableciendo fecha minima para input date
    const [minDate, setMinDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const today = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });

        const mexicoDate = new Date(today);
        mexicoDate.setDate(mexicoDate.getDate() - 1);
        const yesterday = mexicoDate.toISOString().split('T')[0];

        setMinDate(yesterday)
    }, []);


    // Cargar imagen y mostrar preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageError("");
            setImage(file); // Almacena la imagen
            setPreviewImage(URL.createObjectURL(file)); // Genera una URL para previsualización
        }
    };

    // Volver a login
    const backToDash = () => {
        navigate("/dashAdmin")
    }

    //Actualizar rifa // AL CREAR EN CREAR SCREEN QUE SE NAVEGUE HACIA LA RIFA CREADA
    const createRaffle = async () => {
        setIsLoading(true);

        const params = {
            raffleName: raffleName,
            organizerName: organizerName,
            contactPhone: contactPhone,
            canalW: canalW,
            articleDetails: articleDetails,
            raffleDetails: raffleDetails,
            numberOfTickets: numberOfTickets,
            date: date,
            paymentE: paymentE,
            paymentT: paymentT,
            paymentC: paymentC,
            nameCard: paymentT ? nameCard : null,
            card: paymentT ? card : null,
            nameAccount: paymentC ? nameAccount : null,
            account: paymentC ? account : null
        };

        try {
            let uri = import.meta.env.VITE_URL + "raffle/createRaffle";
            let api = new Api(uri, "POST", params, auth.token);
            await api.call().then(async (res) => {

                if (res.response) {
                    const formData = new FormData();
                    formData.append("image", image);

                    try {
                        let uri2 = import.meta.env.VITE_URL + "raffle/addImageRaffle/" + res.result;
                        let api2 = new ApiFiles(uri2, "POST", formData, auth.token);
                        await api2.call().then(async (res2) => {

                            if (!res2.response) {
                                showAlert(res2.message, "warning");
                            }
                        });
                    } catch (error) {
                        showAlert("Error al agregar la imagen, intentalo nuevamente", "error")
                    }
                    showAlert("Rifa creada correctamente", "success")
                    navigate(`/adminRaffle/${res.result}`)
                } else {
                    showAlert(res.message, "warning")
                }
            });
        } catch (e) {
            showAlert("Error al crear la rifa, intentalo nuevamente", "error")
        }
        setIsLoading(false);
    }

    // Crear la rifa
    const createNewRaffle = () => {
        let isValid = validateForm({
            setRaffleNameError,
            setOrganizerNameError,
            setContactPhoneError,
            setCanalWError,
            setImageError,
            setArticleDetailsError,
            setRaffleDetailsError,
            setNumberOfTicketsError,
            setDateError,
            setPaymentError,
            setNameCardError,
            setCardError,
            setNameAccountError,
            setAccountError,
            raffleName,
            organizerName,
            contactPhone,
            canalW,
            image,
            articleDetails,
            raffleDetails,
            numberOfTickets,
            date,
            minDate,
            paymentE,
            paymentT,
            paymentC,
            nameCard,
            card,
            nameAccount,
            account
        });

        if(isValid){
            createRaffle();
        }
    }

    return (
        <div className="container-fluid containerCreateRaffle">
            <HeaderAmin>
                <svg onClick={backToDash} className='arrowBack' xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><path fill="#000000" d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z" /></svg>
            </HeaderAmin>

            <div style={{ height: 50, background: "#ff0000" }}>xd</div>

            <h2>Crear nueva rifa</h2>

            <form>
                <InputText
                    textError={raffleNameError}
                    text={"Nombre de la rifa (¿Como quieres que se identifique tu rifa?):"}
                    textPlace={"Ingresa el nombre de tu rifa: Rifa de pantalla Samsung"}
                    width={"100%"}
                    val={raffleName}
                    setVal={setRaffleName}
                    maxL={50}
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
                        text={"Número de telefono para contacto (WhatsApp):"}
                        textPlace={"Ingresa un número de teléfono"}
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
                    <p className='textP'>Imagen del articulo a rifar:</p>

                    {!previewImage &&
                        <label htmlFor="file" className="custum-file-upload">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 512 512"><path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z" fill="#A3A3A3" /></svg>
                            </div>
                            <p className="textU">Click para seleccionar una imagen</p>
                        </label>
                    }

                    {previewImage && (
                        <div className='previewC'>
                            <img src={previewImage} alt="preview" className='imagePreview' />
                            <label htmlFor="file" className='editI'>
                                Cambiar imagen
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 24 24"><path fill="#ffffff" d="m12.05 19l2.85-2.825l-2.85-2.825L11 14.4l1.075 1.075q-.7.025-1.362-.225t-1.188-.775q-.5-.5-.763-1.15t-.262-1.3q0-.425.113-.85t.312-.825l-1.1-1.1q-.425.625-.625 1.325T7 12q0 .95.375 1.875t1.1 1.65t1.625 1.088t1.85.387l-.95.95zm4.125-4.25q.425-.625.625-1.325T17 12q0-.95-.363-1.888T15.55 8.45t-1.638-1.075t-1.862-.35L13 6.05L11.95 5L9.1 7.825l2.85 2.825L13 9.6l-1.1-1.1q.675 0 1.375.263t1.2.762t.763 1.15t.262 1.3q0 .425-.112.85t-.313.825zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                            </label>
                        </div>
                    )}

                    <input id="file" type="file" onChange={handleFileChange} />

                    {imageError ?
                        <p className='inputError'>{ }{imageError}</p>
                        :
                        <div className="inputError"></div>
                    }
                </div>

                <div className="textAreaC">
                    <label htmlFor="artD">Detalles del producto:</label>
                    <textarea name="artD" className='textC' placeholder='Detalles...' maxLength={750} value={articleDetails} onChange={(e) => setArticleDetails(e.target.value)}></textarea>
                    <p className='countCharacters'>{articleDetails.length}/750</p>
                    {articleDetailsError ?
                        <p className='inputError'>{ }{articleDetailsError}</p>
                        :
                        <div className="inputError"></div>
                    }
                </div>

                <div className="textAreaC">
                    <label htmlFor="artD">Detalles de la rifa:</label>
                    <textarea name="artD" className='textC' placeholder='Detalles...' maxLength={750} value={raffleDetails} onChange={(e) => setRaffleDetails(e.target.value)}></textarea>
                    <p className='countCharacters'>{raffleDetails.length}/750</p>
                    {raffleDetailsError ?
                        <p className='inputError'>{ }{raffleDetailsError}</p>
                        :
                        <div className="inputError"></div>
                    }
                </div>

                <div className="containerInputTwo">
                    <InputText
                        text={"Número de boletos:"}
                        textPlace={"0"}
                        maxL={3}
                        width={"50%"}
                        textError={numberOfTicketsError}
                        val={numberOfTickets}
                        setVal={setNumberOfTickets}
                    />

                    <div className="containerI">
                        <label htmlFor="artD">Fecha del sorteo:</label>
                        <input type='date' name="date" className='textC' value={unixToDate2(date)} onChange={(e) => setDate(convertToUnix(e.target.value))} min={minDate} />
                        {dateError ?
                            <p className='inputError'>{ }{dateError}</p>
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
                                checked={paymentE}
                                onChange={() => setPaymentE(!paymentE)}
                            />
                            Pago con efectivo
                        </label>

                        <label htmlFor='paymentT'>
                            <input
                                type="checkbox"
                                name="paymentT"
                                checked={paymentT}
                                onChange={() => setPaymentT(!paymentT)}
                            />
                            Pago con tarjeta
                        </label>

                        <label htmlFor='paymentC'>
                            <input
                                type="checkbox"
                                name="paymentC"
                                checked={paymentC}
                                onChange={() => setPaymentC(!paymentC)}
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
                    <div className="paymentI" style={{ paddingBottom: 0, marginBottom: 0 }}>
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
                    <div className="paymentI" style={{ paddingBottom: 0, marginBottom: 0 }}>
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
                <Btn txt={"Cancelar"} action={backToDash} colorBg={"#ff0000"} colorBgH={"#ff4444"} size={"1.4rem"} styles={{ width: "45%" }}></Btn>
                <Btn txt={"Crear Rifa"} action={createNewRaffle} size={"1.4rem"} styles={{ width: "45%" }}></Btn>
            </div>
            <Loader visible={isLoading} />
        </div>
    );
}