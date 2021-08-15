import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkCreator from 'redux-thunk';
import reducer from './reducer';
import validation from './validation';

const reducers = combineReducers({reducer, validation});
const store = createStore(reducers, applyMiddleware(thunkCreator));

export default store;

window.store = store;