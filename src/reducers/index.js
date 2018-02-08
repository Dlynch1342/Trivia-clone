import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UsernameReducer from './UsernameReducer';

export default combineReducers({
	login: LoginReducer,
	nickname: UsernameReducer
});
