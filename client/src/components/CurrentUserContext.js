import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
  let previouslyLogged = null;

  if (localStorage.getItem("user")) {
    previouslyLogged = JSON.parse(localStorage.getItem("user"));
  }

  const [currentUser, setCurrentUser] = useState(previouslyLogged);

  localStorage.setItem("user", JSON.stringify(currentUser));

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
