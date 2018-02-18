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
import firebase from 'firebase';
import { GOT_QUESTION, USER_RESPONSE } from './types';

export const getQuestion = (question) => {
    const q = question;
    return (dispatch) => {
        const ref = firebase.database().ref(`questions/20180326/${q}`);
        ref.once('value')
            .then(snapshot => {
                dispatch({ type: GOT_QUESTION, payload: snapshot.val() })
            })
    };
};

export const respond = (data) => {
    const user = firebase.auth().currentUser.uid;
    return (dispatch) => {
        firebase.database().ref('user_answers').push({ uid: user, response: data })
        dispatch({ type: USER_RESPONSE, payload: data })
    };
    ;
}