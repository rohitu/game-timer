import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

import PlayerModel from '../models/player.model';

// TODO unit test?
export default class PlayersComponent extends React.Component {
  constructor(props) {
    super(props);

    this.players = [];
    for (let i = 1; i <= this.props.numberOfPlayers; i++) {
      this.players.push(new PlayerModel(i, this.props.duration));
    }

    // Initialize to the first player being active. This will change as
    // the user clicks on the app.
    // If any timer completes, store that information so that other timers aren't active anymore
    this.nextPlayerIndex = 0;
    this.state = {
      activePlayer: this.players[this.nextPlayerIndex],
      hasAnyTimerCompleted: false
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.players.map(this.renderPlayer)}
      </View>
    );
  }

  renderPlayer = (currentPlayer, index) => {
    let currentStyle = [styles.inactiveButton];
    let currentTextStyle = [styles.inactiveText];
    let isCurrentPlayerActive = this.state.activePlayer === currentPlayer;
    if (isCurrentPlayerActive) {
      currentStyle.push(styles.activeButton);
      currentTextStyle.push(styles.activeText);
    }

    let shouldAutostartTimer = !this.state.hasAnyTimerCompleted && isCurrentPlayerActive && !this.props.skipAutostart;
    let timerOptions = {
      text: isCurrentPlayerActive ? activeText : inactiveText
    };

    return (
      <TouchableOpacity
        activeOpacity={.3}
        key={index}
        style={currentStyle}
        onPress={this.playerSelected}
        disabled={this.state.hasAnyTimerCompleted}
      >
        <View style={isCurrentPlayerActive ? {} : styles.buttonTextContainer}>
          <Text style={currentTextStyle}>{currentPlayer.name}</Text>
          <Timer
            totalDuration={currentPlayer.timeDurationMs}
            start={shouldAutostartTimer}
            handleFinish={this.playerTimerComplete}
            options={timerOptions}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Note: Defined as an anonymous function to maintain the 'this' object
  playerSelected = () => {
    if (this.state.hasAnyTimerCompleted) return;

    //Alert.alert(`You selected: ${currentPlayer.name}, isActive: ${currentPlayer.isActive}`);
    this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.players.length;
    this.setState(prevState => {
      let newState = {
        activePlayer: this.players[this.nextPlayerIndex]
      };
      return newState;
    });
  };

  playerTimerComplete = () => {
    this.setState({hasAnyTimerCompleted: true});
    Alert.alert(`"${this.state.activePlayer.name}" is out of time!`);
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
//AppRegistry.registerComponent('Player', () => PlayerComponent);
