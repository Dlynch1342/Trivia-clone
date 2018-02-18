import { GAME_START } from './types'


export const beginGame = (text) => {
    return {
        type: GAME_START,
        payload: text
    };
};
