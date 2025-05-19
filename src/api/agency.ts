import { tags } from './../../node_modules/@emotion/styled/src/tags';
import axios from '../lib/axios';

export interface Agency {
  data: {
    id?: number;
    name: string;
    description: string;
    createdAt: string;
  }[];
}

interface CreateAgencyData {
  name: string;
  description: string;
  tags: string[];
}

export const addAgency = async (data: CreateAgencyData): Promise<{ message: string; data: Agency }> => {
  const response = await axios.post('/agency', data);
  return response.data;
};


export const fetchAgencies = async (): Promise<Agency> => {
  const response = await axios.get<Agency>('/agency'); 
  return response.data;
};
