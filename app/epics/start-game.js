import { 
    START_GAME_INIT,
    START_GAME_COMPLETE,
    PLAYER,
    DEALER
 } from '../actions/constant';

import createDeck from '../services/create-deck';
import shuffleDeck from '../services/shuffle-deck';
import shortId from 'shortid';

import { startWith } from 'rxjs/operators/startWith'
import { map } from 'rxjs/operators/map'

export default $action => 
    $action.ofType(START_GAME_INIT).pipe(
        startWith({type: START_GAME_INIT}),
        map(value => {
            const deck = shuffleDeck(createDeck());

            let cardCount = 51;

            const cardStacks = {
                [shortId.generate()]: {
                    owner: PLAYER,
                    cards: [],
                    stacked: false,
                    burst: false,
                },
                [shortId.generate()]: {
                    owner: DEALER,
                    cards: [],
                    stacked: false,
                    burst: false,
                }
            }

            deal(2);

            const currentStackId = Object
                .keys(cardStacks)
                .filter(value => 
                    cardStacks[value].owner === PLAYER
                )[0]

            const payload = { deck, cardStacks, currentStackId, cardCount }

            function deal(numberOfCards){
                console.log("this is frm deal ", numberOfCards)
                if(numberOfCards === 0){
                    return
                } else {
                    Object.keys(cardStacks).forEach(key => {
                        cardStacks[key].cards.push(cardCount--)
                    })
                    deal(--numberOfCards)
                }
            }

            return {type: START_GAME_COMPLETE, payload }
        })
    )