import axios from '../lib/axios';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<{ token: string, user: object }> => {
    console.log('login data', data);
  const response = await axios.post('/auth/login', data);
  return response.data;
};
