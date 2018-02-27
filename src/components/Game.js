// ABSOLUTE
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Card, Button, List, ListItem, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import CountdownCircle from 'react-native-countdown-circle';
import { LinearGradient } from 'expo'

// RELATIVE
import * as actions from '../actions';
import HeartRoom from './HeartRoom'

class Game extends Component {
	constructor(props){
		super(props)
		this.state = {
			prize: null,
			clickable: true,
			index: 0,
			bIndex: 0,
			counter: 10,
			card: 'waiting',
			banner: null,
			questionIndex: 0,
			option_1_count: 0,
			option_2_count: 0,
			option_3_count: 0,
			finalPrize: null,
			buttonPressed: false,
		}
		var bannerfuck;
		var countdownfuck;
	}
    
	playerStatus = (num) => {
		this.setState({ buttonPressed: true })
		const { userPlaying, questionIndex } = this.props.game;
		const { clickable } = this.state;
		if (userPlaying == true && clickable == true) {
			var up_count = this.state.questionIndex + 1
			this.props.respond(`option_${num}`, up_count)
			this.setState({ clickable: false });
		} else if (userPlaying == false) {
			console.log('you lost your chance bruh!')
		}
	}
	
		
	componentWillMount() {
		bannerfuck = setInterval(() => {
			console.log('started banner interval')
			this.retrieveBanners()
		}, 5000)
		
		// PRESENCE  
		const { currentUser } = firebase.auth();
		const amOnline = firebase.database().ref(".info/connected");
		const userRef = firebase.database().ref(`presence/players/${currentUser.uid}`);
		amOnline.on("value", snap => {
			if (snap.val()) {
				userRef.onDisconnect().remove();
				userRef.set(true);
			}
		});
		const countRef = firebase.database().ref("presence");
		countRef.child("players_count").on("value", snap => {
			this.setState({ count: snap.val() });
		})
	}
    
	componentDidMount() {		
	//EVENT LISTENER
		const ref = firebase.database().ref("socket");
		const removeRef = firebase.database().ref('user_answers')
		ref.orderByValue().limitToLast(1).on('child_added', snapshot => {
			const childsnap = snapshot.val();
			if(childsnap.sender === 'server'){
				if (childsnap.order === 'start_counter') {
					snapshot.ref.remove()
					clearInterval(bannerfuck)
					countdownfuck = setInterval(() => {
							this.gameCountdown()
					}, 1000)
					this.setState({ card:'gamestart' })
				} 
				else if (childsnap.order === 'render_question') {
					snapshot.ref.remove()
					this.setState({ clickable: true });
					this.setState({ card:'question' })
				} 
				else if (childsnap.order === 'render_explanation') {
					snapshot.ref.remove()
					if (this.state.buttonPressed == false) {
						this.props.noClick()
					}
					this.setState({ card:'explanation' })
				} 
				else if (childsnap.order === 'render_result') {
					snapshot.ref.remove()
					this.setState({ card: 'answer' })
				} 
				else if (childsnap.order === 'render_winners') {
					snapshot.ref.remove()
					this.props.calculateTotal()
					this.props.getWinners()
				} 
				else if (childsnap.order === 'update_earnings') {
					snapshot.ref.remove()
					var winners = this.props.game.winners;
					var size = Object.keys(winners).length;
					var total = parseInt(this.props.game.prize) / size;
					const username = this.props.nickname.username;
					this.props.updateEarnings(total, username)
				} 
				else if (childsnap.order === 'increase') {
					snapshot.ref.remove()
					removeRef.remove()
					var increment = this.state.questionIndex + 1
					console.log(increment)
					if (increment == 12) {						
						this.setState({ card: 'winners' })
					}
					this.setState({ questionIndex: increment })
					this.setState({ buttonPressed: false })
				}
			}
		});
			// USER ANSWER COUNT
			const countRef = firebase.database().ref('user_answers');
			countRef.child('option_1_count').on('value', snap => {
				console.log(snap.val(), 'option 1')
				this.setState({ option_1_count: snap.val() });
			})
			countRef.child('option_2_count').on('value', snap => {
				console.log(snap.val(), 'option 2')
				this.setState({ option_2_count: snap.val() });
			})
			countRef.child('option_3_count').on('value', snap => {
				console.log(snap.val(), 'option 3')
				this.setState({ option_3_count: snap.val() });
			})
	}

	// componentWillReceiveProps(nextProps) {
	// 	this.setState({ banner: nextProps.lobby.banner })
	// 	console.log(nextProps)
	// }
    
	retrieveBanners() {
		const banners = ['Is everybody ready?', 'Have you been paying attention to current events?', 'Can you remember the news from today?', 'Lets all be nice now! I can see the chat!', 'Are you ready to win some money?', 'Todays reward: $2,000']
		// console.log(banners[num])
		// this.props.getBanners(banners[num])
		this.setState({ banner: banners[this.state.bIndex] })
		var increase = this.state.bIndex + 1
		this.setState({ bIndex: increase })
		if (increase == 5) {
			this.setState({ bIndex: 0 })
		}
	}

