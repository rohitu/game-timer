import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Players from './players.component';
import MenuBar from './menubar.component';
import MenuButton from './menubutton.component';
import Settings from './settings.component';

import PlayerModel from '../models/player.model';

/*
  Custom props for this component:
  - numberOfPlayers
  - duration
*/
export default class GameTimer extends React.Component {
  constructor(props) {
    super(props);

    let players = [];
    for (let i = 1; i <= this.props.numberOfPlayers; i++) {
      players.push(new PlayerModel(i, this.props.duration));
    }

    // Start the app paused.
    this.state = {
      isPaused: true,
      isTimerCompleted: false,
      resetTimer: false,
      showTimer: false,
      players: players
    };
}

  render() {
    // If the app is paused, then show text to trigger Play (and vice-versa)
    let startPauseIconName = this.state.isPaused ? "play" : "pause";
    let startPauseIconText = this.state.isPaused ? "Start" : "Pause";

    // TODO it would be nice if the middle Play/Pause button was larger.
    // Maybe a circular button that's larger than the other two so it looks nice?

    return (
      <View style={styles.container}>
        <Players
          style={this.state.showTimer ? styles.show : styles.hide}
          players={this.state.players}
          isPaused={this.state.isPaused}
          disabled={this.state.isTimerCompleted}
          onTimerComplete={this.timerCompleted}
          resetTimer={this.state.resetTimer}
        />
        <MenuBar>
          <MenuButton
            onPress={this.settingsPressed}
            disabled={!this.state.isPaused}
            iconName={"gear"}
            buttonText={"Settings"}
          />
          <MenuButton
             onPress={this.pausePressed}
             disabled={this.state.isTimerCompleted}
             iconName={startPauseIconName}
             buttonText={startPauseIconText}
           />
          <MenuButton
            onPress={this.resetPressed}
            iconName={"rotate-right"}
            buttonText={"Reset"}
          />
        </MenuBar>
        <Settings
          style={this.state.showTimer ? styles.hide : styles.show}
          players={this.state.players}
          hideCallback={this.closeSettings}
        />
      </View>
    );
  }

  settingsPressed = () => {
    // Assume that settings cannot be pressed while timers are running.
    // If I can fix the bug that comes up with that, then I can also
    // set the isPaused state to true so that if settings button is
    // pressed, then timers are automatically paused.

    this.setState({
      showTimer: false
    });
  };

  closeSettings = (updatedPlayers) => {
    if (!updatedPlayers) {
      this.setState({
        showTimer: true
      });
      return;
    }

    this.setState({
        resetTimer: true,
        isTimerCompleted: false,
        showTimer: true,
        players: updatedPlayers
    });
  }

  pausePressed = () => {
    // Toggle the paused state so that the button updates
    // Also need to set resetTimer to false so that once Reset is clicked, the state isn't always going to reset timers.
    this.setState(prevState => {
      return {
        isPaused: !prevState.isPaused,
        resetTimer: false
      }
    });
  };

  resetPressed = () => {
    // If reset is pressed, then pause the timers while user sees confirmation dialog.
    this.setState({
      isPaused: true
    });

    Alert.alert('Are you sure you would like to reset?', null, [
      { text: 'Cancel', onPress: () => true },
      { text: 'OK', onPress: () => this.setState({
          isPaused: true,
          isTimerCompleted: false,
          resetTimer: true
        })
      }
    ]);
  };

  timerCompleted = () => {
    // Set paused to true and set isTimerCompleted newState
    // Also need to set resetTimer to false so that once Reset is clicked, the state isn't always going to reset timers.
    this.setState({
      isPaused: true,
      isTimerCompleted: true,
      resetTimer: false
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  show: {
    flex: 1
  },
  hide: {
    flex: 0
  }
});

// Not sure if I need this
//AppRegistry.registerComponent('GameTimer', () => GameTimer);
