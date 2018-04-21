/**
 * Redux action creators.
 */

// TODO need to add an action for AddPlayer and update the settings view
 export const saveSettings = (duration) => ({
   type: 'SAVE_SETTINGS',
   duration: duration
 });

 export const cycleToNextPlayer = () => ({
   type: 'CYCLE_PLAYER'
 });

export const onTimerComplete = () => ({
  type: 'TIMER_COMPLETE'
});
