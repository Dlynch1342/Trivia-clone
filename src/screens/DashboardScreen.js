import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions'; 

class DashboardScreen extends Component {
	componentWillMount() {
		console.log(this.props.info);
		this.props.usernameFetch();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}
	
	render() {
		return (
			<Card style={{ marginTop: 20 }}>
				<View style={{ marginTop: 10 }}>
					<Button
						title='JOIN'
						backgroundColor='#03A9F4'
						onPress={() => {}}
					/>
				</View>
				<View style={{ 
					marginTop: 10,
					alignItems: 'center',
					justifyContent: 'center' 
				}}>
					<Text>{this.props.info.username}</Text>
				</View>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return { info: state.dashboard }
}

export default connect(mapStateToProps, actions)(DashboardScreen);
