import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { sendRegistrationNotification } from "@/utils/webhookEmailService";

interface User {
  fullName: string;
  email: string;
  password: string;
  gradeLevel: string;
  confidenceLevel: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: Omit<User, "password"> & { password: string }) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const register = async (data: User): Promise<boolean> => {
    // load existing users
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === data.email)) {
      return false; // duplicate
    }
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(data));
    setUser(data);
    // notify Discord
    await sendRegistrationNotification({
      fullName: data.fullName,
      email: data.email,
      gradeLevel: data.gradeLevel,
      confidenceLevel: data.confidenceLevel,
    });
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    localStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
