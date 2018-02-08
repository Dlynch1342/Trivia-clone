import { USERNAME_INPUT, USERNAME_SAVE } from '../actions/types';

const INITIAL_STATE = {
	username: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USERNAME_INPUT:
			console.log(action.payload);
			return {...state, username: action.payload};
		case USERNAME_SAVE:
			return INITIAL_STATE;
	
		default:
			return state;
	}
}