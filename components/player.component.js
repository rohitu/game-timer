import React from 'react';
import { Alert, AppRegistry, Button, Text } from 'react-native';
//import Button from 'react-native-button';

export default class PlayerComponent extends React.Component {
  /*render() {
    return (
      <Button
        onPress={this.playerSelected}
      >
        <div>
          <Text style={{alignItems:'flex-start'}}>One</Text>
          <Text style={{alignItems:'flex-end'}}>Two</Text>
        </div>
      </Button>
    );
  }*/

  render() {
    return (
      <Button
        onPress={this.playerSelected}
        title={this.props.player.name}
      />
    );
  }

  // TODO properly implement this button click handler
  // Note: Defined as an anonymous function to maintain the 'this' object
  playerSelected = () => {
    Alert.alert(`You selected: ${this.props.player.name}`);
  }
}

// Not sure if I need this
//AppRegistry.registerComponent('Player', () => PlayerComponent);
