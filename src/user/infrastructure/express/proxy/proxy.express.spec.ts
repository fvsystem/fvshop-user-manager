import axios from 'axios';

import { UserFacadeProxyExpress } from './proxy.express';

jest.mock('axios');

describe('ClientExpress', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should call the server when trying to find by email', async () => {
    const clientExpress = new UserFacadeProxyExpress('domain');
    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue({ data: {} });
    await clientExpress.getUserByEmail.execute({
      email: 'email',
    });
    expect(getSpy).toBeCalledWith('domain/users', {
      params: { email: 'email' },
    });
  });

  it('should call the server when trying to find all users', async () => {
    const clientExpress = new UserFacadeProxyExpress('domain');
    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue({ data: {} });
    await clientExpress.getAllUsers.execute({
      limit: 2,
      offset: 0,
    });
    expect(getSpy).toBeCalledWith('domain/users', {
      params: { limit: 2, offset: 0 },
    });
  });

  it('should call the server when trying to find by id', async () => {
    const clientExpress = new UserFacadeProxyExpress('domain');
    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue({ data: {} });
    await clientExpress.getUserById.execute({
      userId: 'userId',
    });
    expect(getSpy).toBeCalledWith('domain/users/userId');
  });

  it('should call the server when trying to create user', async () => {
    const clientExpress = new UserFacadeProxyExpress('domain');
    const postSpy = jest.spyOn(axios, 'post');
    postSpy.mockResolvedValue({ data: {} });
    await clientExpress.createUser.execute({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      roles: ['admin'],
    });
    expect(postSpy).toBeCalledWith('domain/users', {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      roles: ['admin'],
    });
  });
});
