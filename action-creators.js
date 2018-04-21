/**
 * Redux action creators.
 */

// TODO need to add an action for AddPlayer and update the settings view

export const Actions = {
  saveSettings: 'SAVE_SETTINGS',
  cycleToNextPlayer: 'CYCLE_PLAYER',
  onTimerComplete: 'TIMER_COMPLETE',
};

 export const saveSettings = (duration) => ({
   type: Actions.saveSettings,
   duration: duration
 });

 export const cycleToNextPlayer = () => ({
   type: Actions.cycleToNextPlayer,
 });

export const onTimerComplete = () => ({
  type: Actions.onTimerComplete
});
