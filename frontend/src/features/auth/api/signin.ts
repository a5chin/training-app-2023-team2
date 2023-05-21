import { axios } from '@/lib/axios';
import { User } from '../types';
import { Controller_SignInRequest as SigninDTO } from '@/aspida/@types';

type SigninResponseType = User;

export const signin = async (data: SigninDTO): Promise<SigninResponseType> => {
  const response = await axios.post('/sign_in', data, {
    withCredentials: true,
  });
  return response.data;
};
