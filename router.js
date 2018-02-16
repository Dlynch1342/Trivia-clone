// ABSOLUTE
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

// RELATIVE
import Login from './src/components/Login';
import Username from './src/components/Username';
import Dashboard from './src/components/Dashboard';
import Leaderboard from './src/components/Leaderboard';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key='root' hideNavBar>
				<Scene key='auth'>
					<Scene key='login' component={Login} title='부자 되세요!' initial />
				</Scene>
				<Scene key='username'>
					<Scene key='login2' component={Username} title='Enter Your Username' />
				</Scene>
				<Scene key='main'>
					<Scene 
							// rightTitle='Add'
							// onRight={() => Actions.leaderboard()}
							key='dashboard' 
							component={Dashboard} 
							title='Welcome'
							initial 
					/>
					<Scene key='leaderboard' component={Leaderboard} title='Check it out!' />
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;