import React, { useState,useEffect } from "react";
export const SettingContext = React.createContext();
export default function Settings(props){
    const [display,setDisplay]= useState(3)
    const [hideCompleted,setHideCompleted]= useState(false)
    const [sort,setSort]= useState('difficulty')
    const state = {
        display:display,
        hideCompleted : hideCompleted,
        sort:sort,
        setDisplay:setDisplay,
        setHideCompleted:setHideCompleted,
        setSort:setSort,
    }
   

    return (
        <SettingContext.Provider value={state}>
            {props.children}
        </SettingContext.Provider>
    )
}