import React from "react";
export const AuthContext = React.createContext({
    loading:false, 
    setLoading:()=>{}, 
    user:{name:'', photo:'', email:'', token:'', token_type:'Bearer', id:''}, 
    setUser:()=>{}, 
    logOut:()=>{},
    assets:{background:'#111', text:'#fff', image:'', iconName:'', iconFamily:''}
});

