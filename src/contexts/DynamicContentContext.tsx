import React, { useContext, useState } from "react";
import { ContextProviderProps } from "../types";

const contentContext = React.createContext("issues");
export const contentContextUpdate = React.createContext((newValue:string) => {return;})

export function useContentContext(){
    return useContext(contentContext);
}

export function ContentProvider(children: ContextProviderProps){
    //default value for sidebarView is issues
    const [content, setContent] = useState("issues")
    function setContentContext(newValue:string){
        localStorage.setItem('sidebarView', newValue);
        setContent(newValue);
    }
    return (
        <contentContext.Provider value={content}>
            <contentContextUpdate.Provider value={setContentContext}>
                {children.children}
            </contentContextUpdate.Provider>
        </contentContext.Provider>
    )
}