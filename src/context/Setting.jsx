import React, { useState,useEffect } from "react";
import cookie from 'react-cookies';
import { useNavigate } from "react-router-dom";

export const SettingContext = React.createContext();

export default function Settings(props){
    const navigate = useNavigate()
    const [display,setDisplay]= useState(3)
    const [user,setUser]=useState(null)
    const [hideCompleted,setHideCompleted]= useState(false)
    const [sort,setSort]= useState('difficulty')
    const can = (props)=>{
        return user?.capabilities?.includes(props)
    }
    const signoutHandler = ()=>{
        setUser(null)
        cookie.remove('user')
        navigate('/signin')
    }
    const state = {
        display:display,
        hideCompleted : hideCompleted,
        sort:sort,
        user:user,
        can:can,
        setUser:setUser,
        setDisplay:setDisplay,
        setHideCompleted:setHideCompleted,
        setSort:setSort,
        signoutHandler:signoutHandler
    }
    useEffect(()=>{
        const me = cookie.load('user')
        if(me){
            setUser(me)
        }
    },[])
    return (
        <SettingContext.Provider value={state}>
            {props.children}
        </SettingContext.Provider>
    )
}