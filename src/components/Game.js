import React, { Component } from 'react';
import { View, Text, FlatList, ListItem, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import Lobby from './Lobby';
import * as actions from '../actions';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            uploadURL: ''
        }
    }
    componentWillMount() {
        this.props.getQuestion('question_01')
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

        setTimeout(() => {
            this.renderQuestion()
        }, 10000)
    }

    renderQuestion() {
        this.props.getQuestion('question_01')
    }

    render() {
        if (this.props.game.question) {
            const { question } = this.props.game;
            const keys = _.keys(question.user_answers);
            const values = _.values(question.user_answers);

            sendAnswer1 = () => {
                this.props.respond(keys[0])
            }
            sendAnswer2 = () => {
                this.props.respond(keys[1])
            }
            sendAnswer3 = () => {
                this.props.respond(keys[2])
            }

            return (
                <Card containerStyle={styles.container}>
                    <Card containerStyle={styles.total}>
                        <Text style={{ color: 'white' }}>플레이어: {this.state.count} </Text>
                    </Card>
                    <Card>
                        <FormLabel>{question.content}</FormLabel>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                title={values[0]}
                                buttonStyle={styles.button}
                                onPress={sendAnswer1}
                            />
                            <Button
                                title={values[1]}
                                buttonStyle={styles.button}
                                onPress={sendAnswer2}
                            />
                            <Button
                                title={values[2]}
                                buttonStyle={styles.button}
                                onPress={sendAnswer3}
                            />
                        </View>
                    </Card>
                </Card>
            )
        } else {
            return (
                <Card containerStyle={styles.container}>
                    <Card containerStyle={styles.total}>
                        <Text style={{ color: 'white' }}>플레이어: {this.state.count} </Text>
                    </Card>
        
                    <Card>
                        <Text>Timer: 0:00</Text>
                    </Card>

                    <Lobby  />
                </Card>
            )
        }
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#ffa2ed',
        margin: 10,
        borderRadius: 50
    },
    total: {
        width: 100,
        backgroundColor: '#ffa2ed',
        borderRadius: 50
    }
}

const mapStateToProps = state => {
    return { info: state.info, login: state.login, game: state.game }
}

export default connect(mapStateToProps, actions)(Game);
