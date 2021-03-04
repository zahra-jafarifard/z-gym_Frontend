import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userName:'',
    isLoggedIn:false,
    token:null,
    error:''
}

const reducer = (state= initialState , action)=>{
    switch(action.type){
        
        case actionTypes.LOGIN :
            return{
                ...state,
                userName:action.userName,
                token:action.token,
                isLoggedIn:true,
                error:''
            };
        case actionTypes.LOGIN_FAILED:
            return{
                ...state,
                isLoggedIn:false,
                error : 'LOGIN_FAILED Recucer...'
            };
        case actionTypes.LOG_OUT :
            return{
                ...state,
                userName:'',
                token:'',
                isLoggedIn:false,
                error:''
            }
        case actionTypes.LOG_OUT_FAILED :
            return{
                ...state,
                userName:'',
                token:'',
                isLoggedIn:false,
                error:'LOGOUT_FAILED Recucer...'
            }
        default :
        return state;
    }

}

export default reducer;