import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";
import { signIn, signUp } from "../lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You can add token validation here if needed
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signIn({ email, password });
      if (response.token && response.data) {
        localStorage.setItem("token", response.token);
        const userData: User = {
          email: response.data.email,
          name: response.data.name,
          role: response.data.role as "user" | "admin",
          userStatus: response.data.userStatus as "active" | "inactive",
        };
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/"; // Force reload to home page
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await signUp({ email, password, name });
      if (response.token && response.data) {
        localStorage.setItem("token", response.token);
        const userData: User = {
          email: response.data.email,
          name: response.data.name,
          role: response.data.role as "user" | "admin",
          userStatus: response.data.userStatus as "active" | "inactive",
        };
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
