import React from 'react';
import redX from '../../assets/red-x.png';

const cross = (props) => {
    return (
        <div className="cell-container"><img className="icon" src={redX} alt=""/></div>
    )
}

export default cross;