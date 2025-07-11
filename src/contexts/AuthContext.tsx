
import React, { createContext, useContext, useState, useEffect } from 'react';
import { sendRegistrationNotification } from '@/utils/discordNotificationService';

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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log('User restored from localStorage:', parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (userData: Omit<User, 'id' | 'joinedDate'> & { password: string }): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === userData.email)) {
        console.log('User already exists with email:', userData.email);
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
      console.log('New user registered:', newUser);
      
      // Send Discord notification
      const notificationSent = await sendRegistrationNotification({
        fullName: userData.fullName,
        email: userData.email,
        gradeLevel: userData.gradeLevel,
        confidenceLevel: userData.confidenceLevel
      });

      if (!notificationSent) {
        console.warn('Discord notification failed to send, but account was created');
      }
      
      // Auto-login after registration
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      console.log('User auto-logged in after registration');
      
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
        console.log('User logged in successfully:', userWithoutPassword);
        return true;
      }
      console.log('Login failed: Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
