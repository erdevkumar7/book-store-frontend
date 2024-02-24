export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});

export const loginUser = (userData) => ({
    type: LOGIN_USER,
    payload: userData,
});