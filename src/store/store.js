// store.js

import { createStore, combineReducers } from 'redux';
import {  registrationReducer, loginReducer } from './reducers/AuthReducer';
import { cartReducer, checkoutReducer, counterReducer, cardReducer } from './reducers/CartReducer';

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  addProduct: cartReducer,
  checkout: checkoutReducer,
  counter: counterReducer,
  card: cardReducer,

});

const store = createStore(rootReducer);

export default store;
