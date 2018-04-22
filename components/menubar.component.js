import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * MenuBar component - a custom component I had to write because I didn't like
 * a lot of the implementations out there, plus I really just wanted to try writing
 * more components on my own since this is my first big project with React.
 *
 * Props for this component:
 * - children: React children component(s) [Required] Any child components
 *    that should be rendered inside this one.  this.props.children is the way
 *    to render any child components inside of the <View> in this component.
 * - style: Standard prop for most components [Optional] - I'm allowing callers
 *    to specify any additional styles that override the default styles in this
 *    file.
 */
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
  justifyContent: 'space-around',
};

// Not sure if I need this
//AppRegistry.registerComponent('MenuBar', () => MenuBar);
