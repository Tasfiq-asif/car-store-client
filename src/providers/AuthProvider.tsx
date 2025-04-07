import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";

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

  // TODO: Implement actual authentication logic
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Add your authentication logic here
      setUser({ id: "1", email, name: "Test User" });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Add your signup logic here
      setUser({ id: "1", email, name });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Add your logout logic here
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // Add your session check logic here
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

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
