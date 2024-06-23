"use client";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [logout, setLogOut] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [role, setRole] = useState("");
  const [createCat, setCreateCat] = useState(false);
  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        logout,
        setLogOut,
        addEmployee,
        setAddEmployee,
        createCat,
        setCreateCat,
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
