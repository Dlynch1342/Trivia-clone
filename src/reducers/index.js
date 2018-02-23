// ABSOLUTE
import { combineReducers } from 'redux';

// RELATIVE
import LoginReducer from './LoginReducer';
import UsernameReducer from './UsernameReducer';
import DashboardReducer from './DashboardReducer';
import LeaderboardReducer from './LeaderboardReducer';
import LobbyReducer from './LobbyReducer';
import GameReducer from './GameReducer';

export default combineReducers({
	game: GameReducer,
	login: LoginReducer,
	nickname: UsernameReducer,
	chance: DashboardReducer,
	rank: LeaderboardReducer,
	lobby: LobbyReducer
});
