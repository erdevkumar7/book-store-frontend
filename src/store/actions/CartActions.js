export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_BILLING_DETAILS = 'SET_BILLING_DETAILS';
export const SET_SHIPPING_DETAILS = 'SET_SHIPPING_DETAILS';
export const INCREASE_PRODUCT = 'INCREASE_PRODUCT';
export const DECREASE_PRODUCT = 'DECREASE_PRODUCT' 

// add to cart
export const addToCart = (productDetail) =>({
    type: ADD_PRODUCT,
    payload: productDetail,
})

export const setBillingDetails = (details) => ({
  type: SET_BILLING_DETAILS,
  payload: details,
});

export const setShippingDetails = (details) => ({
  type: SET_SHIPPING_DETAILS,
  payload: details,
});

// increament and decreament
export const increment = (counterId) => {
  return {
    type: 'INCREMENT',
    payload: {
      counterId,
    },
  };
};

export const decrement = (counterId) => {
  return {
    type: 'DECREMENT',
    payload: {
      counterId,
    },
  };
};

// card detail 
export const setCardDetails = (details) => {
  return {
    type: 'SET_CARD_DETAILS',
    payload: details,
  };
};

