import { FETCH_USERNAME } from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_USERNAME:
			console.log(action.payload, 'reducer');
			return action.payload;
		
		default:
			return state;
	}
}