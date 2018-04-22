import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import ActionButton from 'react-native-action-button';
//import { FloatingAction } from 'react-native-floating-action';

import Icon from 'react-native-vector-icons/FontAwesome';

import Players from './players.component';
import MenuBar from './menubar.component';
import MenuButton from './menubutton.component';

import { connect } from 'react-redux';

import PlayerModel from '../models/player.model';
import { cycleToNextPlayer, onTimerComplete, toggleTimer, resetTimer } from '../action-creators';

// FYI, the function does need to be wrapped in () for returning an object.
// See https://stackoverflow.com/questions/45279552/react-syntax-error-unexpected-token-expected
const mapStateToProps = (state) => ({
  //players: state.players,
  isPaused: state.isPaused,
  isTimerCompleted: state.isTimerCompleted,
  shouldResetTimer: state.shouldResetTimer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTimer: () => dispatch(toggleTimer()),
  resetTimer: () => dispatch(resetTimer()),
});

/*
  Custom props for this component:
  - navigation: Inherited from the StackNavigator library. See https://reactnavigation.org/docs/getting-started.html
*/
class GameTimer extends React.Component {
  constructor(props) {
    super(props);

    // Start the app paused.
    //this.state = {
      //isPaused: true,
      //isTimerCompleted: false,
      //resetTimer: false
    //};
}

  render() {
    // If the app is paused, then show text to trigger Play (and vice-versa)
    let startPauseIconName = this.props.isPaused ? "play" : "pause";
    let startPauseIconColor = this.props.isPaused ? "green" : "red";
    let startPauseIconText = this.props.isPaused ? "Start" : "Pause";
    //Alert.alert(`numm: ${this.props.numberOfPlayers}, duration: ${this.props.duration}`);
    //Alert.alert(`screenProps: ${this.props.screenProps}`);

    // Get defaults or access latest info from navigation state params
    // The navigation state params is where the Settings tab will relay info
    // back to this view.
    //this.numberOfPlayers = parseInt(this.props.navigation.getParam('numberOfPlayers', defaultNumberOfPlayers));
    //this.duration = parseInt(this.props.navigation.getParam('duration', defaultDuration));

    /*if (!this.props.navigation.state.params.players) {
      this.props.navigation.setParams({
        players: defaultPlayers
      });
    }
    const players = this.props.navigation.state.params.players;
    const players = this.props.players;*/

    const collapsedActions = [
      {
        text: startPauseIconText,
        icon: <Icon name={startPauseIconName} style={styles.actionButtonIcon} />,
        name: startPauseIconName
      },
      {
        text: 'Settings',
        icon: <Icon name="gear" style={styles.actionButtonIcon} />,
        name: 'gear'
      },
    ];
    const expandedActions = collapsedActions.concat([
      {
        text: 'Reset',
        icon: <Icon name="rotate-right" style={styles.actionButtonIcon} />,
        name: 'rotate-right'
      },
    ]);

    // TODO it would be nice if the middle Play/Pause button was larger.
    // Maybe a circular button that's larger than the other two so it looks nice?
    return (
      <View style={styles.container}>
      {/*<Text>{JSON.stringify(players)}</Text>*/}
        <Players />
        <Text>{`IsPaused: ${this.props.isPaused}`}</Text>
        {/*<FloatingAction
          actions={this.props.isPaused ? expandedActions : collapsedActions}
          position="right"
          showBackground={false}
          //overrideWithAction={true}
          openOnMount={this.props.isPaused}
        />*/}
        {/* Custom button from https://stackoverflow.com/questions/33135256/floating-action-button-on-react-native
        <TouchableOpacity
           style={{
               borderWidth:1,
               borderColor:'rgba(0,0,0,0.2)',
               alignItems:'center',
               justifyContent:'center',
               width:70,
               position: 'absolute',
               bottom: 10,
               right: 10,
               height:70,
               backgroundColor:'#fff',
               borderRadius:100,
             }}
         >
          <Icon name="plus"  size={30} color="#01a699" />
         </TouchableOpacity>*/}
        {/*<ActionButton
          active={this.props.isPaused}
          position="center"
          backgroundTappable={true}
          spacing={10}
          offsetY={5}
          degrees={0}
          onPress={this.props.toggleTimer}
          renderIcon={(active) => <Icon name={active ? "play" : "pause"} style={styles.actionButtonIcon} />}
        >
          <ActionButton.Item buttonColor='#9b59b6' title="Reset" onPress={this.props.resetTimer}>
            <Icon name={"rotate-right"} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>*/}
        <MenuBar>
          <MenuButton
            onPress={this.settingsPressed}
            disabled={!this.props.isPaused}
            iconName={"gear"}
            buttonText={"Settings"}
          />
          <MenuButton
             onPress={this.props.toggleTimer}
             disabled={this.props.isTimerCompleted}
             iconName={startPauseIconName}
             buttonText={startPauseIconText}
           />
          <MenuButton
            onPress={this.props.resetTimer}
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

    /*this.setState({
      isPaused: true,
      resetTimer: false
    });*/

    //Alert.alert('Settings pressed!');
    /*this.props.navigation.replace('Settings', {
      'numberOfPlayers': this.numberOfPlayers.toString(),
      'duration': this.duration.toString()
    });*/
    //this.props.hideCallback();
    this.props.navigation.navigate('Settings');
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
