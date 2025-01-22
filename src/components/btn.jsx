import React, { useState } from 'react'

export default function Btn({reverse, children, action, colorBg, colorBgH, color, size, styles, txt}) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
        <button 
            className="buttonG" 
            onClick={action} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...styles,
                flexDirection: reverse && "row-reverse",
                backgroundColor: isHovered ? colorBgH : colorBg,
            }}
        >
            {children}
            <p 
                className='textbtn'
                style={{
                    color: color,
                    fontSize: size
                }}
            >
                { !txt ? "Texto del boton" : txt }
            </p>
        </button>
    );
}