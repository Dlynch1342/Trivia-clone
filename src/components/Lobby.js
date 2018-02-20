import React, { Component } from 'react';
import { Text, Animated, Easing, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';


import * as actions from '../actions';
import Game from './Game';

class Lobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userCount: 0,
            banner: null,
            level: 1,
            card: 'waiting'
        }
    }

    componentWillMount() {
        this.props.getQuestions()
        //BANNER
        this.retrieveBanners()
        setTimeout(() => {
            this.retrieveBanners()
        }, 4000)
        this.animatedValue = new Animated.Value(200)
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
        
    }
 
    componentWillReceiveProps(nextProps) {
        this.setState({ banner: nextProps.lobby.banner })
    }

    retrieveBanners() {
        const banners = ['b01', 'b02', 'b03', 'b04', 'b05', 'b06']
        const num = Math.floor(Math.random() * 6)
        this.props.getBanners(banners[num])
    }

    renderCard = () => {
        if (this.state.card === 'waiting') {
            const animatedStyle = { height: this.animatedValue };
            return (
                <View style={styles.container}>
                    <Animatable.Text
                        style={styles.text}
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                    >{this.state.banner}</Animatable.Text>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            title='START GAME'
                            backgroundColor='#03A9F4'
                            onPress={() => this.setState({ card: 'question' })}
                        />
                    </View> 
                </View>
            )
        } else if (this.state.card == 'question') {
            return (
                <View>
                    <Game nextCard={'question'} />
                </View>
            )
        } else if (this.state.card == 'explanation') {
            return (
                <Game nextCard={'explanation'} /> //EXPLANATION
            )
        } else if (this.state.card == 'answer') {
            return (
                <Game nextCard={'answer'} /> //RESULT
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={styles.total}>
                    <Text style={{ color: 'red' }}>플레이어: {this.state.userCount} </Text>
                </Card>
                {this.renderCard('question')}
                <Card style={{ height: 200, alignItems: 'bottom' }}>
                    <Text>CHAT</Text>
                </Card>
            </View> 
        )
    }
}

const styles = {
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
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
        width: 100,
        backgroundColor: '#ffa2ed',
        borderRadius: 50
    }
}

const mapStateToProps = state => {
    return { lobby: state.lobby }
}

export default connect(mapStateToProps, actions)(Lobby);
