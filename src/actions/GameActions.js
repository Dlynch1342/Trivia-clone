import firebase from 'firebase';
import { GAME_START, GOT_BANNERS, GOT_QUESTIONS, USER_RESPONSE } from './types'

export const beginGame = (text) => {
    return {
        type: GAME_START,
        payload: text
    };
};

export const getBanners = (banner) => {
    const b = banner;
    console.log(b)
    return (dispatch) => {
        const ref = firebase.database().ref(`banners/${b}`);
        ref.once('value', snapshot => {
                dispatch({ type: GOT_BANNERS, payload: snapshot.val() })
            })
    };
};

export const getQuestions = () => {
    console.log('hit getQ')
    return (dispatch) => {
        const ref = firebase.database().ref('/questions');
        ref.once('value', snapshot => {
            console.log(snapshot.val())
                dispatch({ type: GOT_QUESTIONS, payload: snapshot.val() })
            })
    };
};

export const respond = (data) => {
    const currentQuestion = 'question_10'
    const user = firebase.auth().currentUser.uid;
    const answer = firebase.database().ref(`answer/${currentQuestion}`)

    return (dispatch) => {
        if (data === answer ) {
            //run true
        } 
        if (data !== answer ) {
            //run true
        } 
        if (data === 'option_1') {
            firebase.database().ref('user_answers/option_1').push({ uid: user, response: data })
            dispatch({ type: USER_RESPONSE, payload: data })
        } if (data === 'option_2') {
            firebase.database().ref('user_answers/option_2').push({ uid: user, response: data })
            dispatch({ type: USER_RESPONSE, payload: data })
        } else if (data === 'option_3') {
            firebase.database().ref('user_answers/option_3').push({ uid: user, response: data })
            dispatch({ type: USER_RESPONSE, payload: data })
        }
    };
}