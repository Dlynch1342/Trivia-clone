// RELATIVE
import { 
	USERNAME_INPUT, 
	USERNAME_SAVE, 
	FETCH_USERNAME, 
	REFERRALCODE_INPUT 
} from '../actions/types';

const INITIAL_STATE = {
	username: '',
	referralcode: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USERNAME_INPUT:
			return {...state, username: action.payload};
		case USERNAME_SAVE:
			return INITIAL_STATE;	
		case FETCH_USERNAME:
			return {...state, username: action.payload};
		case REFERRALCODE_INPUT:
			return {...state, referralcode: action.payload};	
		default:
			return state;
	}
}