import { axios } from '@/lib/axios';
import { User } from '../types';

export type SignupDTO = {
  name: string;
  email: string;
  password: string;
};

type SignupResponseType = User;

export const signup = (data: SignupDTO): Promise<SignupResponseType> =>
  axios.post('/sign_up', data);
