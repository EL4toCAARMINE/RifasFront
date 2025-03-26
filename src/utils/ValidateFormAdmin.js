import { convertToUnix } from "./DateUnixFunctions";

export const validateForm = (inputs) => {
    let isValid = true;

    // Reiniciar errores
    const {
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
    } = inputs;

    setRaffleNameError("");
    setOrganizerNameError("");
    setContactPhoneError("");
    setCanalWError("");
    setImageError("");
    setArticleDetailsError("");
    setRaffleDetailsError("");
    setNumberOfTicketsError("");
    setDateError("");
    setPaymentError(false);
    setNameCardError("");
    setCardError("");
    setNameAccountError("");
    setAccountError("");

    // Validaciones
    if (!raffleName.trim()) {
        setRaffleNameError("Nombre de la rifa requerido.");
        isValid = false;
    }

    if (!organizerName.trim()) {
        setOrganizerNameError("Nombre del organizador requerido.");
        isValid = false;
    }

    if (!contactPhone) {
        setContactPhoneError("Número de teléfono requerido.");
        isValid = false;
    } else if (contactPhone.length < 10 || isNaN(contactPhone)) {
        setContactPhoneError("Teléfono debe tener 10 dígitos numéricos.");
        isValid = false;
    }

    if (canalW) {
        const urlPattern = /^(https?:\/\/)([\w.-]+)+(\.[a-z]{2,})(:[0-9]{1,5})?(\/.*)?$/i;
        if (!urlPattern.test(canalW)) {
            setCanalWError("El canal debe ser un enlace válido.");
            isValid = false;
        }
    }

    if (!image) {
        setImageError("Debe seleccionar una imagen.");
        isValid = false;
    }

    if (!articleDetails.trim()) {
        setArticleDetailsError("Descripción del artículo requerida.");
        isValid = false;
    } else if(articleDetails.trim().length<100){
        setArticleDetailsError("Tu descripción debe ser mas extensa.");
        isValid = false;
    }

    if (!raffleDetails.trim()) {
        setRaffleDetailsError("Detalles de la rifa requeridos.");
        isValid = false;
    } else if(raffleDetails.trim().length<100){
        setRaffleDetailsError("Tu descripción debe ser mas extensa.");
        isValid = false;
    }

    if (!numberOfTickets) {
        setNumberOfTicketsError("Cantidad de boletos requerida.");
        isValid = false;
    } else if (isNaN(numberOfTickets)) {
        setNumberOfTicketsError("Ingresa unicamente números.");
        isValid = false;
    } else if(numberOfTickets < 10 || numberOfTickets > 500) {
        setNumberOfTicketsError("Ingresa un valor mayor a 10 y menor a 500.");
        isValid = false;
    }

    if (!date) {
        setDateError("Fecha de la rifa requerida.");
        isValid = false;
    } else if (parseInt(date) < convertToUnix(minDate)) {
        setDateError("La fecha no puede ser pasada.");
        isValid = false;
    }

    if (!paymentE && !paymentT && !paymentC) {
        setPaymentError("Debe seleccionar un método de pago.");
        isValid = false;
    }

    if (paymentT) {
        if (!nameCard.trim()) {
            setNameCardError("Nombre del titular de tarjeta requerido.");
            isValid = false;
        }

        if (!card) {
            setCardError("Número de tarjeta requerido.");
            isValid = false;
        } else {
            if (card.length !== 16) {
                setCardError("Número de tarjeta debe tener 16 dígitos.");
                isValid = false;
            }

            if (isNaN(card)) {
                setCardError("Número de tarjeta debe ser numérico.");
                isValid = false;
            }
        }
    }

    if (paymentC) {
        if (!nameAccount.trim()) {
            setNameAccountError("Nombre del titular de la cuenta requerido.");
            isValid = false;
        }

        if (!account) {
            setAccountError("Número de cuenta CLABE requerido.");
            isValid = false;
        } else {
            if (account.length !== 18) {
                setAccountError("Número de cuenta CLABE debe tener 18 dígitos.");
                isValid = false;
            }

            if (isNaN(account)) {
                setAccountError("Número de cuenta CLABE debe ser numérico.");
                isValid = false;
            }
        }
    }

    return isValid;
};
