import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ name: "me" });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
