import React, { createContext, useState } from "react";

export const LoggedInUserContext = createContext(null);

export const LoggedInUserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Jane Doe", isLoggedIn: true });

  return (
    <LoggedInUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
