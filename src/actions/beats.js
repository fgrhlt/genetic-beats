/* eslint-disable import/prefer-default-export */

import { ADD_NEW_POPULATION, ADD_NEW_POPULATION_ERROR, SCORE_BEAT, UNSCORE_BEAT, RESET_BEATS, LIKE_BEAT_TOGGLE } from '../constants';
import database from '../database';

/* Adds a new population, newBeats is an array */
export function pressGenerateButton(newBeats, timelineIndex) {
  return dispatch => {
    const userRef = database.ref('/users');
    
    dispatch(addNewPopulation(newBeats));
    Promise.all([
      userRef.child('1').child('beats').push({
        timelineIndex,
        ...newBeats
      }),
      userRef.child('1').update({
        // + 2 since it is the next one, + 1 for human readable form
        noOfGenerations: timelineIndex + 2
      })
    ])
    .catch((error) => {
      console.log(error)
      dispatch(addNewPopulationError());
    });
  }
}
export function addNewPopulationError() {
  return {
    type: ADD_NEW_POPULATION_ERROR
  }
}
export function addNewPopulation(newBeats) {
  return {
    type: ADD_NEW_POPULATION,
		newBeats,
  };
}

export function scoreBeat(timelineIndex, index, score) {
  return {
    type: SCORE_BEAT,
		timelineIndex,
		index,
		score,
  };
}

export function likeBeatToggle(timelineIndex, index) {
  return {
    type: LIKE_BEAT_TOGGLE,
		timelineIndex,
		index,
  };
}

export function resetBeats() {
  return {
    type: RESET_BEATS,
  };
}
