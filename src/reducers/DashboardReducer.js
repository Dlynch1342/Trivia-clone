// RELATIVE
import { FETCH_HEART } from '../actions/types';

const INITIAL_STATE = {
	heartCount: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_HEART:
			return {...state, heartCount: action.payload};
		default:
			return state;
	}
}