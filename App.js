import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';
import Ionicons from 'react-native-vector-icons/Ionicons';

/*const App = StackNavigator({
  GameTimer: { screen: GameTimer },
  Settings: { screen: Settings }
});

export default App;
*/

class GameTimerScreen extends React.Component {
  /*static navigationOptions = {
    tabBarIcon: <Ionicons name="ios-options-outline" size={25} color="gray" />
    //tabBarComponent: TabBarBottom,
    //tabBarPosition: 'bottom',
    //animationEnabled: true,
    //swipeEnabled: false
  };*/
  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: 4,
      duration: 6*1000
    }
  }

  render() {
    return (
      <GameTimer
        numberOfPlayers={this.state.numberOfPlayers}
        duration={this.state.duration}
      />
    );
  }
}

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: 4,
      duration: 6*1000
    }
  }

  render() {
    return (
      <Settings
        numberOfPlayers={this.state.numberOfPlayers}
        duration={this.state.duration}
      />
    );
  }
}

const App = TabNavigator({
  GameTimer: { screen: GameTimerScreen },
  Settings: { screen: SettingsScreen }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      /*if (routeName === 'GameTimer') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }*/
      if (!focused) return;;
      if (routeName === 'GameTimer') {
        iconName = `ios-options-outline`;
      } else if (routeName === 'Settings') {
        iconName = `ios-information-circle-outline`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
    //tabBarVisible: false
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
