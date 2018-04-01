import React from 'react';
import { StackNavigator } from 'react-navigation';

import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';

const App = StackNavigator({
  GameTimer: { screen: GameTimer },
  Settings: { screen: Settings }
});

export default App;
