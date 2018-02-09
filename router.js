import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import LoginScreen from './src/screens/LoginScreen';
import UsernameScreen from './src/screens/UsernameScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key='root' hideNavBar>
				<Scene key='auth'>
					<Scene key='login' component={LoginScreen} title='부자 되세요!' initial />
				</Scene>
				<Scene key='username'>
					<Scene key='login2' component={UsernameScreen} title='Enter Your Username' />
				</Scene>
				<Scene key='main'>
					<Scene 
							// rightTitle='Add'
							// onRight={() => Actions.employeeAdd()}
							key='dashboard' 
							component={DashboardScreen} 
							title='Welcome'
							initial 
					/>
					{/* <Scene key='employeeAdd' component={EmployeeCreate} title='Add a New Asshole' />
					<Scene key='employeeEdit' component={EmployeeEdit} title='Edit this Asshole' /> */}
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;