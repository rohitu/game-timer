import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Alert, Button, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PlayerModel from './models/player.model';
import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';
import reducers from './reducers';

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

class PauseButton extends React.Component {
  render() {
    return (
      <Button
        title={"Pause"}
        onPress={() => {
          Alert.alert('button pressed');
        }}
      />
    );
  }
}

// Deciding to try out StackNavigator and hide it entirely rather than using a visible TabNavigator
const AppNavigator = StackNavigator({
  Timer: {
    screen: GameTimer,
    navigationOptions: {
      header: null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings'
    }
  }
});

/*const AppNavigator = TabNavigator({
  //Timer: { screen: GameTimerScreen },
  //Settings: { screen: SettingsScreen }
  Timer: { screen: GameTimer },
  Settings: { screen: Settings },
  //Pause: {screen: PauseButton}
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
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    )
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
);*/

//const foo = { foo: 1};
//const AppComponent = (<App screenProps={foo});
//export default App;

const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

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
