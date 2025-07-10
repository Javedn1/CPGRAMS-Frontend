import React, { createContext, useContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileee, setProfileee] = useState([]);

  const userProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log("profile context", user);
      setProfileee(user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <userContext.Provider value={{ profileee }}>
      {children}
    </userContext.Provider>
  );
};

export const useProfile = () => useContext(userContext);
