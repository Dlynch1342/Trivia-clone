import React, { Component } from 'react';
import { Text, Modal, View, Button } from 'react-native'
import { Card, CardSection } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import CountdownCircle from 'react-native-countdown-circle';
import { LinearGradient } from 'expo'

//RELATIVE
import * as actions from '../actions';

class HeartRoom extends Component {
	state = {
		modalVisible: true,
	};

	closeModal() {
		this.setState({ modalVisible: false });
	}	

	useHeart = () => {
		const name = this.props.nickname.username;
		const ref = firebase.database().ref(`heart_list/${name}/heartCount`)
		ref.once('value', snap => {
			console.log(snap.val())
			var count = snap.val() - 1

			firebase.database().ref(`heart_list/${name}/heartCount`).set(count)
		})
		this.props.saveLife()
	}

	eliminator = () => {
		this.setState({ modalVisible: false })
		this.props.eliminate()
	}

  render() {
		const { userPlaying } = this.props.game;
		console.log(userPlaying)
		if(userPlaying == true) {
			return (
				<Card containerStyle={styles.container}>
					<Card>
						<CountdownCircle
								seconds={60}
								radius={25}
								borderWidth={8}
								color="green"
								bgColor="#fff"
								textStyle={{ fontSize: 20 }}
						/>
						<Text>Winner</Text>
					</Card>
				</Card>
			)
		} 
		else {
			const { heartCount } = this.props.heart
			console.log(heartCount)
			if (heartCount && this.props.game.lifeSave == false && this.props.questionNumber < 11) {
					return (
						<Card containerStyle={styles.container}>
							<View>
								<CountdownCircle
									seconds={60}
									radius={50}
									borderWidth={8}
									color="red"
									bgColor="#fff"
									textStyle={{ fontSize: 20 }}
								/>
								<Text>Loser</Text>
							</View>

								<Modal 
									visible={this.state.modalVisible}
									transparent
									animationType={'fade'}
									onRequestClose={() => this.closeModal()}
								>
									<View style={styles.modalContainer}>
										<View style={styles.innerContainer}>
											<CountdownCircle
												seconds={10}
												radius={15}
												borderWidth={5}
												color="red"
												bgColor="#fff"
												textStyle={{ fontSize: 20 }}
												onTimeElapsed={() => this.eliminator()}
											/>
											<Text style={styles.textStyle}>
												You were eliminated but you can use a heart to stay alive!
											</Text>
											<LinearGradient
											start={{ x: 0.0, y: 0.5 }}
											end={{ x: 1.0, y: 0.5 }}
											colors={['#84fab0', '#8fd3f4']} 
											style={styles.linearGradient}
												> 
												<Button
													onPress={() => this.useHeart()}
													title="Use Heart"
												>
												</Button>
											</LinearGradient>
												<Button
												onPress={() => this.closeModal()}
													title="Cancel"
												>
												</Button>
										</View>
									</View>
								</Modal>

						</Card>
					)
				} 
				else {
					return (
						<Card>
							<CountdownCircle
								seconds={60}
								radius={50}
								borderWidth={8}
								color="red"
								bgColor="#fff"
								textStyle={{ fontSize: 20 }}
							/>
							<Text>Loser</Text>
						</Card>
					)
				}
			}
    }
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	linearGradient: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		marginBottom: 20,
		width: 200,
		height: 50
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.75)'
	},
	innerContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
	},
	textStyle: {
		// flex:1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	}
}

const mapStateToProps = state => {
	return { game: state.game, heart: state.chance, nickname: state.nickname }
}

export default connect(mapStateToProps, actions)(HeartRoom);
