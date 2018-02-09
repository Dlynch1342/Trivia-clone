import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UsernameReducer from './UsernameReducer';
import DashboardReducer from './DashboearReducer';

export default combineReducers({
	login: LoginReducer,
	nickname: UsernameReducer,
	dashboard: DashboardReducer
});
