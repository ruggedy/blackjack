import { 
    SHUFFLE_DECK, 
    START_GAME,
    SPLIT_INIT,
    SPLIT_COMPLETE,
    HIT,
    DOUBLE_DOWN_INIT,
    DOUBLE_DOWN_COMPLETE 
} from './constant';




export const startGame = () => ({type: START_GAME})
export default (type) => ({type})