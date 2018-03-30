import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Players from './components/players.component';
import MenuBar from './components/menubar.component';
import MenuButton from './components/menubutton.component';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Start the app paused.
    this.state = {
      isPaused: true,
      isTimerCompleted: false,
      resetTimer: false
    };
  }

  render() {
    // If the app is paused, then show text to trigger Play (and vice-versa)
    let startPauseIconName = this.state.isPaused ? "play" : "pause";
    let startPauseIconText = this.state.isPaused ? "Start" : "Pause";

    return (
      <View style={styles.container}>
        <Players
          numberOfPlayers={defaultNumberOfPlayers}
          duration={defaultDuration}
          isPaused={this.state.isPaused}
          disabled={this.state.isTimerCompleted}
          onTimerComplete={this.timerCompleted}
          resetTimer={this.state.resetTimer}
        />
        <MenuBar>
          <MenuButton
            onPress={this.menuPressed}
            iconName={"gear"}
            buttonText={"Menu"}
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
      </View>
    );
  }

  menuPressed = () => {
    // If menu is pressed, then pause the timers.
    // Also need to set resetTimer to false so that once Reset is clicked, the state isn't always going to reset timers.
    this.setState({
      isPaused: true,
      resetTimer: false
    });

    Alert.alert('Menu pressed!');
  };

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

const defaultNumberOfPlayers = 4;
//const defaultDuration = 30*60*1000; // 30 minutes
const defaultDuration = 6*1000; // for testing purposes.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});
