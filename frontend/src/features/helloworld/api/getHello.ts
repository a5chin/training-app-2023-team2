import { API_ENDPOINT_PATH } from '@/config';
import { Hello } from '../types';

// TODO: react-query を使うかどうか検討する
export const getHello = async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return (await response.json()) as Hello;
};
