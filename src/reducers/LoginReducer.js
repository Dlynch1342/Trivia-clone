import { EMAIL_INPUT, PASSWORD_INPUT, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const INITIAL_STATE = {
	email: 'ethan@gmail.com',
	password: 'password',
	user: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_INPUT:
			return {...state, email: action.payload};
		case PASSWORD_INPUT:
			return {...state, password: action.payload};
		case LOGIN_SUCCESS:
			return {...state, ...INITIAL_STATE, user: action.payload};
		case LOGIN_FAIL:
			return console.log('fail');

		default:
			return state;
	}
};