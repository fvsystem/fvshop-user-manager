import { validateSync } from 'class-validator';
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null;

  validatedData: PropsValidated = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      errors.forEach((error) => {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      });
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}

export default ValidatorFields;
