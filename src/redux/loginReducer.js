import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
        
        
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};