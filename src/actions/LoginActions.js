import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { EMAIL_INPUT, PASSWORD_INPUT, LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const emailInput = (text) => {
	return {
		type: EMAIL_INPUT,
		payload: text
	};
};

export const passwordInput = (text) => {
	return {
		type: PASSWORD_INPUT,
		payload: text
	}
};

export const userLogin = ({ email, password }) => {
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginSuccess1(dispatch, user))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => loginSuccess2(dispatch, user))
					.catch(() => loginFail(dispatch));
		});
	};
};

const loginSuccess1 = (dispatch, user) => {
	dispatch({
		type: LOGIN_SUCCESS,
		payload: user
	});

	Actions.main();
}

const loginSuccess2 = (dispatch, user) => {
	dispatch({
		type: LOGIN_SUCCESS,
		payload: user
	});

	Actions.username();
}

const loginFail = (dispatch) => {
	dispatch({
		type: LOGIN_FAIL,
	})
}