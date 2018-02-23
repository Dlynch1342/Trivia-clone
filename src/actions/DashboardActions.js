// ABSOLUTE
import firebase from 'firebase';

// RELATIVE
import { FETCH_HEART } from './types';

export const heartFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
	firebase.database().ref(`users/${currentUser.uid}/username`)
			.once('value', snap => {
				var name = snap.val();
				
				firebase.database().ref(`heart_list`).once('value')
					.then (snap => {
						var count = snap.child(`${name}`).numChildren();
						
						dispatch({ type: FETCH_HEART, payload: count })
					})
			})
		}
};