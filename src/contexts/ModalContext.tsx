import React, { useContext, useState } from "react";
import { contentContextApiProps } from "../types";

export const ModalContext = React.createContext("Description");
export const ModalUpdateContext = React.createContext((newDescription:string) => {return;});

export function useModal(){
    return useContext(ModalContext);
}

export function useModalUpdate() {
    console.log("inne i useModalContextUpdate")
    return useContext(ModalUpdateContext);
}
  
export function ModalProvider(children: contentContextApiProps){
    const [modal, setModal] = useState<string>("Description");

    function setModalContext(newValue:string){
        console.log("inne i setModalContext")
        setModal(newValue);
    }
    return (
        <ModalContext.Provider value={modal}>
            <ModalUpdateContext.Provider value={setModalContext}>
                {children.children}
            </ModalUpdateContext.Provider>
        </ModalContext.Provider>
    )
}