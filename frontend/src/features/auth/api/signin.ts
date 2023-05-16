import { axios } from '@/lib/axios';
import { User } from '../types';

export type SigninDTO = {
  email: string;
  password: string;
};

type SigninResponseType = User;

export const signin = (data: SigninDTO): Promise<SigninResponseType> =>
  axios.post('/sign_in', data);
