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

  const signIn = async (data: SignInData) => {
    try {
      const response = await AuthService.signIn(data);
      const { token, user } = response.data;

      // Salva o token no cookie de forma segura
      document.cookie = `jwt=${token}; path=/; secure; samesite=strict`;
      
      setUser(user);
      router.push('/admin');
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const signOut = () => {
    // Remove o token do cookie ao fazer logout
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 