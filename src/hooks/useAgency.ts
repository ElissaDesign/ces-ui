import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchAgencies, addAgency } from 'src/api/agency';




export const useAddAgency = () => useMutation({
  mutationFn: addAgency,
  onSuccess: () => {
    toast.success('Tag created successfully!');
  },
  onError: (error: any) => {
    toast.error(error.message || 'Failed to create tag');
    
  },
});



export const useAgency = () => useQuery({
    queryKey: ['agencies'],
    queryFn: fetchAgencies,
});
