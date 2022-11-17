import React, { useState } from 'react';
import Modalwithnav from './modalwithnav';

const sty = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center'
    },

    p: {
        fontSize: '1.6rem',
    },

    btn: {
        width: '8rem',
        fontSize: '1rem',
        outline: 'none',
        border: 'none',
        backgroundColor: '#4A6684',
        height: '2.4rem',
        borderRadius: '0.4rem',
        color: '#ffffff'
    }
}

const Modallanding = () => {
    const [modal, setModal] = useState(false)
    const modalhandler = () => {
        setModal(!modal)
    }
    return (
        <div style={sty.wrapper}>
            <p style={sty.p}>This is a modal with navbar. The navigation is within the modal</p>  
            <button style={ sty.btn } onClick={ modalhandler }>See modal</button>
            { modal ? "" : <Modalwithnav close={ setModal } />}
        </div>
    );
};

export default Modallanding;        