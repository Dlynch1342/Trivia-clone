// ABSOLUTE
import { combineReducers } from 'redux';

// RELATIVE
import LoginReducer from './LoginReducer';
import UsernameReducer from './UsernameReducer';
import DashboardReducer from './DashboearReducer';
import LeaderboardReducer from './LeaderboardReducer';

export default combineReducers({
	login: LoginReducer,
	nickname: UsernameReducer,
	dashboard: DashboardReducer,
	rank: LeaderboardReducer
});
