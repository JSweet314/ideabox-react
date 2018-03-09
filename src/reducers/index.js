import { combineReducers } from 'redux';
import IdeasReducer from './reducerIdeas.js';

const allReducers = combineReducers({
  ideas: IdeasReducer
});

export default allReducers;