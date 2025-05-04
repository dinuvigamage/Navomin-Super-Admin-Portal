import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = (value) => {
    setUser(value);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setUser(undefined);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoggedIn, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using context
export const useUser = () => useContext(UserContext);
