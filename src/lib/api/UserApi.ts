import {api} from './api';

export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await api.post('/login', {email, password});
};

export const userRegister = async ({
  email,
  first_name,
  last_name,
  password,
}: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}) => {
  return await api.post('/registration', {
    email,
    first_name,
    last_name,
    password,
  });
};

export const getProfile = async () => {
  return await api.get('/profile');
};

export const updateProfile = async ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  return await api.put('/profile/update', {first_name, last_name});
};

export const updateImageProfile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await api.put('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
