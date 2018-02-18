import { GOT_BANNERS } from '../actions/types';

const INITIAL_STATE = {
    banner: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GOT_BANNERS:
            console.log('hit lobby reducer')
            return { ...state, banner: action.payload}
        default:
            return state;
    }
}