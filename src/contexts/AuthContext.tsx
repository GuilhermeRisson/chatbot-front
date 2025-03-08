"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService, SignInData } from '../services/axiosInstance';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem('@App:token');
    if (token) {

    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await AuthService.signIn({ email, password });
      setUser(response.user);
      router.push('/admin'); 
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  function signOut() {
    AuthService.logout();
    setUser(null);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 