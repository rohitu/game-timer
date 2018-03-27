import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PlayerModel from './models/player.model';
import Player from './components/player.component';

export default class App extends React.Component {
  render() {
    let playerOne = new PlayerModel(1, 'time');
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        <Text style={styles.text}>Changes you make will automatically reload.</Text>
        <Text style={styles.text}>Shake your phone to open the developer menu.</Text>
        <Player player={playerOne}></Player>
      </View>
    );
  }
}

const isLight = false;
const bgColor = isLight ? '#fff' : '#000';
const fontColor = isLight ? '#000' : '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    color: fontColor
  }
});
