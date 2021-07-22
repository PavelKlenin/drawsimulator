import { combineReducers, createStore } from "redux";
import generalReducer from './generalReducer';

const reducers = combineReducers({generalReducer});
const store = createStore(reducers);

export default store;