// ABSOLUTE
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';

// RELATIVE
import * as actions from '../actions'; 

class LoginScreen extends Component {
	onEmailInput(text) {
		this.props.emailInput(text);
	}

	onPasswordInput(text) {
		this.props.passwordInput(text);
	}

	onButtonPress() {
		const { email, password } = this.props.login;
		this.props.userLogin({ email, password });
	}
	
	render() {
		return (
			<View>
				<View>
					<View>
						<FormLabel>EMAIL</FormLabel>
						<FormInput
							placeholder='Please enter your email'
							autoCapitalize='none'
							autoCorrect={false}
							returnKeyType='next'
							value={this.props.email}
							onChangeText={this.onEmailInput.bind(this)}
						/>
					</View>
					<View>
						<FormLabel>PASSWORD</FormLabel>
						<FormInput
							placeholder='Please enter your password'
							secureTextEntry={true}
							autoCapitalize='none'
							autoCorrect={false}
							returnKeyType='done'
							value={this.props.password}
							onChangeText={this.onPasswordInput.bind(this)}
						/>
					</View>
				</View>
				<View style={{ marginTop: 20 }}>
					<Button
						title='LOGIN'
						backgroundColor='#03A9F4'
						onPress={this.onButtonPress.bind(this)}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return { login: state.login };
};

export default connect(mapStateToProps, actions)(LoginScreen);
