// ABSOLUTE
import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
// RELATIVE
import * as actions from '../actions';

class Leaderboard extends Component {
	constructor(props) {
		super(props);
		this.state = { page: 'Week' };
	}
	
    
	isActive = (data) => {
		if(this.state.page === data){
			return {
				borderColor: '#1D8FE1',
				backgroundColor: '#1D8FE1'
			}
		} else {
			return null
		}
	}

	getList = () => {
		if ( this.state.page === 'Week') {
				var list = this.props.Leaderboard.week;
		} else {
				var list = this.props.Leaderboard.total;
		}
		return (
			<List containerStyle={{ marginBottom: 20 }}>
				{list.map((l, i) => (
					<ListItem
						roundAvatar
						avatar={{ uri: 'https://i.imgur.com/FDWo9.jpg' }}
						containerStyle={{ backgroundColor: 'rgb(230,235,240)' }}
						hideChevron={true}
						key={i}
						title={l.user}
						badge={{
							value: String(l.value),
							textStyle: { color: '#FFF' },
							containerStyle: { backgroundColor: '#1D8FE1' }
						}}
					/>
				))}
			</List>
		)
	}

	render() {
		const { container, nav, tab, element } = styles;
		return (
			<View style={container}>
				<View style={nav}>
					<Button
						buttonStyle={[tab, this.isActive('Week')]}
						textStyle={{ color: this.state.page === 'Week' ? 'white' : '#1D8FE1' }}
						onPress={() => this.setState({ page: 'Week' })}
						title='Week'
					/>
					<Button
						buttonStyle={[tab, this.isActive('All-Time')]}
						textStyle={{ color: this.state.page === 'All-Time' ? 'white' : '#1D8FE1' }}
						onPress={() => this.setState({ page: 'All-Time' })}
						title='All-Time'
					/>
				</View>
				<View>
					{this.getList()}
				</View>
			</View>
		);
	}
}

const { height, width } = Dimensions.get('window');
const styles = {
	container: {
		width: (width * .8),
		marginLeft: (width * .1),
		marginTop: 20
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	tab: {
		flex: 1,
		height: 50,
		padding: 20,
		width: (width * .35),
		margin: 7,
		borderWidth: 1,
		borderColor: '#1D8FE1',
		borderRadius: 50,
		backgroundColor: 'transparent'
	},
	board: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 20,
	},
	element: {
		borderBottomWidth: 1,
		borderColor: '#F4DBFF',
		justifyContent: 'center',
		padding: 10,
		width: 300,
	},
	button: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50
	},
	text: {
		fontSize: 24,
		fontWeight: '300',
		color: '#BABABA',
	}
};

const mapStateToProps = state => {
    return { Leaderboard: state.rank }
}

export default connect(mapStateToProps, actions)(Leaderboard);