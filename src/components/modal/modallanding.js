import React, { useState } from 'react';
import Modal from './modal';

const styles = {
  btn: {
    outline: 'none',
    border: 'none',
    backgroundColor: '#4A6684',
    width: '6rem',
    height: '2.4rem',
    borderRadius: '0.4rem',
    color: '#ffffff'
  },
  app: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  }
}

const Modallanding = () => {
    const [modal, setModal] = useState(false)

  const modalhandler = () => {
    setModal(!modal)
  }
    return (
        <div className={ styles.app }>
            <button style={ styles.btn } onClick={ modalhandler }>Open modal</button>
            { modal ? '' : <Modal close={ setModal } />}
        </div>
    );
};

export default Modallanding;