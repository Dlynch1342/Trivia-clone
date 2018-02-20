import firebase from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';

// RELATIVE
import * as actions from '../actions';

class Username extends Component {
	constructor(props) {
		super(props)

		this.state = {
			usernameValid: true,
			error_1: '',
			error_2: ''
		}
	}

	onUsernameInput(text) {
		const newText = String(text).replace(/\s+/g, '');

		this.props.usernameInput(newText);
	}

	onButtonPress() {
		console.log('hit button press')
		const { currentUser } = firebase.auth();
		const { username } = this.props.nickname;
		const data = this.props.nickname.username;

		const usernameValid = username.length > 2;
		this.setState({ usernameValid })
		if (usernameValid) {
			firebase.database().ref('usernameList').orderByValue().equalTo(`${this.props.nickname.username}`).once('value', snap => {
				console.log(snap.val(), 'fuck');
				const name = snap.val();

				if (name) {
					console.log('cant')
					this.setState({ error_1: '' });
					this.setState({ error_2: 'Username is already taken.' });
				} else {
					console.log('proceed to action creator');
					this.props.usernameSave({ username }, data);
				}
			})
		} else {
			this.setState({ error_2: '' });
			this.setState({ error_1: 'username needs to be at least 3 characters' });
		}
	}

	render() {
		return (
			<View>
				<View>
					<FormLabel>USERNAME</FormLabel>
					<FormInput
						refInput={input => (this.usernameInput = input)}
						placeholder='Please enter your username with no space'
						autoCapitalize='none'
						autoCorrect={false}
						returnKeyType='done'
						value={this.props.username}
						onChangeText={this.onUsernameInput.bind(this)}
					/>
					<FormValidationMessage>
						{this.state.error_1}
						{this.state.error_2}
					</FormValidationMessage>
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

export default connect(mapStateToProps, actions)(Username);
