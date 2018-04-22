import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Constants } from '../util/commonstyles';

/**
 * MenuButton component - a custom component I had to write because I didn't like
 * a lot of the implementations out there, plus I really just wanted to try writing
 * more components on my own since this is my first big project with React.
 *
 * Custom props for this component:
 * - onPress: Callback function [Required] onPress callback function
 * - iconName: string [Required] name of the icon. Needs to be supported by react-native-vector-icons/FontAwesome
 * - buttonText: string [Required] text to display on the button.
 * - iconSize: number [Optional] custom size of the icon
 * - style: object [Optional] standard prop for container components. Any style here overrides default menubutton styles)
 * - disabled: boolean [Optional] whether the button is disabled (also sets opacity on the button label text)
 */
export default class MenuButton extends React.Component {
  render() {
    let buttonTextStyles = [styles.iconText];
    if (this.props.disabled) {
      buttonTextStyles.push(styles.iconTextDisabled);
    }

    let iconColor = this.props.disabled ? Constants.disabledTextColor : Constants.defaultTextColor;

    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Icon name={this.props.iconName} size={this.props.iconSize || defaultIconSize} color={iconColor} />
        <Text style={buttonTextStyles}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

const defaultIconSize = 20;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 13,
  },
  iconTextDisabled: {
    color: Constants.disabledTextColor,
  }
});

// Not sure if I need this
//AppRegistry.registerComponent('MenuButton', () => MenuButton);
