import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import authReducer from './authReducer';
import characterReducer from './characterReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  account: accountReducer,
  auth: authReducer,
  character: characterReducer,
  errors: errorReducer,
});
