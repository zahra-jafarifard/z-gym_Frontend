import React from 'react';
const authContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:()=>{},
});

export default authContext;