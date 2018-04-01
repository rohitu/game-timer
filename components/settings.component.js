import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


/*
  Custom props for this component:
  - TBD
*/
export default class Settings extends React.Component {

  // The StackNavigator expects this to be defined for settings options for navigation events.
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return (
      <View>
        <Text>{`This is the Settings menu, foo:${this.props.navigation.state.params.foo}`}</Text>
        <Button title="press me" onPress={this.navigateToGameTimer} />
      </View>
    );
  }

  navigateToGameTimer = () => {
    this.props.navigation.goBack();
  };
}


// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
