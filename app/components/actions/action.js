import React from 'react';

import './actions.scss';
const noop = () => {}
export default (props) => {

    // console.log("this is disabled from something ", props.disabled)
    const disableClass = props.enabled? "": "disabled";
    return <li 
        className={`actions-item ${disableClass}`} 
        onClick={props.enabled? props.onClick :  noop}>{props.name}</li>
}