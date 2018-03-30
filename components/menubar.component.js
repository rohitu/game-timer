import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class MenuBar extends React.Component {
  render() {
    // Note: this.props.children is the way to render any child components inside of the <View>
    return (
      <View style={[menuBarStyles, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const menuBarStyles = {
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginHorizontal: 20
};

// Not sure if I need this
//AppRegistry.registerComponent('MenuBar', () => MenuBar);
