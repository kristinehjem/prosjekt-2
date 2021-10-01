import React, { ReactNode, useContext, useState } from "react";
import { ContextProviderProps } from "../types"

// Source: https://www.youtube.com/watch?v=5LrDIWkK_Bc&t=637s

const DateIntervallContext = React.createContext([0, 0]);
const DateIntervallUpdateContext = React.createContext(
  (start: number, end: number) => {
    return;
  }
);

export function useDateIntevall() {
  return useContext(DateIntervallContext);
}

export function useDateIntervallUpdate() {
  return useContext(DateIntervallUpdateContext);
}

export function DateIntervallProvider(children: ContextProviderProps) {
  const [dateIntervall, changeDateIntervall] = useState<number[]>([0, 10]);

  function setDateIntervall(start: number, end: number) {
    changeDateIntervall([start, end]);
  }

  return (
    <DateIntervallContext.Provider value={dateIntervall}>
      <DateIntervallUpdateContext.Provider value={setDateIntervall}>
        {children.children}
      </DateIntervallUpdateContext.Provider>
    </DateIntervallContext.Provider>
  );
}
