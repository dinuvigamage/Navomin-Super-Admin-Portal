import { useState } from "react";

let globalUser = undefined;
let globalIsLoggedIn = false;

const GlobalVars = () => {
  const [user, setUser] = useState(globalUser);
  const [isLoggedIn, setIsLoggedIn] = useState(globalIsLoggedIn);

  const updateUser = (value) => {
    globalUser = value;
    globalIsLoggedIn = true;
    setUser(value);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    globalUser = undefined;
    globalIsLoggedIn = false;
    setUser(undefined);
    setIsLoggedIn(false);
  };

  return [user, updateUser, isLoggedIn, logoutUser];
};

export default GlobalVars;
