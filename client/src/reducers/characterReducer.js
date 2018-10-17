import {
  CHARACTER_LOADING,
  DELETE_CHARACTER,
  GET_CHARACTERS,
  GET_CHARACTER
} from '../actions/action-types';

const initialState = {
  character: {},
  characters: [],
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
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(character => character._id !== action.payload)
      };
    default:
      return state;
  }
}
