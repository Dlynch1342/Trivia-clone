import firebase from 'firebase';

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
			.then(user => loginSuccess(dispatch, user))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => loginSuccess(dispatch, user))
					.catch(() => loginFail(dispatch));
		});
	};
};

const loginSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_SUCCESS,
		payload: user
	})
}

const loginFail = (dispatch) => {
	dispatch({
		type: LOGIN_FAIL,
	})
}