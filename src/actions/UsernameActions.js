// ABSOLUTE
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

// RELATIVE
import { USERNAME_INPUT, USERNAME_SAVE, FETCH_USERNAME } from './types';

export const usernameInput = (text) => {
	return {
		type: USERNAME_INPUT,
		payload: text
	};
};

export const usernameSave = ({ username }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`usernameList/${currentUser.uid}`).set({ username });
		
		firebase.database().ref(`users/${currentUser.uid}`).set({ username })
			.then(() => {dispatch({ type: USERNAME_SAVE });
			Actions.main();
		});
	};
};

const usernamelistsave = (data) => {
	firebase.database().ref(`usernaemList/${currentUser.uid}`).set(data);
}

export const usernameFetch = () => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`users/${currentUser.uid}/username`)
			.once('value', snap => {
				dispatch({ type: FETCH_USERNAME, payload: snap.val() });
			});
	};
};
