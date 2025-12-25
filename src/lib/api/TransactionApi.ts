import {api} from './api';

export const getBalance = async () => {
  return await api.get('/balance');
};

export const topUp = async (top_up_amount: number) => {
  return await api.post('/topup', {top_up_amount});
};

export const transactionHistory = async (offset: number, limit: number) => {
  return await api.get('/transaction/history', {
    params: {
      offset,
      limit,
    },
  });
};

export const purchase = async (service_code: string) => {
  return await api.post('/transaction', {service_code});
};
