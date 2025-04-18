import React from 'react'
import Icon from '../../assets/images/icon.webp';

export default function HeaderAdmin({children}){
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