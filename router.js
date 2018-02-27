// ABSOLUTE
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

// RELATIVE
import Login from './src/components/Login';
import Username from './src/components/Username';
import Dashboard from './src/components/Dashboard';
import Heart from './src/components/Heart';
import Leaderboard from './src/components/Leaderboard';
import Lobby from './src/components/Lobby';
import Game from './src/components/Game';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ backgroundColor: '#F5F5F5' }}>
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
							initial 
					/>
					<Scene key='leaderboard' component={Leaderboard} title='Check it out!' />
					<Scene key='heart' component={Heart} title='One more chance?' />
				</Scene>
				<Scene key='start'>
					<Scene key='lobby' component={Lobby} title='Lobby Time' />
					<Scene key='game' component={Game} title='Game Time' />
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;