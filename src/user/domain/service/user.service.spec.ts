import { NotFoundError } from '@fvsystem/fvshop-shared-entities';
import { UserEntityFactory, RoleEntity } from '../entity';
import { UserRepositoryMock } from '../repository/user.repository.mock';
import { NameValueObject } from '../value-object';
import { UserService } from './user.service';

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

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Create a user', () => {
    it('should create a user', async () => {
      const userRepository = new UserRepositoryMock(user);
      const userService = new UserService(userRepository);
      const insertSpy = jest.spyOn(userRepository, 'insert');
      const { user: userCreated } = await userService.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        roles: ['SalesAdministrator'],
      });
      expect(userCreated.name.fullName).toBe(user.name.fullName);
      expect(userCreated.email).toBe(user.email);
      expect(userCreated.roles.toString()).toBe(user.roles.toString());
      expect(insertSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get a user by email', () => {
    it('should get a user by email', async () => {
      const userRepository = new UserRepositoryMock(user);
      const userService = new UserService(userRepository);
      const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');
      const { user: userFound } = await userService.getUserByEmail({
        email: 'test@test.com',
      });
      expect(userFound.name.fullName).toBe(user.name.fullName);
      expect(userFound.email).toBe(user.email);
      expect(userFound.roles.toString()).toBe(user.roles.toString());
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    });

    it('should not return a user', async () => {
      const userRepository = new UserRepositoryMock(user);
      const userService = new UserService(userRepository);
      const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail');
      expect(() =>
        userService.getUserByEmail({
          email: 'noUser',
        })
      ).rejects.toThrow(NotFoundError);
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get a user by id', () => {
    it('should get a user by id', async () => {
      const userRepository = new UserRepositoryMock(user);
      const userService = new UserService(userRepository);
      const findByIdSpy = jest.spyOn(userRepository, 'findById');
      const { user: userFound } = await userService.getUserById({
        id: user.id,
      });
      expect(userFound.name.fullName).toBe(user.name.fullName);
      expect(userFound.email).toBe(user.email);
      expect(userFound.roles.toString()).toBe(user.roles.toString());
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should not return a user', async () => {
      const userRepository = new UserRepositoryMock(user);
      const userService = new UserService(userRepository);
      const findByIdSpy = jest.spyOn(userRepository, 'findById');
      expect(() =>
        userService.getUserById({
          id: 'noUser',
        })
      ).rejects.toThrow(NotFoundError);
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
    });
  });
});
