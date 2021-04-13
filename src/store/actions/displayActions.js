import * as actionTypes from './actionTypes';

export const collapsedToggle= ()=>{
    return{
        type:actionTypes.COLLAPSED_TOGGLE
    }
};

export const collapsedFalse= ()=>{
    return{
        type:actionTypes.COLLAPSED_FALSE
        
    }
};


export const showCard = ()=>{
    return {
        type:actionTypes.SHOW_CARD
    }

}




