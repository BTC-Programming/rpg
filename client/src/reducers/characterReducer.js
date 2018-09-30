import {
  CHARACTER_LOADING,
  GET_CHARACTERS,
  GET_CHARACTER
} from '../actions/action-types';

const initialState = {
  character: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHARACTER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        loading: false
      };
    case GET_CHARACTER:
      return {
        ...state,
        character: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
