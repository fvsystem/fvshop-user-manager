import {
  EntityValidationError,
  ValueObject,
} from '@fvsystem/fvshop-shared-entities';
import { NameValidatorFactoryZod } from '../validator';

export interface NameProps {
  firstName: string;
  lastName: string;
  fullName: string;
}

export class NameValueObject extends ValueObject<NameProps> {
  constructor(props: Omit<NameProps, 'fullName'>) {
    NameValueObject.validate(props);
    super({ ...props, fullName: `${props.firstName} ${props.lastName}` });
  }

  get firstName(): string {
    return this.value.firstName;
  }

  get lastName(): string {
    return this.value.lastName;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static validate(props: Omit<NameProps, 'fullName'>) {
    const validator = NameValidatorFactoryZod.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
