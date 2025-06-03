import api from './api';

const aiUrl = 'ai/';

export const generateResponse = async (message: string) => {
  const response = await api.post(aiUrl, { message });
  return response.data.message;
};
