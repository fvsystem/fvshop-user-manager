import { ValidatorFieldsZod } from '@fvsystem/fvshop-shared-entities';
import { z } from 'zod';
import { RoleProps } from '@root';

export class RoleValidatorZod extends ValidatorFieldsZod<RoleProps> {
  constructor() {
    super();
    this.schema = z.object({
      name: z.string().min(3).max(50),
    });
  }
}
