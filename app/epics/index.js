import { combineEpics } from 'redux-observable';

import startGame from './start-game';
import hit from './hit';
import split from './split';
import stack from './stack';
import dealerDraw from './dealer-draw';

export default combineEpics(
    startGame,
    hit,
    split,
    stack,
    dealerDraw
)