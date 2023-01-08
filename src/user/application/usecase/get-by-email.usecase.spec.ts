import { NotFoundError } from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleEntity,
  UserEntityFactory,
} from '@root/user/domain';
import { UserRepositoryMock } from '@root/user/domain/repository/user.repository.mock';
import { UserDTOMapper } from '../dto';
import { GetByEmailUseCase } from './get-by-email.usecase';

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
    const usecase = new GetByEmailUseCase(userRepository);
    const userFound = await usecase.execute({ email: 'test@teste.com' });
    expect(userFound.user).toEqual(UserDTOMapper.toUserDataDTO(user));
  });

  it('should throw when user not found', async () => {
    const userRepository = new UserRepositoryMock(user);
    const usecase = new GetByEmailUseCase(userRepository);
    expect(() => usecase.execute({ email: 'noUser' })).rejects.toThrowError(
      NotFoundError
    );
  });
});
