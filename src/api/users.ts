import axios from '../lib/axios';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  agencyId?: number;

}
interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<{ token: string, user: object }> => {
    console.log('login data', data);
  const response = await axios.post('/auth/login', data);
  return response.data;
};


export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>('/users'); 
  return response.data;
};
