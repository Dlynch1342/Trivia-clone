// ABSOLUTE
import { combineReducers } from 'redux';

// RELATIVE
import LoginReducer from './LoginReducer';
import UsernameReducer from './UsernameReducer';
import DashboardReducer from './DashboardReducer';
import LeaderboardReducer from './LeaderboardReducer';
import LobbyReducer from './LobbyReducer';
import GameStartReducer from './GameStartReducer';

export default combineReducers({
	game: GameStartReducer,
	login: LoginReducer,
	nickname: UsernameReducer,
	dashboard: DashboardReducer,
	rank: LeaderboardReducer,
	lobby: LobbyReducer
});
