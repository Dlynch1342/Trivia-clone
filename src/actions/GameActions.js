import firebase from 'firebase';
import {   
	GAME_START,
	GOT_BANNERS,
	GOT_QUESTIONS,
	USER_RESPONSE,
	PLAYER_WIN,
	PLAYER_LOSE,
	GOT_WINNERS,
	SAVED_LIFE,
	TOTAL_CALC,
	PLAYER_ELIMINATED,
	TODAY_WINNERS,
	EARNINGS_UPDATED
} from './types'

export const getBanners = (banner) => {
    console.log('hit getBanners action')
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
            console.log('hit get', snapshot.val())
                dispatch({ type: GOT_QUESTIONS, payload: snapshot.val() })
            })
    };
};

export const respond = (option, num) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        const ref = firebase.database().ref(`answers/question_${num}/${option}`);
        ref.once('value').then(function (snapshot) {
            var answer = snapshot.exists();
            if (answer) {
                console.log('winner')
                dispatch({ type: PLAYER_WIN })
            }
						if (answer && num == 12)
						 {
							firebase.database().ref(`users/${currentUser.uid}/username`)
								.once('value', snap => {
									var name = snap.val();
									console.log(name, 'today')
									firebase.database().ref(`today/${name}`).set(true)
									dispatch({ type: TODAY_WINNERS })
								})
            }
            if (!answer) {
                console.log('loser')
                dispatch({ type: PLAYER_LOSE })
            }
            if (option === 'option_1') {
                firebase.database().ref(`user_answers/option_1/${currentUser.uid}`).set(option)
                dispatch({ type: USER_RESPONSE, payload: option })
            } if (option === 'option_2') {
                firebase.database().ref(`user_answers/option_2/${currentUser.uid}`).set(option)
                dispatch({ type: USER_RESPONSE, payload: option })
            } else if (option === 'option_3') {
                firebase.database().ref(`user_answers/option_3/${currentUser.uid}`).set(option)
                dispatch({ type: USER_RESPONSE, payload: option })
            }
        })
    };
}

export const noClick = () => {
	return {
		type: PLAYER_LOSE
	}
}

export const getWinners = () => {
	return (dispatch) => {
		const ref = firebase.database().ref('/today');
		ref.once('value').then(function (snapshot) {
			console.log(snapshot.val())
			dispatch({ type: GOT_WINNERS, payload: snapshot.val() })
		})
	}
}

export const calculateTotal = () => {
	return (dispatch) => {
		const ref = firebase.database().ref('/prize/amount');
		ref.once('value').then(function (snapshot) {
			console.log(snapshot.val())
			dispatch({ type: TOTAL_CALC, payload: snapshot.val() })
		})
	}
}

export const updateEarnings = (prize, username) => {
	return (dispatch) => {
		const { currentUser } = firebase.auth();
		const ref = firebase.database().ref('earnings');
		console.log(username, prize)
		ref.push({
			[username]: prize,
			createdAt: firebase.database.ServerValue.TIMESTAMP
		})
		dispatch({ type: EARNINGS_UPDATED })
		}
}

export const saveLife = () => {
	return(
		{ type: SAVED_LIFE }
	)
}
export const eliminate = () => {
	return(
		{ type: PLAYER_ELIMINATED }
	)
}
