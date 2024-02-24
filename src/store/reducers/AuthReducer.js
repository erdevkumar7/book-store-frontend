import { REGISTER_USER, LOGIN_USER  } from '../actions/AuthAction';

const initialState = {
  users: [], // Store registered users
};

// Registration User
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

// Login Reducer
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: 
        return {
            ...state,
            users: [...state.users, action.payload]
        };
        default:
            return state;
    }
};



// import {
//     REGISTRATION_REQUEST,
//     REGISTRATION_SUCCESS,
//     REGISTRATION_FAIL,

//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,

//     FORGET_PASSWORD_REQUEST,
//     FORGET_PASSWORD_SUCCESS,
//     FORGET_PASSWORD_FAIL,

//     RESET_PASSWORD_REQUEST,
//     RESET_PASSWORD_SUCCESS,
//     RESET_PASSWORD_FAIL,

//     LOAD_USER_REQUEST,
//     LOAD_USER_SUCCESS,
//     LOAD_USER_FAIL,

//     LOGOUT_USER_SUCCESS,
//     CLEAR_ERROR
// } from "../constants/AuthConstant.js";


// // Registration User

// export const registrationUserRducer = (state = { userRegistration: [] }, action) => {

//     switch (action.type) {
//         case REGISTRATION_REQUEST:

//             return {
//                 loading: true,
//                 isAuthenticated: false
//             }

//         case REGISTRATION_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: true,
//                 userRegistration: action.payload
//             }

//         case REGISTRATION_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: false,
//                 userRegistration: null,
//                 error: action.payload
//             }

//         case CLEAR_ERROR:
//             return {
//                 ...state,
//                 error: null
//             }

//         default:
//             return state;
//     }
// }





