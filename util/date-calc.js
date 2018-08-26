/**
 * Converts hours, minutes, and seconds to a total number of milliseconds.
 * Does type-checks and exports a single millisecond value.
 * If bad values are passed in, this assumes a value of 0 for it and calculates the milliseconds.
 */
export function hmsToMilliseconds(hours, minutes, seconds) {
  if (!isValidNumber(hours)) hours = 0;
  if (!isValidNumber(minutes)) minutes = 0;
  if (!isValidNumber(seconds)) seconds = 0;

  return hours * 60 * 60 * 1000
    + minutes * 60 * 1000
    + seconds * 1000;
}

/**
 * Converts a millisecond value to an object containing 'hours', 'minutes',
 * and 'seconds'.
 * If a bad value is passed in, this returns null;
 */
export function millisecondsToHms(milliseconds) {
  if (!isValidNumber(milliseconds)) return null;

  const hours = Math.floor(milliseconds / (60*60*1000));
  milliseconds = milliseconds % (60*60*1000);
  const minutes = Math.floor(milliseconds / (60*1000));
  milliseconds = milliseconds % (60*1000);
  const seconds = Math.floor(milliseconds / (1000));

  return { hours, minutes, seconds };
}

function isValidNumber(num) {
  return typeof(num) === 'number' && !isNaN(num);
}
