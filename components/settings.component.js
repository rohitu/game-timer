import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux';

import PlayerModel from '../models/player.model';
import { updateDuration, renamePlayer, addNewPlayer } from '../action-creators';

const mapStateToProps = (state) => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch) => ({
  updateDuration: (duration) => dispatch(updateDuration(duration)),
  updatePlayer: (newName, playerIndex) => dispatch(renamePlayer(newName, playerIndex)),
  addNewPlayer: () => dispatch(addNewPlayer()),
});

/*
  Custom props for this component:
  - TBD
*/
class Settings extends React.Component {
  // TODO remove spacing at the top and get a good navbar going
  render() {
    let duration = this.props.players[0].timeDurationMs.toString();
    return (
      <View>
        <View style={{height:30}}></View>
        <Text style={styles.headerText}>Duration</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={this.updateDuration}
          value={duration}
          maxLength={maxDurationTextLength}
        />
        <Text style={styles.headerText}>Players</Text>
        {this.props.players.map(this.renderPlayerSettings)}
        {/*<Button title="press me" onPress={this.props.saveChanges} />*/}
        <Button title="Add Player" onPress={this.props.addNewPlayer} />
      </View>
    );
  }

  // TODO need to add functionality for resetting or clearing player's name to default
  renderPlayerSettings = (player, index) => {
    return (
      <TextInput
        key={index}
        onChangeText={(text) => this.props.updatePlayer(text, index)}
        value={player.isDefaultName() ? '' : player.name}
        placeholder={player.isDefaultName() ? player.name : ''}
        maxLength={maxPlayerNameLength}
      />
    );
  }

  updateDuration = (text) => {
    try {
      let newDuration = Number(text);
      this.props.updateDuration(newDuration);
    } catch (error) {
      Alert.alert(`Error while updating duration: ${error}`);
      return;
    }
  };
}

const maxPlayerNameLength = 10;

// TODO this will be refactored out and changed once the interface for inputting duration is better.
const maxDurationTextLength = 10;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
