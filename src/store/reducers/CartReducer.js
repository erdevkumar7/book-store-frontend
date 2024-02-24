// reducers/cartReducer.js

import { ADD_PRODUCT, SET_BILLING_DETAILS, SET_SHIPPING_DETAILS } from "../actions/CartActions";

const initialState = {
    product: [], // Store cart state
};

// add to cart
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                product: [...state.product, action.payload],
            };
        default:
            return state;
    }
} 


const CartInitialState = {
  billingDetails: {},
  shippingDetails: {},
};

export const checkoutReducer = (state = CartInitialState, action) => {
  switch (action.type) {
    case SET_BILLING_DETAILS:
      return {
        ...state,
        billingDetails: action.payload,
      };
    case SET_SHIPPING_DETAILS:
      return {
        ...state,
        shippingDetails: action.payload,
      };
    default:
      return state;
  }
};


// increament and decreament
const initialState1 = {
  counters: {},
};

export const counterReducer = (state = initialState1, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.payload.counterId]: (state.counters[action.payload.counterId] || 0) + 1,
        },
      };
    case 'DECREMENT':
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.payload.counterId]: (state.counters[action.payload.counterId] || 1) - 1,
        },
      };
    default:
      return state;
  }
};


// Card detail reducer.js
const initialStateCard = {
  cardDetails: {},
};

export const cardReducer = (state = initialStateCard, action) => {
  switch (action.type) {
    case 'SET_CARD_DETAILS':
      return {
        ...state,
        cardDetails: action.payload,
      };
    default:
      return state;
  }
};




  