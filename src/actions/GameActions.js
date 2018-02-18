import firebase from 'firebase';
import { GOT_BANNERS } from './types'

export const getBanners = (banner) => {
    const b = banner;
    console.log(b)
    return (dispatch) => {
        const ref = firebase.database().ref(`banners/${b}`);
        ref.once('value')
            .then(snapshot => {
                dispatch({ type: GOT_BANNERS, payload: snapshot.val() })
            })
    };
};