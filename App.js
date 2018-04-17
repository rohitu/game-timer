import React from 'react';

import GameTimer from './components/gametimer.component';

export default class App extends React.Component {
  render() {
    return (
      <GameTimer
        numberOfPlayers={defaultNumberOfPlayers}
        duration={defaultDuration}
      />
    );
  }
}

const defaultNumberOfPlayers = 4;
//const defaultDuration = 30*60*1000; // 30 minutes
const defaultDuration = 6*1000; // for testing purposes.
