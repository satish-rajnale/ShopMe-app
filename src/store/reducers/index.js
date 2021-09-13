import { combineReducers } from 'redux';
import countReducer from './homeReducer';

const rootReducer = combineReducers({
  countReducer
});

export default rootReducer;