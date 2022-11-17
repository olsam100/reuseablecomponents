import React from 'react';
import 'components/modal/modal.css'

const Modal = ({ close }) => {
    return (
        <div className='container'>
            <div className="wrapper">
                <span onClick={() => close(true)}>x</span>
                <div className='content'>
                    <p>Close the dialogue?</p>
                    <div className="btns">
                        <button className='nobtn'>no</button>
                        <button className='yesbtn' onClick={() => close(true)}>yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;