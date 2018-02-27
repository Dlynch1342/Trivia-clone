import React, { Component } from 'react';
import { View, TextInput, Text, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import { LinearGradient } from 'expo';
import * as actions from '../actions';

class Chat extends Component {
	
	state = { input: '', messages: [] };

	componentWillMount() {
		const ref = firebase.database().ref('chat').on('value', snapshot => {
			const list = snapshot.val();
			const arr = []
			_.forEach(list, item => {
				item['id'] = Math.floor(Math.random() * 1000000)
				arr.unshift(item)
			})
			this.setState({ messages: arr })
		})
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboard: true }));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboard: false }));
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_keyExtract = (item, index) => item.id

	_updateInput = (msg) => {
		this.setState({ input: msg })
	}

	_sendMessage = () => {
		const username = this.props.nickname.username
		const msg = this.state.input
		if (msg.length > 1) {
			firebase.database().ref('chat').push({ username, msg })
			this.setState({ input: '' })
		}
	}

	render() {
		const { container, list, input, title, content } = styles;
		return (
			<View style={[container, { marginBottom: this.state.keyboard ? 200 : 10 }]}>
				<FlatList
					contentContainerStyle={list}
					inverted
					data={this.state.messages}
					keyExtractor={this._keyExtract}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => {
						return <Text><Text style={title}>{item.username}: </Text><Text style={content}>{item.msg}</Text></Text>
					}}
				/>
				<TextInput
					style={input}
					value={this.state.input}
					underlineColorAndroid='transparent'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={this._updateInput}
					onSubmitEditing={this._sendMessage}
					placeholder="say hi to your peeps..."
				/>
			</View>
		);
	}
}

const styles = {
	container: {
		height: 200,
		padding: 10,
		justifyContent: 'flex-end'
	},
	list: {
		alignItems: 'flex-start',
		marginLeft: 15
	},
	input: {
		color: '#1D8FE1',
		backgroundColor: 'rgba(255,255,255,0.5)',
		fontSize: 15,
		height: 40,
		marginTop: 10,
		padding: 5,
		paddingLeft: 20,
		borderRadius: 20
	},
	title: {
		fontWeight: 'bold',
		color: '#22E1FF'
	},
	content: {
		color: '#C4C4C4'
	}
}

const mapStateToProps = state => {
    return { nickname: state.nickname };
}

export default connect(mapStateToProps, actions)(Chat);
