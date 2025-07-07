
import React, { createContext, useContext, useState, useEffect } from 'react';
import { sendRegistrationEmail } from '@/utils/emailService';

interface User {
  id: string;
  fullName: string;
  email: string;
  gradeLevel: string;
  confidenceLevel: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'joinedDate'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (userData: Omit<User, 'id' | 'joinedDate'> & { password: string }): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === userData.email)) {
        return false; // User already exists
      }

      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        gradeLevel: userData.gradeLevel,
        confidenceLevel: userData.confidenceLevel,
        joinedDate: new Date().toISOString(),
        password: userData.password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Send registration email
      const emailSent = await sendRegistrationEmail({
        fullName: userData.fullName,
        email: userData.email,
        gradeLevel: userData.gradeLevel,
        confidenceLevel: userData.confidenceLevel
      });

      if (!emailSent) {
        console.warn('Registration email failed to send, but account was created');
      }
      
      // Auto-login after registration
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
