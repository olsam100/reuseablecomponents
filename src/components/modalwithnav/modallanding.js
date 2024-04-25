import React, { useState } from 'react';
import Modalwithnav from './modalwithnav';

const Modallanding = () => {
    const [modal, setModal] = useState(false)
    const modalhandler = () => {
        setModal(!modal)
    }
    return (
        <div className='wrapper'>
            <p>This is a modal with navbar. The navigation is within the modal</p>  
            <button className='btn' onClick={ modalhandler }>See modal</button>
            { modal ? "" : <Modalwithnav close={ setModal } />}
        </div>
    );
};

export default Modallanding;        