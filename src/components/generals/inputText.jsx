import React from 'react';

export default function InputText({text, textPlace, textError, width, val, setVal, maxL, dis, classAdd}){
    return (  
        <div className={`containerComponentInput ${classAdd}`} style={{width: width}}>
            <label htmlFor="textC">{text ? text : "Ingresa texto"}</label>
            <input type="text" className='textC' placeholder={textPlace ? textPlace : "Que dira el placeholder"} value={val} onChange={(e)=>setVal(e.target.value)} maxLength={maxL} disabled={dis ? dis : false}/>
            {textError && 
                <p className='inputError'>{textError}</p>
            }
        </div>
    );
}