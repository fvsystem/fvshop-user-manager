import { RoleValueObject } from '@root';

describe('RoleValueObject', () => {
  it('should create a valid role', () => {
    const role = new RoleValueObject({ name: 'SalesAdministrator' });

    expect(role.name).toBe('SalesAdministrator');
  });

  it('should not create a valid role', () => {
    expect(() => new RoleValueObject({ name: '' })).toThrow();
  });
});
