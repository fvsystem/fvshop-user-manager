import { ValidatorFieldsZod } from '@fvsystem/fvshop-shared-entities';
import { z } from 'zod';
import { NameProps } from '@root';

export class NameValidatorZod extends ValidatorFieldsZod<NameProps> {
  constructor() {
    super();
    this.schema = z.object({
      firstName: z.string().min(1).max(50),
      lastName: z.string().min(1).max(50),
    });
  }
}

export default NameValidatorZod;
