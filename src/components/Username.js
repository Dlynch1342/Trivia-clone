import firebase from 'firebase';
import React, { Component } from 'react';
import { TextInput, Text, View, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

// RELATIVE
import * as actions from '../actions';

class Username extends Component {
	state = {
		usernameValid: true,
		error_1: null,
		error_2: null,
		codeNotConfirmed: null,
	}

	onUsernameInput = (text) => {
		this.setState({ error_1: null, error_2: null });
		const newText = String(text).replace(/\s+/g, '');
		this.props.usernameInput(newText);
	}

	onReferralCodeInput = (code) => {
		this.setState({ codeNotConfirmed: null });
		this.props.referralCodeInput(code);
	}

	onButtonPress = () => {
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
					this.setState({ error_2: 'Username is already taken'});
				} else {
					this.inputVerified();
				}
			})
		} else {
			this.setState({ error_1: 'At least 3 characters' });
		}
	}

	inputVerified = () => {
		const { currentUser } = firebase.auth();
		const { username } = this.props.nickname;
		const data = username;
		const rcode = this.props.nickname.referralcode;

		firebase.database().ref(`username_list/${rcode}`).once('value')
		.then(snap => {
			var code = snap.exists();

			if (code || rcode === '') {
				this.props.usernameSave({ username }, data);
				// firebase.database().ref(`heart_list/${rcode}/${currentUser.uid}`).push(rcode);
				const ref = firebase.database().ref(`heart_list/${rcode}/heartCount`)
				ref.once('value', snap => {
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
				this.setState({ codeNotConfirmed: 'Invalid referral code' })
			}
		})
	}

	renderInput = (num, text) => {
		var holderColor = '#F13232', backColor = '#FBCCCC', holder = text
		if (num === 1 && (this.state.error_1 || this.state.error_2)){
			holder = this.state.error_1 || this.state.error_2
		} else if (num === 2 && this.state.codeNotConfirmed){
			holder = this.state.codeNotConfirmed
		} else {
			holderColor = '#4C8CF0', backColor = '#CCF3FE'
		}
		return (
			<TextInput
				style={[styles.input, { backgroundColor: backColor }]}
				placeholder={holder}
				placeholderTextColor={holderColor}
				color='#005BEA'
				underlineColorAndroid='transparent'
				autoCapitalize='none'
				autoCorrect={false}
				returnKeyType={num === 1 ? 'next' : 'done'}
				onSubmitEditing={event =>  num === 1 ? this.refs.RefCode.focus() : null }
				ref={ num === 2 ? 'RefCode' : null }
				value={num === 1 ? this.props.nickname.username : this.props.nickname.referralcode}
				onChangeText={num === 1 ? this.onUsernameInput : this.onReferralCodeInput }
			/>
		)
	}
				
	render() {
		return (
			<View style={styles.container}>
				{this.renderInput(1, 'Enter Username (no spaces)')}
				{this.renderInput(2, 'Referral code (optional)')}
				<LinearGradient
					start={{ x: 0.0, y: 0.5 }}
					end={{ x: 1.0, y: 0.5 }}
					colors={['#00C6FB', '#005BEA']}
					style={styles.button}
				>
					<Button
						buttonStyle={{ backgroundColor: 'transparent' }}
						onPress={this.onButtonPress}
						title='SAVE'
					/>
				</LinearGradient>
			</View>
		);
	}
}

const { height, width } = Dimensions.get('window');
const styles = {
	container: {
		width: (width * .8),
		marginLeft: (width * .1),
		marginTop: (width * .1),
	},
	input: {
		fontSize: 15,
		padding: 15,
		paddingLeft: 30,
		marginBottom: 10,
		borderRadius: 50
	},
	button: {
		marginTop: 20,
		borderRadius: 50
	}
}

const mapStateToProps = state => {
	return { nickname: state.nickname };
};

export default connect(mapStateToProps, actions)(Username);
