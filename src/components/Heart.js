// ABSOLUTE
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// RELATIVE
import * as actions from '../actions';

class Heart extends Component {
	render() {
		if(this.props.heart.heartCount > 1){
			return (
				<View>
					<Text>You have {this.props.heart.heartCount} hearts.</Text>
				</View>
			)
		}
		else if(this.props.heart.heartCount){
			return (
				<View>
					<Text>You have {this.props.heart.heartCount} heart.</Text>
				</View>
			)
		}
		else {
			return (
				<View>
					<Text>You have 0 hearts.</Text>
				</View>
			)
		}
	}
}

const mapStateToProps = state => {
	return { heart: state.chance }
}

export default connect(mapStateToProps, actions)(Heart);
