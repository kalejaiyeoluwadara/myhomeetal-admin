"use client";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [logout, setLogOut] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [role, setRole] = useState("");
  const [createCat, setCreateCat] = useState(false);
  const [admins, setAdmins] = useState();
  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/admin/get-admins",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch admins: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      console.log(data);
      setAdmins(data);
    } catch (error) {
      console.error("An error occurred while fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
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
