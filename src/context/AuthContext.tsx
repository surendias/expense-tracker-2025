"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a token stored in localStorage/sessionStorage
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token); // Store the token in localStorage
    setAuthenticated(true); // Update authentication state
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setAuthenticated(false); // Update authentication state
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
