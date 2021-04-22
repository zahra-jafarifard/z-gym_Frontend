import * as actionTypes from "./actionTypes";

export const login = (mobile , token , expirationTime) => {
  return {
    type: actionTypes.LOGIN,
    mobile:mobile,
    token:token,
    expirationTime:expirationTime
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
        console.log("response ", response);
        if (response.status === 422){
          return response.json()
          .then(res=>{
            console.log('reees redux' , res.error)
            return dispatch(loginFailed(res.error[0].msg || res.error));
          })
        } 
        if (!response.ok) {
          return response.json()
          .then(res=>{
            return dispatch(loginFailed(res.error));
          })
        } else {
          return response.json()
        }
      })
      .then((res) => {
        const expirationTime = new Date(new Date().getTime()+7200000)
        console.log('expirationTime redux' , expirationTime)

        localStorage.setItem('userData' , JSON.stringify({
        mobile:res.userMobile , token : res.token , isLoggedIn:(!(!res.token))
        }));
        localStorage.setItem('expiresIn' , JSON.stringify({
          expiresIn:expirationTime
        }));
        
         dispatch(login(res.userMobile, res.token , expirationTime));
         dispatch(checkAuthTimeout(expirationTime));

      })
      .catch((e) => {
        console.log(e);
      });
  };
};




export const asyncLogout = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('expiresIn');
  return {
    type: actionTypes.LOGOUT,
  };
};




export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    // console.log('checkAuthTimeout' , new Date(expirationTime))
    setTimeout(()=>{
      dispatch(asyncLogout());
    } , expirationTime*1000)
  }
};

export const authCheckState = () => {
  return (dispatch)=> {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log('userDataLOcal redux',userData)
    const token = userData.token;
    if (!token){
      dispatch(asyncLogout())
    }
    else {
    const expirationTime = JSON.parse(localStorage.getItem('expiresIn'));
    if (new Date(expirationTime.expiresIn) <= new Date()){
      dispatch(asyncLogout())
    }else{
      const remainingTime= parseInt((new Date(expirationTime.expiresIn).getTime() - new Date().getTime()) / 1000 ); 
      console.log('remainingTime',remainingTime)
      dispatch(login(userData.mobile, userData.token , remainingTime));
      dispatch(checkAuthTimeout(remainingTime));

    }

    }
  };

  
};


