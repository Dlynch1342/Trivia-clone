import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';


import reducers from './src/reducers';
import LoginScreen from './src/screens/LoginScreen';
import UsernameScreen from './src/screens/UsernameScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default class App extends React.Component {
	componentWillMount() {
		const config = {
      apiKey: "AIzaSyDqYuLYEHSeiO0PrT4zPWornW7mHX8uP80",
      authDomain: "trivia-1ec67.firebaseapp.com",
      databaseURL: "https://trivia-1ec67.firebaseio.com",
      projectId: "trivia-1ec67",
      storageBucket: "trivia-1ec67.appspot.com",
      messagingSenderId: "308224065203"
    };
    firebase.initializeApp(config);
	}
	
  render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		const MainNavigator = TabNavigator({
      login: { screen: LoginScreen },
      username: { screen: UsernameScreen },
      main: {
        screen: TabNavigator({
          dashboard: { screen: DashboardScreen }
        })
      } 
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
		});
		
    return (
			<Provider store={store}>
				<View style={styles.container}>
					<MainNavigator />
				</View>
			</Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#fff',
		marginTop: 25
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
