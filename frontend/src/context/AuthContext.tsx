import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  User,
  UserRegistration,
  UserLogin,
  UserUpdate,
  AuthContextType,
} from '../types';
import { authAPI, userAPI } from '../services/api';

export type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const authStatus = await authAPI.checkAuth();
      if (authStatus.Authorized) {
        const userData = await userAPI.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserRegistration): Promise<void> => {
    try {
      setIsLoading(true);
      const newUser = await authAPI.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: UserLogin): Promise<void> => {
    try {
      setIsLoading(true);
      const loggedInUser = await authAPI.login(userData);
      setUser(loggedInUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (userData: UserUpdate): Promise<void> => {
    try {
      const updatedUser = await userAPI.updateUser(userData);
      setUser(updatedUser);
    } catch (error: any) {
      console.error('User update failed:', error);
      throw new Error(error.response?.data?.message || 'User update failed');
    }
  };

  const updateAvatar = async (file: File): Promise<void> => {
    try {
      const updatedUser = await userAPI.updateAvatar(file);
      setUser(updatedUser);
    } catch (error: any) {
      console.error('Avatar update failed:', error);
      throw new Error(error.response?.data?.message || 'Avatar update failed');
    }
  };

  const updateCover = async (file: File): Promise<void> => {
    try {
      const updatedUser = await userAPI.updateCover(file);
      setUser(updatedUser);
    } catch (error: any) {
      console.error('Cover update failed:', error);
      throw new Error(error.response?.data?.message || 'Cover update failed');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    checkAuth,
    updateUser,
    updateAvatar,
    updateCover,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
