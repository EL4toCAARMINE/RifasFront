import React, { useEffect } from 'react';

export default function Loader({visible}){
    // Si visible es true, se bloquea el scroll
    useEffect(() => {
        const body = document.body;
    
        if (visible) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    }, [visible]);

    return visible ? (  
        <div className="loaderComponent">
            <span className="loader"></span>
            <p>Cargando...</p>
        </div>
    ) : null;
}