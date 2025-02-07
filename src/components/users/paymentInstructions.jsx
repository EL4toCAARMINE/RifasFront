import React, { useState } from 'react';
import example from "../../assets/images/example.webp";

export default function PaymentInstructions({visible}){
    
    return visible && (
        <div className="paymentInstructionsComponent">
            <h3>¿Cómo pagar?</h3>
            <p>Si vas a realizar tu pago por medio de transferencia a tarjeta o cuenta CLABE, sigue estos pasos:</p> 
            <ol> 
                <li>Realiza la transferencia colocando en el concepto el siguiente formato: <span>Nombre de la rifa - Nombre para los boletos.</span></li> 
                <img src={example} alt="Ejemplo" />
                <li>Envía tu comprobante de pago junto con tu ticket al WhatsApp proporcionado en la sección de contacto para que el organizador de la rifa confirme y registre tu pago.</li> 
                <li>Cuando el organizador confirme tu pago, podrás verificar el estado de tu ticket digital usando tu número de seguimiento.</li> 
            </ol>
        </div>
    );
}