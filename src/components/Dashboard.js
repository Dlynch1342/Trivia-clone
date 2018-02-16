// ABSOLUTE
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

// RELATIVE
//Test
import * as actions from '../actions'; 

class DashboardScreen extends Component {
	componentWillMount() {
		console.log(this.props.info);
		this.props.usernameFetch();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	render() {
		return (
			<View>
				<Card style={{ marginTop: 20 }}>
					<View style={{ marginTop: 10 }}>
						<Button
							title='JOIN'
							backgroundColor='#03A9F4'
							onPress={() => {}}
						/>
					</View>
					<View style={{ 
						marginTop: 10,
						alignItems: 'center',
						justifyContent: 'center' 
					}}>
						<Text>{this.props.info.username}</Text>
					</View>
					<View style={{ 
						marginTop: 10,
						alignItems: 'center',
						justifyContent: 'center' 
					}}>
						<Text>Your Balance: ${this.props.info.totalBalance}</Text>
					</View>
					<View style={{ 
						marginTop: 10,
						alignItems: 'center',
						justifyContent: 'center' 
					}}>
						<Text>You have {this.props.info.life} hearts</Text>
					</View>
				</Card>
				<View style={{ marginTop: 10 }}>
					<Button
						title='LEADERBOARD'
						backgroundColor='#03A9F4'
						onPress={() => Actions.leaderboard()}
					/>
					<Button
						title='INVITE FRIENDS'
						backgroundColor='#03A9F4'
						style={{ marginTop: 10 }}
						onPress={() => {}}
					/>
				</View>
			</View>

		);
	}
}

const mapStateToProps = state => {
	return { info: state.dashboard }
}

export default connect(mapStateToProps, actions)(DashboardScreen);
