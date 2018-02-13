import { DEALER_DRAW_INIT, DEALER_DRAW_COMPLETE } from '../actions/constant';

import { map } from 'rxjs/operators/map'

import countCard from '../services/count-card';

export default ($action, store) => 
    $action.ofType(DEALER_DRAW_INIT).pipe(
        map(action => {
            let {
                currentStackId,
                cardCount,
                cardStacks,
                score,
                deck,
            } = store.getState().gameState

            let dealerDeck = cardStacks[currentStackId].cards;
            const newDealerDeck = dealerDraw(dealerDeck);
            const newDealerDeckCount = countCard(newDealerDeck.map(v => deck[v]));

            const payload = {
                currentStackId: null,
                cardCount,
                score: {...score, [currentStackId]: newDealerDeckCount},
                cardStacks: {
                    ...cardStacks,
                    [currentStackId]: {
                        ...cardStacks[currentStackId],
                        cards: newDealerDeck,
                        stacked: true
                    }
                }
            }
            
            return {type: DEALER_DRAW_COMPLETE, payload}

            function dealerDraw(cards){
                const count = countCard(cards.map(v => deck[v]))
                if(count < 16){
                    cards = [...cards, cardCount--]
                    return dealerDraw(cards)
                }
                return cards
            }
        })
    )