import { axios } from '@/lib/axios';
import { Entity_User as User } from '@/aspida/@types';

export type SigninDTO = {
  email: string;
  password: string;
};

type SigninResponseType = User;

export const signin = async (data: SigninDTO): Promise<SigninResponseType> => {
  const response = await axios.post('/sign_in', data, {
    withCredentials: true,
  });
  return response.data;
};
