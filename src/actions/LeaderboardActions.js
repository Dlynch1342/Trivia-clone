// ABSOLUTE
import firebase from 'firebase';
import _ from 'lodash';

// RELATIVE
import { GET_WEEK, GET_TOTAL } from './types';

export const getWeek = () => {
    return (dispatch) => {
        var arr = [];
        var ref = firebase.database().ref('weekly')
        ref.orderByValue().on('value', snapshot => {
            snapshot.forEach(child => {
                arr.unshift({ user: child.key, value: child.val() })
            })
        })
        dispatch({ type: GET_WEEK, payload: arr })
    };
};

export const getTotal = () => {
    return (dispatch) => {
        var arr = [];
        var ref = firebase.database().ref('alltime')
        ref.orderByValue().on('value', snapshot => {
            snapshot.forEach(child => {
                arr.unshift({ user: child.key, value: child.val() })
            })
        })
        dispatch({ type: GET_TOTAL, payload: arr })
    };
};