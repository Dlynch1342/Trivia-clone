import React, { Component } from 'react';
import { Text, Animated, Easing, View } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux'
import * as actions from '../actions';
import * as Animatable from 'react-native-animatable';

class Lobby extends Component {
    constructor(props) {
        super(props)

        this.state = {
            banner: null
        }
    }
componentWillMount() {
    // this.retrieveBanners()
    setTimeout(() => {
        this.retrieveBanners()
    }, 4000)
    // this.animatedValue = new Animated.Value(200)
}

retrieveBanners() {
    const banners = ['b01', 'b02', 'b03', 'b04', 'b05', 'b06']
    const num = Math.floor(Math.random() * 6)
    this.props.getBanners(banners[num])
}
componentDidUpdate() {
    setTimeout(() => {
        this.retrieveBanners()
    }, 5000);
}

// componentDidMount() {
//     Animated.timing(this.animatedValue, {
//         toValue: 100,
//         duration: 2000,
//         easing: Easing.bounce
//     }).start()
// }

componentWillReceiveProps(nextProps) {
    this.setState({ banner: nextProps.lobby.banner })
}


    render() {
        const animatedStyle = { height: this.animatedValue}
        return (
            <View style={styles.container}>
                <Animatable.Text 
                style={styles.text}
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                >{this.state.banner}</Animatable.Text>
                {/* <Animated.Text style={[styles.box, animatedStyle]}>
                    {this.state.banner}
                </Animated.Text> */}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: 50
    },
    box: {
        backgroundColor: "#ff0066",
        width: 100,
        height: 100
    },
    text: {
        fontSize: 25,
        color: '#f442e8',
        alignSelf: 'center',
        marginTop: 30,
        fontFamily: "Copperplate"
    }
}

const mapStateToProps = state => {
    console.log(state)
    return { lobby: state.lobby }
}

export default connect(mapStateToProps, actions )(Lobby);
