import axios from '../lib/axios';

export interface Analytics {
  totalTickets: number;
  totalFeedbackTickets: number;
  totalComplaintTickets: number;
  totalAddressedTickets: number;
}


export const fetchAnalytics = async (): Promise<Analytics> => {
  const response = await axios.get<Analytics>('/tickets/analytics'); 
  return response.data;
};