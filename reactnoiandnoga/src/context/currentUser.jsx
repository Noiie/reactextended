import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  console.log("currentUser: ", currentUser);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
