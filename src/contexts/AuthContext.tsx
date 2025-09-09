import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState({ user, loading: false });
      } catch (error) {
        console.error('Error loading user:', error);
        setState({ user: null, loading: false });
      }
    } else {
      setState({ user: null, loading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in production, this would be an API call
      if (email === 'admin@example.com' && password === 'admin') {
        const user: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        };
        setState({ user, loading: false });
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else if (email === 'user@example.com' && password === 'user') {
        const user: User = {
          id: '2',
          email: 'user@example.com',
          name: 'Regular User',
          role: 'user',
        };
        setState({ user, loading: false });
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Mock registration - in production, this would be an API call
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
      };
      setState({ user, loading: false });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setState({ user: null, loading: false });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      login,
      register,
      logout,
      loading: state.loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}