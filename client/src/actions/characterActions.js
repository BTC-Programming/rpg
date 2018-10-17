import axios from 'axios';

import {
  CHARACTER_LOADING,
  DELETE_CHARACTER,
  GET_CHARACTER,
  GET_CHARACTERS,
  GET_ERRORS
} from './action-types';

// Characters loading
export const setCharacterLoading = () => {
  return {
    type: CHARACTER_LOADING
  };
};

// Create new character
export const createCharacter = (characterData, propsHistory) => (dispatch) => {
  axios.post('/api/characters', characterData)
    .then(res => propsHistory.push('/home'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// Get a character
export const getCharacter = (id) => (dispatch) => {
  dispatch(setCharacterLoading());
  axios.get(`/api/characters/${id}`)
    .then(res => dispatch({
      type: GET_CHARACTER,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_CHARACTER,
      payload: null
    }));
};

// Get player's characters
export const getCharacters = () => (dispatch) => {
  dispatch(setCharacterLoading());
  axios.get('/api/characters')
    .then(res => dispatch({
        type: GET_CHARACTERS,
        payload: res.data
      }))
    .catch(err => dispatch({
        type: GET_CHARACTERS,
        payload: []
      }));
};

// Delete a user's character
export const deleteCharacter = (id) => (dispatch) => {
  axios.delete(`/api/characters/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CHARACTER,
        payload: id
      })
    )
    .catch(err => {
      console.log('delete err:', err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};
