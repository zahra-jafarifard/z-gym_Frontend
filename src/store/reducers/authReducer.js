import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  token: "",
  mobile: "",
  error: null,
  expirationTime:''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: !(!action.token),
        error: null,
        token:action.token,
        mobile:action.mobile,
        expirationTime:action.expirationTime
        
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        mobile: "",
        token: "",
        error:action.error
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        mobile: "",
        token: "",
        error: "",
        expirationTime:''
      };

    default:
      return state;
  }
};

export default AuthReducer;
