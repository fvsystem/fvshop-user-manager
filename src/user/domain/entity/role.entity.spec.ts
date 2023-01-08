import { EntityValidationError } from '@fvsystem/fvshop-shared-entities';
import { RoleEntity } from '@root';

describe('RoleEntity', () => {
  it('should create a valid role', () => {
    const role = new RoleEntity({ name: 'SalesAdministrator' });

    expect(role.name).toBe('SalesAdministrator');
  });

  it('should change role', () => {
    const role = new RoleEntity({ name: 'SalesAdministrator' });

    expect(role.name).toBe('SalesAdministrator');

    role.name = 'Administrator';

    expect(role.name).toBe('Administrator');
  });

  it('should validate on change role', () => {
    const role = new RoleEntity({ name: 'SalesAdministrator' });

    expect(role.name).toBe('SalesAdministrator');

    expect(() => {
      role.name = '';
    }).toThrow(EntityValidationError);
  });

  it('should not create a valid role', () => {
    expect(() => new RoleEntity({ name: '' })).toThrow();
  });
});
