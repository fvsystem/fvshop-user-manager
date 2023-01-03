import {
  NameValueObject,
  RoleValueObject,
  UserEntity,
} from '@root/user/domain';
import { UserDTOMapper } from './user-dto.mapper';

describe('UserDTOMapper', () => {
  it('should map user to user data dto', () => {
    const user = new UserEntity({
      name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
      email: 'test@test.com',
      roles: [new RoleValueObject({ name: 'SalesAdministrator' })],
    });
    const userDataDTO = UserDTOMapper.toUserDataDTO(user);
    expect(userDataDTO.id).toBe(user.id);
    expect(userDataDTO.email).toBe(user.email);
    expect(userDataDTO.roles).toEqual(user.roles.map((role) => role.name));
    expect(userDataDTO.firstName).toBe(user.name.firstName);
    expect(userDataDTO.lastName).toBe(user.name.lastName);
    expect(userDataDTO.fullName).toBe(user.name.fullName);
  });
});
