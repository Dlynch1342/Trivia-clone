import { GAME_START } from '../actions/types';

const INITIAL_STATE = {
    gameStart: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_START:
            return { ...state, gameStart: action.payload } 
        default:
            return state;
    }
}