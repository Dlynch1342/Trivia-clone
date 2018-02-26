import React, { Component } from 'react';
import { View, TextInput, Text, FlatList, Dimensions, Keyboard } from 'react-native';
import { Button, List, ListItem, Avatar  } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import { LinearGradient } from 'expo';
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
		if (msg.length > 1){
			firebase.database().ref('chat').push({ username, msg })
			this.setState({ input: '' })
		}
	}

	
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

	render() {
		const { title, content, input, container, chatButton } = styles;
		return (
			<View style={styles.container}>
				<FlatList
					inverted
					data={this.state.messages}
					keyExtractor={this._keyExtract}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ margin: 10, marginRight: 0 }}
					renderItem={({ item }) => {
						return <Text><Text style={title}>{item.username}: </Text><Text style={content}>{item.msg}</Text></Text>
					}}
				/>
				<Icon
					name='comment'
					size={24}
					type='font-awesome'
					color='#1D8FE1'
					containerStyle={chatButton}
					onPress={this._sendMessage}
				/>
				{/* <FlatList
					inverted
					data={this.state.messages}
					keyExtractor={this._keyExtract}
					contentContainerStyle={{ marginLeft: 20 }}
					renderItem={({ item }) => {
						return <Text><Text style={title}>{item.username}: </Text><Text style={content}>{item.msg}</Text></Text>
					}}
				/>
				<View style={{ flexDirection: 'row' }}>
					<TextInput
						style={input}
						value={this.state.input}
						underlineColorAndroid='transparent'
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={this._updateInput}
						onSubmitEditing={this._sendMessage}
					/>
					<Icon
						name='paper-plane'
						size={24}
						type='font-awesome'
						color='#1D8FE1'
						containerStyle={chatButton}
						onPress={this._sendMessage}
					/>
				</View> */}
			</View>
		);
	}
}

const { height, width } = Dimensions.get('window');
const styles = {
	container: {
		height: 150,
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	input: {
		flex: 1,
		color: '#1D8FE1',
		backgroundColor: 'rgba(255,255,255,0.5)',
		padding: 10,
		paddingLeft: 20,
		borderRadius: 50,
		fontSize: 15,
		height: 50,
		margin: 10
	},
	chatButton: {
		height: 50,
		width: 50,
		margin: 10,
		paddingBottom: 1,
		backgroundColor: 'white',
		borderRadius: 25
	},
	title: {
		fontWeight: 'bold',
		color: '#22E1FF'
	},
	content: {
		color: '#FFF'
	}
}

const mapStateToProps = state => {
    return { nickname: state.nickname };
    
}

export default connect(mapStateToProps, actions)(Chat);
