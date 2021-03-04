import * as actionTypes from './actionTypes';

export const login= (userName , token)=>{
    return{
        type:actionTypes.LOGIN,
        userName:userName,
        token:token
    }
};
export const loginFailed = (err)=>{
    return{
        type:actionTypes.LOGIN_FAILED,
        error:err
    }
};

export const asyncLogin = (userName , password ) =>{
    return (dispatch) =>{
        console.log(userName ,password);
        return fetch('http://localhost:5000/login' , {
        method:'POST' ,
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName,password})
        })
        .then(response => {
        // console.log('response', response);
        if (!response.ok){
            return dispatch(loginFailed('respone is not ok'));
        }else{
            return response.json()
            .then(res => {
                console.log('ressss', res);
                console.log('tooooken', res.token);
                return dispatch(login( res.user.userName  ,  res.token));
            });

         }
    })
    .catch(err =>{
        console.log('login faild action');
         dispatch(loginFailed(err));
    })
    }
}

export const logOut = ()=>{
    return {
        type:actionTypes.LOG_OUT,
        userName:'',
        token:null,
        isLoggedIn:false
    }

}

export const logoutFailed = (err)=>{
    return{
        type:actionTypes.LOG_OUT_FAILED,
        error:err
    }
};

export const asyncLogout = ()=>{
    return dispatch => {
         dispatch(logOut())
        // .then(res => {
        //     console.log('loOutAction' ,res);
        // })
        // .catch(err=>{
        //     console.log('logout failed');
        //     dispatch(logoutFailed(err));
        // })

    }
}