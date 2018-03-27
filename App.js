import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Players from './components/players.component';

export default class App extends React.Component {
  render() {
    const defaultNumberOfPlayers = 4;

    // TODO add header for menu system
    return (
      <View style={styles.container}>
        <Text>Beginning</Text>
        <Players numberOfPlayers={defaultNumberOfPlayers}></Players>
        <Text>End</Text>
      </View>
    );
  }
}

// Ok yeah this is a very small start to theming.  Do it better.
// Or do I really need this here?
const isLight = true;
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
