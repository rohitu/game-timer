import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import moment from 'moment';

//import DateTimePicker from 'react-native-modal-datetime-picker';

import { updateDuration, renamePlayer, addNewPlayer, removePlayer } from '../action-creators';

/**
 * The Settings component is a combination of a presentational and a container
 * component (see https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
 * It's mostly presentational, which is why I opted to just put all the logic in
 * the same place.
 *
 * The combination of the props in mapStateToProps and mapDispatchToProps tell
 * you the full list of props that the Settings component uses, all of which
 * are currently injected in via 'connect'.
 * If Settings has any of its own props, I can use ownProps in the redux mappers.
 * Note: Settings also inherits the 'navigation' prop from StackNavigator.
 */
const mapStateToProps = (state) => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch) => ({
  updateDuration: (duration) => dispatch(updateDuration(duration)),
  updatePlayer: (newName, playerIndex) => dispatch(renamePlayer(newName, playerIndex)),
  addNewPlayer: () => dispatch(addNewPlayer()),
  removePlayer: (playerIndex) => dispatch(removePlayer(playerIndex)),
});

// TODO add logic for maximum number of players and maybe consolidate in a config file in util/
class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let durationMs = this.props.players[0].timeDurationMs;//.toString();
    //const durationMoment = moment.duration({milliseconds: durationMs});
    //const hours = durationMoment.hours().toString();
    //const minutes = durationMoment.minutes().toString();
    //const seconds = durationMoment.seconds().toString();
    const hours = Math.floor(durationMs / (60*60*1000)).toString();
    durationMs = durationMs % (60*60*1000);
    const minutes = Math.floor(durationMs / (60*1000)).toString();
    durationMs = durationMs % (60*1000);
    const seconds = Math.floor(durationMs / (1000)).toString();

    // I'd prefer to use momentjs, but the DateTimePicker component I'm using
    // requires a date object.  I can create a Date object from a millisecond value,
    // so that's what I'm going to do to represent time.
    // Don't trust the year/month/day values from this variable.
    // TODO go through and clean up styles and everything here once you have it figured out
    // TODO need to figure out how to set the proper background for the duration inputs
    //const date = new Date(duration);
    return (
      <View>
        <Text style={styles.headerText}>Duration</Text>
        <View style={{}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <FloatLabelTextInput
              style={styles.durationTextInput}
              value={hours}
              placeholder="HH"
              maxLength={2}
              keyboardType="numeric"
              selectionColor="rgba(52,52,52,0)"
              onChangeTextValue={(newHrs) => this.props.updateDuration({ hours: newHrs, minutes, seconds })}
            />
            <Text style={{marginHorizontal: 5}}>:</Text>
            <FloatLabelTextInput
              style={styles.durationTextInput}
              noBorder="true"
              value={minutes}
              placeholder="mm"
              maxLength={2}
              keyboardType="numeric"
              onChangeTextValue={(newMins) => this.props.updateDuration({ hours, minutes: newMins, seconds })}
            />
            <Text style={{marginHorizontal: 5}}>:</Text>
            <FloatLabelTextInput
              style={styles.durationTextInput}
              noBorder="true"
              value={seconds}
              placeholder="ss"
              maxLength={2}
              keyboardType="numeric"
              onChangeTextValue={(newSecs) => this.props.updateDuration({ hours, minutes, seconds: newSecs })}
            />
          </View>
        </View>
        {/*<TextInput
          keyboardType="numeric"
          onChangeText={this.onChangeDuration}
          value={duration}
          maxLength={maxDurationTextLength}
        />*/}
        {/*this.renderDurationPicker()*/}
        <Text style={styles.headerText}>Players</Text>
        {this.props.players.map(this.renderPlayerSettings)}
        <TouchableOpacity
          style={styles.addPlayerButton}
          onPress={this.props.addNewPlayer}
        >
          <Icon style={{marginRight: 15}} name="user-plus" size={playerFontSize} color="white" />
          <Text style={[styles.playerTextInput, {color:"white"}]}>{"Add Player"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // TODO need to add functionality for resetting or clearing player's name to default
  renderPlayerSettings = (player, index) => {
    // For the first two players, don't show a remove icon.
    const isFirstTwoPlayers = index <= 1;
    return (
      <View key={index} style={styles.playerDisplayContainer}>
        <View style={styles.playerTextInputView}>
          <View style={{flex: 1}}>
            <TextInput
              style={styles.playerTextInput}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.props.updateDuration(text)}
              value={player.isDefaultName() ? '' : player.name}
              placeholder={player.isDefaultName() ? player.defaultName : ''}
              maxLength={maxPlayerNameLength}
            />
          </View>
          <View style={{width: 25}}>
            <Icon name="edit" size={playerFontSize} color={playerFontColor} />
          </View>
        </View>
        <TouchableOpacity
          style={[{flex: 1, marginHorizontal: 10}, isFirstTwoPlayers ? {} : styles.removePlayerButton]}
          onPress={() => this.props.removePlayer(index)}
          disabled={isFirstTwoPlayers}
          autoFocus={true}
        >
          {
            isFirstTwoPlayers ? undefined :
              <Icon name="user-x" size={playerFontSize} color="white" />
          }
        </TouchableOpacity>
      </View>
    );
  }

  /*popupTimePicker = () => this.setState({showTimePicker: true});
  hideTimePicker = () => this.setState({showTimePicker: false});
  confirmTimePickerSelection = (newdate) => {
    // Date.getTime returns the total number of milliseconds from Jan 1, 1970.
    // That's the default date that gets set when I use new Date(duration) earlier.
    // That's why this all works.
    this.props.updateDuration(newdate.getTime());
    this.hideTimePicker();
  };

  renderDurationPicker = (date) => {
    return (
      <Text>{`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`}</Text>
      <Button title="Change duration" onPress={this.popupTimePicker} />
      <DateTimePicker
        isVisible={this.state.showTimePicker}
        mode="time"
        date={date}
        onConfirm={this.confirmTimePickerSelection}
        onCancel={this.hideTimePicker}
      />
    );
    /*
    return (
      <View>
        <Text>{this.state.date.toString()}</Text>
        <Button title="Change duration" onPress={() => this.setState({showTimePicker: true})} />
        <DateTimePicker
          isVisible={this.state.showTimePicker}
          mode="time"
          date={this.state.date}
          onConfirm={(newdate) => this.setState({showTimePicker: false, date: newdate})}
          onCancel={() => this.setState({showTimePicker: false})}
        />
        <Text>{this.state.date.toString()}</Text>
      </View>
    );/
  }*/

  onChangeDuration = (text) => {
    try {
      let newDuration = Number(text);
      this.props.updateDuration(newDuration);
    } catch (error) {
      Alert.alert(`Error while updating duration: ${error}`);
      return;
    }
  };
}

const maxPlayerNameLength = 10;

// TODO this will be refactored out and changed once the interface for inputting duration is better.
const maxDurationTextLength = 10;

const playerFontSize = 18;
const playerFontColor = '#778899'; // Grey Slate - http://www.color-hex.com/color/778899

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 40,
    marginTop: 10,
  },
  durationTextInput: {
    width: 5,
    backgroundColor: 'rgba(52,52,52,0)',
    textAlign: 'center',
  },
  playerDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 6,
    marginLeft: 20,
  },
  playerTextInputView: {
    flexDirection: 'row',
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: playerFontColor,
  },
  playerTextInput: {
    fontSize: playerFontSize,
  },
  addPlayerButton: {
    backgroundColor: playerFontColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 33,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: playerFontColor,
    marginHorizontal: 10,
    padding: 5,
  },
  removePlayerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: playerFontColor,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: playerFontColor,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

// Not sure if I need this
//AppRegistry.registerComponent('Settings', () => Settings);
