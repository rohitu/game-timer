import React from 'react';
import { Alert, AppRegistry, BackHandler, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

/*
  Custom props for this component:
  - TBD.
*/
export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    let duration = this.props.players[0].timeDurationMs.toString();
    this.state = {
      duration: duration
    };
  }

  // TODO remove spacing at the top and get a good navbar going
  render() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
    return (
      <View>
        <View style={[{height:30}, this.props.style]}></View>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => this.setState({duration: text})}
          value={this.state.duration}
        />
        <Button title="Save" onPress={this.saveChangesAndExit} />
      </View>
    );
  }

  saveChangesAndExit = () => {
    let players = this.props.players;
    let newDuration = parseInt(this.state.duration);
    for (let i = 0; i < players.length; i++) {
      players[i].timeDurationMs = newDuration;
    }
    this.goBack();
  };

  goBack = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    this.props.hideCallback();
    return true;
  }
}


// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
