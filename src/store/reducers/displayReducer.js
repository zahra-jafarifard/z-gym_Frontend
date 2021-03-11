import * as actionTypes from '../actions/actionTypes';

const initialState = {
    collapsed:false,
    showCard:true
}

const reducer = (state= initialState , action)=>{
    switch(action.type){
        
        case actionTypes.COLLAPSED_TOGGLE :
            return{
                ...state,
                collapsed:!state.collapsed
            };
        case actionTypes.COLLAPSED_FALSE :
            return{
                ...state,
                collapsed:false
            };
        case actionTypes.SHOW_CARD:
            return{
                ...state,
                // showCard:true
            };
        default :
        return state;
    }

}

export default reducer;