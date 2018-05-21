import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import ontime from 'ontime'

import reducers from './src/reducers';
import Router from './router';

export default class App extends React.Component {  
	componentWillMount() {
		const config = {
      apiKey: "AIzaSyAmKL1Fo-uiiFfoMZf0FwNpi1yGSZ5pTqU",
      authDomain: "trivia-3c84e.firebaseapp.com",
      databaseURL: "https://trivia-3c84e.firebaseio.com",
      projectId: "trivia-3c84e",
      storageBucket: "trivia-3c84e.appspot.com",
      messagingSenderId: "304765261822"
    };
    firebase.initializeApp(config);


    // gameStart = (text) => {
    //   console.log(text)
    //   this.props.beginGame(text)
    // }

    // ontime({
    //   cycle: ['13:54:00'],
    //   single: false
    // }, function (ot) {
    //   console.log('it is game time', ot)
    //   gameStart(true)
    //   ot.done()
    //   return
    // })
	}

  render() {
		const composeEnhancers = composeWithDevTools;
		const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));
		// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		
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
