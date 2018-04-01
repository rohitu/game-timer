import React from 'react';
import { StackNavigator } from 'react-navigation';

import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';

/*const App = StackNavigator({
  GameTimer: { screen: GameTimer },
  Settings: { screen: Settings }
});

export default App;
*/

export default class App extends React.Component {
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
}
