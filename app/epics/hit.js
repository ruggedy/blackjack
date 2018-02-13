import { HIT_INIT, HIT_COMPLETE } from '../actions/constant';

import { throttleTime } from 'rxjs/operators/throttleTime'
import { map } from 'rxjs/operators/map'


export default ($action, store) => 
    $action.ofType(HIT_INIT).pipe(
        throttleTime(200),
        map(action => {
            const { 
                currentStackId, 
                cardStacks, 
                cardCount 
            } = store.getState().gameState;

            const newCurrentStack = {
                ...cardStacks[currentStackId],
                cards: [ ...cardStacks[currentStackId].cards, cardCount ]
            }

            const newCardStacks = {
                ...cardStacks,
                [currentStackId]: newCurrentStack
            }

            const payload = {
                cardStacks: newCardStacks,
                cardCount: cardCount-1
            }
            
            return {type: HIT_COMPLETE, payload}
        })
    )