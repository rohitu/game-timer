import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

import { updateDuration, renamePlayer, addNewPlayer, removePlayer } from '../action-creators';
import { millisecondsToHms } from '../util/date-calc';

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

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const durationMs = this.props.players[0].timeDurationMs;
    const hms = millisecondsToHms(durationMs);

    const maxNumberOfPlayers = 5;
    const isMaxPlayers = this.props.players.length >= maxNumberOfPlayers;
    const addPlayerButtonStyles = [ styles.addPlayerButton ];
    let addPlayerButtonTextColor = '#ffffff';
    if (isMaxPlayers) {
      addPlayerButtonStyles.push(styles.disabledButton);
      addPlayerButtonTextColor = `${addPlayerButtonTextColor}${disabledFontOpacity*3}`;
    }

    // TODO go through and clean up styles and everything here once you have it figured out
    // TODO need to figure out how to set the proper background for the duration inputs
    // FYI on fancy syntax: I'm spreading the original hms object into another object (easy way to copy)
    // and then overriding one of the values based on which the text input corresponds to.
    return (
      <ScrollView>
        <Text style={styles.headerText}>Duration</Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10}}>
          <FloatLabelTextInput
            style={styles.durationTextInput}
            value={hms.hours.toString()}
            placeholder="HH"
            maxLength={2}
            keyboardType="numeric"
            selectionColor="rgba(52,52,52,0)"
            onChangeTextValue={(newHrs) => this.props.updateDuration({ ...hms, hours: newHrs })}
          />
          <Text style={{marginHorizontal: 5}}>:</Text>
          <FloatLabelTextInput
            style={styles.durationTextInput}
            noBorder="true"
            value={hms.minutes.toString()}
            placeholder="mm"
            maxLength={2}
            keyboardType="numeric"
            onChangeTextValue={(newMins) => this.props.updateDuration({ ...hms, minutes: newMins })}
          />
          <Text style={{marginHorizontal: 5}}>:</Text>
          <FloatLabelTextInput
            style={styles.durationTextInput}
            noBorder="true"
            value={hms.seconds.toString()}
            placeholder="ss"
            maxLength={2}
            keyboardType="numeric"
            onChangeTextValue={(newSecs) => this.props.updateDuration({ ...hms, seconds: newSecs })}
          />
        </View>
        <Text style={styles.headerText}>Players</Text>
        {this.props.players.map(this.renderPlayerSettings)}
        <TouchableOpacity
          style={addPlayerButtonStyles}
          onPress={this.props.addNewPlayer}
          disabled={isMaxPlayers}
        >
          <Icon style={{marginRight: 15}} name="user-plus" size={playerFontSize} color={addPlayerButtonTextColor} />
          <Text style={[styles.playerTextInput, {color:addPlayerButtonTextColor}]}>{"Add Player"}</Text>
        </TouchableOpacity>
      </ScrollView>
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
              placeholder={player.isDefaultName() ? player.defaultName : ''}
              maxLength={maxPlayerNameLength}
            />
          </View>
          <View style={{width: 25}}>
            <Icon name="edit" size={playerFontSize} color={playerFontColor} />
          </View>
        </View>
        <TouchableOpacity
          style={[{flex: 1, marginHorizontal: 10}, isFirstTwoPlayers ? {} : styles.removePlayerButton]}
          onPress={() => this.props.removePlayer(index)}
          disabled={isFirstTwoPlayers}
          autoFocus={true}
        >
          {
            isFirstTwoPlayers ? undefined :
              <Icon name="user-x" size={playerFontSize} color="white" />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const maxPlayerNameLength = 10;
const playerFontSize = 18;
const playerFontColor = '#778899'; // Grey Slate - http://www.color-hex.com/color/778899
const disabledFontOpacity = 32; // 10% opacity https://stackoverflow.com/questions/15852122/hex-transparency-in-colors

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 40,
    marginTop: 10,
  },
  durationTextInput: {
    width: 10,
    height: 10,
    //backgroundColor: 'rgba(52,52,52,0)', // this isn't working, and neither is 'transparent'
    //textAlign: 'center',
  },
  playerDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 6,
    marginLeft: 20,
  },
  playerTextInputView: {
    flexDirection: 'row',
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: playerFontColor,
  },
  playerTextInput: {
    fontSize: playerFontSize,
  },
  addPlayerButton: {
    backgroundColor: playerFontColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 33,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: playerFontColor,
    marginHorizontal: 10,
    marginBottom: 30,
    padding: 5,
  },
  removePlayerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: playerFontColor,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: playerFontColor,
  },
  disabledButton: {
    backgroundColor: `${playerFontColor}${disabledFontOpacity}`,
    borderWidth: 0,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
