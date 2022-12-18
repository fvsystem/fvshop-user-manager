import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleValueObject,
  UserValidatorFactoryZod,
} from '@root';

export interface UserProps {
  name: NameValueObject;
  email: string;
  role: RoleValueObject;
}

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    UserEntity.validate({ email: props.email });
    this.props.name = props.name;
    this.props.email = props.email;
    this.props.role = props.role;
  }

  get name(): NameValueObject {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): RoleValueObject {
    return this.props.role;
  }

  static validate(props: Omit<UserProps, 'role' | 'name'>) {
    const validator = UserValidatorFactoryZod.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
