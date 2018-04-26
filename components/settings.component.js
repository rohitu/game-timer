import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import { updateDuration, renamePlayer, addNewPlayer, removePlayer } from '../action-creators';

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
  removePlayer: (playerIndex) => dispatch(removePlayer(playerIndex)),
});

// TODO add logic for maximum number of players and maybe consolidate in a config file in util/
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
        <TouchableOpacity
          style={styles.addPlayerButton}
          onPress={this.props.addNewPlayer}
        >
          <Icon style={{marginRight: 20}} name="user-plus" size={playerFontSize} color="white" />
          <Text style={[styles.playerTextInput, {color:"white"}]}>{"Add Player"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // TODO need to add functionality for resetting or clearing player's name to default
  renderPlayerSettings = (player, index) => {
    // For the first two players, don't show a remove icon.
    const isFirstTwoPlayers = index <= 1;
    return (
      <View key={index} style={styles.playerDisplayContainer}>
        <View style={styles.playerTextInputView}>
          <View style={{flex: 1}}>
            <TextInput
              style={styles.playerTextInput}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.props.updatePlayer(text, index)}
              value={player.isDefaultName() ? '' : player.name}
              placeholder={player.isDefaultName() ? player.name : ''}
              maxLength={maxPlayerNameLength}
            />
          </View>
          <View style={{width: 25}}>
            <Icon name="edit" size={playerFontSize} color={playerFontColor} />
          </View>
        </View>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => this.props.removePlayer(index)}
          disabled={isFirstTwoPlayers}
        >
          {
            isFirstTwoPlayers ? undefined :
              <Icon name="user-x" size={playerFontSize} color={playerFontColor} />
          }
        </TouchableOpacity>
      </View>
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

const playerFontSize = 16;
const playerFontColor = '#778899'; // Grey Slate - http://www.color-hex.com/color/778899

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 40,
    marginTop: 10,
  },
  playerDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 5,
    marginLeft: 10,
  },
  playerTextInputView: {
    flexDirection: 'row',
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: playerFontColor,
  },
  playerTextInput: {
    textAlign: 'center',
    fontSize: playerFontSize,
  },
  addPlayerButton: {
    backgroundColor: playerFontColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 33,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: playerFontColor,
    marginHorizontal: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
