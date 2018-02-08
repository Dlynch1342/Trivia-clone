import firebase from 'firebase';

import { USERNAME_INPUT, USERNAME_SAVE } from './types';

export const usernameInput = (text) => {
	return {
		type: USERNAME_INPUT,
		payload: text
	};
};

export const usernameSave = ({ username }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`users/${currentUser.uid}`).set({ username })
			.then(() => {dispatch({ type: USERNAME_SAVE })});
	};
};