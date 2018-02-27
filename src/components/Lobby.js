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
            level: 1
        }
    }

    componentWillMount() {
			// this.props.calculateTotal()
			// this.props.getWinners()
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
	}
 
    componentWillReceiveProps(nextProps) {
        this.setState({ banner: nextProps.lobby.banner })
    }    

    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={styles.total}>
                    <Text style={{ color: 'white' }}>플레이어: {this.state.userCount} </Text>
                </Card>
                <Game />
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
