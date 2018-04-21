import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Alert, View, Text } from 'react-native';

import PlayerModel from './models/player.model';
import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';
import Ionicons from 'react-native-vector-icons/Ionicons';

class GameTimerScreen extends React.Component {
  render() {
    //const players = this.props.navigation.state.params.players;//this.props.navigation.getParam('players', defaultPlayers);
    Alert.alert(''+allPlayers.length);
    return (
      <View style={{flex:1}}>
      <GameTimer
        players={allPlayers}
      />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    //const players = this.props.navigation.getParam('players', defaultPlayers);
    //const players = this.props.navigation.state.params.players;
    return (
      <Settings
        players={allPlayers}
        save={this.saveResults}
      />
    );
  }

  saveResults = (newPlayers) => {
    allPlayers = newPlayers;
    //this.props.navigation.navigate('Timer', {players: newPlayers});
    this.props.navigation.navigate('Timer');
  }
}

const defaultNumberOfPlayers = 4;
//const defaultDuration = 30*60*1000; // 30 minutes
const defaultDuration = 6*1000; // for testing purposes

let allPlayers = [];
for (let i = 1; i <= defaultNumberOfPlayers; i++) {
  allPlayers.push(new PlayerModel(i, defaultDuration));
}

const App = TabNavigator({
  Timer: { screen: GameTimerScreen },
  Settings: { screen: SettingsScreen }
},
{
  initialRouteParams: {
    players: allPlayers
  },
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
    inactiveTintColor: 'blue',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  showLabel: false,
}
);

//const foo = { foo: 1};
//const AppComponent = (<App screenProps={foo});
export default App;
/*export default class AppComponent extends React.Component {
  render() {
    return (<App screenProps={foo} />);
  }
}

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
