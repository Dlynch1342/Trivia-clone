import React, { Component } from 'react';
import { Text, Animated, Easing, View, Keyboard } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { LinearGradient } from 'expo';
import * as Animatable from 'react-native-animatable';


import * as actions from '../actions';
import Game from './Game';
import Chat from './Chat';

class Lobby extends Component {
	state = {
		userCount: 0,
		banner: null,
		level: 1,
		card: 'waiting',
		keyboard: false 
	}

	componentWillMount() {
		this.props.getQuestions()
		//USER COUNT
		const amOnline = firebase.database().ref(".info/connected");
		const { currentUser } = firebase.auth();
		const userRef = firebase.database().ref(`presence/players/${currentUser.uid}`);
		amOnline.on("value", snap => {
			if (snap.val()) {
				userRef.onDisconnect().remove();
				userRef.set(true);
			}
		});
		const countRef = firebase.database().ref("presence");
		countRef.child("players_count").on("value", snap => {
			this.setState({ userCount: snap.val() });
		})
		//GAME COUNTDOWN
		// setInterval(() => {
		//     this.createCountdown()
		// }, 1000)
			
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ banner: nextProps.lobby.banner })
	}

	render() {
		return (
			<View style={styles.container}>
				<LinearGradient
					style={styles.total}
					start={{ x: 0.0, y: 0.5 }}
					end={{ x: 1.0, y: 0.5 }}
					colors={['#1D8FE1', '#625EB1']}
				>
					<Text style={{ color:'white', backgroundColor:'transparent' }}>플레이어: {this.state.userCount}</Text>
				</LinearGradient>
				<Game />
				<Chat />
			</View> 
		)
	}
}

const styles = {
	container: {
		flex: 1,
		borderRadius: 50
	},
	box: {
		backgroundColor: "#ff0066",
		width: 100,
		height: 100
	},
	text: {
		fontSize: 25,
		color: '#f442e8',
		alignSelf: 'center',
		marginTop: 30,
		fontFamily: "Copperplate"
	},
	total: {
		padding: 10,
		width: 100,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	}
}

const mapStateToProps = state => {
	return { lobby: state.lobby }
}

export default connect(mapStateToProps, actions)(Lobby);
