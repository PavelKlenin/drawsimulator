import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkCreator from 'redux-thunk';
import inputDataReducer from './inputDataReducer';
import errorReducer from './errorReducer';
import teamsReducer from './teamsReducer';

const reducers = combineReducers({inputDataReducer, errorReducer, teamsReducer});
const store = createStore(reducers, applyMiddleware(thunkCreator));

export default store;

window.store = store;