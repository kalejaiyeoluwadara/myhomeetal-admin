"use client";
import React, { useContext, useState, useEffect } from "react";
import { ApiRoutes } from "./api/apiRoute";

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [logout, setLogOut] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [role, setRole] = useState("");
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [createCat, setCreateCat] = useState(false);
  const [isCreateSubCategoryOpen, setIsCreateSubCategoryOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [clen, setClen] = useState(0);
  const [totalProd, setTotalProd] = useState(0);
  const [bulk, setBulk] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [token, setToken] = useState("");
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };
  const [userData, setUserData] = useState([
    {
      fullname: "",
      email: "",
      image: "",
    },
  ]);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ApiRoutes.BASE_URL}admin/get-admins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAdmins([]);
        throw new Error(
          `Failed to fetch admins: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setAdmins(data);
      setClen(data.length); // Update state with fetched data
    } catch (error) {
      setAdmins([]);
      console.error("An error occurred while fetching admins:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (msg, success) => {
    setIsModalOpen(true);
    setModalMessage(msg);
    setIsSuccessful(success);
  };

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    setToken(local_token);
  }, []);

  return (
    <AppContext.Provider
      value={{
        openModal,
        isCreateSubCategoryOpen,
        setIsCreateSubCategoryOpen,
        toBeDeleted,
        setToBeDeleted,
        role,
        categories,
        setRole,
        logout,
        setLogOut,
        addEmployee,
        setAddEmployee,
        createCat,
        setCreateCat,
        admins,
        setAdmins,
        setClen,
        clen,
        totalProd,
        setTotalProd,
        bulk,
        setBulk,
        loading,
        setLoading,
        error,
        fetchAdmins,
        userData,
        setUserData,
        token,
        modalMessage,
        isSuccessful,
        isModalOpen,
        setIsModalOpen,
        setModalMessage,
        setIsModalOpen,
        setIsSuccessful,
        isConfirmOpen,
        setIsConfirmOpen,
        formatNumberWithCommas,
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
