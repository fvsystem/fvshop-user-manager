import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleEntity,
  UserValidatorFactoryZod,
} from '@root/user/domain';

export interface UserProps {
  name: NameValueObject;
  email: string;
  roles: RoleEntity[];
}

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    UserEntity.validate({ email: props.email });
    this.props.name = props.name;
    this.props.email = props.email;
    this.props.roles = props.roles;
  }

  get name(): NameValueObject {
    return this.props.name;
  }

  set name(name: NameValueObject) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    UserEntity.validate({ email });
    this.props.email = email;
  }

  get roles(): RoleEntity[] {
    return this.props.roles;
  }

  addRole(role: RoleEntity) {
    this.props.roles.push(role);
  }

  removeRole(role: RoleEntity) {
    this.props.roles = this.props.roles.filter((r) => r.id !== role.id);
  }

  static validate(props: Omit<UserProps, 'roles' | 'name'>) {
    const validator = UserValidatorFactoryZod.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
