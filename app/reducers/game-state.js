import { 
    HIT_COMPLETE, 
    SPLIT_COMPLETE, 
    START_GAME_COMPLETE,
    STACK_COMPLETE ,
    DEALER_DRAW_COMPLETE   
} from '../actions/constant';

const initialState = {
    deck: [],
    currentStackId: null,
    score: {},
    cardCount: 51,
    cardDealt: false,
    cardStacks: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case START_GAME_COMPLETE:
            return { ...initialState, ...action.payload }
        case HIT_COMPLETE:
        case SPLIT_COMPLETE: 
        case STACK_COMPLETE:
        case DEALER_DRAW_COMPLETE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}