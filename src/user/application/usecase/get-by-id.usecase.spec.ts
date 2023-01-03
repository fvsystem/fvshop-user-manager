import {
  NotFoundError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleValueObject,
  UserEntity,
  UserEntityFactory,
  UserRepositoryInterface,
} from '@root/user/domain';
import { UserDTOMapper } from '../dto';
import { GetByIdUseCase } from './get-by-id.usecase';

const name = new NameValueObject({
  firstName: 'John',
  lastName: 'Doe',
});

const roles = [
  new RoleValueObject({
    name: 'SalesAdministrator',
  }),
];

const user = UserEntityFactory.create({
  name,
  roles,
  email: 'test@test.com',
});

class MockUserRepository implements UserRepositoryInterface {
  sortableFields: string[] = ['email'];

  async findByEmail(email: string): Promise<UserEntity> {
    if (email === 'noUser') {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async insert(entity: UserEntity): Promise<void> {
    console.log('inserted');
  }

  async bulkInsert(entities: UserEntity[]): Promise<void> {
    console.log('bulk inserted');
  }

  async findById(id: string | UniqueEntityId): Promise<UserEntity> {
    if (id === 'noUser') {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return [user];
  }

  async update(entity: UserEntity): Promise<void> {
    console.log('updated');
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    console.log('deleted');
  }
}

describe('UserApplicationService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should get user by email', async () => {
    const userRepository = new MockUserRepository();
    const usecase = new GetByIdUseCase(userRepository);
    const userFound = await usecase.execute({ userId: '123' });
    expect(userFound.user).toEqual(UserDTOMapper.toUserDataDTO(user));
  });

  it('should throw when user not found', async () => {
    const userRepository = new MockUserRepository();
    const usecase = new GetByIdUseCase(userRepository);
    expect(() => usecase.execute({ userId: 'noUser' })).rejects.toThrowError(
      NotFoundError
    );
  });
});
