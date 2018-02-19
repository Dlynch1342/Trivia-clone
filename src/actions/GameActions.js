import firebase from 'firebase';
import {   
    GAME_START,
    GOT_BANNERS,
    GOT_QUESTIONS,
    USER_RESPONSE,
    PLAYER_WIN,
    PLAYER_LOSE
} from './types'

export const beginGame = (text) => {
    return {
        type: GAME_START,
        payload: text
    };
};

export const getBanners = (banner) => {
    const b = banner;
    return (dispatch) => {
        const ref = firebase.database().ref(`banners/${b}`);
        ref.once('value', snapshot => {
                dispatch({ type: GOT_BANNERS, payload: snapshot.val() })
            })
    };
};

export const getQuestions = () => {
    return (dispatch) => {
        const ref = firebase.database().ref('/questions');
        ref.once('value', snapshot => {
                dispatch({ type: GOT_QUESTIONS, payload: snapshot.val() })
            })
    };
};

export const respond = (option,num) => {
    return (dispatch) => {
        const user = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref(`answers/question_${num}/${option}`);
        ref.once("value").then(function(snapshot){
            var answer = snapshot.exists();
            if (answer) {
                console.log('on player winnner')
                dispatch({ type: PLAYER_WIN })
            } 
            if (!answer) {
                console.log('on plater loooose')
                dispatch({ type: PLAYER_LOSE })
            } 
            // if (option === 'option_1') {
            //     firebase.database().ref('user_answers/option_1').push({ uid: user, response: data })
            //     return dispatch({ type: USER_RESPONSE, payload: data })
            // } if (option === 'option_2') {
            //     firebase.database().ref('user_answers/option_2').push({ uid: user, response: data })
            //     return dispatch({ type: USER_RESPONSE, payload: data })
            // } else if (option === 'option_3') {
            //     firebase.database().ref('user_answers/option_3').push({ uid: user, response: data })
            //     return dispatch({ type: USER_RESPONSE, payload: data })
            // }
        })
    };
}