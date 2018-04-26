import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Players from './players.component';
import MenuBar from './menubar.component';
import MenuButton from './menubutton.component';
import { toggleTimer, resetTimer } from '../action-creators';

/**
 * The GameTimer component is a combination of a presentational and a container
 * component (see https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
 * It's mostly presentational, which is why I opted to just put all the logic in
 * the same place.
 *
 * The combination of the props in mapStateToProps and mapDispatchToProps tell
 * you the full list of props that the GameTimer component uses, all of which
 * are currently injected in via 'connect'.
 * If GameTimer has any of its own props, I can use ownProps in the redux mappers.
 * Note: GameTimer also inherits the 'navigation' prop from StackNavigator.
 */

// FYI, the function does need to be wrapped in () for returning an object.
// See https://stackoverflow.com/questions/45279552/react-syntax-error-unexpected-token-expected
const mapStateToProps = (state) => ({
  isPaused: state.isPaused,
  isTimerCompleted: state.isTimerCompleted,
  shouldResetTimer: state.shouldResetTimer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTimer: () => dispatch(toggleTimer()),
  resetTimer: () => dispatch(resetTimer()),
});

class GameTimer extends React.Component {
  render() {
    // If the app is paused, then show text to trigger Play (and vice-versa)
    let startPauseIconName = this.props.isPaused ? "play" : "pause";
    let startPauseIconText = this.props.isPaused ? "Start" : "Pause";

    // TODO it would be nice if the middle Play/Pause button was larger.
    // Maybe a circular button that's larger than the other two so it looks nice?
    return (
      <View style={styles.container}>
      {/*<Text>{JSON.stringify(players)}</Text>*/}
        <Players />
        <MenuBar>
          <MenuButton
            onPress={this.settingsPressed}
            disabled={!this.props.isPaused}
            iconName="sliders"
            iconRotation={90}
            buttonText="Settings"
          />
          <MenuButton
             onPress={this.props.toggleTimer}
             disabled={this.props.isTimerCompleted}
             iconName={startPauseIconName}
             buttonText={startPauseIconText}
           />
          <MenuButton
            onPress={this.props.resetTimer}
            iconName="rotate-cw"
            buttonText="Reset"
          />
        </MenuBar>
      </View>
    );
  }

  settingsPressed = () => {
    // The Settings button will be disabled if the timers are running.
    // This allows us to make assumptions instead of trying to handle
    // auto-pausing or resetting timers when the Settings button is
    // clicked while timers are running.
    // TODO as a future improvement, look into see if we can keep the
    // button enabled and disable the timers.  It should be pretty
    // straightforward now that I'm using redux.  I think it'll just
    // be another action and reducer logic.
    this.props.navigation.navigate('Settings');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameTimer);

// Not sure if I need this
//AppRegistry.registerComponent('GameTimer', () => GameTimer);
