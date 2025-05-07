import { createContext, useContext, useState } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <authContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("Auth Context is not available");
  }

  return context;
}

export { useAuth, AuthProvider };
