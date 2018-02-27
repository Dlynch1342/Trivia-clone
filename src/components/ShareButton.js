import React, { Component } from 'react';
import { Text, View, StyleSheet, Share, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants } from 'expo';
import * as actions from '../actions';
import { connect } from 'react-redux';




class ShareButton extends Component {
    _shareMessage(data) {
        Share.share({
            message: `Use my code '${data}' to sign up for this great new game to earn some cash!`
        })
            .then(this._showResult)
            .catch((error) => this.setState({ result: 'error: ' + error.message }));
    }

    _shareText() {
        Share.share({
            message: 'A framework for building native apps using React',
            url: 'http://facebook.github.io/react-native/',
            title: 'React Native'
        }, {
                dialogTitle: 'Share React Native website',

                tintColor: 'green'
            })
            .then(this._showResult)
            .catch((error) => this.setState({ result: 'error: ' + error.message }));
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({ result: 'shared with an activityType: ' + result.activityType });
            } else {
                this.setState({ result: 'shared' });
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({ result: 'dismissed' });
        }
    }
    render() {
        return (
            <Button
                title='INVITE FRIENDS'
                backgroundColor='#03A9F4'
                onPress={() => this._shareMessage(this.props.userName)}
                style={{ marginTop: 10 }}
            />
        )
    }
}

export default connect(null, actions)(ShareButton);
