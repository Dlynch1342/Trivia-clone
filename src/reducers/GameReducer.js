import { GAME_START, GOT_QUESTION, USER_RESPONSE } from '../actions/types';

const INITIAL_STATE = {
    gameStart: false,
    question: null
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_START:
            return { ...state, gameStart: action.payload };
        case GOT_QUESTION:
            console.log(action.payload)
            return { ...state, question: action.payload };
        case USER_RESPONSE:
            console.log('the user responded: ', action.payload)
            return state;
        default:
            return state;
    }
}