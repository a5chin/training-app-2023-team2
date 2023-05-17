import { axios } from '@/lib/axios';
import { User } from '../types';

type FetchMeResponseType = User;

export const fetchMe = async (): Promise<FetchMeResponseType> => {
  const response = await axios.get('/users/me');
  return response.data;
};
