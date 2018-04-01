import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Players from './players.component';
import MenuBar from './menubar.component';
import MenuButton from './menubutton.component';

/*
  Custom props for this component:
  - navigation: Inherited from the StackNavigator library. See https://reactnavigation.org/docs/getting-started.html
*/
export default class GameTimer extends React.Component {

  // The StackNavigator expects this to be defined for settings options for navigation events.
  static navigationOptions = {
    header: null // Hide navigation header when this component is active.
  };

  constructor(props) {
    super(props);

    // Start the app paused.
    this.state = {
      isPaused: true,
      isTimerCompleted: false,
      resetTimer: false
    };

    this.numberOfPlayers = defaultNumberOfPlayers;
    this.duration = defaultDuration;
  }

  render() {
    // If the app is paused, then show text to trigger Play (and vice-versa)
    let startPauseIconName = this.state.isPaused ? "play" : "pause";
    let startPauseIconText = this.state.isPaused ? "Start" : "Pause";

    // Get defaults or access latest info from navigation state params
    // The navigation state params is where the Settings tab will relay info
    // back to this view.
    this.numberOfPlayers = parseInt(this.props.navigation.getParam('numberOfPlayers', defaultNumberOfPlayers));
    this.duration = parseInt(this.props.navigation.getParam('duration', defaultDuration));

    // TODO it would be nice if the middle Play/Pause button was larger.
    // Maybe a circular button that's larger than the other two so it looks nice?
    return (
      <View style={styles.container}>
        <Players
          numberOfPlayers={this.numberOfPlayers}
          duration={this.duration}
          isPaused={this.state.isPaused}
          disabled={this.state.isTimerCompleted}
          onTimerComplete={this.timerCompleted}
          resetTimer={this.state.resetTimer}
        />
        <MenuBar>
          <MenuButton
            onPress={this.settingsPressed}
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
      </View>
    );
  }

  settingsPressed = () => {
    // If settings button is pressed, then pause the timers.
    // Also need to set resetTimer to false so that once Reset is clicked, the state isn't always going to reset timers.
    this.setState({
      isPaused: true,
      resetTimer: false
    });

    //Alert.alert('Settings pressed!');
    this.props.navigation.replace('Settings', {
      'numberOfPlayers': this.numberOfPlayers.toString(),
      'duration': this.duration.toString()
    });
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

// Not sure if I need this
//AppRegistry.registerComponent('GameTimer', () => GameTimer);
