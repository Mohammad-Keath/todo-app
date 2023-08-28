import React from "react";
export const SettingContext = React.createContext();
export default function Settings(props){
    const state = {
        display:3,
        hideCompleted : false,
        difficulty:3,
    }
    return (
        <SettingContext.Provider value={state}>
            {props.children}
        </SettingContext.Provider>
    )
}