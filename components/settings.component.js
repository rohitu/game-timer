import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { updateDuration, renamePlayer, addNewPlayer } from '../action-creators';

/**
 * The Settings component is a combination of a presentational and a container
 * component (see https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
 * It's mostly presentational, which is why I opted to just put all the logic in
 * the same place.
 *
 * The combination of the props in mapStateToProps and mapDispatchToProps tell
 * you the full list of props that the Settings component uses, all of which
 * are currently injected in via 'connect'.
 * If Settings has any of its own props, I can use ownProps in the redux mappers.
 * Note: Settings also inherits the 'navigation' prop from StackNavigator.
 */
const mapStateToProps = (state) => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch) => ({
  updateDuration: (duration) => dispatch(updateDuration(duration)),
  updatePlayer: (newName, playerIndex) => dispatch(renamePlayer(newName, playerIndex)),
  addNewPlayer: () => dispatch(addNewPlayer()),
});

class Settings extends React.Component {
  render() {
    const duration = this.props.players[0].timeDurationMs.toString();
    return (
      <View>
        <Text style={styles.headerText}>Duration</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={this.onChangeDuration}
          value={duration}
          maxLength={maxDurationTextLength}
        />
        <Text style={styles.headerText}>Players</Text>
        {this.props.players.map(this.renderPlayerSettings)}
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

  onChangeDuration = (text) => {
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
