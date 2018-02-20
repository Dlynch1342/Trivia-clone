import { GAME_START, GOT_QUESTIONS, USER_RESPONSE, PLAYER_WIN, PLAYER_LOSE } from '../actions/types';

const INITIAL_STATE = {
    gameStart: false,
    questions: null,
    userPlaying: true,
    currentQuestion: 0
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_START:
            return { ...state, gameStart: action.payload };
        case GOT_QUESTIONS:
            return { ...state, questions: action.payload };
        case USER_RESPONSE:
            return state;
        case PLAYER_WIN:
            newQuestion = state.currentQuestion + 1
            return { ...state, currentQuestion: newQuestion };
        case PLAYER_LOSE:
            newQuestion = state.currentQuestion + 1
            return { ...state, userPlaying: false, currentQuestion: newQuestion };
        default:
            return state;
    }
}