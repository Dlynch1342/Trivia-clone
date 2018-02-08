import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions'; 

class UsernameScreen extends Component {
	onUsernameInput(text) {
		this.props.usernameInput(text);
	}

	onButtonPress() {
		const { username } = this.props.nickname;

		this.props.usernameSave({ username });
		this.props.navigation.navigate('dashboard');
	}

	render() {
		return (
			<View>
				<View>
					<FormLabel>USERNAME</FormLabel>
					<FormInput
						placeholder='Please enter your username'
						autoCapitalize='none'
						autoCorrect={false}
						returnKeyType='done'
						value={this.props.username}
						onChangeText={this.onUsernameInput.bind(this)}
					/>
				</View>
				<View>
					<Button
						title='SAVE'
						onPress={this.onButtonPress.bind(this)}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return { nickname: state.nickname };
};

export default connect(mapStateToProps, actions)(UsernameScreen);
