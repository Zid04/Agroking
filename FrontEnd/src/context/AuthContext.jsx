import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    role: null,
    isAuthenticated: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (token && storedRole && storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        role: storedRole,
        isAuthenticated: true,
      });
    }

    setLoading(false);
  }, []);

  const login = (token, userData, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuthState({
      user: userData,
      role: userRole,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setAuthState({
      user: null,
      role: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
