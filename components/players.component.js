import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

import PlayerModel from '../models/player.model';

/*
  Custom props for this component:
  - numberOfPlayers: number [Required] Defines the number of players to display
  - duration: number [Required] timer duration, in milliseconds, for each of the players
  - isPaused: boolean [Optional] whether the timers in the component should be paused
  - disabled: boolean [Optional] whether the entire component is disabled
  - resetTimer: boolean [Optional] whether the timer should be reset for each player
  - onTimerComplete: Callback function [Optional] called when any of the players' timers are completed
*/
export default class PlayersComponent extends React.Component {
  constructor(props) {
    super(props);

    // Initialize to the first player being active. This will change as
    // the user clicks on the app.
    // If any timer completes, store that information so that other timers aren't active anymore
    this.nextPlayerIndex = 0;
    // TODO - remove this.nextPlayerIndex and just use state
    // TODO - make sure that the reset option also sets activePlayerIndex back to 0
    this.state = {
      //activePlayer: this.props.players[this.nextPlayerIndex]
      activePlayerIndex: 0
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.props.players.map(this.renderPlayer)}
      </View>
    );
  }

  renderPlayer = (currentPlayer, index) => {


    let currentStyle = [styles.inactiveButton];
    let currentTextStyle = [styles.inactiveText];
    let isCurrentPlayerActive = this.state.activePlayerIndex === index;
    //let isCurrentPlayerActive = this.state.activePlayer === currentPlayer;
    if (isCurrentPlayerActive) {
      currentStyle.push(styles.activeButton);
      currentTextStyle.push(styles.activeText);
    }

    let shouldAutostartTimer = isCurrentPlayerActive && !this.props.disabled && !this.props.isPaused;
    let timerStyleOptions = {
      text: isCurrentPlayerActive ? activeText : inactiveText
    };

    return (
      <TouchableOpacity
        activeOpacity={.3}
        key={index}
        style={currentStyle}
        onPress={this.playerSelected}
        disabled={this.props.disabled}
      >
        <View style={isCurrentPlayerActive ? {} : styles.buttonTextContainer}>
          <Text style={currentTextStyle}>{currentPlayer.name}</Text>
          <Timer
            totalDuration={currentPlayer.timeDurationMs}
            start={shouldAutostartTimer}
            reset={this.props.resetTimer}
            handleFinish={this.playerTimerComplete}
            options={timerStyleOptions}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Note: Defined as an anonymous function to maintain the 'this' object
  playerSelected = () => {
    if (this.props.disabled) return;

    //Alert.alert(`You selected: ${currentPlayer.name}, isActive: ${currentPlayer.isActive}`);
    this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.props.players.length;
    this.setState({
      //activePlayer: this.props.players[this.nextPlayerIndex]
      activePlayerIndex: this.nextPlayerIndex
    });
  };

  playerTimerComplete = () => {
    //Alert.alert(`"${this.state.activePlayer.name}" is out of time!`);
    Alert.alert(`"${this.props.players[this.state.activePLayerIndex].name}" is out of time!`);
    this.props.onTimerComplete();
  };
}

// TODO the styles, e.g. font sizes, may need to scale with number of players
// It seems to work fine for up to 10 players, but need to re-test once I have timer numbers

// Specify active and inactive text options outside of styles so it can
// be used for both styles as well as Timer options without duplication.
const activeText = {
  fontSize: 65,
  textAlign: 'center'
};
const inactiveText = {
  fontSize: 27,
  textAlign: 'center'
};

const styles = StyleSheet.create({
  activeButton: {
    flex: 3,
    alignItems: 'center'
  },
  inactiveButton: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderWidth: .5,
    borderColor: 'black'
  },
  buttonTextContainer: {
    justifyContent:'space-between',
    flexDirection:'row',
    marginHorizontal: 30
  },
  activeText,
  inactiveText,
});

// Not sure if I need this
//AppRegistry.registerComponent('Players', () => PlayersComponent);
