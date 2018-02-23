// ABSOLUTE
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

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
