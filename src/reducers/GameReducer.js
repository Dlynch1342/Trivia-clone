import { GAME_START, GOT_QUESTIONS, USER_RESPONSE } from '../actions/types';

const INITIAL_STATE = {
    gameStart: false,
    questions: null
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_START:
            return { ...state, gameStart: action.payload };
        case GOT_QUESTIONS:
        console.log('got that shit')
            return { ...state, questions: action.payload };
        case USER_RESPONSE:
            return state;
        default:
            return state;
    }
}