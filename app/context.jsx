"use client";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [role, setRole] = useState("");
  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useGlobal = () => {
  return useContext(AppContext);
};

export default AppProvider;
