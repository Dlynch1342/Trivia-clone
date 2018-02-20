// ABSOLUTE
import { combineReducers } from 'redux';

// RELATIVE
import LoginReducer from './LoginReducer';
import UsernameReducer from './UsernameReducer';
import LeaderboardReducer from './LeaderboardReducer';
import LobbyReducer from './LobbyReducer';
import GameReducer from './GameReducer';

export default combineReducers({
	game: GameReducer,
	login: LoginReducer,
	nickname: UsernameReducer,
	rank: LeaderboardReducer,
	lobby: LobbyReducer
});
