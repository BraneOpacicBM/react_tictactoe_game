import React from 'react';

const button = (props) => {
    return(
        <div onClick={props.buttonReset} className="buttonReset">{props.children}</div>
    )
}

export default button;