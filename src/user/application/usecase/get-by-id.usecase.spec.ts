import { NotFoundError } from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleEntity,
  UserEntityFactory,
} from '@root/user/domain';
import { UserRepositoryMock } from '@root/user/domain/repository/user.repository.mock';
import { UserDTOMapper } from '../dto';
import { GetByIdUseCase } from './get-by-id.usecase';

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

describe('UserApplicationService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should get user by email', async () => {
    const userRepository = new UserRepositoryMock(user);
    const usecase = new GetByIdUseCase(userRepository);
    const userFound = await usecase.execute({ userId: '123' });
    expect(userFound.user).toEqual(UserDTOMapper.toUserDataDTO(user));
  });

  it('should throw when user not found', async () => {
    const userRepository = new UserRepositoryMock(user);
    const usecase = new GetByIdUseCase(userRepository);
    expect(() => usecase.execute({ userId: 'noUser' })).rejects.toThrowError(
      NotFoundError
    );
  });
});
