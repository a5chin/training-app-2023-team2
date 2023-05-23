import aspida from '@aspida/axios';
import api from '../aspida/$api';
import { axios } from './axios';

export const aspidaClient = api(
  aspida(axios, {
    withCredentials: true,
  })
);
