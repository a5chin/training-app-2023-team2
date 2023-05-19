import { axios } from '@/lib/axios';
import { Entity_User as entityUser } from '@/aspida/@types';

export type SigninDTO = {
  email: string;
  password: string;
};

type SigninResponseType = entityUser;

export const signin = async (data: SigninDTO): Promise<SigninResponseType> => {
  const response = await axios.post('/sign_in', data, {
    withCredentials: true,
  });
  return response.data;
};
