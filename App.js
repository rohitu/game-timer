import React from 'react';
import { StackNavigator} from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import GameTimer from './components/gametimer.component';
import Settings from './components/settings.component';
import reducers from './reducers';

/**
 * Set-up a stack navigator to switch between the two screens.
 * Notes:
 *  - The Timer screen doesn't show any menu / nav bar and the
 *    Settings screen shows a default bar with a back button.
 *  - This keeps the stack from growing too large (each navigation is
 *    just a back navigation), and state is saved via redux integration.
 *  - It also works well with Android's default back button as well.
 */
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

// Set-up the redux store with all of my reducers.
const store = createStore(reducers);

// The main app is just the stack navigator wrapped with the redux Provider.
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
