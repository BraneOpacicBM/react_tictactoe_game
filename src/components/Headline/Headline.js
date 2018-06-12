import React from 'react';

const Headline = (props) => {
    return (
        <h1>
            <span className="headlineSpan">{props.tic}</span>
            <span className="headlineSpan">{props.tac}</span>
            <span className="headlineSpan">{props.toe}</span> {props.game}
        </h1>
    )
}


export default Headline;