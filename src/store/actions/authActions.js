import * as actionTypes from "./actionTypes";

export const login = (mobile, token, expTime) => {
  return {
    type: actionTypes.LOGIN,
    mobile: mobile,
    token: token,
    expirationTime: expTime,
  };
};

export const loginFailed = (err) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error: err,
  };
};

export const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    console.log('checkAuthTimeout' , new Date(expTime))
    setTimeout(() => {
      dispatch(Logout());
    }, expTime * 1000);
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
        console.log("response ", response);
        if (response.status === 422) {
          return response.json().then((res) => {
            console.log("reees redux", res.error);
            return dispatch(loginFailed(res.error[0].msg || res.error));
          });
        }
        if (!response.ok) {
          return response.json().then((res) => {
            return dispatch(loginFailed(res.error));
          });
        } else {
          return response.json();
        }
      })
      .then((res) => {
        const expirationTime = new Date(new Date().getTime() +360000000);
        // const expirationTime = new Date(2021, 3, 26, 13, 33, 30, 0);
        console.log("expirationTime redux", expirationTime);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            mobile: res.userMobile,
            token: res.token,
            isLoggedIn: !!res.token,
          })
        );
        localStorage.setItem(
          "expiresIn",
          JSON.stringify({
            expiresIn: expirationTime,
          })
        );

        dispatch(login(res.userMobile, res.token, expirationTime));
        dispatch(checkAuthTimeout(expirationTime));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const Logout = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("expiresIn");
  return {
    type: actionTypes.LOGOUT,
  };
};


export const authCheckState = () => {
  return (dispatch) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(userData){ 
      const token = userData.token;
      if (!token) {
      console.log("userDataLOcal toooooken redux", token);
      dispatch(Logout());
    } else {
      const expirationTime = JSON.parse(localStorage.getItem("expiresIn"));
      if (new Date(expirationTime.expiresIn) <= new Date()) {
        dispatch(Logout());
      } else {
        const remainingTime = parseInt(
          (new Date(expirationTime.expiresIn).getTime() -
            new Date().getTime()) /
            1000
        );
        console.log("remainingTime", remainingTime);
        dispatch(login(userData.mobile, userData.token, remainingTime));
        dispatch(checkAuthTimeout(remainingTime));
      }
    }
  }
  };
};
