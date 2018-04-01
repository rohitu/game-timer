import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


/*
  Custom props for this component:
  - TBD
*/
export default class Settings extends React.Component {

  // The StackNavigator expects this to be defined for settings options for navigation events.
  static navigationOptions = {
    title: 'Settings'
  };

  constructor(props) {
    super(props);

    // TODO figure out a way to not duplicate default values
    this.state = {
      numberOfPlayers: '4',
      duration: '6000'
    };
  }

  render() {
    return (
      <View>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => this.setState({numberOfPlayers: text})}
          value={this.state.numberOfPlayers}
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => this.setState({duration: text})}
          value={this.state.duration}
        />
        <Button title="press me" onPress={this.navigateToGameTimer} />
      </View>
    );
  }

  navigateToGameTimer = () => {
    this.props.navigation.replace('GameTimer', {
      'numberOfPlayers': this.state.numberOfPlayers,
      'duration': this.state.duration
    });
    //this.props.navigation.pop();
  };
}


// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
