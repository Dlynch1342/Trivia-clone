import React, { Component } from 'react';
import { Text, Animated, Easing, View } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import * as actions from '../actions';
import Game from './Game';

class Lobby extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            banner: null,
            current: 'beginning'
        }
    }
        
    componentWillMount() {
        console.log('cwm lobby')
        this.props.getQuestions()
        this.retrieveBanners()
        setTimeout(() => {
            this.retrieveBanners()
        }, 4000)
        this.animatedValue = new Animated.Value(200)
        
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

    retrieveBanners() {
        const banners = ['b01', 'b02', 'b03', 'b04', 'b05', 'b06']
        const num = Math.floor(Math.random() * 6)
        this.props.getBanners(banners[num])
    }

    renderCurrent = () => {
        if (this.state.current == 'beginning') {
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
                            title='GAME START'
                            backgroundColor='#03A9F4'
                            onPress={() => this.setState({ current: 'question' })}
                        />
                    </View>
                </View>
            )
        } else if (this.state.current == 'question') {
            return (
                <Game /> //QUESTION
            )
        } else if (this.state.current == 'explanation') {
            return (
                <Game /> //EXPLANATION
            )
        } else if (this.state.current == 'result') {
            return (
                <Game /> //RESULT
            )
        }
    }

// componentDidUpdate() {
//     setTimeout(() => {
//         this.retrieveBanners()
//     }, 5000);
// }

componentWillReceiveProps(nextProps) {
    this.setState({ banner: nextProps.lobby.banner })
}


    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={styles.total}>
                    <Text style={{ color: 'red' }}>플레이어: {this.state.count} </Text>
                </Card>
                {this.renderCurrent()}
                <Card style={{ height: 200 }}>
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
    }
}

const mapStateToProps = state => {
    console.log(state)
    return { lobby: state.lobby }
}

export default connect(mapStateToProps, actions )(Lobby);
