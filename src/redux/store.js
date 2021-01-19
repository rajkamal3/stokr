import Reducer from './reducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(Reducer, composeWithDevTools());

export default store;
