import {
  NameValueObject,
  RoleEntity,
  UserEntityFactory,
} from '@root/user/domain';
import { UserRepositoryMock } from '@root/user/domain/repository/user.repository.mock';
import { CreateUserUseCase } from './create-user.usecase';

const name = new NameValueObject({
  firstName: 'John',
  lastName: 'Doe',
});

const roles = [
  new RoleEntity({
    name: 'SalesAdministrator',
  }),
];

const user = UserEntityFactory.create({
  name,
  roles,
  email: 'test@test.com',
});

const credentialFacade = {
  createCredential: {
    execute: jest.fn(),
  },
  verifyCredential: {
    execute: jest.fn(),
  },
};

describe('UserApplicationService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should create user', async () => {
    const userRepository = new UserRepositoryMock(user);
    const usecase = new CreateUserUseCase(userRepository, credentialFacade);
    const userCreated = await usecase.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
      password: 'val1drPassword',
      roles: ['SalesAdministrator'],
    });
    expect(userCreated.user.email).toBe(user.email);
    expect(userCreated.user.firstName).toBe(user.name.firstName);
    expect(userCreated.user.lastName).toBe(user.name.lastName);
    expect(userCreated.user.roles).toEqual(user.roles.map((role) => role.name));
  });

  it('should throw error if credential creation fails', async () => {
    credentialFacade.createCredential.execute.mockImplementation(() => {
      throw new Error('Error');
    });
    const userRepository = new UserRepositoryMock(user);
    const spyDelete = jest.spyOn(userRepository, 'delete');
    const usecase = new CreateUserUseCase(userRepository, credentialFacade);
    await expect(() =>
      usecase.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        password: 'val1drPassword',
        roles: ['SalesAdministrator'],
      })
    ).rejects.toThrowError('Error');
    expect(spyDelete).toHaveBeenCalled();
  });
});
