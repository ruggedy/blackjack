import React, { PureComponent } from 'react';

import Action from './action';

import './index.scss';
const noop = () => {}
export default class Actions extends PureComponent {
    
    static defaultProps = {
        actions: [],
        onAction: noop 
    }

    actionHandler = type => () => this.props.onAction(type)

    renderAction = ({name, action}) => {
        const enabled = this.props[`can${name}`] === undefined? true : this.props[`can${name}`];
        return <Action 
            key={name}
            enabled={enabled} 
            onClick={this.actionHandler(action)} 
            name={name}  />
    }

    render(){
        return(
            <ul className="actions-container">
                {this.props.actions.map(this.renderAction)}
            </ul>
        )
    }
}