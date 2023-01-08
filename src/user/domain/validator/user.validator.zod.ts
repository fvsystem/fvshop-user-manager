import { ValidatorFieldsZod } from '@fvsystem/fvshop-shared-entities';
import { z } from 'zod';
import { UserProps } from '@root';

export class UserValidatorZod extends ValidatorFieldsZod<
  Omit<UserProps, 'role' | 'name'>
> {
  constructor() {
    super();
    this.schema = z.object({
      email: z.string().email(),
    });
  }
}
