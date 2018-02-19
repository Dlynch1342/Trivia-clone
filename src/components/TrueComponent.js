import React, { Component } from 'react';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import * as actions from '../actions'
import { connect } from 'react-redux';
import _ from 'lodash';

class TrueComponent extends Component {
    constructor(props) {
        super(props);   
        state = { count: '' }
    }
    
    sendAnswer1 = () => {
        this.props.respond('option_1',)
    }
    sendAnswer2 = () => {
        this.props.respond('option_2',)
    }
    sendAnswer3 = () => {
        this.props.respond('option_3',)
    }

    render() {
        console.log(this.props.currentQ)
        return (
            <Card containerStyle={styles.container}>
                <Card>
                    <FormLabel>{this.props.currentQ.content}</FormLabel>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title={this.props.currentQ.user_answers.option_1}
                            buttonStyle={styles.button}
                            onPress={this.sendAnswer1}
                        />
                        <Button
                            title={this.props.currentQ.user_answers.option_2}
                            buttonStyle={styles.button}
                            onPress={this.sendAnswer2}
                        />
                        <Button
                            title={this.props.currentQ.user_answers.option_3}
                            buttonStyle={styles.button}
                            onPress={this.sendAnswer3}
                        />
                    </View>
                </Card>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    total: {},
    button: {},
})

export default connect(null, actions)(TrueComponent);
