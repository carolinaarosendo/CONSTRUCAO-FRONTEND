export const validateMockLogin = (username: string, password: string) => {
  return username === 'admin' && password === '123456';
};