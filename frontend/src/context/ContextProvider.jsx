import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useState } from 'react'


const AuthContext = createContext();


const ContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (user) => {

    setUser(user);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");

  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;                // ⛔ don’t ping server if no token

      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        if (err.response?.status === 403) logout(); // force clear on bad token
        console.error("User verification error:", err.response?.data || err);
      }
    };

    verifyUser();
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
export default ContextProvider