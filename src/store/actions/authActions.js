import * as actionTypes from "./actionTypes";

export const login = (mobile , token) => {
  return {
    type: actionTypes.LOGIN,
    mobile:mobile,
    token:token
  };
};
export const loginFailed = (err) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error:err
  };
};

export const asyncLogin = (mobile, password, rememberMe) => {
  return (dispatch) => {
    return fetch(process.env.REACT_APP_API_ADDRESS + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobile,
        password: password,
        rememberMe: rememberMe,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return dispatch(loginFailed("respone is not ok"));
        } else {
          return response.json();
        }
      })
      .then((res) => {
        console.log("user mobile redux", res.userMobile, "token redux", res.token);
        return dispatch(login(res.userMobile, res.token));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const asyncLogout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
