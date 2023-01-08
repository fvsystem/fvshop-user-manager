import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import { v4 as uuid } from 'uuid';
import { RoleValidatorFactoryZod } from '../validator';

export interface RoleProps {
  name: string;
}

export class RoleEntity extends Entity<RoleProps> {
  constructor(props: RoleProps, id?: string) {
    const uuidValue = id || uuid();
    RoleEntity.validate(props);
    super(props, new UniqueEntityId(uuidValue));
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    RoleEntity.validate({ name });
    this.props.name = name;
  }

  static validate(props: RoleProps) {
    const validator = RoleValidatorFactoryZod.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
