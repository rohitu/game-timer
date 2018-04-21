import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import PlayerModel from '../models/player.model';

/*
  Custom props for this component:
  - TBD
*/
export default class Settings extends React.Component {

  // The StackNavigator expects this to be defined for settings options for navigation events.
  /*static navigationOptions = {
    title: 'Settings'
  };*/

  constructor(props) {
    super(props);

    //const players = this.props.navigation.state.params.players;
    const players = this.props.players;
    this.state = {
      //numberOfPlayers: this.props.numberOfPlayers.toString(),
      //duration: this.props.duration.toString()
      numberOfPlayers: players.length.toString(),
      duration: players[0].timeDurationMs.toString()
    };
  }

  // TODO remove spacing at the top and get a good navbar going
  render() {
    return (
      <View>
        <View style={{height:30}}></View>
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
    //this.props.hideCallback(parseInt(this.state.numberOfPlayers), parseInt(this.state.duration))
    /*this.props.navigation.navigate('GameTimer', {
      'numberOfPlayers': this.state.numberOfPlayers,
      'duration': this.state.duration
    });*/
    //this.props.navigation.pop();

    let newPlayers = [];
    const numberOfPlayers = parseInt(this.state.numberOfPlayers);
    const duration = parseInt(this.state.duration);
    for (let i = 1; i <= numberOfPlayers; i++) {
      newPlayers.push(new PlayerModel(i, duration));
    }
    this.props.save(newPlayers);
    //this.props.navigation.navigate('Timer', {players: newPlayers});
  };
}


// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
