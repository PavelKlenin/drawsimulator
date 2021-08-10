import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkCreator from 'redux-thunk';
import reducer from './reducer';

const reducers = combineReducers({reducer});
const store = createStore(reducers, applyMiddleware(thunkCreator));

export default store;

window.store = store;