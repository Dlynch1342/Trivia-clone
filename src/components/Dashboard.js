// ABSOLUTE
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon, Card, Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo';
import firebase from 'firebase';

// RELATIVE
import * as actions from '../actions'; 
import ShareButton from './ShareButton';

class Dashboard extends Component {
	componentWillMount() {
		this.props.usernameFetch();
		this.props.heartFetch();
		this.props.getWeek();
		this.props.getTotal();
	}

	renderJoin = () => {
		if (true) {
			return (
					<LinearGradient
						style={styles.headerButton}
						start={{ x: 0.0, y: 0.5 }}
						end={{ x: 1.0, y: 0.5 }}
					colors={['#22E1FF', '#1D8FE1', '#625EB1']}
					>
						<Button
							title='JOIN'
							backgroundColor='transparent'
							onPress={() => Actions.start()}
						/>
					</LinearGradient>
			)
		} else {
			return (
					<LinearGradient
						style={styles.headerButton}
						start={{ x: 0.0, y: 0.5 }}
						end={{ x: 1.0, y: 0.5 }}
					colors={['#22E1FF', '#1D8FE1', '#625EB1']}
					>
						<Text style={{ fontSize: 15, color: 'white' }}>The Game Will Begin at 9PM</Text>
					</LinearGradient>
			)
		}
	}

	render() {
		return (
			<View style={styles.wraper}>
				{/* HEADER */}
				<View style={styles.header}>
					{this.renderJoin()}
				</View>
				{/* CARD */}
				<View style={styles.card}>
					<View style={styles.section1}>
						<Avatar
							xlarge
							rounded
							source={{ uri: 'https://www.acspri.org.au/sites/acspri.org.au/files/profile-placeholder.png' }}
							// onPress={this._pickImage}
						/>
						<Text style={[styles.text, { marginTop: 20}]}>{this.props.nickname.username}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={[styles.section2, styles.section3]}>
							<Text style={styles.text}>RANK</Text>
							<Button
								title='385'
								buttonStyle={{ backgroundColor: 'transparent', alignItems: 'center' }}
								textStyle={[styles.text, { color: '#1D8FE1', fontSize: 24 }]}
								onPress={() => Actions.leaderboard()}
							></Button>
						</View>
						<View style={styles.section2}>
							{/* <Text>Your Balance: ${this.props.info.totalBalance}</Text> */}
							<Text style={styles.text}>BALANCE:</Text>
							<Button
								title='$100'
								buttonStyle={{ backgroundColor: 'transparent', alignItems: 'center' }}
								textStyle={[styles.text, { color: '#1D8FE1', fontSize: 24 }]}
								onPress={() => Actions.leaderboard()}
							></Button>
						</View>
					</View>
					<View style={styles.section4}>
						<Icon
							name='heart'
							size={46}
							type='font-awesome'
							color='red'
							underlayColor='transparent'
							onPress={() => Actions.heart()} 
						/>
					</View>
				</View>
				
				{/* FOOTER */}
				<View style={styles.footer}>
					<LinearGradient
						style={[styles.button, { marginRight: 10 }]}
						start={{ x: 0.0, y: 0.5 }}
						end={{ x: 1.0, y: 0.5 }}
						colors={['#22E1FF', '#1D8FE1']}
					>
						<Button
							title='LEADERBOARD'
							buttonStyle={{ backgroundColor: 'transparent' }}
							textStyle={{ fontSize: 12 }}
							onPress={() => Actions.leaderboard()}
						/>
					</LinearGradient>
					<LinearGradient
						style={styles.button}
						start={{ x: 0.0, y: 0.5 }}
						end={{ x: 1.0, y: 0.5 }}
						colors={['#1D8FE1', '#625EB1']}
					>
						<Button
							title='INVITE FRIENDS'
							buttonStyle={{ backgroundColor: 'transparent' }}
							textStyle={{ fontSize: 12 }}
							onPress={() => {}}
						/>
					</LinearGradient>
				</View>
			</View>
		);
	}
}

const { height, width } = Dimensions.get('window');
const styles = {
	wraper: {
		width: (width * .8),
		marginLeft: (width * .1),
		justifyContent: 'center'
	},
	header: {
		marginTop: 20,
		marginBottom: 20
	},
	headerButton: {
		height: 40,
		borderRadius: 50,
		padding: 15,
		justifyContent: 'center'
	},
	card: {
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		padding: 10,
		borderRadius: 20
	},
	section1: {
		position: 'relative',
		bottom: 50,
		alignItems: 'center',
		marginTop: 20
	},
	section2: {
		flex: 1,
		height: 100,
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	section3: {
		borderRightWidth: 1,
		borderRightColor: '#625EB1'
	},
	section4: {
		marginBottom: 10,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
		marginBottom: 10,
		padding: 5
	},
	button: {
		borderRadius: 50
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#625EB1'
	}
}
const mapStateToProps = state => {
	return { 
		login: state.login, 
		info: state.nickname, 
		game: state.game,
		nickname: state.nickname 
	}
}

export default connect(mapStateToProps, actions)(Dashboard);


