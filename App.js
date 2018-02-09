import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';


import reducers from './src/reducers';
import Router from './router';

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
		
    return (
			<Provider store={store}>
				<Router />
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
