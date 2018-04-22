import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

import { connect } from 'react-redux';

import PlayerModel from '../models/player.model';
import { cycleToNextPlayer, onTimerComplete } from '../action-creators';

/**
 * The Players component is a combination of a presentational and a container
 * component (see https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
 * It's mostly presentational, which is why I opted to just put all the logic in
 * the same place.
 *
 * The combination of the props in mapStateToProps and mapDispatchToProps tell
 * you the full list of props that the Players component uses, all of which
 * are currently injected in via 'connect'.
 * If Players has any of its own props, I can use ownProps in the redux mappers.
 */
const mapStateToProps = (state) => ({
  players: state.players,
  isPaused: state.isPaused,
  shouldResetTimer: state.shouldResetTimer,
  isTimerCompleted: state.isTimerCompleted,
});

const mapDispatchToProps = (dispatch) => ({
  cycleToNextPlayer: () => dispatch(cycleToNextPlayer()),
  onTimerComplete: () => dispatch(onTimerComplete()),
});

class PlayersComponent extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        {this.props.players.map(this.renderPlayer)}
      </View>
    );
  }

  // Note: Defined as an anonymous function to maintain the 'this' object
  renderPlayer = (currentPlayer, index) => {
    let currentStyle = [styles.inactiveButton];
    let currentTextStyle = [styles.inactiveText];

    if (currentPlayer.isActive) {
      currentStyle.push(styles.activeButton);
      currentTextStyle.push(styles.activeText);
    }

    let shouldAutostartTimer = currentPlayer.isActive && !this.props.isTimerCompleted && !this.props.isPaused;
    let timerStyleOptions = {
      text: currentPlayer.isActive ? activeText : inactiveText
    };

    return (
      <TouchableOpacity
        activeOpacity={.3}
        key={index}
        style={currentStyle}
        onPress={this.props.cycleToNextPlayer}
        disabled={this.props.isTimerCompleted}
      >
        <View style={currentPlayer.isActive ? {} : styles.buttonTextContainer}>
          <Text style={currentTextStyle}>{currentPlayer.name}</Text>
          <Timer
            totalDuration={currentPlayer.timeDurationMs}
            start={shouldAutostartTimer}
            reset={this.props.shouldResetTimer}
            handleFinish={this.props.onTimerComplete}
            options={timerStyleOptions}
          />
        </View>
      </TouchableOpacity>
    );
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
    borderWidth: .3,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersComponent);

// Not sure if I need this
//AppRegistry.registerComponent('Players', () => PlayersComponent);
