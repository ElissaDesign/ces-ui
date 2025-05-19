import axios from '../lib/axios';

export interface Tags {
  data: {
    id?: number;
    name: string;
  }[];
}

interface CreateTagData {
  name: string;
}

export const addTag = async (data: CreateTagData): Promise<{message:string, data: Tags}> => {
  const response = await axios.post('/tags', data);
  return response.data;
}


export const fetchTags = async (): Promise<Tags> => {
  const response = await axios.get<Tags>('/tags'); 
  return response.data;
};
