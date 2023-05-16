import { axios } from '@/lib/axios';
import { User } from '../types';

type FetchMeResponseType = User;

export const fetchMe = (): Promise<FetchMeResponseType> =>
  axios.get('/users/me');
