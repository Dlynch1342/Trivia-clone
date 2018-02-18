// ABSOLUTE
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import firebase from 'firebase';
// import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

// RELATIVE
import * as actions from '../actions';

class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = { page: 'Week' }
    }
    
    isActive = (data) => {
        if (this.state.page === data) {
            return {
                flex:1,
                alignItems: 'center',
                padding: 10,
                margin: 7,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0)',
                borderRadius: 50,
                backgroundColor: '#F4DBFF'
            }
        }
        return false
    }

    getList = () => {
        if ( this.state.page === 'Week') {
            console.log('b')
            var list = this.props.rank.week;
        } else {
            var list = this.props.rank.total;
        }
        return (
            <List containerStyle={{ marginBottom: 20 }}>
                {list.map((l, i) => (
                    <ListItem
                        roundAvatar
                        avatar={{ uri: 'https://i.imgur.com/FDWo9.jpg' }}
                        containerStyle={{ backgroundColor: 'rgb(230,235,240)' }}
                        // containerStyle={{ backgroundColor: 'rgb(230,235,240)' }}
                        hideChevron={true}
                        key={i}
                        title={l.user}
                        badge={{
                            value: String(l.value),
                            textStyle: { color: '#999' },
                            containerStyle: { backgroundColor: '#F4DBFF' }
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
                    {/* <LinearGradient 
                        colors={['rgba(0,0,0,0)','rgb(230,235,240)']}
                        style={tab}
                    >
                        <Text style={{ color: '#999' }}>Week</Text>
                    </LinearGradient> */}
                    <TouchableOpacity
                        style={ this.isActive('Week') || tab }
                        onPress={() => this.setState({ page: 'Week' })}
                    ><Text style={{ color: '#999' }}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.isActive('All-Time') || tab }
                        onPress={() => this.setState({ page: 'All-Time' })}
                    ><Text style={{ color: '#999' }}>All-Time</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {this.getList()}
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        margin: 10
    },
    nav: {
        flexDirection: 'row'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 7,
        borderWidth: 1,
        borderColor: '#D8BCE8',
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    board: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,

    },
    element: {
        borderBottomWidth: 1,
        borderColor: '#F4DBFF',
        width: 300,
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: '300',
        color: '#BABABA',
    }

};

const mapStateToProps = state => {
    return { rank: state.rank }
}

export default connect(mapStateToProps, actions)(Rank);