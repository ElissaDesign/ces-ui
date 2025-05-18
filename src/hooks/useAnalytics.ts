import { useQuery } from '@tanstack/react-query';

import { fetchAnalytics } from 'src/api/analytics';



export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  agencyId?: number;

}



export const useAnaytics = () => useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
});
