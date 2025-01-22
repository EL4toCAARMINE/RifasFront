import React from 'react'
import Icon from '../assets/images/icon.png';

export default function headerAdmin({children}){
    const [before, after] = React.Children.toArray(children);

    return (
        <header>
            {before}
            <div className='title'>
                <img src={Icon} alt="logo" />
                <h1>Rifas Ahuazo</h1>
            </div>
            {after}
        </header>
    );
}