import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text, FlatList } from 'react-native';
import { Button, List, ListItem  } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import * as actions from '../actions';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { input: '', messages: [] };
    }

    _keyExtract = (item, index) => item.id

    _updateInput = (msg) => {
        this.setState({ input: msg })
    }
    
    _sendMessage = () => {
        const username = this.props.nickname.username
        const msg = this.state.input
        firebase.database().ref('chat').push({ username, msg })
        this.setState({ input: '' })
    }

    
    componentWillMount() {
        const ref = firebase.database().ref('chat').on('value', snapshot => {
            const list = snapshot.val();
            const arr = []
            _.forEach(list, item => {
                item['id'] = Math.floor(Math.random() * 1000000)
                arr.push(item)
            })
            this.setState({ messages: arr })
        })
    }

    render() {
        return (
            <View style={{ height: 300, backgroundColor: 'orange' }}>
                <FlatList
                    style={{ flex: 3 }}
                    data={this.state.messages}
                    keyExtractor={this._keyExtract}
                    inverted={true}
                    renderItem={({ item }) => {
                        return <Text>{item.username}: {item.msg}</Text>
                    }}
                />
                <View style={{ height: 50 , backgroundColor: 'tomato', flexDirection: 'row' }}>
                    <TextInput
                        value={this.state.input}
                        onChangeText={this._updateInput}
                        style={{ flex: 5, backgroundColor: 'yellow' }}/>
                    <Button
                        style={{ flex: 1 }}        
                        onPress={this._sendMessage}
                        title="SEND"
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { nickname: state.nickname };
    
}

export default connect(mapStateToProps, actions)(Chat);
