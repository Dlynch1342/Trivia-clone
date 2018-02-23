// ABSOLUTE
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

// RELATIVE
import { 
	USERNAME_INPUT, 
	USERNAME_SAVE, 
	FETCH_USERNAME, 
	REFERRALCODE_INPUT 
} from './types';

export const usernameInput = (text) => {
	return {
		type: USERNAME_INPUT,
		payload: text
	};
};

export const referralCodeInput = (code) => {
	return {
		type: REFERRALCODE_INPUT,
		payload: code
	};
};

export const usernameSave = ({ username }, data) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`username_list/${data}`).set(currentUser.uid);
		
		firebase.database().ref(`users/${currentUser.uid}`).set({ username })
			.then(() => {
				dispatch({ type: USERNAME_SAVE });
				Actions.main();
			});
	};
};

export const usernameFetch = () => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`users/${currentUser.uid}/username`)
			.once('value', snap => {
				dispatch({ type: FETCH_USERNAME, payload: snap.val() });
			});
	};
};
