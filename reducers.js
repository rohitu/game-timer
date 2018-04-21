import { combineReducers } from 'redux';

import PlayerModel from './models/player.model';
import { Actions } from './action-creators';

/*
My state object will look like this:
- array of players
- isPaused
- isTimerCompleted
- shouldResetTimer

TODOs:
- Need to add isActive prop to player object
*/

const defaultNumberOfPlayers = 4;
//const defaultDuration = 30*60*1000; // 30 minutes
const defaultDuration = 6*1000; // for testing purposes

// Create the default players, with the first player being active.
let defaultPlayers = [];
for (let i = 1; i <= defaultNumberOfPlayers; i++) {
  defaultPlayers.push(new PlayerModel(i, defaultDuration, i === 1));
}

function players(previousPlayersState = defaultPlayers, action) {
  switch (action.type) {
    case Actions.cycleToNextPlayer:
      let clonedPlayers = previousPlayersState.map(p => p.clone());
      const activePlayerIndex = clonedPlayers.findIndex(p => p.isActive);
      const nextPlayerIndex = (activePlayerIndex + 1) % clonedPlayers.length;
      clonedPlayers[activePlayerIndex].isActive = false;
      clonedPlayers[nextPlayerIndex].isActive = true;
      return clonedPlayers;
    case Actions.updateDuration:
      return previousPlayersState.map(p => {
        let newPlayer = p.clone();
        newPlayer.timeDurationMs = action.duration;
        return newPlayer;
      });
    case Actions.renamePlayer:
      return previousPlayersState.map((p, index) => {
        let newPlayer = p.clone();
        if (index === action.playerIndex) {
          newPlayer.setName(action.newName);
        }
        return newPlayer;
      });
    case Actions.addNewPlayer:
      const lastPlayer = previousPlayersState[previousPlayersState.length-1];
      return previousPlayersState
        .map(p => p.clone())
        .concat([
          new PlayerModel(lastPlayer.number+1, lastPlayer.timeDurationMs)
        ])
    default:
      return previousPlayersState;
  }
}

function isPaused(previousPausedState = true, action) {
  switch (action.type) {
    default:
      return previousPausedState;
  }
}

function isTimerCompleted(previousTimerCompletedState = false, action) {
  switch (action.type) {
    default:
      return previousTimerCompletedState;
  }
}

function shouldResetTimer(previousResetTimerState = true, action) {
  switch (action.type) {
    default:
      return previousResetTimerState;
  }
}

const reducers = combineReducers({
  players,
  isPaused,
  isTimerCompleted,
  shouldResetTimer
});

export default reducers;
