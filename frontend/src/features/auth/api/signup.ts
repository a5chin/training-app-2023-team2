import { axios } from '@/lib/axios';
import { User } from '../types';
import { Controller_SignUpRequest as SignupDTO } from '@/aspida/@types';

type SignupResponseType = User;

export const signup = async (data: SignupDTO): Promise<SignupResponseType> => {
  const response = await axios.post('/sign_up', data, {
    withCredentials: true,
  });
  return response.data;
};
