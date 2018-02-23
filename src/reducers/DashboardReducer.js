// RELATIVE
import { FETCH_HEART } from '../actions/types';

const INITIAL_STATE = {
	heartcount: 0
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_HEART:
			return {...state, heartcount: action.payload};
		default:
			return state;
	}
}