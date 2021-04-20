import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  token: "",
  mobile: "",
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: !(!action.token),
        error: null,
        token:action.token,
        mobile:action.mobile
        
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
        error: ""
      };

    default:
      return state;
  }
};

export default AuthReducer;
