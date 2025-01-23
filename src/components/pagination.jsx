import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react'

export default function Pagination({ page, setPage, forPage, arrLength }) {
    // Redondeo hacia arriba si hay decimal
    let maxim = arrLength > 0 ? Math.ceil(arrLength / forPage) : 1;

    // Validación para asegurar que maxim sea mayor que 0
    if (maxim <= 0) {
        maxim = 1;
    }

    const ChangeManual = (pageSearch) => {
        if (pageSearch !== "") {
            const parsedPageSearch = parseInt(pageSearch);
            if (!isNaN(parsedPageSearch)) {
                // Validar si la página está dentro del rango
                if (parsedPageSearch > 0 && parsedPageSearch <= maxim) {
                    setPage(parsedPageSearch);
                }
            }
        }
    };

    const ChangePageLeft = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const ChangePageRight = () => {
        if (page < (maxim)) {
            setPage(page + 1);
        }
    }

    return (
        <div className="paginationComponent">
            {page == 1 ? 
                <FontAwesomeIcon icon="caret-left" className='paginationLeft' style={{visibility: 'hidden'}}/>
            :
                <FontAwesomeIcon icon="caret-left" className='paginationLeft' onClick={ChangePageLeft}/>
            }
            <input 
                className='paginationInput' 
                type="text" 
                placeholder={page} 
                onChange={e => ChangeManual(e.target.value)} 
                maxLength={11}
            />
            <p className='paginationText'>{"de " + maxim}</p>
            {page == maxim ? 
                <FontAwesomeIcon icon="caret-right" className='paginationRight' style={{visibility: 'hidden'}}/>
            :
                <FontAwesomeIcon icon="caret-right" className='paginationRight' onClick={ChangePageRight}/>
            }
        </div>
    );
}