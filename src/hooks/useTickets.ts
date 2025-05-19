import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@tanstack/react-query';

import { createTicket, fetchTickets } from 'src/api/tickets';

export const useCreateTicket = () => useMutation({
  mutationFn: createTicket,
  onSuccess: () => {
    toast.success('Ticket submitted successfully!');
  },
  onError: (error: any) => {
    toast.error(error.message || 'Failed to submit ticket');
    
  },
});



export const useTickets = () => useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
});
