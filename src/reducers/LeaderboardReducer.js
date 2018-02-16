// RELATIVE
import { GET_WEEK, GET_TOTAL } from '../actions/types';

const INITIAL_STATE = {
    week: [],
    total: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WEEK:
            return { ...state, week: action.payload };
        case GET_TOTAL:
            return { ...state, total: action.payload };
        default:
            return state;
    }
}