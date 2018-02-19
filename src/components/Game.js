import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import * as actions from '../actions';

class Game extends Component {
    playerStatus = (num) => {
        const { currentQuestion, userPlaying } = this.props.game;
        if(userPlaying == true) {
            this.props.respond(`option_${num}`, currentQuestion + 1)
        } else {
            console.log('you lost your chance bruh!')
        }
    }
    
    render() {
        const question = this.props.questions[this.props.game.currentQuestion]
        if (this.props.nextCard == 'question') {
            return (
                <Card containerStyle={styles.container}>
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
    
}

const mapStateToProps = state => {
    console.log(state.game)
    arr = [];
    _.forEach(state.game.questions, value => {
        arr.push(value);
    });
    return { game: state.game, questions: arr }
}

export default connect(mapStateToProps, actions)(Game);
