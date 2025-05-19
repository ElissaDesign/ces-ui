import axios from '../lib/axios';

export interface Ticket {
id?: number;
referenceNumber: string;
issuerEmail: string;
issuerName: string;
title: string;
description: string;
type: string; 
assignedAgency: string;
tag: string;
response: string;
respondedBy: string;
status: string;
createdAt: string; 
resolvedAt: string; 
}

interface CreateTicketData {
issuerEmail: string;
issuerName: string;
title: string;
description: string;
type: string;
agency: string;
tag: string;
notifyUser?: boolean;
}

export const createTicket = async (data: CreateTicketData): Promise<{message:string, data: Ticket}> => {
  const response = await axios.post('/tickets', data);
  return response.data;
}


export const fetchTickets = async (): Promise<Ticket> => {
  const response = await axios.get<Ticket>('/tickets'); 
  return response.data;
};
