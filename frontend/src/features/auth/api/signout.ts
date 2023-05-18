import { axios } from '@/lib/axios';

export const signout = async () => {
  await axios.post('/sign_out', null, {
    withCredentials: true,
  });
};
