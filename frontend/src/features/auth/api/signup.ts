import { axios } from '@/lib/axios';
import { User } from '../types';

export type SignupDTO = {
  name: string;
  email: string;
  password: string;
};

type SignupResponseType = User;

export const signup = async (data: SignupDTO): Promise<SignupResponseType> => {
  const response = await axios.post('/sign_up', data, {
    withCredentials: true,
  });
  return response.data;
};
