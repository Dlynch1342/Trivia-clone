// RELATIVE
import { FETCH_USERNAME, GOT_QUESTION, USER_RESPONSE } from '../actions/types';

const INITIAL_STATE = {
	question: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_USERNAME:
			console.log(action.payload, 'reducer');
			return action.payload;
		case GOT_QUESTION:
			return { ...state, question: action.payload };
		case USER_RESPONSE:
			console.log('thy user responded: ', action.payload)
			return state		
		default:
			return state;
	}
}