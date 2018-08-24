import { combineReducers } from 'redux';

import PlayerModel from './models/player.model';
import { Actions } from './action-creators';

/**
 * The reducers in this file map 1:1 with the items in the redux state store.
 * Each function maps exactly to the property in the app's state.
 * Default values are also defined here, since reducers are responsible
 * for the initial state of the store.
 *
 * Note for future changes:
 * Don't forget that reducers MUST be state-less.  They MUST be pure functions
 * with absolutely no side-effects.  You can't change the previous state.  You
 * have to re-create arrays and objects that you use.
 * https://redux.js.org/basics/reducers
 *
 * The shape of my 'state':
 * - players: Array<PlayerModel>
 * - isPaused: boolean
 * - isTimerCompleted: boolean
 * - shouldResetTimer: boolean
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
  let clonedPlayers;
  switch (action.type) {
    // When cycling to the next player, copy the previous 'players' array,
    // update the previous current player to inactive, and set next player
    // to active.
    case Actions.cycleToNextPlayer:
      clonedPlayers = previousPlayersState.map(p => p.clone());
      const activePlayerIndex = clonedPlayers.findIndex(p => p.isActive);
      const nextPlayerIndex = (activePlayerIndex + 1) % clonedPlayers.length;
      clonedPlayers[activePlayerIndex].isActive = false;
      clonedPlayers[nextPlayerIndex].isActive = true;
      return clonedPlayers;

    // When updating the duration, make sure all players now have the new
    // duration.
    // I expect that action.duration has hours, minutes, seconds String properties
    // that are passed directly to moment.duration
    case Actions.updateDuration:
      // TODO this makes an assumption that if a string value is passed in, then it's a valid number.
      // I should fix that.
      // TODO write yourself a convert utility function that converts HMS to milliseconds and
      // returns false/undefined if it's not a valid option (but beware that 0 is falsy)
      if(!action.duration.hours || !action.duration.minutes || !action.duration.seconds)
      {
        return previousPlayersState;
      }

      const newHrs = parseInt(action.duration.hours);
      const newMins = parseInt(action.duration.minutes);
      const newSecs = parseInt(action.duration.seconds);

      const newDuration = newHrs * 60 * 60 * 1000
        + newMins * 60 * 1000
        + newSecs * 1000;
      return previousPlayersState.map(p => {
        let newPlayer = p.clone();
        newPlayer.timeDurationMs = newDuration;
        return newPlayer;
      });

    // When renaming a player, clone all players and update the name for the
    // player at the selected index.
    case Actions.renamePlayer:
      return previousPlayersState.map((p, index) => {
        let newPlayer = p.clone();
        if (index === action.playerIndex) {
          newPlayer.setName(action.newName);
        }
        return newPlayer;
      });

    // When adding a new player, clone all current players and append a new
    // player that has the same duration as the last player.
    case Actions.addNewPlayer:
      const lastPlayer = previousPlayersState[previousPlayersState.length-1];
      return previousPlayersState
        .map(p => p.clone())
        .concat([
          new PlayerModel(lastPlayer.number+1, lastPlayer.timeDurationMs)
        ]);

    // Filter the player to remove.
    case Actions.removePlayer:
      return previousPlayersState
        .filter((p, index) => action.playerIndex !== index);

    // For all other actions, don't change 'state.players'.
    default:
      return previousPlayersState;
  }
}

function isPaused(previousPausedState = true, action) {
  switch (action.type) {
    // When the user toggles the play/pause button, toggle isPaused
    case Actions.toggleTimer:
      return !previousPausedState;

    // If the timer is reset or completed, then automatically pause.
    case Actions.resetTimer:
    case Actions.onTimerComplete:
      return true;

    // For all other actions, don't change 'state.isPaused'.
    default:
      return previousPausedState;
  }
}

function isTimerCompleted(previousTimerCompletedState = false, action) {
  switch (action.type) {
    // Reset the value of isTimerCompleted if the user resets the timer.
    // This is necessary so that the reset button works properly once
    // the timer completely runs out.
    case Actions.resetTimer:
      return false;

    // When any timer is complete, return true so that all timers stop running.
    case Actions.onTimerComplete:
      return true;

    // For all other actions, don't change 'state.isTimerCompleted'.
    default:
      return previousTimerCompletedState;
  }
}

function shouldResetTimer(previousResetTimerState = true, action) {
  switch (action.type) {
    // Whenever the user changes something in the settings (e.g. duration
    // is changed, a new player is added, etc., or if the user decides
    // to press the reset button to reset the timer, set this to true).
    // The former is needed to handle cases where some timers have run, but
    // duration has been updated, so all timers should reset to the new value.
    case Actions.updateDuration:
    case Actions.addNewPlayer:
    case Actions.resetTimer:
      return true;
      return true;

    // If the timer runs out, or if the user hits pause/play, return false.
    // This is to make sure the value doesn't get stuck as 'true' after the
    // user updates duration or performs one of the other actions above.
    case Actions.onTimerComplete:
    case Actions.toggleTimer:
      return false;

    // For all other actions, don't change 'state.isTimerCompleted'.
    default:
      return previousResetTimerState;
  }
}

// Combine all the reducers into one. This should match 1:1 with the
// properties in the state.
const reducers = combineReducers({
  players,
  isPaused,
  isTimerCompleted,
  shouldResetTimer,
});

export default reducers;
