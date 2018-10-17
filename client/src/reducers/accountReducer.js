import {
  ACCOUNT_LOADING,
  CLEAR_ACCOUNT,
  GET_ACCOUNT
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
      };
    case GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
