import {
  NameValueObject,
  RoleEntity,
  UserEntityFactory,
} from '@root/user/domain';
import { UserRepositoryMock } from '@root/user/domain/repository/user.repository.mock';
import { UserDTOMapper } from '../dto';
import { GetAllUsersUseCase } from './get-all-users.usecase';

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
  it('should get users', async () => {
    const userRepository = new UserRepositoryMock(user);
    const usecase = new GetAllUsersUseCase(userRepository);
    const usersFound = await usecase.execute({});
    expect(usersFound.users).toEqual([UserDTOMapper.toUserDataDTO(user)]);
  });
});
