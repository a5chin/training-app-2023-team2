import { Hello } from '../models';

const API_ENDPOINT_PATH = import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return (await response.json()) as Hello;
};
