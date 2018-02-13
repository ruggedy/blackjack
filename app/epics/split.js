import { SPLIT_INIT, SPLIT_COMPLETE } from '../actions/constant';
import shortId from 'shortid';

import { throttleTime } from 'rxjs/operators/throttleTime'
import { map } from 'rxjs/operators/map'


export default ($action, store) => 
    $action.ofType(SPLIT_INIT).pipe(
        throttleTime(200),
        map(action => {
            const {
                currentStackId,
                cardStacks
            } = store.getState().gameState
            
            const currentStack = cardStacks[currentStackId];
            const currentCards = currentStack.cards;
            const newCardStacks = {
                ...cardStacks,
                [currentStackId]: {
                    ...currentStack,
                    cards: currentCards.slice(0, currentCards.length/2)
                },
                [shortId.generate()]: {
                    ...currentStack,
                    cards: currentCards.slice(currentCards.length/2)
                }

            }

            const payload = { cardStacks: newCardStacks }

            return {type: SPLIT_COMPLETE, payload }
        })
    )