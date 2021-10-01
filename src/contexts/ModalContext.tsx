import React, { useContext, useState } from "react";
import { contentContextApiProps, modalContext } from "../types";

const defaultModalContent:modalContext = {description: "", issueNumber: -1, modalState: false}
export const ModalContext = React.createContext(defaultModalContent);
export const ModalUpdateContext = React.createContext((newDescription:string, newIssueNumber:number, newModalState:boolean) => {return;});

export function useModal(){
    return useContext(ModalContext);
}

export function useModalUpdate() {
    return useContext(ModalUpdateContext);
}
  
export function ModalProvider(children: contentContextApiProps){
    const [modal, setModal] = useState<modalContext>(defaultModalContent);

    function setModalContext(newDescription:string, newIssueNumber:number, newModalState:boolean){
        setModal({
            description: newDescription,
            issueNumber: newIssueNumber,
            modalState: newModalState});
    }
    return (
        <ModalContext.Provider value={modal}>
            <ModalUpdateContext.Provider value={setModalContext}>
                {children.children}
            </ModalUpdateContext.Provider>
        </ModalContext.Provider>
    )
}