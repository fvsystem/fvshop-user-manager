import {
  EntityValidationError,
  ValueObject,
} from '@fvsystem/fvshop-shared-entities';
import { RoleValidatorFactoryZod } from '../validator';

export interface RoleProps {
  name: string;
}

export class RoleValueObject extends ValueObject<RoleProps> {
  constructor(props: RoleProps) {
    RoleValueObject.validate(props);
    super(props);
  }

  get name(): string {
    return this.value.name;
  }

  static validate(props: RoleProps) {
    const validator = RoleValidatorFactoryZod.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
