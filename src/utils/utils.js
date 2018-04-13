/* Utils */

// Get a random integer between min and max, inclusive max.
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Get the instrument keys and filter out other stuff, returns an array */
export function getInstrumentKeys(beat) {
	return Object.keys(beat).filter(key => key !== 'score' && key !== 'id' && key !== 'liked');
}
/* Counts instruments in an arbitrary beat object, returns an integer  */
export function getNoOfInstruments(beat) {
	return getInstrumentKeys(beat).length;
}
/* Maps a value from one range to another */
export function mapRange(x, inMin, inMax, outMin, outMax) {
  return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
// Calculates the time from when the user logged in to the time now
export function calculateLoginTime() {
  return (new Date().getTime() - localStorage.getItem('timer')) / 60000;
}
// Get center coordinates for a dom element
export function getCenterCoords(el) {
  const coords = {};
  coords.x = el.offsetLeft + (el.offsetWidth / 2);
  coords.y = el.offsetTop + (el.offsetHeight / 2);
  return coords;
};
