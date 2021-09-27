import React, { useContext, useState } from "react";
import { contentContextApiProps } from "../types";

const contentContext = React.createContext("issues");
export const contentContextUpdate = React.createContext((newValue:string) => {return;})

export function useContentContext(){
    return useContext(contentContext)
}

export function ContentProvider(children: contentContextApiProps){
    const [content, setContent] = useState("issues")
    function setContentContext(newValue:string){
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