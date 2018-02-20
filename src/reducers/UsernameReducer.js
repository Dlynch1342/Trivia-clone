// RELATIVE
import { USERNAME_INPUT, USERNAME_SAVE, FETCH_USERNAME } from '../actions/types';

const INITIAL_STATE = {
	username: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USERNAME_INPUT:
			return { ...state, username: action.payload };
		case USERNAME_SAVE:
			return INITIAL_STATE;
		case FETCH_USERNAME:
			return { ...state, username: action.payload };
		default:
			return state;
	}
}