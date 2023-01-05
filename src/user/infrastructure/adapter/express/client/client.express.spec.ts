import axios from 'axios';

import { UserFacadeImpleRest } from './client.express';

jest.mock('axios');

describe('ClientExpress', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should call the server when trying to login', async () => {
    const clientExpress = new UserFacadeImpleRest('domain');
    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue({ data: {} });
    await clientExpress.getUserByEmail.execute({
      email: 'email',
    });
    expect(getSpy).toBeCalledWith('domain/user/mail', {
      params: { email: 'email' },
    });
  });

  it('should call the server when trying to register', async () => {
    const clientExpress = new UserFacadeImpleRest('domain');
    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue({ data: {} });
    await clientExpress.getUserById.execute({
      userId: 'userId',
    });
    expect(getSpy).toBeCalledWith('domain/user/userId');
  });
});
