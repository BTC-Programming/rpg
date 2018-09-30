import {
  ACCOUNT_LOADING,
  CLEAR_ACCOUNT,
  GET_ACCOUNT,
  DELETE_CHARACTER
} from '../actions/action-types';

const initialState = {
  account: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        account: null
      }
    case GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        loading: false
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: state.account.characters.filter(character => character._id !== action.payload)
      };
    default:
      return state;
  }
}
