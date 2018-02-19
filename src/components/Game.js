import React, { Component } from 'react';
import { View, Text, FlatList, ListItem, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import Lobby from './Lobby';
import * as actions from '../actions';
import TrueComponent from './TrueComponent';
import FalseComponent from './FalseComponent';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadURL: '',
            userAccess: true,
            questionNumber: 0
        }
    }
    // componentDidMount() {
    //     this.props.getQuestions()
        
    //     setTimeout(() => {
    //         this.renderQuestion()
    //     }, 10000)
    // }

    // renderQuestion() {
    //     this.props.getQuestion('question_01')
    // }

    render() {
        const question = this.props.questions[this.state.questionNumber]
        if (this.state.userAccess) {
            return <TrueComponent currentQ={question} numberQ={this.state.questionNumber} />
        } else {
            return <FalseComponent currentQ={question} numberQ={this.state.questionNumber} />
        }
    }
}

// const styles = {
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     },
//     button: {
//         backgroundColor: '#ffa2ed',
//         margin: 10,
//         borderRadius: 50
//     },
//     total: {
//         width: 100,
//         backgroundColor: '#ffa2ed',
//         borderRadius: 50
//     }
// }

const mapStateToProps = state => {
    arr = [];
    _.forEach(state.game.questions, value => {
        arr.push(value);
    });
    return { questions: arr }
}

export default connect(mapStateToProps, actions)(Game);
