import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkCreator from 'redux-thunk';
import inputDataReducer from './inputDataReducer';
import errorReducer from './errorReducer';
import teamsReducer from './teamsReducer';
import tooltipReducer from './tooltipReducer';


const reducers = combineReducers({inputDataReducer, errorReducer, teamsReducer, tooltipReducer});
const store = createStore(reducers, applyMiddleware(thunkCreator));

export default store;

window.store = store;