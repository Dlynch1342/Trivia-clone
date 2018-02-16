import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-trivia-1ec67.cloudfunctions.net';

class LeaderboardScreen extends Component {
	// componentWillMount() {
	// 	this.executeSumUp();
	// }
	
	render() {
		return (
			<View>
				<Text>LIST</Text>
			</View>
		);
	}
}

export default LeaderboardScreen;
