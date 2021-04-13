import React from 'react';
const authContext = React.createContext({
    token:'',
    authenticated:false,
    login:()=>{}
});

export default authContext;