import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchUsers } from 'src/api/users';

import { login } from '../api/auth';



export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  agencyId?: number;

}

export const useLogin = () => useMutation({
    mutationFn: login,
    onSuccess: (data) => {
        const res: any = data;
        const { token , user} = res.data;
          console.log('Login successful:', token, user);

      localStorage.setItem('token', token);
      localStorage.setItem('data', JSON.stringify(user));
      // Optionally redirect or trigger toast
      window.location.href = '/';
    },
    onError: (error: any) => {
      // Optionally handle errors globally or via toast
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    },
  });



export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
});
