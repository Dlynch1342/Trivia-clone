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
			error_2: '',
			codeNotConfirmed: '',
		}
	}

	onUsernameInput(text) {
		this.setState({ error_1: ''});
		this.setState({ error_2: ''});
		const newText = String(text).replace(/\s+/g, '');

		this.props.usernameInput(newText);
	}

	onReferralCodeInput(code) {
		this.setState({ codeNotConfirmed: '' });
		this.props.referralCodeInput(code);
	}

	onButtonPress() {
		const { currentUser } = firebase.auth();
		const { username } = this.props.nickname;
		
		const data = this.props.nickname.username;

		const usernameValid = username.length > 2;
		this.setState({ usernameValid })
		if (usernameValid) {
			firebase.database().ref(`username_list/${data}`).once('value')
			.then(snap => {
				var name = snap.exists();

				if (name) {
					this.setState({ error_2: 'Username is already taken.'});
				} else {
					this.inputVerified();
				}
			})
		} else {
			this.setState({ error_1: 'Username needs to be at least 3 characters' });
		}
	}

	inputVerified() {
		const { currentUser } = firebase.auth();
		const { username } = this.props.nickname;
		const data = this.props.nickname.username;
		const rcode = this.props.nickname.referralcode;

		firebase.database().ref(`username_list/${rcode}`).once('value')
		.then(snap => {
			var code = snap.exists();

			if (code || rcode === '') {
				this.props.usernameSave({ username }, data);
				// firebase.database().ref(`heart_list/${rcode}/${currentUser.uid}`).push(rcode);
				const ref = firebase.database().ref(`heart_list/${rcode}/heartCount`)
				ref.once('value', snap => {
					console.log(snap.val(), 'deep in the fucking conditionals')
					if(snap.val() >= 0) {
						var count = snap.val() + 1
					}
					else {
						var count = 0
					}
					firebase.database().ref(`heart_list/${rcode}/heartCount`).set(count)
				})
			} 
			else {
				this.setState({ codeNotConfirmed: 'Referral code not existed' })
			}
		})
	}
				
	render() {
		return (
			<View>
				<View>
					<FormLabel>USERNAME</FormLabel>
					<FormInput
						placeholder='Please enter your username with no space'
						autoCapitalize='none'
						autoCorrect={false}
						returnKeyType='next'
						value={this.props.username}
						onChangeText={this.onUsernameInput.bind(this)}
					/>
					<FormValidationMessage>
						{this.state.error_1}
						{this.state.error_2}
					</FormValidationMessage>
				</View>
				<View>
					<FormLabel>REFERRAL CODE (OPTIONAL)</FormLabel>
					<FormInput
						placeholder='Please enter the referral code'
						autoCapitalize='none'
						autoCorrect={false}
						returnKeyType='done'
						value={this.props.referralcode}
						onChangeText={this.onReferralCodeInput.bind(this)}
					/>
					<FormValidationMessage>
						{this.state.codeNotConfirmed}
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
