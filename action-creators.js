/**
 * Redux action creators.
 */

// TODO need to add an action for AddPlayer and update the settings view

export const Actions = {
  updateDuration: 'UPDATE_DURATION',
  renamePlayer: 'RENAME_PLAYER',
  addNewPlayer: 'ADD_PLAYER',
  cycleToNextPlayer: 'CYCLE_PLAYER',
  toggleTimer: 'TOGGLE_TIMER',
  resetTimer: 'RESET_TIMER',
  onTimerComplete: 'TIMER_COMPLETE',
};

export const updateDuration = (duration) => ({
  type: Actions.updateDuration,
  duration: duration,
});

export const renamePlayer = (newName, playerIndex) => ({
  type: Actions.renamePlayer,
  newName: newName,
  playerIndex: playerIndex,
});

export const addNewPlayer = () => ({
  type: Actions.addNewPlayer,
});

export const cycleToNextPlayer = () => ({
  type: Actions.cycleToNextPlayer,
});

export const toggleTimer = () => ({
  type: Actions.toggleTimer,
});

export const resetTimer = () => ({
  type: Actions.resetTimer,
});

export const onTimerComplete = () => ({
  type: Actions.onTimerComplete,
});
