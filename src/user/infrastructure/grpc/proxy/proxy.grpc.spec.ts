import { UserFacadeProxyGrpc } from './proxy.grpc';

const client = {
  close: jest.fn(),
  getChannel: jest.fn(),
  waitForReady: jest.fn(),
  checkOptionalUnaryResponseArguments: jest.fn(),
  makeUnaryRequest: jest.fn(),
  makeClientStreamRequest: jest.fn(),
  checkMetadataAndOptions: jest.fn(),
  makeServerStreamRequest: jest.fn(),
  makeBidiStreamRequest: jest.fn(),
};

const createUserClient = {
  ...client,
  CreateUser: jest.fn(),
};

const getByEmailClient = {
  ...client,
  GetByEmail: jest.fn(),
};

const getByIdClient = {
  ...client,
  GetById: jest.fn(),
};

const getAllUsersClient = {
  ...client,
  GetAllUsers: jest.fn(),
};

jest.mock('@grpc/proto-loader', () => ({
  loadSync: jest.fn().mockReturnValue({}),
}));

jest.mock('@grpc/grpc-js', () => ({
  credentials: {
    createInsecure: jest.fn(),
  },
  loadPackageDefinition: jest.fn().mockReturnValue({
    CreateUser: jest.fn().mockImplementation(() => createUserClient),
    GetByEmail: jest.fn().mockImplementation(() => getByEmailClient),
    GetById: jest.fn().mockImplementation(() => getByIdClient),
    GetAllUsers: jest.fn().mockImplementation(() => getAllUsersClient),
  }),
}));

describe('GrpcProxy', () => {
  it('should call createUser service', () => {
    const proxy = new UserFacadeProxyGrpc('localhost', 50051);
    proxy.createUser.execute({
      email: 'test@test.com',
      password: 'validHFH676',
      firstName: 'test',
      lastName: 'test',
      roles: ['admin'],
    });
    expect(createUserClient.CreateUser).toBeCalledTimes(1);
  });

  it('should call getByEmail service', () => {
    const proxy = new UserFacadeProxyGrpc('localhost', 50051);
    proxy.getUserByEmail.execute({
      email: 'test@test.com',
    });
    expect(getByEmailClient.GetByEmail).toBeCalledTimes(1);
  });

  it('should call getById service', () => {
    const proxy = new UserFacadeProxyGrpc('localhost', 50051);
    proxy.getUserById.execute({
      userId: 'userId',
    });
    expect(getByIdClient.GetById).toBeCalledTimes(1);
  });

  it('should call getAllUsers service', () => {
    const proxy = new UserFacadeProxyGrpc('localhost', 50051);
    proxy.getAllUsers.execute({});
    expect(getAllUsersClient.GetAllUsers).toBeCalledTimes(1);
  });
});
