/* Utils */

// Get a random integer between min and max, inclusive max.
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Get the instrument keys and filter out other stuff, returns an array */
export function getInstrumentKeys(beats) {
	return Object.keys(beats[0]).filter(key => key !== 'score' && key !== 'id');
}
/* Counts instruments in an arbitrary beat object, returns an integer  */
export function getNoOfInstruments(beats) {
	return getInstrumentKeys(beats).length;
}
