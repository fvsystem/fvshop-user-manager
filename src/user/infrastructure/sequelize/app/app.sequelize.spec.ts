import { Sequelize } from 'sequelize-typescript';
import { getAppSequelize } from './app.sequelize';

jest.mock('sequelize-typescript', () => {
  const originalModule = jest.requireActual<
    typeof import('sequelize-typescript')
  >('sequelize-typescript');
  return {
    __esModule: true,
    ...originalModule,
    Sequelize: jest.fn().mockImplementation(() => ({
      sync: jest.fn(),
    })),
  };
});

describe('AppSequelize', () => {
  it('should be defined', async () => {
    const mock = jest.fn();
    (Sequelize as unknown as jest.Mock).mockImplementation(() => ({
      sync: mock,
    }));
    const config = {
      nodeEnv: 'test',
      db: {
        vendor: 'sqlite',
        host: ':memory:',
        logging: false,
      },
      rest: {},
      grpc: {},
      credentialFacade: {
        domain: 'localhost',
        port: 50051,
      },
      domain: {
        domain: 'localhost',
      },
      jwt: {
        publicKey: 'publicKey',
      },
    };
    await getAppSequelize(config);
    expect(mock).toHaveBeenCalled();
  });
});
