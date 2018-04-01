import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Constants } from '../util/commonstyles';

/*
  Custom props for this component:
  - onPress: Callback function [Required] onPress callback function
  - iconName: string [Required] name of the icon. Needs to be supported by react-native-vector-icons/FontAwesome
  - buttonText: string [Required] text to display on the button.
  - iconSize: number [Optional] custom size of the icon
  - style: object [Optional] standard prop for container components. Any style here overrides default menubutton styles)
  - disabled: boolean [Optional] whether the button is disabled (also sets opacity on the button label text)
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

// TODO the menu buttons aren't properly aligned.  Fix it.
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    fontSize: 13,
    //textAlign: 'center'
  },
  iconTextDisabled: {
    color: Constants.disabledTextColor
  }
});

// Not sure if I need this
//AppRegistry.registerComponent('MenuButton', () => MenuButton);
