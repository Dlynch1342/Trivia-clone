// ABSOLUTE
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import CountdownCircle from 'react-native-countdown-circle';

// RELATIVE
import * as actions from '../actions';

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            clickable: true,
            index: 0,
            counter: 10,
            card: 'waiting',
						banner: null,
				}
				var bannerfuck;
    }
    
    playerStatus = (num) => {
        const { currentQuestion, userPlaying } = this.props.game;
        const { clickable } = this.state;
        if (userPlaying == true && clickable == true) {
            this.props.respond(`option_${num}`, currentQuestion + 1)
            this.setState({ clickable: false });
        } else if (userPlaying == false) {
            console.log('you lost your chance bruh!')
        }
		}
		
    componentWillMount() {
				bannerfuck = setInterval(() => {
						this.retrieveBanners()
				}, 4000)
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
			// var increase = this.state.index + 1
			// this.setState({ index: increase })
			
			//EVENT LISTENER
			const ref = firebase.database().ref("socket");
			ref.orderByValue().limitToLast(1).on('child_added', snapshot => {
				const childsnap = snapshot.val();
				if(childsnap.sender === 'server'){
					if (childsnap.order === 'start_counter') {
						snapshot.ref.remove()
						setInterval(() => {
							this.gameCountdown()
						}, 1000)
						this.setState({ card:'gamestart' })
					} else if (childsnap.order === 'render_question') {
						snapshot.ref.remove()
						this.setState({ card:'question' })
					} else if (childsnap.order === 'render_explanation') {
						snapshot.ref.remove()
						this.state.card !== 'explanation' ? this.setState({ card:'explanation' }) : console.log('its already explanation dude');
					}
				}
			});
		}

		componentWillReceiveProps(nextProps) {
			this.setState({ banner: nextProps.lobby.banner })
			if (nextProps.card !== 'waiting') {
				clearInterval(bannerfuck);
			}
	}
    
    retrieveBanners() {
        const banners = ['b01', 'b02', 'b03', 'b04', 'b05', 'b06']
        const num = Math.floor(Math.random() * 6)
        this.props.getBanners(banners[num])
    }

    // questionCountdown() {
    //     const numArray = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'Time Up!!!!!!'];
    //     this.setState({ counter: numArray[this.state.index] })
    //     var increase = this.state.index + 1
    //     this.setState({ index: increase })
    // }

    gameCountdown() {
        const numArray = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'Game Time!!!!!!', 'Game Time!!!!!!'];
        this.setState({ counter: numArray[this.state.index] })
        var increase = this.state.index + 1
				this.setState({ index: increase })
				if (increase === 13) {
					this.setState({ card: 'question' })
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
    
    render() {
        const question = this.props.questions[this.props.game.currentQuestion]
        if (this.state.card === 'waiting') {
            const animatedStyle = { height: this.animatedValue };
            return (
                <View style={styles.container}>
                    {this._renderBanners()}
                </View>
            )
				} 
				else if (this.state.card === 'gamestart') {
					const animatedStyle = { height: this.animatedValue };
					return (
							<View style={styles.container}>
									{this._renderGameCountDown()}
							</View>
					)
				} 
				else if (this.state.card == 'question') {
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
                            // onTimeElapsed={() => this.setState({ card: 'explanation' })}
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
        } else if (this.state.card == 'explanation') {
						console.log('------------what-----------')
						console.log(question)
            return (
                <Card containerStyle={styles.container}>
                    <Card>
                        <Text>{question.explanation}</Text>
                    </Card>
                </Card>
            )
        } else if (this.state.card == 'answer') {
            console.log(question, 'fuck')
            return (
                <Card containerStyle={styles.container}>
                    <Card>
                        <Text>{question.explanation}</Text>
                    </Card>
                </Card>
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
        fontFamily: "Copperplate"
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
    return { game: state.game, questions: arr, lobby: state.lobby }
}

export default connect(mapStateToProps, actions)(Game);
