import axios from 'axios';

import {
  ACCOUNT_LOADING,
  CLEAR_ACCOUNT,
  DELETE_CHARACTER,
  GET_ACCOUNT,
  GET_ERRORS
} from './action-types';

// Create user account
export const createAccount = (accountData, propsHistory) => (dispatch) => {
  axios.post('/api/account', accountData)
    .then(res => propsHistory.push('/home'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Edit user account
export const editAccount = (accountData, propsHistory) => (dispatch) => {
  axios.post('/api/account/edit', accountData)
    .then(res => propsHistory.push('/home'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Get user account
export const getUserAccount = () => (dispatch) => {
  dispatch(setAccountLoading());
  axios.get('/api/account')
    .then(res => dispatch({
      type: GET_ACCOUNT,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ACCOUNT,
      payload: {}
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

// The account is loading.
export const setAccountLoading = () => {
  return {
    type: ACCOUNT_LOADING
  };
};

// Clear out account data
export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT
  };
};
