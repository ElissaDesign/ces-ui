import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@tanstack/react-query';

import { addTag, fetchTags } from 'src/api/tags';

export const useAddTag = () => useMutation({
  mutationFn: addTag,
  onSuccess: () => {
    toast.success('Tag created successfully!');
  },
  onError: (error: any) => {
    toast.error(error.message || 'Failed to create tag');
    
  },
});



export const useTags = () => useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
});
