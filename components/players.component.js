import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PlayerModel from '../models/player.model';

// TODO unit test?
export default class PlayersComponent extends React.Component {
  constructor(props) {
    super(props);

    this.players = [];
    for (let i = 1; i <= this.props.numberOfPlayers; i++) {
      this.players.push(new PlayerModel(i, `time${i}`));
    }

    // Initialize to the first player being active. This will change as
    // the user clicks on the app.
    this.state = {
      activePlayerIndex: 0
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
    let currentTextStyle = [styles.inactiveButtonText];
    if (this.state.activePlayerIndex === index) {
      currentStyle.push(styles.activeButton);
      currentTextStyle.push(styles.activeButtonText);
    }

    return (
      <View key={index} style={currentStyle}>
        <TouchableOpacity
          onPress={() => this.playerSelected(this.players, currentPlayer)}
          style={styles.buttonTouchableContainer}
        >
          <View style={styles.buttonTextContainer}>
          <Text style={currentTextStyle}>{currentPlayer.name}</Text>
          <Text style={currentTextStyle}>{currentPlayer.currentTime}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Note: Defined as an anonymous function to maintain the 'this' object
  playerSelected(allPlayers, currentPlayer) {
    //Alert.alert(`You selected: ${currentPlayer.name}, isActive: ${currentPlayer.isActive}`);
    this.setState(prevState => {
      let newState = {
        activePlayerIndex: (prevState.activePlayerIndex + 1) % this.players.length
      };
      return newState;
    })
  }
}

// TODO the styles, e.g. font sizes, may need to scale with number of players
const styles = StyleSheet.create({
  activeButton: {
    flex: 3
  },
  inactiveButton: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderWidth: .5,
    borderColor: 'black'
  },
  activeButtonText: {
    fontSize: 60
  },
  inactiveButtonText: {
    fontSize: 25
  },
  buttonTouchableContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonTextContainer: {
    justifyContent:'space-between',
    flexDirection:'row',
    marginHorizontal: 10
  }
});

// Not sure if I need this
//AppRegistry.registerComponent('Player', () => PlayerComponent);