	gameCountdown() {
		const numArray = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'Game Time!!!!!!', 'Game Time!!!!!!'];
		this.setState({ counter: numArray[this.state.index] })
		var increase = this.state.index + 1
		this.setState({ index: increase })
		if (increase === 13) {
			this.setState({ card: 'question' })
			console.log('cleared countdownfuck')
			clearInterval(countdownfuck);
		}
	}
	_renderGameCountDown = () => {
		return (
			<Animatable.Text
			style={styles.text} 
			animation="pulse"
			easing="ease-out"
			iterationCount="infinite"
			>
			{this.state.counter}
			</Animatable.Text>
		)
	} 
	_renderBanners  = () => {	
		return (
			<Animatable.Text
			style={styles.text}
			animation="pulse"
			easing="ease-out"
			iterationCount="infinite"
			>
			{this.state.banner}
			</Animatable.Text>
		)
	}

	showWinners = () => {
		if (this.props.game.winners) {
			var winners = this.props.game.winners;
			var size = Object.keys(winners).length;
			var total = parseInt(this.props.game.prize) / size;
			return (
				<Card>
						<List>
							{Object.keys(winners).map((k) => (
								<ListItem
								roundAvatar
								avatar={{ uri: 'https://i.imgur.com/FDWo9.jpg' }}
								hideChevron={true}
								key={k}
								title={k}
								badge={{
										value: '$' + total
									}}
								/>
							))}
						</List>
				</Card>
			)
		}
	}

	timeOut = () => {
		setTimeout(() => {
			this.setState({ card: 'heartRoom' })
		}, 5000);
	}

	render() {
		const question = this.props.questions[this.state.questionIndex]
		if (this.state.card === 'waiting') {
			const animatedStyle = { height: this.animatedValue };
			return (
				<View style={styles.container}>
					{this._renderBanners()}
				</View>
			)
		} 
		else if (this.state.card === 'gamestart') {
			return (
				<View style={styles.container}>
					{this._renderGameCountDown()} 
				</View>
			)
		} 
		else if (this.state.card === 'waitingRoom') {
		
			return (
				<Card containerStyle={styles.container}>
					<Card>
						<CountdownCircle
							seconds={60}
							radius={100}
							borderWidth={8}
							color="red"
							bgColor="#fff"
							textStyle={{ fontSize: 20 }}
						/>
						<Text>Calculating...</Text>
					</Card>
				</Card>
			)
		} 
		else if (this.state.card === 'heartRoom') {
			return (
				<HeartRoom questionNumber={this.state.questionIndex}/>
			)
		} 
		else if (this.state.card == 'question') {
			console.log(question)
			return (
				<Card containerStyle={styles.container}>
					<View style={styles.timer}>
						<CountdownCircle
							seconds={10}
							radius={30}
							borderWidth={8}
							color="#f442e8"
							bgColor="#fff"
							textStyle={{ fontSize: 20 }}
							onTimeElapsed={() => this.setState({ card: 'waitingRoom' })}
						/>
					</View>
					<Card>
						<FormLabel>{question.content}</FormLabel>
						<View style={{ marginTop: 20 }}>
							<Button
								title={question.user_answers.option_1}
								buttonStyle={styles.button}
								value="1"
								onPress={() => this.playerStatus(1)}
							/>
							<Button
								title={question.user_answers.option_2}
								buttonStyle={styles.button}
								value="2"
								onPress={() => this.playerStatus(2)}
							/>
							<Button
								title={question.user_answers.option_3}
								buttonStyle={styles.button}
								value="3"
								onPress={() => this.playerStatus(3)}
							/>
						</View>
					</Card>
				</Card>
			)
		} 
		else if (this.state.card == 'explanation') {
			console.log('------------what-----------')
			console.log(question)
			return (
				<Card containerStyle={styles.container}>
					<Card>
						<Text>{question.explanation}</Text>
					</Card>
				</Card>
			)
		} 
		else if (this.state.card == 'answer') {
			console.log(question, 'fuck')
			return (
				<Card>
					{this.timeOut()}
					<FormLabel>{question.content}</FormLabel>
					<View style={{ marginTop: 20 }}>
						<Text>
							{question.user_answers.option_1}
							{this.state.option_1_count}
						</Text>
						<Text>
							{question.user_answers.option_2}
							{this.state.option_2_count}
						</Text>
						<Text>
							{question.user_answers.option_3}
							{this.state.option_3_count}
						</Text>
					</View>
				</Card>
			)
		}
		else if (this.state.card == 'winners') {
			// console.log(question, 'fuck')
			return (
				<View>
					{this.showWinners()}
				</View>
			)
		}
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
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
		// fontFamily: "sans-serif"
	},
	button: {
		backgroundColor: '#ffa2ed',
		margin: 10,
		borderRadius: 50
	},
	timer: {
		alignSelf: 'center'
	}
}

const mapStateToProps = state => {
	arr = [];
	_.forEach(state.game.questions, value => {
			arr.push(value);
	});
	return { 
		game: state.game, 
		questions: arr, 
		lobby: state.lobby, 
		nickname: state.nickname }
}

export default connect(mapStateToProps, actions)(Game);
