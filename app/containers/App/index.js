import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import actionGenerator, { startGame } from '../../actions';

import { 
    START_GAME,
    SPLIT_INIT,
    DOUBLE_DOWN_INIT,
    START_GAME_INIT,
    HIT_INIT,
    STACK_INIT,
    PLAYER,
    DEALER
} from '../../actions/constant';

import Actions from '../../components/actions';
import Card from '../../components/card';

import './index.scss';
import gameState from '../../reducers/game-state';

const actionList = [
    {name: "Restart Game", action: START_GAME_INIT},
    {name: "Split", action: SPLIT_INIT},
    {name: "Hit", action: HIT_INIT},
    {name: "Stack", action: STACK_INIT},
    // {name: "Double Down", action: DOUBLE_DOWN_INIT}
]

class App extends Component {

    renderCard = (owner, stacked) => (cardIndex, arrayIndex) => {
        const value = this.props.deck[cardIndex]
        return <Card 
            key={`${value.type}-${value.weight}`}
            show={owner !== DEALER || (owner === DEALER && arrayIndex === 0) || stacked}
            value={value}/>
    }

    renderDeck = ({key, value}) => {
        const selectedClass = key === this.props.currentStackId? "currently-selected ": ""
        const score = this.props.score[key] || 0
        const deckWinState = value.owner !== DEALER? this.props.getDeckWin(key) : null
        return (
            <div key={key} className="deck-container">
                <p>Score: {score}</p>
                {deckWinState? <p>{deckWinState}</p> : null}
                <div className={`deck ${selectedClass}`}>
                    {value.cards.map(this.renderCard(value.owner, value.stacked))}
                </div>
            </div>
        )

    }

	render(){
		return (
            <div className="app-container">
                <div className="board-container">
                    <div className="side">
                        {this.props.dealerDeck.map(this.renderDeck)}
                    </div>
                    <div className="side player-side">
                        {this.props.playerDeck.map(this.renderDeck)}
                    </div>
                </div>
                <Actions 
                    actions={actionList}
                    canSplit={this.props.canSplit}
                    canStack={this.props.canStack}
                    canHit={this.props.canHit} 
                    onAction={this.props.handleAction} />
			</div>
		);
	}
}

const mapStateToProps = ({gameState: { deck, cardStacks, currentStackId, score }}) => ({
    dealerDeck: Object.keys(cardStacks)
        .filter(key => cardStacks[key].owner === DEALER )
        .map(key => ({key, value: cardStacks[key]})),

    playerDeck: Object.keys(cardStacks)
        .filter(keys => cardStacks[keys].owner === PLAYER)
        .map(key => ({key, value: cardStacks[key]})),

    deck,

    currentStackId,

    score,
    
    canHit: currentStackId && cardStacks[currentStackId].owner === PLAYER,

    canStack: currentStackId && cardStacks[currentStackId].owner === PLAYER,

    canSplit: currentStackId && 
        cardStacks[currentStackId].cards.length === 2 && 
        cardStacks[currentStackId].owner === PLAYER &&
        Object.keys(cardStacks)
            .filter(key => cardStacks[key].owner === PLAYER)
            .length === 1,
    
    getDeckWin: deckId => {
        const dealerDeckId = Object.keys(cardStacks)
            .filter(key => cardStacks[key].owner === DEALER)[0]

        const currentDeck = cardStacks[deckId];
        const deckScore = score[deckId];
        const dealerScore = score[dealerDeckId];

        if(currentDeck.stacked && cardStacks[dealerDeckId].stacked){
            if(deckScore > 21 || (deckScore < dealerScore && dealerScore < 21)){
                return "You Lose"
            } else {
                return "You Win"
            }
        }
        return null
    }
})

const mapDispatchToProps = dispatch => ({
    handleAction: type => dispatch(actionGenerator(type))
})
export default connect(mapStateToProps, mapDispatchToProps)( App);