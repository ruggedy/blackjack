import React, { PureComponent } from 'react';

import './index.scss';
export default class Card extends PureComponent {

    static defaultProps = {
        show: true
    }
    
    render(){
        const { value, show } = this.props

        if(!show){
            return <div className="card-container" />
        }
        return(
            <div className="card-container">
                <div className="top">
                    <p>{value.weight}</p>
                    <div className={`card-icon ${value.type}`} />
                </div>
                <div className="bottom">
                    <p>{value.weight}</p>
                    <div className={`card-icon ${value.type}`} />
                </div>
            </div>
        )
    }
}