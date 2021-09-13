import { createStore, applyMiddleware } from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducers from './reducers'; 
const middleware = [];

const enhancers = [applyMiddleware(...middleware)];

const store = createStore(rootReducers,);


export default store;