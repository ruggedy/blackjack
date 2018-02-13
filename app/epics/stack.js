import { STACK_COMPLETE, STACK_INIT, PLAYER, DEALER, DEALER_DRAW_INIT } from '../actions/constant';

import { throttleTime } from 'rxjs/operators/throttleTime'
import { map } from 'rxjs/operators/map'
import { switchMap } from 'rxjs/operators/switchMap'
import { of } from 'rxjs/observable/of'

import countCard from '../services/count-card';

export default ($actions, store) => 
    $actions.ofType(STACK_INIT).pipe(
        throttleTime(200),
        switchMap(action => {
            const {
                deck,
                cardStacks,
                currentStackId,
                score
            } = store.getState().gameState

            const playerDeckKeys = Object.keys(cardStacks)
                .filter(key =>
                    key !== currentStackId && 
                    cardStacks[key].owner === PLAYER &&
                    !cardStacks[key].stacked
                )
            
            let newCurrentStackId
            if(playerDeckKeys.length > 0){
                newCurrentStackId = playerDeckKeys[0]
            } else {
                newCurrentStackId = Object.keys(cardStacks)
                    .filter(key => 
                        cardStacks[key].owner === DEALER
                    )[0]
            }

            const count = countCard(cardStacks[currentStackId].cards.map(v => deck[v]))

            const payload = {
                currentStackId: newCurrentStackId,
                cardStacks: {
                    ...cardStacks,
                    [currentStackId]: {
                        ...cardStacks[currentStackId],
                        stacked: true
                    }
                },
                score: {
                    ...score,
                    [currentStackId]: count
                }
            }
            if(cardStacks[newCurrentStackId].owner === DEALER){
                return of({type: STACK_COMPLETE, payload}, {type: DEALER_DRAW_INIT})
            }
            return of({type: STACK_COMPLETE, payload})
        })
    )

