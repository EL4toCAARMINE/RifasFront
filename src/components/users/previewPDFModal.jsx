import React, { useEffect, useRef, useState } from 'react';
import TicketComponent from './ticketComponent';
import Btn from '../generals/btn';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PreviewPDFModal({visibleM, setIsVisibleM, raffleData, purchase, tickets, setIsVisible, needReload, reload}){
    // Ref poara almacenar el componente
    const ticketRef = useRef(null);

    // Si visible es true, se bloquea el scroll
    useEffect(() => {
        const body = document.body;
    
        if (visibleM) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    }, [visibleM]);
    
    const close = (e) => {
        e.stopPropagation();
        // Si nesesitamos recargar la pagina de origen hacemos el reload
        if(needReload){
            reload();
        }
        setIsVisibleM(false);
    };

    // Crear pdf para descargar
    const handleDownloadPDF = async () => {
        setIsVisible(true);
        const element = ticketRef.current;
    
        if (!element) {
          Swal.fire({
            title: "Error al descargar el ticket",
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
                container: "alertSwal",
                confirmButton: "button",
                title: "title"
            }
          });
          setIsVisible(false);
          setIsVisibleM(false);
          return;
        }
    
        // Capturar el contenido del componente con html2canvas
        const canvas = await html2canvas(element, {
            scale: 3, // Aumenta la calidad del canvas
            useCORS: true, // Evita problemas de CORS si usas imágenes externas
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight,
        });
        const imageData = canvas.toDataURL("image/png");

        // Convierte las dimensiones de px a mm para jsPDF
        const pdfWidth = canvas.width * 0.264583; 
        // Conversión px -> mm
        const pdfHeight = canvas.height * 0.264583;

        // Crea el PDF con las dimensiones del componente
        const pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
            unit: "mm",
            format: [pdfWidth + 30, pdfHeight + 30]
        });

        pdf.addImage(
            imageData,
            "PNG",
            15,
            15,
            pdfWidth,
            pdfHeight
        );

        pdf.save(raffleData.raffleName + "-" + purchase.code);

        // Si nesesitamos recargar la pagina de origen hacemos el reload
        if(needReload){
            reload();
        }

        setIsVisible(false);
        setIsVisibleM(false);
    };

    return visibleM ? (  
        <div className="backPDFM" onClick={close}>
            <div className="contT" onClick={(e)=>e.stopPropagation()}>

                <svg className="close" onClick={close} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 1216 1312"><path fill="#000000" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"/></svg>
                
                <h2>Vista previa</h2>

                <div className="ticket" ref={ticketRef}>
                    <TicketComponent raffleData={raffleData} purchase={purchase} tickets={tickets}/>
                </div>

                <Btn 
                    txt={"Descargar"}
                    colorBg={"#c71585"}
                    colorBgH={"#df47a7"}
                    size={"1.6rem"}
                    styles={{
                        padding: 30,
                        width: "80%",
                        position: "sticky",
                        bottom: 0,
                        margin:30
                    }}
                    action={handleDownloadPDF}
                >
                    <svg className="iconBtn" xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M12 11a1 1 0 0 1 1 1v6.584l1.293-1.292a1 1 0 0 1 1.414 1.416l-2.824 2.819c-.253.252-.5.473-.883.473c-.336 0-.566-.169-.788-.38l-2.919-2.912a1 1 0 0 1 1.414-1.416L11 18.584V12a1 1 0 0 1 1-1m-.5-9c2.784 0 5.16 1.75 6.086 4.212a6.003 6.003 0 0 1 .395 11.453a3 3 0 0 0-.858-1.785a3 3 0 0 0-1.914-.873L15 15v-3a3 3 0 0 0-5.995-.176L9 12v3a3 3 0 0 0-2.123.88a3 3 0 0 0-.875 2.02A5.002 5.002 0 0 1 5 8.416A6.5 6.5 0 0 1 11.5 2"/></g></svg>
                </Btn>
            </div>
        </div>
    ) : null;
}