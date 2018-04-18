import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Alert } from 'react-native';

import PlayerModel from './models/player.model';
import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';
import Ionicons from 'react-native-vector-icons/Ionicons';

/*const App = StackNavigator({
  GameTimer: { screen: GameTimer },
  Settings: { screen: Settings }
});

export default App;
*/
const defaultNumberOfPlayers = 4;
const defaultDuration = 6*1000;
let defaultPlayers = [];
for (let i = 1; i <= defaultNumberOfPlayers; i++) {
  defaultPlayers.push(new PlayerModel(i, defaultDuration));
}

class GameTimerScreen extends React.Component {
  /*static navigationOptions = {
    tabBarIcon: <Ionicons name="ios-options-outline" size={25} color="gray" />
    //tabBarComponent: TabBarBottom,
    //tabBarPosition: 'bottom',
    //animationEnabled: true,
    //swipeEnabled: false
  };*/

  render() {
    const players = this.props.navigation.getParam('players', defaultPlayers);
    //Alert.alert(`num: ${numPlayers}, duration: ${duration}`);
    return (
      <GameTimer
        players={players}
      />
    );
  }
}

class SettingsScreen extends React.Component {

  render() {
    const players = this.props.navigation.getParam('players', defaultPlayers);
    return (
      <Settings
        players={players}
        save={this.saveResults}
      />
    );
  }

  saveResults = (newPlayers) => {
    //Alert.alert(`num: ${numPlayers}, duration: ${duration}`);
    //this.props.navigation.navigate('Timer', {numberOfPlayers: numPlayers, duration: duration});
    //players = newPlayers;
    this.props.navigation.navigate('Timer', {players: newPlayers});
  }
}

const App = TabNavigator({
  Timer: { screen: GameTimerScreen },
  Settings: { screen: SettingsScreen }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Timer') {
        iconName = `ios-alarm${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  showLabel: false,
}
);

export default App;

/*export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: true,
      numberOfPlayers: 4,
      duration: 6*1000
    }
  }

  render() {
    if (this.state.showTimer) {
      return (
        <GameTimer
          numberOfPlayers={this.state.numberOfPlayers}
          duration={this.state.duration}
          hideCallback={this.hideGameTimer}
        />
      );
    }

    return (
      <Settings
        numberOfPlayers={this.state.numberOfPlayers}
        duration={this.state.duration}
        hideCallback={this.showGameTimer}
      />
    );
  }

  hideGameTimer = () => {
    this.setState({
      showTimer: false
    });
  };

  showGameTimer = (newNumPlayers, newDuration) => {
    this.setState({
      showTimer: true,
      numberOfPlayers: newNumPlayers,
      duration: newDuration
    });
  };
}*/
