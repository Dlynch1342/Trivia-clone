import { 
	GAME_START, 
	GOT_QUESTIONS, 
	USER_RESPONSE, 
	PLAYER_WIN, 
	PLAYER_LOSE, 
	GOT_WINNERS, 
	SAVED_LIFE,
	TOTAL_CALC,
	PLAYER_ELIMINATED,
	TODAY_WINNERS,
	EARNINGS_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
	winners: null,
	questions: null,
	userPlaying: true,
	lifeSave: false,
	prize: null,
	earningsUpdated: false
}

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case GOT_QUESTIONS:
			return { ...state, questions: action.payload };
		case GOT_WINNERS:
			return { ...state, winners: action.payload };
		case TOTAL_CALC:
			return { ...state, prize: action.payload };
		case TODAY_WINNERS:
			return state
		case EARNINGS_UPDATED:
			return { ...state, earningsUpdated: true }
		case USER_RESPONSE:
			return state;
		case SAVED_LIFE:
			return { ...state, userPlaying: true, lifeSave: true };
		case PLAYER_ELIMINATED:
			return { ...state, userPlaying: false, lifeSave: true };
		case PLAYER_WIN:
			return { ...state, userPlaying: true };
		case PLAYER_LOSE:
			return { ...state, userPlaying: false };
		default:
			return state;
	}
}