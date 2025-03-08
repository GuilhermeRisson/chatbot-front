import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const AuthService = {
  async signIn({ email, password }: SignInData) {
    try {
      const response = await api.post('http://localhost:9090/api/user/login', { email, password });
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signUp(data: SignUpData) {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('@App:token');
    delete api.defaults.headers['Authorization'];
  }
};

export default api
