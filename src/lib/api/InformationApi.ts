import {api} from './api';

export const getBanner = async () => {
  return await api.get('/banner');
};

export const getServices = async () => {
  return await api.get('/services');
};
