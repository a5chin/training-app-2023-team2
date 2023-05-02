import { API_URL } from '@/config';
import { Hello } from '../types';

// TODO: react-query を使うかどうか検討する
export const getHello = async () => {
  const response = await fetch(`${API_URL}/hello`);
  return (await response.json()) as Hello;
};
