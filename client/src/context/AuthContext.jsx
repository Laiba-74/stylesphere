// optional, for global user state
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const authorizationtoken = `Bearer ${token}`;

  const [user, setUser] = useState("");

  const isLoggedIn = !!token;
  const storeToken = (tokenstorage) => {
    setToken(tokenstorage);
    localStorage.setItem("token", tokenstorage);
  };

  const Logoutuser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // //fetch authenticate user
  const authenticateuser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Data: ", data.userData);
        setUser(data.userData);
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log("Error Fetching Authenticate  data..!", error);
    }
  };

  useEffect(() => {
    authenticateuser();
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        storeToken,
        isLoggedIn,
        Logoutuser,
        authenticateuser,
        user,
        setUser,
        authorizationtoken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const authContextvalue = useContext(AuthContext);
  if (!authContextvalue) {
    throw new Error("Auth Provider is not used in a main.jsx as parent..!");
  }
  return authContextvalue;
};
