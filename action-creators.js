/**
 * Redux action creators.
 * This is essentially a list of all potential actions the user can make
 * (and thus also a list of all potential changes to our redux state).
 *
 * Note: This code is a bit verbose, but I kept it as-is, since this is
 * my first time working with redux and React, so I wanted to keep it
 * at a minimum and use the actual language to make sure I understood
 * everything before I restorted to using packages to reduce how much I
 * have to type.  It's fine to type more if it helps you learn :)
 */

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
