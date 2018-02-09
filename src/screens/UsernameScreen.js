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
		console.log( {username });

		this.props.usernameSave({ username });
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
				<View style={{ marginTop: 20 }}>
					<Button
						title='SAVE'
						backgroundColor='#03A9F4'
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
