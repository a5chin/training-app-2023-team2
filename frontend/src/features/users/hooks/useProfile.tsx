import { axios } from '@/lib/axios';
import { aspidaClient } from '@/lib/aspida';

type UseProfileResposne = {
  updateProfile: (profile: string) => void;
};

export const useProfile = (): UseProfileResposne => {
  const updateProfile = async (profile: string) => {
    const formData = new FormData();
    formData.append('profile', profile);
    try {
      await axios.put(aspidaClient.users.me.profile.$path(), formData, {
        withCredentials: true,
      });
    } catch (e: any) {
      console.error(`FAILED PUT /users/me/profile: ${JSON.stringify(e)}`);
    }
  };

  return {
    updateProfile,
  };
};
