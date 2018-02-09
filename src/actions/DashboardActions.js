// import firebase from 'firebase';

// import { FETCH_USERNAME } from './types';

// export const usernameFetch = () => {
// 	const { currentUser } = firebase.auth();
// 	console.log({ currentUser }, 'dashboard');

// 	return (dispatch) => {
// 		firebase.database().ref(`users/${currentUser}`).on('value', snap => {
// 				console.log(snap.val());
// 			});
// 	};
// };
