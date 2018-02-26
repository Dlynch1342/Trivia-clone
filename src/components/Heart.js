import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from  'react-redux';

// RELATIVE
import * as actions from '../actions';

class Heart extends Component {
	render() {
		return (
			<View>
				<Text>You have {this.props.heart.heartcount}</Text>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return { heart: state.chance }
}

export default connect(mapStateToProps, actions)(Heart);
