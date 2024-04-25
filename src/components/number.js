import React from 'react';

const NumberCom = ({ number, colors, status, onClick }) => {
    return (
        <button 
            className="number"
            style={ { backgroundColor: colors[status] } }
            onClick={() => onClick(number, status)}
        >
            { number }
        </button>
        
    );
};

export default NumberCom;